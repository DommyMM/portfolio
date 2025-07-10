"use client";

import { ComponentPropsWithoutRef, ReactNode } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { MagicButton } from "@/components/ui/Button";

interface BentoGridProps extends ComponentPropsWithoutRef<"div"> {
    children: ReactNode;
    className?: string;
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
    icon,
    description,
    href,
    cta = "Learn more",
    isReducedMotion = false,
    ...props
}: BentoCardProps) {
    const MotionDiv = isReducedMotion ? "div" : motion.div;
    
    return (
        <MotionDiv
            className={cn(
                "group relative flex flex-col justify-between overflow-hidden rounded-2xl cursor-pointer",
                // Glassmorphic styling to match your existing components
                "backdrop-blur-md bg-white/80 dark:bg-neutral-950/80 border border-neutral-300 dark:border-neutral-800",
                // Enhanced shadow system matching your ContactSection
                "shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]",
                className,
            )}
            initial={isReducedMotion ? {} : { opacity: 0, y: 20 }}
            whileInView={isReducedMotion ? {} : { opacity: 1, y: 0 }}
            transition={isReducedMotion ? {} : { duration: 0.5, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.3 }}
            whileHover={isReducedMotion ? {} : { y: -4 }}
            {...props}
        >
            {/* Background Content */}
            <div className="relative flex-1 overflow-hidden">
                {background}
            </div>

            {/* Content Section */}
            <div className="relative p-6">
                {/* Main Content - Always Visible */}
                <div className={cn(
                    "flex flex-col gap-3 transition-all duration-300",
                    !isReducedMotion && "lg:group-hover:-translate-y-2"
                )}>
                    {icon && (
                        <div className={cn(
                            "w-12 h-12 flex items-center justify-center text-neutral-700 dark:text-neutral-300 transition-all duration-300",
                            !isReducedMotion && "group-hover:scale-90"
                        )}>
                            {icon}
                        </div>
                    )}
                    <h3 className="text-xl font-semibold text-neutral-800 dark:text-white">
                        {name}
                    </h3>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                        {description}
                    </p>
                </div>

                {/* CTA Button - Slide up on hover */}
                {href && (
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

            {/* Hover Overlay */}
            {!isReducedMotion && (
                <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none" />
            )}
        </MotionDiv>
    );
}