"use client";

import React, { useEffect, useRef, useState } from "react";
import { useScroll, useTransform, motion } from "motion/react";

interface TimelineData {
    title: React.ReactNode;
    content: React.ReactNode;
}

interface TimelineProps {
    data: TimelineData[];
}

export const Timeline = ({ data }: TimelineProps) => {
    const ref = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [height, setHeight] = useState(0);
    const [itemProgress, setItemProgress] = useState<number[]>(new Array(data.length).fill(0));

    useEffect(() => {
        if (ref.current) {
            const rect = ref.current.getBoundingClientRect();
            setHeight(rect.height);
        }
    }, [ref]);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start 10%", "end 50%"],
    });

    const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
    const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

    useEffect(() => {
        const unsubscribe = scrollYProgress.on("change", (progress) => {
            // Calculate individual progress for each item
            const newProgress = data.map((_, index) => {
                const itemStart = index / data.length;
                const itemEnd = (index + 1) / data.length;
                const itemProgress = Math.max(0, Math.min(1, (progress - itemStart) / (itemEnd - itemStart)));
                return itemProgress;
            });
            setItemProgress(newProgress);
        });
        return () => unsubscribe();
    }, [scrollYProgress, data.length]);

    return (
        <div className="w-full bg-transparent font-sans" ref={containerRef}>
            <div className="max-w-7xl mx-auto py-20 px-4">
                <div ref={ref} className="relative max-w-6xl mx-auto pb-20">
                    {data.map((item, index) => (
                        <div
                            key={index}
                            className={`flex justify-start ${index === 0 ? 'pt-4' : 'pt-10'} md:${index === 0 ? 'pt-8' : 'pt-40'} md:gap-6`}
                        >
                            <div className="sticky flex flex-col md:flex-row z-40 items-center top-40 self-start max-w-[220px] md:w-[220px] flex-shrink-0">
                                <div className="h-10 absolute left-3 md:left-3 w-10 rounded-full bg-black dark:bg-white flex items-center justify-center">
                                    <div className="h-4 w-4 rounded-full bg-neutral-200 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 p-2" />
                                </div>
                                <div className={`hidden md:block text-xl md:pl-16 md:text-4xl font-black transition-colors duration-300 ${
                                    itemProgress[index] > 0.3 ? 'text-white' : 'text-neutral-500'
                                }`}>
                                    {item.title}
                                </div>
                            </div>

                            <div className="relative pl-20 md:pl-2 w-full flex-grow">
                                <div className={`md:hidden block text-lg mb-4 text-left font-black transition-colors duration-300 ${
                                    itemProgress[index] > 0.3 ? 'text-white' : 'text-neutral-500'
                                }`}>
                                    {item.title}
                                </div>
                                <div className="bg-white/5 rounded-lg border border-white/10 p-6 backdrop-blur-sm">
                                    {item.content}
                                </div>
                            </div>
                        </div>
                    ))}
                    <div
                        style={{
                            height: height + "px",
                        }}
                        className="absolute md:left-8 left-8 top-0 overflow-hidden w-[2px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-neutral-200 dark:via-neutral-700 to-transparent to-[99%]  [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)] "
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
    );
};