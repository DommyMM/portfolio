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
    /**
     * Whether to disable animation for reduced motion preference
     * @default false
     */
    isReducedMotion?: boolean;
}

export function Marquee({
    className,
    reverse = false,
    pauseOnHover = false,
    children,
    vertical = false,
    repeat = 4,
    isReducedMotion = false,
    ...props
}: MarqueeProps) {
    // Use ref to access the container after mount
    const containerRef = React.useRef<HTMLDivElement>(null);

    // Pause animations when reduced motion is enabled
    React.useEffect(() => {
        if (!containerRef.current) return;
        
        const marqueeElements = containerRef.current.querySelectorAll('[data-marquee-item]');
        marqueeElements.forEach((el) => {
            (el as HTMLElement).style.animationPlayState = isReducedMotion ? 'paused' : 'running';
        });
    }, [isReducedMotion]);

    return (
        <div
            {...props}
            ref={containerRef}
            className={cn(
                "group flex flex-row p-2 [--gap:1rem] [gap:var(--gap)] select-none mb-0 overflow-hidden",
                className,
            )}
            style={{
                '--pause-on-hover': pauseOnHover ? 'paused' : 'running'
            } as React.CSSProperties}
            onMouseEnter={pauseOnHover && !isReducedMotion ? (e) => {
                const marqueeElements = e.currentTarget.querySelectorAll('[data-marquee-item]');
                marqueeElements.forEach((el) => {
                    (el as HTMLElement).style.animationPlayState = 'paused';
                });
            } : undefined}
            onMouseLeave={pauseOnHover && !isReducedMotion ? (e) => {
                const marqueeElements = e.currentTarget.querySelectorAll('[data-marquee-item]');
                marqueeElements.forEach((el) => {
                    (el as HTMLElement).style.animationPlayState = 'running';
                });
            } : undefined}
        >
            {Array(repeat)
                .fill(0)
                .map((_, i) => (
                    <div
                        key={i}
                        data-marquee-item
                        className={cn("flex shrink-0 justify-around [gap:var(--gap)]", {
                            "animate-marquee flex-row": !vertical,
                            "animate-marquee-vertical flex-col": vertical,
                        })}
                        style={{
                            animationDirection: reverse ? 'reverse' : 'normal',
                            animationPlayState: isReducedMotion ? 'paused' : 'running'
                        }}
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
                "group relative transform-gpu overflow-hidden rounded-full bg-white/10 px-4 py-2 transition-transform hover:scale-105 cursor-pointer select-none",
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
            
            <div className="relative flex items-center space-x-2 px-2 py-1 select-none">
                <div className="w-4 h-4 flex items-center justify-center">
                    {createIconComponent(icon, { className: "w-4 h-4" })}
                </div>
                <span className="text-sm font-medium text-neutral-800 dark:text-neutral-300 whitespace-nowrap select-none">
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
    isReducedMotion?: boolean;
}

// Main Skills Marquee Component
export default function SkillsMarquee({ skillsData, isReducedMotion = false }: SkillsMarqueeProps) {
    const reversePattern = [false, true, false, true];
    const durationPattern = [40, 40, 40, 40];
    
    // Flatten all skills from all categories
    const allSkills = skillsData.flatMap(category => category.skills);
    
    // Diagonal distribution: take every 4th skill starting from different offsets
    const skillRows = Array.from({ length: 4 }, (_, rowIndex) => {
        const rowSkills = [];
        for (let i = rowIndex; i < allSkills.length; i += 4) {
            rowSkills.push(allSkills[i]);
        }
        return rowSkills;
    });
    
    return (
        <div className="w-full space-y-8">
            {skillRows.map((rowSkills, index) => (
                <Marquee
                    key={index}
                    pauseOnHover
                    className={`[--duration:${durationPattern[index]}s]`}
                    reverse={reversePattern[index]}
                    isReducedMotion={isReducedMotion}
                >
                    {rowSkills.map((skill) => (
                        <SkillChip
                            key={`${skill.name}-${index}`}
                            name={skill.name}
                            icon={skill.icon}
                        />
                    ))}
                </Marquee>
            ))}
        </div>
    );
}