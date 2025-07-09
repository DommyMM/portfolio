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

// Skills data
const skillsData = [
    {
        title: "Programming Languages",
        skills: [
            { name: "Python", icon: "python" },
            { name: "TypeScript", icon: "typescript" },
            { name: "JavaScript", icon: "javascript" },
            { name: "Go", icon: "go" },
            { name: "Java", icon: "java" },
            { name: "C++", icon: "cplusplus" },
            { name: "SQL", icon: "postgresql" }
        ]
    },
    {
        title: "AI/ML Engineering",
        skills: [
            { name: "PyTorch", icon: "pytorch" },
            { name: "Computer Vision", icon: "opencv" },
            { name: "OpenAI APIs", icon: "openai" },
            { name: "TensorFlow", icon: "tensorflow" },
            { name: "Scikit-Learn", icon: "scikitlearn" },
            { name: "Jupyter", icon: "jupyter" },
            { name: "NumPy", icon: "numpy" },
            { name: "Pandas", icon: "pandas" }
        ]
    },
    {
        title: "Frontend Development",
        skills: [
            { name: "React", icon: "react" },
            { name: "Next.js", icon: "nextdotjs" },
            { name: "Tailwind CSS", icon: "tailwindcss" },
            { name: "Svelte", icon: "svelte" },
            { name: "HTML5", icon: "html5" },
            { name: "CSS3", icon: "css3" },
            { name: "Vite", icon: "vite" },
            { name: "Figma", icon: "figma" }
        ]
    },
    {
        title: "Backend & Infrastructure",
        skills: [
            { name: "FastAPI", icon: "fastapi" },
            { name: "Node.js", icon: "nodedotjs" },
            { name: "Express", icon: "express" },
            { name: "PostgreSQL", icon: "postgresql" },
            { name: "MongoDB", icon: "mongodb" },
            { name: "Docker", icon: "docker" },
            { name: "AWS", icon: "amazonaws" },
            { name: "Git", icon: "git" }
        ]
    }
];

// Main Skills Marquee Component (Default Export)
export default function SkillsMarquee() {
    return (
        <div className="w-full space-y-8 py-8">
            {skillsData.map((category, index) => (
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
    );
}