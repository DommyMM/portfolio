"use client";

import { motion, AnimatePresence } from "motion/react";
import { useState, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface TooltipProps {
    children: ReactNode;
    content: string;
    className?: string;
    delay?: number;
    placement?: "top" | "bottom" | "left" | "right";
}

export function Tooltip({ 
    children, 
    content, 
    className,
    delay = 100,
    placement = "bottom"
}: TooltipProps) {
    const [isVisible, setIsVisible] = useState(false);

    const placementClasses = {
        top: "bottom-full mb-2 left-1/2 -translate-x-1/2",
        bottom: "top-full mt-2 left-1/2 -translate-x-1/2", 
        left: "right-full mr-2 top-1/2 -translate-y-1/2",
        right: "left-full ml-2 top-1/2 -translate-y-1/2"
    };

    const arrowClasses = {
        top: "top-full left-1/2 -translate-x-1/2 border-l-transparent border-r-transparent border-b-transparent border-t-gray-800 dark:border-t-gray-200",
        bottom: "bottom-full left-1/2 -translate-x-1/2 border-l-transparent border-r-transparent border-t-transparent border-b-gray-800 dark:border-b-gray-200",
        left: "left-full top-1/2 -translate-y-1/2 border-t-transparent border-b-transparent border-r-transparent border-l-gray-800 dark:border-l-gray-200",
        right: "right-full top-1/2 -translate-y-1/2 border-t-transparent border-b-transparent border-l-transparent border-r-gray-800 dark:border-r-gray-200"
    };

    let hoverTimeout: NodeJS.Timeout;

    const handleMouseEnter = () => {
        clearTimeout(hoverTimeout);
        hoverTimeout = setTimeout(() => {
            setIsVisible(true);
        }, delay);
    };

    const handleMouseLeave = () => {
        clearTimeout(hoverTimeout);
        setIsVisible(false);
    };

    return (
        <div 
            className={cn("relative inline-block", className)}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {children}
            
            <AnimatePresence>
                {isVisible && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ 
                            duration: 0.15,
                            ease: "easeOut"
                        }}
                        className={cn(
                            "absolute z-50 px-2 py-1 text-xs font-medium text-white bg-gray-800 dark:bg-gray-200 dark:text-gray-800 rounded shadow-lg whitespace-nowrap pointer-events-none",
                            placementClasses[placement]
                        )}
                    >
                        {content}
                        
                        {/* Tooltip arrow */}
                        <div 
                            className={cn(
                                "absolute w-0 h-0 border-4",
                                arrowClasses[placement]
                            )}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}