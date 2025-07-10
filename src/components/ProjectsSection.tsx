"use client";

import { motion } from "motion/react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useHasHover } from "@/hooks/useResponsive";
import { createIconComponent } from "@/lib/icons";
import LaunchIcon from '@mui/icons-material/Launch';
import GitHubIcon from '@mui/icons-material/GitHub';

// Project type definition
interface Project {
    id: string;
    name: string;
    tagline: string;
    className: string;
    background: React.ReactElement;
    keyMetrics: {
        primary: string;
        secondary: string;
        tertiary: string;
    };
    techStack: string[];
    liveUrl?: string;
    githubUrl?: string;
}

// Project data - focused on impact
const projectsData: Project[] = [
    {
        id: "wuwabuilds",
        name: "WuWaBuilds",
        tagline: "Gaming platform with reverse-engineered calculations and leaderboards",
        className: "col-span-1 md:col-span-2 lg:col-span-3",
        background: (
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-cyan-500/10" />
        ),
        keyMetrics: {
            primary: "13K Users",
            secondary: "7K Monthly Active", 
            tertiary: "313% Growth"
        },
        techStack: ["react", "typescript", "nextdotjs", "mongodb", "vercel"],
        liveUrl: "https://wuwabuilds.com",
        githubUrl: "https://github.com/DommyMM"
    },
    {
        id: "rag-translation",
        name: "RAG Translation",
        tagline: "Cost-optimized AI translation pipeline",
        className: "col-span-1 md:col-span-1 lg:col-span-2",
        background: (
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 via-emerald-500/10 to-teal-500/10" />
        ),
        keyMetrics: {
            primary: "$0.004/chapter",
            secondary: "84% Accuracy",
            tertiary: "100x Faster"
        },
        techStack: ["python", "openai", "huggingface", "fastapi", "docker"],
        githubUrl: "https://github.com/DommyMM"
    },
    {
        id: "cv-api",
        name: "OCR API",
        tagline: "Custom Computer Vision API with 95% accuracy",
        className: "col-span-1 md:col-span-1 lg:col-span-1",
        background: (
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-red-500/10 to-pink-500/10" />
        ),
        keyMetrics: {
            primary: "95% Accuracy",
            secondary: "100+ req/min",
            tertiary: "Custom Built"
        },
        techStack: ["fastapi", "opencv", "python", "docker"],
        githubUrl: "https://github.com/DommyMM"
    },
    {
        id: "expresso",
        name: "Expresso",
        tagline: "University mentorship platform",
        className: "col-span-1 md:col-span-1 lg:col-span-1",
        background: (
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-blue-500/10 to-indigo-500/10" />
        ),
        keyMetrics: {
            primary: "500+ Students",
            secondary: "Fuzzy Search",
            tertiary: "CI/CD Pipeline"
        },
        techStack: ["go", "postgresql", "nextdotjs", "tailwindcss"],
        liveUrl: "https://expressodavis.org",
        githubUrl: "https://github.com/DommyMM"
    },
    {
        id: "voice-chatbot",
        name: "Voice Chatbot",
        tagline: "Multi-model AI with sub-second response",
        className: "col-span-1 md:col-span-1 lg:col-span-2",
        background: (
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-rose-500/10" />
        ),
        keyMetrics: {
            primary: "<1s Response",
            secondary: "4 AI Models",
            tertiary: "Real-time Voice"
        },
        techStack: ["nextdotjs", "fastapi", "openai", "speechapi"],
        githubUrl: "https://github.com/DommyMM"
    },
];

