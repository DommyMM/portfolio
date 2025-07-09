"use client";

import React, { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";
import { useMouse } from "@/hooks/useMouse";
import { createIconComponent } from "@/lib/icons";

// Base Marquee Component from Magic UI
interface MarqueeProps extends ComponentPropsWithoutRef<"div"> {
    /**
     * Optional CSS class name to apply custom styles
     */
    className?: string;
    /**
     * Whether to reverse the animation direction
     * @default false
     */
    reverse?: boolean;
    /**
     * Whether to pause the animation on hover
     * @default false
     */
    pauseOnHover?: boolean;
    /**
     * Content to be displayed in the marquee
     */
    children: React.ReactNode;
    /**
     * Whether to animate vertically instead of horizontally
     * @default false
     */
    vertical?: boolean;
    /**
     * Number of times to repeat the content
     * @default 4
     */
    repeat?: number;
}

export function Marquee({
    className,
    reverse = false,
    pauseOnHover = false,
    children,
    vertical = false,
    repeat = 4,
    ...props
}: MarqueeProps) {
    return (
        <div
            {...props}
            className={cn(
                "group flex overflow-hidden p-2 [--duration:40s] [--gap:1rem] [gap:var(--gap)]",
                {
                    "flex-row": !vertical,
                    "flex-col": vertical,
                },
                className,
            )}
        >
            {Array(repeat)
                .fill(0)
                .map((_, i) => (
                    <div
                        key={i}
                        className={cn("flex shrink-0 justify-around [gap:var(--gap)]", {
                            "animate-marquee flex-row": !vertical,
                            "animate-marquee-vertical flex-col": vertical,
                            "group-hover:[animation-play-state:paused]": pauseOnHover,
                            "[animation-direction:reverse]": reverse,
                        })}
                    >
                        {children}
                    </div>
                ))}
        </div>
    );
}

// Skill Chip - AnimatedCard logic + skill content
const SkillChip = ({
    name,
    icon,
    className,
}: {
    name: string;
    icon: string;
    className?: string;
}) => {
    const [mouse, parentRef] = useMouse();

    return (
        <div
            className={cn(
                "group relative transform-gpu overflow-hidden rounded-full bg-white/10 px-4 py-2 transition-transform hover:scale-105",
                className
            )}
            ref={parentRef}
        >
            {/* Contained gradient circle effect */}
            <div
                className={cn(
                    "absolute -translate-x-1/2 -translate-y-1/2 transform-gpu rounded-full transition-transform duration-500 group-hover:scale-[1.5] z-0",
                    mouse.elementX === null || mouse.elementY === null
                        ? "opacity-0"
                        : "opacity-100",
                )}
                style={{
                    maskImage: `radial-gradient(80px circle at center, white, transparent)`,
                    width: "160px",
                    height: "160px",
                    left: `${mouse.elementX}px`,
                    top: `${mouse.elementY}px`,
                    background: "linear-gradient(135deg, #3BC4F2, #7A69F9, #F26378, #F5833F)",
                }}
            />
            
            <div className="absolute inset-px rounded-full bg-neutral-100/80 dark:bg-neutral-900/80" />
            
            <div className="relative flex items-center space-x-2 px-2 py-1">
                <div className="w-4 h-4 flex items-center justify-center">
                    {createIconComponent(icon, { className: "w-4 h-4" })}
                </div>
                <span className="text-sm font-medium text-neutral-800 dark:text-neutral-300 whitespace-nowrap">
                    {name}
                </span>
            </div>
        </div>
    );
};

// Skills data type
export interface SkillCategory {
    title: string;
    skills: Array<{
        name: string;
        icon: string;
    }>;
}

interface SkillsMarqueeProps {
    skillsData: SkillCategory[];
}

// Main Skills Marquee Component (Default Export)
export default function SkillsMarquee({ skillsData }: SkillsMarqueeProps) {
    return (
        <div className="relative backdrop-blur-md bg-white/80 dark:bg-neutral-950/80 rounded-2xl border border-neutral-300 dark:border-neutral-800 shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] p-8">
            <div className="w-full space-y-8">
                {skillsData.map((category: SkillCategory, index: number) => (
                    <div key={category.title} className="space-y-4">
                        <h3 className="text-lg font-semibold text-neutral-800 dark:text-white text-center">
                            {category.title}
                        </h3>
                        
                        <Marquee
                            pauseOnHover
                            className="[--duration:30s]"
                            reverse={index % 2 === 1}
                        >
                            {category.skills.map((skill) => (
                                <SkillChip
                                    key={skill.name}
                                    name={skill.name}
                                    icon={skill.icon}
                                />
                            ))}
                        </Marquee>
                    </div>
                ))}
            </div>
        </div>
    );
}