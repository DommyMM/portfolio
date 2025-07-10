"use client";

import { ComponentPropsWithoutRef, ReactNode } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { createIconComponent } from "@/lib/icons";

interface BentoGridProps extends ComponentPropsWithoutRef<"div"> {
    children: ReactNode;
    className?: string;
}

interface BentoCardProps extends Omit<ComponentPropsWithoutRef<"div">, "onDrag" | "onDragEnd" | "onDragStart" | "onAnimationStart" | "onAnimationEnd"> {
    name: string;
    className?: string;
    background: ReactNode;
    tagline?: string;
    primaryMetric?: string;
    techStack?: string[];
    href?: string;
    isReducedMotion?: boolean;
    index?: number;
}

export function BentoGrid({ children, className, ...props }: BentoGridProps) {
    return (
        <div
            className={cn(
                "grid w-full auto-rows-[22rem] grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6",
                className,
            )}
            {...props}
        >
            {children}
        </div>
    );
}

export function BentoCard({
    name,
    className,
    background,
    tagline,
    primaryMetric,
    techStack = [],
    href,
    isReducedMotion = false,
    index = 0,
    ...props
}: BentoCardProps) {
    const MotionDiv = isReducedMotion ? "div" : motion.div;
    
    const handleClick = () => {
        if (href) {
            if (href.startsWith('#')) {
                const element = document.getElementById(href.substring(1));
                element?.scrollIntoView({ behavior: 'smooth' });
            } else {
                window.open(href, '_blank');
            }
        }
    };
    
    return (
        <MotionDiv
            className={cn(
                "group relative flex flex-col justify-between overflow-hidden rounded-2xl cursor-pointer",
                // Glassmorphic styling
                "backdrop-blur-md bg-white/80 dark:bg-neutral-950/80 border border-neutral-300 dark:border-neutral-800",
                // Enhanced shadow system
                "shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]",
                className,
            )}
            initial={isReducedMotion ? {} : { opacity: 0, y: 20 }}
            whileInView={isReducedMotion ? {} : { opacity: 1, y: 0 }}
            transition={isReducedMotion ? {} : { 
                duration: 0.5, 
                ease: "easeOut",
                delay: index * 0.1
            }}
            viewport={{ once: true, amount: 0.3 }}
            whileHover={isReducedMotion ? {} : { 
                y: -4,
                transition: { duration: 0.2 }
            }}
            onClick={handleClick}
            {...props}
        >
            {/* Background Content */}
            <div className="relative flex-1 overflow-hidden">
                {background}
            </div>

            {/* Primary Metric Badge - Top Right */}
            {primaryMetric && (
                <motion.div 
                    className="absolute top-4 right-4 px-3 py-1 bg-black/20 backdrop-blur-sm rounded-full border border-white/20"
                    initial={isReducedMotion ? {} : { opacity: 0, scale: 0.8 }}
                    animate={isReducedMotion ? {} : { opacity: 1, scale: 1 }}
                    transition={isReducedMotion ? {} : { 
                        duration: 0.4,
                        delay: index * 0.1 + 0.2
                    }}
                >
                    <span className="text-white text-xs font-medium">
                        {primaryMetric}
                    </span>
                </motion.div>
            )}

            {/* Tech Stack Icons - Bottom Right */}
            {techStack.length > 0 && (
                <motion.div 
                    className="absolute bottom-4 right-4 flex gap-2"
                    initial={isReducedMotion ? {} : { opacity: 0, x: 20 }}
                    animate={isReducedMotion ? {} : { opacity: 1, x: 0 }}
                    transition={isReducedMotion ? {} : { 
                        duration: 0.4,
                        delay: index * 0.1 + 0.3
                    }}
                >
                    {techStack.slice(0, 4).map((tech) => (
                        <div 
                            key={tech}
                            className="w-6 h-6 bg-black/20 backdrop-blur-sm rounded-full border border-white/20 flex items-center justify-center"
                        >
                            {createIconComponent(tech, { className: "w-3 h-3" })}
                        </div>
                    ))}
                </motion.div>
            )}

            {/* Project Name - Bottom Left */}
            <motion.div 
                className="absolute bottom-4 left-4"
                initial={isReducedMotion ? {} : { opacity: 0, y: 20 }}
                animate={isReducedMotion ? {} : { opacity: 1, y: 0 }}
                transition={isReducedMotion ? {} : { 
                    duration: 0.5,
                    delay: index * 0.1 + 0.2
                }}
            >
                <h3 className="text-xl font-semibold text-white drop-shadow-lg">
                    {name}
                </h3>
                {tagline && (
                    <p className="text-sm text-neutral-200 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        {tagline}
                    </p>
                )}
            </motion.div>

            {/* Hover Overlay */}
            {!isReducedMotion && (
                <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none" />
            )}
        </MotionDiv>
    );
}