// Project Card component
const ProjectCard = ({ 
    project, 
    index, 
    hovered, 
    setHovered,
    hasHover,
    isReducedMotion
}: {
    project: Project;
    index: number;
    hovered: number | null;
    setHovered: React.Dispatch<React.SetStateAction<number | null>>;
    hasHover: boolean;
    isReducedMotion: boolean;
}) => {
    const isHovered = hovered === index;
    const isOtherHovered = hovered !== null && hovered !== index;

    return (
        <motion.div
            onMouseEnter={hasHover ? () => setHovered(index) : undefined}
            onMouseLeave={hasHover ? () => setHovered(null) : undefined}
            className={cn(
                "relative overflow-hidden rounded-2xl h-60 md:h-80 w-full cursor-pointer",
                "backdrop-blur-md bg-white/80 dark:bg-neutral-950/80 border border-neutral-300 dark:border-neutral-800",
                "shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]",
                project.className
            )}
            initial={{ opacity: 0, y: 20 }}
            animate={{ 
                opacity: 1, 
                y: 0,
                filter: isOtherHovered ? "blur(4px)" : "blur(0px)",
                scale: isOtherHovered ? 0.98 : 1
            }}
            transition={{ 
                duration: isReducedMotion ? 0 : 0.3,
                ease: "easeOut",
                delay: isReducedMotion ? 0 : index * 0.1
            }}
            whileHover={isReducedMotion ? {} : { 
                y: -4,
                transition: { duration: 0.2 }
            }}
        >
            {/* Background */}
            {project.background}

            {/* Primary Metric Badge - Always Visible */}
            <motion.div 
                className="absolute top-4 right-4 px-3 py-1 bg-black/20 backdrop-blur-sm rounded-full border border-white/20"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ 
                    duration: isReducedMotion ? 0 : 0.4,
                    delay: isReducedMotion ? 0 : index * 0.1 + 0.2
                }}
            >
                <span className="text-white text-xs font-medium">
                    {project.keyMetrics.primary}
                </span>
            </motion.div>

            {/* Tech Stack Icons - Always Visible */}
            <motion.div 
                className="absolute bottom-4 right-4 flex gap-2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ 
                    duration: isReducedMotion ? 0 : 0.4,
                    delay: isReducedMotion ? 0 : index * 0.1 + 0.3
                }}
            >
                {project.techStack.slice(0, 4).map((tech, techIndex) => (
                    <div 
                        key={tech}
                        className="w-6 h-6 bg-black/20 backdrop-blur-sm rounded-full border border-white/20 flex items-center justify-center"
                        style={{ 
                            animationDelay: isReducedMotion ? '0ms' : `${techIndex * 50}ms` 
                        }}
                    >
                        {createIconComponent(tech, { className: "w-3 h-3" })}
                    </div>
                ))}
            </motion.div>

            {/* Project Name - Always Visible */}
            <motion.div 
                className="absolute bottom-4 left-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                    duration: isReducedMotion ? 0 : 0.5,
                    delay: isReducedMotion ? 0 : index * 0.1 + 0.2
                }}
            >
                <h3 className="text-xl md:text-2xl font-semibold text-white drop-shadow-lg">
                    {project.name}
                </h3>
            </motion.div>

            {/* Hover Content - Center Overlay */}
            <motion.div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: isHovered ? 1 : 0 }}
                transition={{ duration: isReducedMotion ? 0 : 0.3 }}
            >
                <motion.div 
                    className="text-center max-w-md"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ 
                        opacity: isHovered ? 1 : 0,
                        y: isHovered ? 0 : 20
                    }}
                    transition={{ 
                        duration: isReducedMotion ? 0 : 0.3,
                        delay: isReducedMotion ? 0 : 0.1
                    }}
                >
                    {/* Project Info */}
                    <h3 className="text-2xl font-bold text-white mb-2">
                        {project.name}
                    </h3>
                    <p className="text-neutral-200 text-sm mb-6">
                        {project.tagline}
                    </p>

                    {/* Key Metrics Grid */}
                    <div className="grid grid-cols-3 gap-4 mb-6">
                        <div className="text-center">
                            <div className="text-lg font-bold text-white">
                                {project.keyMetrics.primary}
                            </div>
                        </div>
                        <div className="text-center">
                            <div className="text-lg font-bold text-white">
                                {project.keyMetrics.secondary}
                            </div>
                        </div>
                        <div className="text-center">
                            <div className="text-lg font-bold text-white">
                                {project.keyMetrics.tertiary}
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3 justify-center">
                        {project.liveUrl && (
                            <motion.button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    window.open(project.liveUrl, '_blank');
                                }}
                                className="flex items-center gap-2 px-4 py-2 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-400/30 rounded-lg transition-all duration-200 text-blue-200"
                                whileHover={isReducedMotion ? {} : { scale: 1.05 }}
                                whileTap={isReducedMotion ? {} : { scale: 0.95 }}
                            >
                                <LaunchIcon className="w-4 h-4" />
                                <span className="text-sm font-medium">Live Demo</span>
                            </motion.button>
                        )}
                        {project.githubUrl && (
                            <motion.button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    window.open(project.githubUrl, '_blank');
                                }}
                                className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/30 rounded-lg transition-all duration-200 text-white"
                                whileHover={isReducedMotion ? {} : { scale: 1.05 }}
                                whileTap={isReducedMotion ? {} : { scale: 0.95 }}
                            >
                                <GitHubIcon className="w-4 h-4" />
                                <span className="text-sm font-medium">Code</span>
                            </motion.button>
                        )}
                    </div>
                </motion.div>
            </motion.div>
        </motion.div>
    );
};

// Main Component
interface ProjectsSectionProps {
    isReducedMotion?: boolean;
}

export default function ProjectsSection({ isReducedMotion = false }: ProjectsSectionProps) {
    const hasHover = useHasHover();
    const [hovered, setHovered] = useState<number | null>(null);

    return (
        <section id="projects" className="py-24 relative">
            <div className="text-center mb-12">
                <motion.h2 
                    className="text-3xl font-semibold text-neutral-800 dark:text-white mb-4"
                    initial={isReducedMotion ? {} : { opacity: 0, y: 20 }}
                    whileInView={isReducedMotion ? {} : { opacity: 1, y: 0 }}
                    transition={isReducedMotion ? {} : { duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    Featured Projects
                </motion.h2>
                <motion.p 
                    className="text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto"
                    initial={isReducedMotion ? {} : { opacity: 0, y: 20 }}
                    whileInView={isReducedMotion ? {} : { opacity: 1, y: 0 }}
                    transition={isReducedMotion ? {} : { duration: 0.6, delay: 0.1 }}
                    viewport={{ once: true }}
                >
                    Production systems serving real users with measurable impact
                </motion.p>
            </div>

            <motion.div
                initial={isReducedMotion ? {} : { opacity: 0, y: 30 }}
                whileInView={isReducedMotion ? {} : { opacity: 1, y: 0 }}
                transition={isReducedMotion ? {} : { duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                className="max-w-6xl mx-auto px-4"
            >
                {/* Bento Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                    {projectsData.map((project, index) => (
                        <ProjectCard
                            key={project.id}
                            project={project}
                            index={index}
                            hovered={hovered}
                            setHovered={setHovered}
                            hasHover={hasHover}
                            isReducedMotion={isReducedMotion}
                        />
                    ))}
                </div>
            </motion.div>
        </section>
    );
}