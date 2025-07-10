"use client";

import { motion } from "motion/react";
import { useState } from "react";
import { cn } from "@/lib/utils";

// Simple project data for now
const projectsData = [
    {
        id: "wuwabuilds",
        name: "WuWaBuilds",
        description: "Gaming platform serving 13k users with 147k page views and 313% organic growth (3 months)",
        className: "col-span-1 md:col-span-2 lg:col-span-3",
        background: (
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-cyan-500/10" />
        ),
    },
    {
        id: "rag-translation",
        name: "RAG Translation", 
        description: "Multi-phase AI translation system using RAG and VectorDB",
        className: "col-span-1 md:col-span-1 lg:col-span-2",
        background: (
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 via-emerald-500/10 to-teal-500/10" />
        ),
    },
    {
        id: "cv-api",
        name: "Computer Vision",
        description: "Production OCR API with 95% extraction accuracy",
        className: "col-span-1 md:col-span-1 lg:col-span-1",
        background: (
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-red-500/10 to-pink-500/10" />
        ),
    },
    {
        id: "expresso",
        name: "Expresso",
        description: "University mentorship platform built with collaborative CI/CD workflow",
        className: "col-span-1 md:col-span-1 lg:col-span-1",
        background: (
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-blue-500/10 to-indigo-500/10" />
        ),
    },
    {
        id: "voice-chatbot",
        name: "Voice Chatbot",
        description: "Multi-model AI platform with sub-second response times",
        className: "col-span-1 md:col-span-1 lg:col-span-2",
        background: (
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-rose-500/10" />
        ),
    },
];

// Simple Project Card with Focus behavior
const ProjectCard = ({ 
    project, 
    index, 
    hovered, 
    setHovered,
    isReducedMotion 
}: {
    project: any;
    index: number;
    hovered: number | null;
    setHovered: React.Dispatch<React.SetStateAction<number | null>>;
    isReducedMotion: boolean;
}) => {
    return (
        <div
            onMouseEnter={() => setHovered(index)}
            onMouseLeave={() => setHovered(null)}
            className={cn(
                "relative overflow-hidden rounded-2xl h-60 md:h-80 w-full transition-all duration-300 ease-out cursor-pointer",
                // Glassmorphic styling
                "backdrop-blur-md bg-white/80 dark:bg-neutral-950/80 border border-neutral-300 dark:border-neutral-800",
                "shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]",
                // Focus Cards behavior
                hovered !== null && hovered !== index && "blur-sm scale-[0.98]",
                project.className
            )}
        >
            {/* Background */}
            {project.background}

            {/* Title overlay - always visible but subtle */}
            <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-xl md:text-2xl font-semibold text-white drop-shadow-lg">
                    {project.name}
                </h3>
            </div>

            {/* Description overlay - shows on hover */}
            <div
                className={cn(
                    "absolute inset-0 bg-black/50 flex items-center justify-center p-6 transition-opacity duration-300",
                    hovered === index ? "opacity-100" : "opacity-0"
                )}
            >
                <div className="text-center">
                    <h3 className="text-xl md:text-2xl font-semibold text-white mb-4">
                        {project.name}
                    </h3>
                    <p className="text-sm md:text-base text-neutral-200 leading-relaxed">
                        {project.description}
                    </p>
                </div>
            </div>
        </div>
    );
};

// Main Component
interface ProjectsSectionProps {
    isReducedMotion?: boolean;
}

export default function SimpleFocusProjectsSection({ isReducedMotion = false }: ProjectsSectionProps) {
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
                    A showcase of production systems, AI/ML pipelines, and full-stack applications
                </motion.p>
            </div>

            <motion.div
                initial={isReducedMotion ? {} : { opacity: 0, y: 30 }}
                whileInView={isReducedMotion ? {} : { opacity: 1, y: 0 }}
                transition={isReducedMotion ? {} : { duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                className="max-w-6xl mx-auto px-4"
            >
                {/* Simple Bento Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                    {projectsData.map((project, index) => (
                        <ProjectCard
                            key={project.id}
                            project={project}
                            index={index}
                            hovered={hovered}
                            setHovered={setHovered}
                            isReducedMotion={isReducedMotion}
                        />
                    ))}
                </div>
            </motion.div>
        </section>
    );
}