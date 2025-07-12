"use client"

import React from "react"
import { useEffect, useRef, useState } from "react"
import { useScroll, useTransform, motion } from "motion/react"

interface TimelineData {
    title: React.ReactNode
    content: React.ReactNode
    logo?: string
    logoAlt?: string
}

interface TimelineProps {
    data: TimelineData[]
}

export const Timeline = ({ data }: TimelineProps) => {
    const ref = useRef<HTMLDivElement>(null)
    const containerRef = useRef<HTMLDivElement>(null)
    const [height, setHeight] = useState(0)
    const [itemProgress, setItemProgress] = useState<number[]>(new Array(data.length).fill(0))

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start 10%", "end 50%"],
    })

    const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height])
    const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1])

    // Reactive height calculation using ResizeObserver
    useEffect(() => {
        if (!ref.current) return;
        
        const resizeObserver = new ResizeObserver((entries) => {
            for (const entry of entries) {
                setHeight(entry.contentRect.height);
            }
        });
        
        resizeObserver.observe(ref.current);
        return () => resizeObserver.disconnect();
    }, []);

    useEffect(() => {
        const unsubscribe = scrollYProgress.on("change", (progress) => {
            // Calculate individual progress for each item
            const newProgress = data.map((_, index) => {
                const itemStart = index / data.length
                const itemEnd = (index + 1) / data.length
                const itemProgress = Math.max(0, Math.min(1, (progress - itemStart) / (itemEnd - itemStart)))
                return itemProgress
            })
            setItemProgress(newProgress)
        })
        return () => unsubscribe()
    }, [scrollYProgress, data])

    const renderContentWithSlideIn = (content: React.ReactNode) => {
        if (!React.isValidElement(content)) {
            return content
        }

        const processChildren = (children: React.ReactNode): React.ReactNode => {
            return React.Children.map(children, (child) => {
                if (!React.isValidElement(child)) {
                    return child
                }

                const childProps = child.props as { className?: string; children?: React.ReactNode };

                if (childProps.className === "expandable-content") {
                    return (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ 
                                duration: 0.4, 
                                delay: 0.2,
                                ease: "easeOut"
                            }}
                            viewport={{ once: true, amount: 0.3 }}
                        >
                            {/* Stagger individual bullets */}
                            {React.Children.map(childProps.children, (bullet, bulletIndex) => (
                                <motion.div
                                    key={bulletIndex}
                                    initial={{ x: -20, opacity: 0 }}
                                    whileInView={{ x: 0, opacity: 1 }}
                                    transition={{
                                        duration: 0.4,
                                        delay: 0.3 + (bulletIndex * 0.1),
                                        ease: "easeOut"
                                    }}
                                    viewport={{ once: true, amount: 0.3 }}
                                >
                                    {bullet}
                                </motion.div>
                            ))}
                        </motion.div>
                    )
                }

                if (childProps.children) {
                    return React.isValidElement(child)
                        ? React.cloneElement(child as React.ReactElement<{ children?: React.ReactNode }>, {
                            children: processChildren(childProps.children),
                        })
                        : child;
                }

                return child
            })
        }

        const contentProps = content.props as { children?: React.ReactNode };
        return React.isValidElement(content)
            ? React.cloneElement(content as React.ReactElement<{ children?: React.ReactNode }>, {
                children: processChildren(contentProps.children),
            })
            : content;
    }

    return (
        <div className="w-full bg-transparent font-sans relative" ref={containerRef}>
            <div className="max-w-7xl mx-auto py-2 md:py-4 px-4">
                <div ref={ref} className="relative max-w-6xl mx-auto">
                    {data.map((item, index) => (
                        <motion.div
                            key={index}
                            className={`flex justify-start ${
                                index === 0 ? "pt-2 pb-6 md:pt-4 md:pb-10" : "pt-8 pb-8 md:pt-16 md:pb-12"
                            } md:gap-6`}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            viewport={{ once: true, amount: 0.3 }}
                        >
                            <div className="sticky flex flex-col md:flex-row z-40 items-center top-40 self-start max-w-[180px] md:max-w-[220px] md:w-[220px] flex-shrink-0">
                                <motion.div
                                    className="h-8 md:h-10 absolute left-4 md:left-3 w-8 md:w-10 rounded-full bg-white flex items-center justify-center transition-all duration-500 overflow-hidden"
                                    style={{
                                        boxShadow: itemProgress[index] > 0.3 ? "0 0 20px rgba(59, 130, 246, 0.6)" : "none",
                                    }}
                                >
                                    {item.logo ? (
                                        <img
                                            src={item.logo || "/placeholder.svg"}
                                            alt={item.logoAlt || "Company logo"}
                                            width={20}
                                            height={20}
                                            className="rounded-full object-cover md:w-6 md:h-6"
                                        />
                                    ) : (
                                        <div className="h-3 w-3 md:h-4 md:w-4 rounded-full bg-neutral-200 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 p-2" />
                                    )}
                                </motion.div>
                                <div
                                    className={`hidden md:block text-xl md:pl-16 md:text-4xl font-black transition-colors duration-300 ${
                                        itemProgress[index] > 0.3 ? "text-gray-800 dark:text-white" : "text-gray-400 dark:text-neutral-500"
                                    }`}
                                >
                                    {item.title}
                                </div>
                            </div>

                            <div className="relative pl-16 md:pl-2 w-full flex-grow">
                                <div
                                    className={`md:hidden block text-sm mb-3 text-left font-black transition-colors duration-300 ${
                                        itemProgress[index] > 0.3 ? "text-gray-800 dark:text-white" : "text-gray-400 dark:text-neutral-500"
                                    } [&>*]:text-left`}
                                >
                                    {item.title}
                                </div>
                                <motion.div
                                    className={`rounded-lg border backdrop-blur-sm p-4 md:p-6 transition-all duration-500 [&_h3]:text-base [&_h3]:md:text-xl [&_p]:text-xs [&_p]:md:text-sm [&_a]:text-xs [&_a]:md:text-sm ${
                                        itemProgress[index] > 0.3
                                            ? "bg-gray-900/95 dark:bg-blue-500/10 border-blue-500/50 dark:border-blue-500/30"
                                            : "bg-gray-800/95 dark:bg-white/5 border-gray-700/50 dark:border-white/10"
                                    }`}
                                    style={{
                                        boxShadow:
                                            itemProgress[index] > 0.3
                                                ? "0 8px 32px rgba(59, 130, 246, 0.15)"
                                                : "0 4px 16px rgba(0, 0, 0, 0.1)",
                                    }}
                                >
                                    {renderContentWithSlideIn(item.content)}
                                </motion.div>
                            </div>
                        </motion.div>
                    ))}
                    <div
                        style={{
                            height: height + "px",
                        }}
                        className="absolute md:left-8 left-8 top-0 overflow-hidden w-[2px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-gray-300 dark:via-neutral-700 to-transparent to-[99%]  [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)] "
                    >
                        <motion.div
                            style={{
                                height: heightTransform,
                                opacity: opacityTransform,
                            }}
                            className="absolute inset-x-0 top-0  w-[2px] bg-gradient-to-t from-purple-500 via-blue-500 to-transparent from-[0%] via-[10%] rounded-full"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}