"use client";

import { motion, Variants, MotionProps } from "motion/react";
import { cn } from "@/lib/utils";
import { ElementType } from "react";
import React from "react";

interface FlipTextProps extends MotionProps {
    /** The duration of the animation */
    duration?: number;
    /** The delay between each character */
    delayMultiple?: number;
    /** The class name of the component */
    className?: string;
    /** The element type of the component */
    as?: ElementType;
    /** The children of the component */
    children: React.ReactNode;
    /** The variants of the animation */
    variants?: Variants;
    /** Whether to trigger the animation */
    trigger?: boolean;
}

const defaultVariants: Variants = {
    hidden: { rotateX: -90, opacity: 0 },
    visible: { rotateX: 0, opacity: 1 },
    exit: { rotateX: 90, opacity: 0 },
};

export function FlipText({
    children,
    duration = 0.3,
    delayMultiple = 0.05,
    className,
    as: Component = "span",
    variants,
    trigger = true,
    ...props
}: FlipTextProps) {
    const MotionComponent = motion.create(Component);
    const characters = React.Children.toArray(children).join("").split("");

    return (
        <div className="flex justify-center">
        {characters.map((char, i) => (
            <MotionComponent
            key={`${char}-${i}`}
            initial="hidden"
            animate={trigger ? "visible" : "exit"}
            variants={variants || defaultVariants}
            transition={{ 
                duration, 
                delay: trigger ? i * delayMultiple : (characters.length - 1 - i) * delayMultiple // Reverse order on exit
            }}
            className={cn("origin-center drop-shadow-sm", className)}
            {...props}
            >
            {char === " " ? "\u00A0" : char}
            </MotionComponent>
        ))}
        </div>
    );
}