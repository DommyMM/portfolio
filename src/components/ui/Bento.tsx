"use client";

import { ComponentPropsWithoutRef, ReactNode } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { MagicButton } from "@/components/ui/Button";

interface BentoGridProps extends ComponentPropsWithoutRef<"div"> {
    children: ReactNode;
    className?: string;
    expandedMode?: boolean; // New prop for handling expanded layouts
}

interface BentoCardProps extends Omit<ComponentPropsWithoutRef<"div">, "onDrag" | "onDragEnd" | "onDragStart" | "onAnimationStart" | "onAnimationEnd"> {
    name: string;
    className?: string;
    background: ReactNode;
    icon?: ReactNode;
    description: string;
    href?: string;
    cta?: string;
    isReducedMotion?: boolean;
    isExpanded?: boolean; // New prop for expanded state
    onExpand?: () => void; // New prop for expansion handler
    onClose?: () => void; // New prop for close handler
}

export function BentoGrid({ children, className, expandedMode = false, ...props }: BentoGridProps) {
    return (
        <div
            className={cn(
                "grid w-full gap-4 md:gap-6",
                expandedMode 
                    ? "grid-cols-1" // Single column when something is expanded
                    : "auto-rows-[22rem] grid-cols-1 md:grid-cols-2 lg:grid-cols-3", // Normal grid
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
    icon,
    description,
    href,
    cta = "Learn more",
    isReducedMotion = false,
    isExpanded = false,
    onExpand,
    onClose,
    ...props
}: BentoCardProps) {
    const MotionDiv = isReducedMotion ? "div" : motion.div;
    
    // Handle click for expansion
    const handleClick = () => {
        if (isExpanded && onClose) {
            onClose();
        } else if (onExpand) {
            onExpand();
        }
    };
    
    return (
        <MotionDiv
            className={cn(
                "group relative flex flex-col justify-between overflow-hidden rounded-2xl cursor-pointer",
                "backdrop-blur-md bg-white/80 dark:bg-neutral-950/80 border border-neutral-300 dark:border-neutral-800",
                "shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]",
                isExpanded && "min-h-[600px] lg:min-h-[700px] col-span-full",
                className,
            )}
            initial={isReducedMotion ? {} : { opacity: 0, y: 20 }}
            whileInView={isReducedMotion ? {} : { opacity: 1, y: 0 }}
            transition={isReducedMotion ? {} : { duration: 0.5, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.3 }}
            whileHover={isReducedMotion ? {} : { y: isExpanded ? 0 : -4 }}
            onClick={handleClick}
            {...props}
        >
            {/* Close Button - only show when expanded */}
            {isExpanded && onClose && (
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onClose();
                    }}
                    className="absolute top-4 right-4 z-50 w-10 h-10 rounded-full bg-black/20 hover:bg-black/40 backdrop-blur-sm border border-white/20 transition-all duration-200 flex items-center justify-center group"
                >
                    <span className="text-white text-xl leading-none group-hover:scale-110 transition-transform">×</span>
                </button>
            )}

            {/* Background Content */}
            <div className={cn(
                "relative flex-1 overflow-hidden",
                isExpanded && "opacity-30" // Reduce background opacity when expanded
            )}>
                {background}
            </div>

            {/* Content Section */}
            <div className="relative p-6">
                {/* Main Content - Always Visible */}
                <div className={cn(
                    "flex flex-col gap-3 transition-all duration-300",
                    !isReducedMotion && !isExpanded && "lg:group-hover:-translate-y-2"
                )}>
                    {icon && (
                        <div className={cn(
                            "w-12 h-12 flex items-center justify-center text-neutral-700 dark:text-neutral-300 transition-all duration-300",
                            !isReducedMotion && !isExpanded && "group-hover:scale-90"
                        )}>
                            {icon}
                        </div>
                    )}
                    <h3 className={cn(
                        "font-semibold text-neutral-800 dark:text-white",
                        isExpanded ? "text-3xl lg:text-4xl" : "text-xl"
                    )}>
                        {name}
                    </h3>
                    <p className={cn(
                        "text-neutral-600 dark:text-neutral-400 leading-relaxed",
                        isExpanded ? "text-lg max-w-3xl" : "text-sm"
                    )}>
                        {description}
                    </p>
                </div>

                {/* Expanded Content Placeholder */}
                {isExpanded && (
                    <div className="mt-8 space-y-6">
                        {/* This is where expanded content would go */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            <div className="lg:col-span-2">
                                <h4 className="text-lg font-semibold text-neutral-800 dark:text-white mb-4">
                                    Additional Details
                                </h4>
                                <div className="h-32 bg-neutral-100/50 dark:bg-white/5 rounded-lg border border-neutral-200 dark:border-white/10 flex items-center justify-center">
                                    <span className="text-neutral-500 dark:text-neutral-400 text-sm">
                                        Expanded content area
                                    </span>
                                </div>
                            </div>
                            <div>
                                <h4 className="text-lg font-semibold text-neutral-800 dark:text-white mb-4">
                                    Stats
                                </h4>
                                <div className="h-32 bg-neutral-100/50 dark:bg-white/5 rounded-lg border border-neutral-200 dark:border-white/10 flex items-center justify-center">
                                    <span className="text-neutral-500 dark:text-neutral-400 text-sm">
                                        Metrics area
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* CTA Button - Slide up on hover (only for non-expanded cards) */}
                {href && !isExpanded && (
                    <div className={cn(
                        "absolute bottom-0 left-0 right-0 p-6 transition-all duration-300",
                        !isReducedMotion ? "transform translate-y-full opacity-0 lg:group-hover:translate-y-0 lg:group-hover:opacity-100" : "mt-4 relative",
                        // Mobile: always visible, Desktop: slide up on hover
                        "lg:opacity-0 opacity-100 lg:translate-y-full translate-y-0"
                    )}>
                        <MagicButton
                            title={cta}
                            icon={<span className="text-sm">→</span>}
                            position="right"
                            handleClick={() => {
                                if (href.startsWith('#')) {
                                    const element = document.getElementById(href.substring(1));
                                    element?.scrollIntoView({ behavior: 'smooth' });
                                } else {
                                    window.open(href, '_blank');
                                }
                            }}
                            otherClasses="w-full justify-center text-sm"
                        />
                    </div>
                )}
            </div>

            {/* Hover Overlay (only for non-expanded cards) */}
            {!isReducedMotion && !isExpanded && (
                <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none" />
            )}
        </MotionDiv>
    );
}