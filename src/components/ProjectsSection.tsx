"use client";

import { motion } from "motion/react";
import { useState } from "react";
import { createIconComponent } from "@/lib/icons";
import { cn } from "@/lib/utils";

// Simple project data for now
const projectsData = [
    {
        id: "wuwabuilds",
        name: "WuWaBuilds",
        description: "Gaming platform serving 9.3k users with 91k page views and 313% organic growth. Features complex game calculations, stat multipliers, and real-time build optimization.",
        className: "col-span-1 md:col-span-2 lg:col-span-2", // Hero project
        background: (
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-cyan-500/10" />
                <div className="absolute top-4 left-4 flex gap-2">
                    {createIconComponent("react", { className: "w-6 h-6 text-blue-500 opacity-60" })}
                    {createIconComponent("nextdotjs", { className: "w-6 h-6 text-white opacity-60" })}
                    {createIconComponent("mongodb", { className: "w-6 h-6 text-green-500 opacity-60" })}
                </div>
                <div className="absolute bottom-4 right-4 text-right">
                    <div className="text-2xl font-bold text-blue-400 opacity-80">9.3k</div>
                    <div className="text-xs text-neutral-400 opacity-60">Active Users</div>
                </div>
                <div className="absolute inset-0 opacity-40">
                    <div className="w-full h-full bg-gradient-to-br from-blue-500/5 to-purple-500/5 bg-[length:60px_60px] bg-[radial-gradient(circle_at_50%_50%,_theme(colors.indigo.500)_2px,_transparent_2px)]" />
                </div>
            </div>
        ),
    },
    {
        id: "rag-translation",
        name: "RAG Translation", 
        description: "Multi-phase AI system using DeepSeek, ChromaDB, and BGE-M3. Achieved $0.004/chapter processing cost with 84% term retrieval accuracy through semantic chunking.",
        className: "md:col-span-1 lg:col-span-1",
        background: (
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 via-emerald-500/10 to-teal-500/10" />
                <div className="absolute top-4 left-4 flex gap-2">
                    {createIconComponent("python", { className: "w-6 h-6 text-yellow-500 opacity-60" })}
                    {createIconComponent("openai", { className: "w-6 h-6 text-green-500 opacity-60" })}
                </div>
                <div className="absolute bottom-4 right-4 text-right">
                    <div className="text-xl font-bold text-green-400 opacity-80">84%</div>
                    <div className="text-xs text-neutral-400 opacity-60">Accuracy</div>
                </div>
                <div className="absolute inset-0 opacity-30 bg-gradient-to-br from-green-500/5 to-emerald-500/5" />
            </div>
        ),
    },
    {
        id: "voice-chatbot",
        name: "Voice Chatbot",
        description: "Multi-model AI platform with sub-second response times. Integrated 4 AI models (LLaMA, Qwen, Scout) with speech-to-text and real-time voice processing.",
        className: "md:col-span-1 lg:col-span-1",
        background: (
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-rose-500/10" />
                <div className="absolute top-4 left-4 flex gap-2">
                    {createIconComponent("fastapi", { className: "w-6 h-6 text-green-600 opacity-60" })}
                    {createIconComponent("nextdotjs", { className: "w-6 h-6 text-white opacity-60" })}
                </div>
                <div className="absolute bottom-4 right-4 text-right">
                    <div className="text-xl font-bold text-purple-400 opacity-80">&lt;1s</div>
                    <div className="text-xs text-neutral-400 opacity-60">Response</div>
                </div>
                <div className="absolute inset-0 opacity-40 bg-gradient-to-br from-purple-500/5 to-pink-500/5" />
            </div>
        ),
    },
    {
        id: "cv-api",
        name: "Computer Vision API",
        description: "Production OCR API processing 60+ requests/minute with 95% extraction accuracy. Built with FastAPI, PyTesseract, and OpenCV using dual-engine architecture.",
        className: "col-span-1 md:col-span-2 lg:col-span-2",
        background: (
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-red-500/10 to-pink-500/10" />
                <div className="absolute top-4 left-4 flex gap-2">
                    {createIconComponent("python", { className: "w-6 h-6 text-yellow-500 opacity-60" })}
                    {createIconComponent("fastapi", { className: "w-6 h-6 text-green-600 opacity-60" })}
                    {createIconComponent("opencv", { className: "w-6 h-6 text-red-500 opacity-60" })}
                </div>
                <div className="absolute bottom-4 right-4 text-right">
                    <div className="text-xl font-bold text-orange-400 opacity-80">95%</div>
                    <div className="text-xs text-neutral-400 opacity-60">Accuracy</div>
                </div>
                <div className="absolute inset-0 opacity-50 bg-gradient-to-br from-orange-500/4 to-red-500/4" />
            </div>
        ),
    },
    {
        id: "expresso",
        name: "Expresso Platform",
        description: "University mentorship platform built with collaborative CI/CD workflow. Features Go backend with fuzzy search, PostgreSQL optimization, and modern React frontend.",
        className: "md:col-span-1 lg:col-span-1",
        background: (
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-blue-500/10 to-indigo-500/10" />
                <div className="absolute top-4 left-4 flex gap-2">
                    {createIconComponent("go", { className: "w-6 h-6 text-cyan-500 opacity-60" })}
                    {createIconComponent("postgresql", { className: "w-6 h-6 text-blue-600 opacity-60" })}
                    {createIconComponent("react", { className: "w-6 h-6 text-blue-500 opacity-60" })}
                </div>
                <div className="absolute bottom-4 right-4 text-right">
                    <div className="text-lg font-bold text-cyan-400 opacity-80">UC Davis</div>
                    <div className="text-xs text-neutral-400 opacity-60">Students</div>
                </div>
                <div className="absolute inset-0 opacity-40 bg-gradient-to-br from-cyan-500/5 to-blue-500/5" />
            </div>
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