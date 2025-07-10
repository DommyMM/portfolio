"use client";

import { ComponentPropsWithoutRef, ReactNode } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { createIconComponent } from "@/lib/icons";
import LaunchIcon from '@mui/icons-material/Launch';
import GitHubIcon from '@mui/icons-material/GitHub';

interface BentoGridProps extends ComponentPropsWithoutRef<"div"> {
    children: ReactNode;
    className?: string;
}

interface BentoCardProps extends Omit<ComponentPropsWithoutRef<"div">, "onDrag" | "onDragEnd" | "onDragStart" | "onAnimationStart" | "onAnimationEnd"> {
    name: string;
    className?: string;
    background: ReactNode;
    description: string;
    keyPoints: string[];
    techStack: string[];
    liveUrl?: string;
    githubUrl?: string;
    isReducedMotion?: boolean;
    index?: number;
}

export function BentoGrid({ children, className, ...props }: BentoGridProps) {
    return (
        <div
            className={cn(
                "grid w-full auto-rows-[22rem] grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-2 md:gap-x-6 md:gap-y-3",
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
    description,
    keyPoints,
    techStack = [],
    liveUrl,
    githubUrl,
    isReducedMotion = false,
    index = 0,
    ...props
}: BentoCardProps) {
    const MotionDiv = isReducedMotion ? "div" : motion.div;
    
    return (
        <MotionDiv
            className={cn(
                "group relative flex flex-col justify-between overflow-hidden rounded-2xl cursor-pointer h-60 md:h-80",
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
            {...props}
        >
            {/* Background */}
            <div className="absolute inset-0">
                {background}
            </div>

            {/* Description - Top Center */}
            <motion.div 
                className="absolute top-4 left-4 right-4 text-left z-10"
                initial={isReducedMotion ? {} : { opacity: 0, y: 20 }}
                animate={isReducedMotion ? {} : { opacity: 1, y: 0 }}
                transition={isReducedMotion ? {} : { 
                    duration: 0.5,
                    delay: index * 0.1 + 0.2
                }}
            >
                <p className="text-neutral-200 text-sm drop-shadow-lg mb-2">
                    {description}
                </p>
                
                {/* Key Points - Always Visible */}
                <div className="space-y-0.5">
                    {keyPoints.map((point, pointIndex) => (
                        <motion.p
                            key={pointIndex}
                            className="text-neutral-300 text-xs drop-shadow-lg"
                            initial={isReducedMotion ? {} : { opacity: 0, y: 10 }}
                            animate={isReducedMotion ? {} : { opacity: 1, y: 0 }}
                            transition={isReducedMotion ? {} : {
                                duration: 0.4,
                                delay: index * 0.1 + 0.3 + (pointIndex * 0.1)
                            }}
                        >
                            • {point}
                        </motion.p>
                    ))}
                </div>
            </motion.div>

            {/* Tech Stack Icons - Bottom Right, above name row */}
            {techStack.length > 0 && (
                <motion.div 
                    className="absolute bottom-12 right-4 flex gap-2 z-10"
                    initial={isReducedMotion ? {} : { opacity: 0, x: 20 }}
                    animate={isReducedMotion ? {} : { opacity: 1, x: 0 }}
                    transition={isReducedMotion ? {} : { 
                        duration: 0.4,
                        delay: index * 0.1 + 0.4
                    }}
                >
                    {techStack.slice(0, 5).map((tech) => (
                        <div 
                            key={tech}
                            className="w-5 h-5 flex items-center justify-center"
                        >
                            {createIconComponent(tech, { className: "w-4 h-4 drop-shadow-lg" })}
                        </div>
                    ))}
                    {techStack.length > 5 && (
                        <div className="w-5 h-5 flex items-center justify-center">
                            <span className="text-white text-xs font-medium drop-shadow-lg">+{techStack.length - 5}</span>
                        </div>
                    )}
                </motion.div>
            )}

            {/* Project Name + Action Buttons - Bottom Row */}
            <motion.div 
                className="absolute bottom-4 left-4 right-4 flex items-center justify-between z-10"
                initial={isReducedMotion ? {} : { opacity: 0, y: 20 }}
                animate={isReducedMotion ? {} : { opacity: 1, y: 0 }}
                transition={isReducedMotion ? {} : { 
                    duration: 0.5,
                    delay: index * 0.1 + 0.2
                }}
            >
                <h3 className="text-xl md:text-2xl font-semibold text-white drop-shadow-lg">
                    {name}
                </h3>
                
                {/* Action Buttons */}
                <div className="flex gap-2">
                    {liveUrl && (
                        <motion.button
                            onClick={(e) => {
                                e.stopPropagation();
                                window.open(liveUrl, '_blank');
                            }}
                            className="flex items-center gap-1 px-3 py-1.5 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-400/30 rounded-lg transition-all duration-200 text-blue-200"
                            whileHover={isReducedMotion ? {} : { scale: 1.05 }}
                            whileTap={isReducedMotion ? {} : { scale: 0.95 }}
                        >
                            <LaunchIcon className="w-3 h-3" />
                            <span className="text-xs font-medium">Demo</span>
                        </motion.button>
                    )}
                    {githubUrl && (
                        <motion.button
                            onClick={(e) => {
                                e.stopPropagation();
                                window.open(githubUrl, '_blank');
                            }}
                            className="flex items-center gap-1 px-3 py-1.5 bg-white/10 hover:bg-white/20 border border-white/30 rounded-lg transition-all duration-200 text-white"
                            whileHover={isReducedMotion ? {} : { scale: 1.05 }}
                            whileTap={isReducedMotion ? {} : { scale: 0.95 }}
                        >
                            <GitHubIcon className="w-3 h-3" />
                            <span className="text-xs font-medium">Code</span>
                        </motion.button>
                    )}
                </div>
            </motion.div>

            {/* Subtle Hover Background Effect */}
            {!isReducedMotion && (
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none z-10" />
            )}
        </MotionDiv>
    );
}