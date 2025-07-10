"use client";

import { motion } from "motion/react";
import { BentoGrid, BentoCard } from "@/components/ui/Bento";
import { createIconComponent } from "@/lib/icons";

// Real project data based on your resume
const projectsData = [
    {
        name: "WuWaBuilds",
        description: "Gaming platform serving 9.3k users with 91k page views and 313% organic growth. Features complex game calculations, stat multipliers, and real-time build optimization.",
        href: "https://wuwabuilds.com",
        cta: "View Live Site",
        className: "col-span-1 md:col-span-2 lg:col-span-2", // Hero project
        icon: createIconComponent("react", { className: "w-8 h-8" }),
        background: (
            <div className="absolute inset-0 overflow-hidden">
                {/* Gradient Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-cyan-500/10" />
                
                {/* Tech Stack Floating Elements */}
                <div className="absolute top-4 left-4 flex gap-2">
                    {createIconComponent("react", { className: "w-6 h-6 text-blue-500 opacity-60" })}
                    {createIconComponent("nextdotjs", { className: "w-6 h-6 text-white opacity-60" })}
                    {createIconComponent("mongodb", { className: "w-6 h-6 text-green-500 opacity-60" })}
                </div>
                
                {/* Metrics Display */}
                <div className="absolute bottom-4 right-4 text-right">
                    <div className="text-2xl font-bold text-blue-400 opacity-80">9.3k</div>
                    <div className="text-xs text-neutral-400 opacity-60">Active Users</div>
                </div>
                
                {/* Pattern Overlay */}
                <div className="absolute inset-0 opacity-40">
                    <div className="w-full h-full bg-gradient-to-br from-blue-500/5 to-purple-500/5 bg-[length:60px_60px] bg-[radial-gradient(circle_at_50%_50%,_theme(colors.indigo.500)_2px,_transparent_2px)]" />
                </div>
            </div>
        ),
    },
    {
        name: "RAG Translation", 
        description: "Multi-phase AI system using DeepSeek, ChromaDB, and BGE-M3. Achieved $0.004/chapter processing cost with 84% term retrieval accuracy through semantic chunking.",
        href: "https://github.com/DommyMM",
        cta: "View Code",
        className: "md:col-span-1 lg:col-span-1",
        icon: createIconComponent("openai", { className: "w-8 h-8" }),
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
        name: "Voice Chatbot",
        description: "Multi-model AI platform with sub-second response times. Integrated 4 AI models (LLaMA, Qwen, Scout) with speech-to-text and real-time voice processing.",
        href: "https://github.com/DommyMM",
        cta: "View Code", 
        className: "md:col-span-1 lg:col-span-1",
        icon: createIconComponent("fastapi", { className: "w-8 h-8" }),
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
        name: "Computer Vision Data Extraction API",
        description: "Production OCR API processing 60+ requests/minute with 95% extraction accuracy. Built with FastAPI, PyTesseract, and OpenCV using dual-engine architecture.",
        href: "https://github.com/DommyMM", 
        cta: "View Code",
        className: "col-span-1 md:col-span-2 lg:col-span-2",
        icon: createIconComponent("opencv", { className: "w-8 h-8" }),
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
        name: "Expresso Platform",
        description: "University mentorship platform built with collaborative CI/CD workflow. Features Go backend with fuzzy search, PostgreSQL optimization, and modern React frontend.",
        href: "https://www.expressodavis.org/",
        cta: "View Live",
        className: "md:col-span-1 lg:col-span-1",
        icon: createIconComponent("go", { className: "w-8 h-8" }),
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

interface ProjectsSectionProps {
    isReducedMotion?: boolean;
}

export default function ProjectsSection({ isReducedMotion = false }: ProjectsSectionProps) {
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
                    A showcase of production systems, AI/ML pipelines, and full-stack applications serving real users
                </motion.p>
            </div>

            <motion.div
                initial={isReducedMotion ? {} : { opacity: 0, y: 30 }}
                whileInView={isReducedMotion ? {} : { opacity: 1, y: 0 }}
                transition={isReducedMotion ? {} : { duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                className="max-w-6xl mx-auto px-4"
            >
                <BentoGrid>
                    {projectsData.map((project, index) => (
                        <BentoCard
                            key={project.name}
                            {...project}
                            isReducedMotion={isReducedMotion}
                        />
                    ))}
                </BentoGrid>
            </motion.div>
        </section>
    );
}