"use client";

import { ComponentPropsWithoutRef, ReactNode, useState, useEffect } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import GitHubIcon from '@mui/icons-material/GitHub';
import GoesOutComesInUnderline from './Underline';
import Graph from './Graph';
import { useResponsive } from '@/hooks/useResponsive';

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
                "grid w-full auto-rows-[21rem] grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-2 md:gap-x-6 md:gap-y-0",
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
    const { isMobile, width } = useResponsive();
    const [isHovered, setIsHovered] = useState(false);
    const projectId = name.toLowerCase().replace(/\s+/g, '-');
    
    // Wait for useResponsive to stabilize before rendering React Flow
    // Add brief delay to prevent flash of loading state on fast devices
    const [isResponsiveReady, setIsResponsiveReady] = useState(false);
    
    useEffect(() => {
        if (width > 0) {
            // Small delay to ensure stable measurements
            const timer = setTimeout(() => setIsResponsiveReady(true), 50);
            return () => clearTimeout(timer);
        }
    }, [width]);
    
    const commonClassName = cn(
        "group relative flex flex-col overflow-hidden rounded-2xl cursor-pointer h-60 md:h-80",
        "backdrop-blur-md bg-white/80 dark:bg-neutral-950/80 border border-neutral-300 dark:border-neutral-800",
        "shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]",
        className,
    );

    const commonProps = {
        onMouseEnter: () => setIsHovered(true),
        onMouseLeave: () => setIsHovered(false),
        ...props
    };
    
    const cardContent = (
        <>
            {/* Background */}
            <div className="absolute inset-0">
                {background}
            </div>

            {/* Description - Natural flow at top */}
            <motion.div 
                className="relative px-4 pt-4 pb-1 text-left z-10"
                initial={isReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                animate={isReducedMotion ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
                transition={isReducedMotion ? {} : { 
                    duration: 0.5,
                    delay: index * 0.1 + 0.2
                }}
            >
                <p className="text-neutral-800 dark:text-neutral-200 text-sm drop-shadow-lg mb-2">
                    {description}
                </p>
                
                {/* Key Points - Always Visible */}
                <div className="space-y-0.5">
                    {keyPoints.map((point, pointIndex) => (
                        <motion.p
                            key={pointIndex}
                            className="text-neutral-700 dark:text-neutral-300 text-xs drop-shadow-lg"
                            initial={isReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                            animate={isReducedMotion ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
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

            {/* React Flow Graph - Takes remaining vertical space */}
            {techStack.length > 0 && (
                <motion.div 
                    className={`relative flex-1 mb-0 ${isMobile ? 'px-0' : 'px-4'} z-10`}
                    initial={isReducedMotion ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                    animate={isReducedMotion ? { opacity: 1, scale: 1 } : { opacity: 1, scale: 1 }}
                    transition={isReducedMotion ? {} : { 
                        duration: 0.4,
                        delay: index * 0.1 + 0.4
                    }}
                >
                    {isResponsiveReady ? (
                        <Graph 
                            key={`${projectId}-${isMobile}`}
                            techStack={techStack}
                            projectId={projectId}
                            isReducedMotion={isReducedMotion}
                            isMobile={isMobile}
                            className="h-full"
                        />
                    ) : (
                        <div className="h-full flex items-center justify-center">
                            <div className="w-6 h-6 border-2 border-neutral-400 border-t-transparent rounded-full animate-spin" />
                        </div>
                    )}
                </motion.div>
            )}

            {/* Project Name + Action Buttons - Bottom Row */}
            <motion.div 
                className="absolute bottom-4 left-4 right-4 flex items-center justify-between z-10"
                initial={isReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                animate={isReducedMotion ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
                transition={isReducedMotion ? {} : { 
                    duration: 0.5,
                    delay: index * 0.1 + 0.2
                }}
            >
                {liveUrl ? (
                    <GoesOutComesInUnderline 
                        className="text-xl md:text-2xl font-semibold text-blue-300 hover:text-blue-200 drop-shadow-lg transition-colors"
                        direction="right"
                        onClick={() => window.open(liveUrl, '_blank')}
                        isHovered={isHovered}
                    >
                        {name}
                    </GoesOutComesInUnderline>
                ) : (
                    <h3 className="text-xl md:text-2xl font-semibold text-neutral-900 dark:text-white drop-shadow-lg">
                        {name}
                    </h3>
                )}
                
                {/* Action Buttons */}
                <div className="flex gap-2">
                    {githubUrl && (
                        <motion.button
                            onClick={(e) => {
                                e.stopPropagation();
                                window.open(githubUrl, '_blank');
                            }}
                            className="flex items-center gap-1 px-3 py-1.5 bg-white/10 hover:bg-white/20 border border-neutral-300 dark:border-white/30 rounded-lg transition-all duration-200 text-neutral-900 dark:text-white"
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
        </>
    );
    
    return isReducedMotion ? (
        <div className={commonClassName} {...commonProps}>
            {cardContent}
        </div>
    ) : (
        <motion.div
            className={commonClassName}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ 
                duration: 0.5, 
                ease: [0.4, 0.0, 0.2, 1],
                delay: index * 0.1
            }}
            viewport={{ once: true, amount: 0.3 }}
            whileHover={{ 
                y: -4,
                transition: { duration: 0.2 }
            }}
            {...commonProps}
        >
            {cardContent}
        </motion.div>
    );
}