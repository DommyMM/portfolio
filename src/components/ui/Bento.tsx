"use client";

import { ComponentPropsWithoutRef, ReactNode, useRef, forwardRef } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { createIconComponent } from "@/lib/icons";
import GitHubIcon from '@mui/icons-material/GitHub';
import GoesOutComesInUnderline from './Underline';
import { AnimatedBeam } from './AnimatedBeams';

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

// Helper component for tech nodes
const TechNode = forwardRef<
    HTMLDivElement,
    { className?: string; children?: React.ReactNode }
>(({ className, children }, ref) => {
    return (
        <div
            ref={ref}
            className={cn(
                "z-10 flex items-center justify-center rounded-full border border-white/30 bg-white/10 backdrop-blur-sm p-2 shadow-lg",
                className,
            )}
        >
            {children}
        </div>
    );
});

TechNode.displayName = "TechNode";

// Function to organize tech stack into architecture flow
function organizeTechStack(techStack: string[], projectId: string) {
    const techMap = {
        // Input sources (left)
        sources: [] as string[],
        // Central hub (middle) 
        hub: '' as string,
        // Output destinations (right)
        destinations: [] as string[]
    };

    switch (projectId) {
        case 'wuwabuilds':
            techMap.sources = ['react', 'typescript'];
            techMap.hub = 'nextdotjs';
            techMap.destinations = ['mongodb', 'vercel'];
            break;
        case 'rag-translation':
            techMap.sources = ['python'];
            techMap.hub = 'fastapi';
            techMap.destinations = ['openai', 'rag'];
            break;
        case 'cv-api':
            techMap.sources = ['opencv', 'python'];
            techMap.hub = 'fastapi';
            techMap.destinations = ['docker'];
            break;
        case 'expresso':
            techMap.sources = ['nextdotjs'];
            techMap.hub = 'go';
            techMap.destinations = ['postgresql', 'tailwindcss'];
            break;
        case 'voice-chatbot':
            techMap.sources = ['speechapi'];
            techMap.hub = 'fastapi';
            techMap.destinations = ['nextdotjs', 'openai'];
            break;
        default:
            // Fallback: split evenly
            const mid = Math.floor(techStack.length / 2);
            techMap.sources = techStack.slice(0, mid);
            techMap.hub = techStack[mid] || techStack[0];
            techMap.destinations = techStack.slice(mid + 1);
    }

    return techMap;
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
    const MotionDiv = isReducedMotion ? "div" : motion.div;
    
    // Refs for AnimatedBeam
    const containerRef = useRef<HTMLDivElement>(null);
    const hubRef = useRef<HTMLDivElement>(null);
    const sourceRefs = [
        useRef<HTMLDivElement>(null),
        useRef<HTMLDivElement>(null),
        useRef<HTMLDivElement>(null)
    ];
    const destinationRefs = [
        useRef<HTMLDivElement>(null),
        useRef<HTMLDivElement>(null),
        useRef<HTMLDivElement>(null)
    ];

    // Organize tech stack for project architecture
    const projectId = name.toLowerCase().replace(/\s+/g, '-');
    const { sources, hub, destinations } = organizeTechStack(techStack, projectId);
    
    return (
        <MotionDiv
            className={cn(
                "group relative flex flex-col justify-between overflow-hidden rounded-2xl cursor-pointer h-60 md:h-80",
                "backdrop-blur-md bg-white/80 dark:bg-neutral-950/80 border border-neutral-300 dark:border-neutral-800",
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

            {/* Architecture Diagram - Middle Center */}
            {techStack.length > 0 && (
                <motion.div 
                    ref={containerRef}
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-24 z-10"
                    initial={isReducedMotion ? {} : { opacity: 0, scale: 0.8 }}
                    animate={isReducedMotion ? {} : { opacity: 1, scale: 1 }}
                    transition={isReducedMotion ? {} : { 
                        duration: 0.4,
                        delay: index * 0.1 + 0.4
                    }}
                >
                    {/* Layout container */}
                    <div className="flex size-full flex-row items-center justify-between">
                        {/* Sources (Left Column) */}
                        <div className="flex flex-col justify-center gap-2">
                            {sources.slice(0, 3).map((tech, idx) => (
                                <TechNode key={tech} ref={sourceRefs[idx]} className="size-8">
                                    {createIconComponent(tech, { className: "w-4 h-4 drop-shadow-lg" })}
                                </TechNode>
                            ))}
                        </div>

                        {/* Central Hub */}
                        <div className="flex flex-col justify-center">
                            <TechNode ref={hubRef} className="size-12">
                                {createIconComponent(hub, { className: "w-6 h-6 drop-shadow-lg" })}
                            </TechNode>
                        </div>

                        {/* Destinations (Right Column) */}
                        <div className="flex flex-col justify-center gap-2">
                            {destinations.slice(0, 3).map((tech, idx) => (
                                <TechNode key={tech} ref={destinationRefs[idx]} className="size-8">
                                    {createIconComponent(tech, { className: "w-4 h-4 drop-shadow-lg" })}
                                </TechNode>
                            ))}
                        </div>
                    </div>

                    {/* Animated Beams */}
                    {!isReducedMotion && (
                        <>
                            {/* Sources → Hub */}
                            {sources.slice(0, 3).map((_, idx) => (
                                sourceRefs[idx].current && (
                                    <AnimatedBeam
                                        key={`source-${idx}`}
                                        containerRef={containerRef}
                                        fromRef={sourceRefs[idx]}
                                        toRef={hubRef}
                                        duration={3}
                                        delay={idx * 0.5}
                                        gradientStartColor="#3b82f6"
                                        gradientStopColor="#8b5cf6"
                                    />
                                )
                            ))}
                            
                            {/* Hub → Destinations */}
                            {destinations.slice(0, 3).map((_, idx) => (
                                destinationRefs[idx].current && (
                                    <AnimatedBeam
                                        key={`dest-${idx}`}
                                        containerRef={containerRef}
                                        fromRef={hubRef}
                                        toRef={destinationRefs[idx]}
                                        duration={3}
                                        delay={idx * 0.5 + 1.5}
                                        gradientStartColor="#8b5cf6"
                                        gradientStopColor="#06b6d4"
                                        reverse
                                    />
                                )
                            ))}
                        </>
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
                {liveUrl ? (
                    <GoesOutComesInUnderline 
                        className="text-xl md:text-2xl font-semibold text-blue-300 hover:text-blue-200 drop-shadow-lg transition-colors"
                        direction="right"
                        onClick={() => window.open(liveUrl, '_blank')}
                    >
                        {name}
                    </GoesOutComesInUnderline>
                ) : (
                    <h3 className="text-xl md:text-2xl font-semibold text-white drop-shadow-lg">
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