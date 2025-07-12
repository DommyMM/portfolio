"use client";

import { motion } from "motion/react";
import { useState } from "react";
import { BentoGrid, BentoCard } from "@/components/ui/Bento";
import { useHasHover } from "@/hooks/useResponsive";

// Project type definition
interface Project {
    id: string;
    name: string;
    description: string;
    className: string;
    background: React.ReactElement;
    keyPoints: string[];
    techStack: string[];
    liveUrl?: string;
    githubUrl?: string;
}

// Project data with our refined content
const projectsData: Project[] = [
    {
        id: "wuwabuilds",
        name: "WuWaBuilds",
        description: "Gaming platform with reverse-engineered calculations and leaderboards",
        className: "col-span-1 md:col-span-2 lg:col-span-3",
        background: (
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-cyan-500/10" />
        ),
        keyPoints: [
            "13K users, 313% organic growth (past 3 months)",
            "Real-time calculations & reverse-engineered formulas",
            "Leaderboards with multi-parameter queries and sorting"
        ],
        techStack: ["react", "typescript", "nextdotjs", "mongodb", "vercel"],
        liveUrl: "https://wuwabuilds.com",
        githubUrl: "https://github.com/DommyMM/wuwabuild"
    },
    {
        id: "rag-translation",
        name: "RAG Translation",
        description: "Cost-optimized AI translation pipeline",
        className: "col-span-1 md:col-span-1 lg:col-span-2",
        background: (
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 via-emerald-500/10 to-teal-500/10" />
        ),
        keyPoints: [
            "Multi-phase self-learning pipeline",
            "$0.004/chapter cost optimization",
            "84% preference over traditional LLMs",
        ],
        techStack: ["python", "openai", "rag", "fastapi"],
        githubUrl: "https://github.com/DommyMM/webnovel-translator"
    },
    {
        id: "cv-api",
        name: "OCR API",
        description: "Custom Computer Vision API",
        className: "col-span-1 md:col-span-1 lg:col-span-1",
        background: (
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-red-500/10 to-pink-500/10" />
        ),
        keyPoints: [
            "95% accuracy, 100+ req/min",
            "Fuzzy match for data integrity",
            "Parallel processing for faster results"
        ],
        techStack: ["fastapi", "opencv", "python", "docker"],
        githubUrl: "https://github.com/DommyMM/wuwa-ocr-api"
    },
    {
        id: "expresso",
        name: "Expresso",
        description: "University mentorship platform",
        className: "col-span-1 md:col-span-1 lg:col-span-1",
        background: (
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-blue-500/10 to-indigo-500/10" />
        ),
        keyPoints: [
            "CI/CD workflow with team",
            "Full-Stack Development",
            "Match (Spa → Space Exploration)"
        ],
        techStack: ["go", "postgresql", "nextdotjs", "tailwindcss"],
        liveUrl: "https://expressodavis.org",
        githubUrl: "https://github.com/DommyMM/ExpressoDavis"
    },
    {
        id: "voice-chatbot",
        name: "Voice Chatbot",
        description: "Multi-model AI with sub-second response",
        className: "col-span-1 md:col-span-2 lg:col-span-2",
        background: (
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-rose-500/10" />
        ),
        keyPoints: [
            "Sub-second response times",
            "4 AI models with side-by-side comparison",
            "Speech-to-text/text-to-speech pipeline"
        ],
        techStack: ["nextdotjs", "fastapi", "openai", "speechapi"],
        githubUrl: "https://github.com/DommyMM/not-gpt-but-still-wrapper"
    }
];

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
                    initial={isReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    whileInView={isReducedMotion ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
                    transition={isReducedMotion ? {} : { duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    Featured Projects
                </motion.h2>
                <motion.p 
                    className="text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto"
                    initial={isReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    whileInView={isReducedMotion ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
                    transition={isReducedMotion ? {} : { duration: 0.6, delay: 0.1 }}
                    viewport={{ once: true }}
                >
                    Production systems serving real users with measurable impact
                </motion.p>
            </div>

            <motion.div
                initial={isReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                whileInView={isReducedMotion ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
                transition={isReducedMotion ? {} : { duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                className="max-w-6xl mx-auto px-4"
                onMouseLeave={hasHover ? () => setHovered(null) : undefined}
            >
                {/* Bento Grid */}
                <BentoGrid>
                    {projectsData.map((project, index) => (
                        <div
                            key={project.id}
                            className={project.className}
                            onMouseEnter={hasHover ? () => setHovered(index) : undefined}
                            style={{
                                filter: hovered !== null && hovered !== index ? "blur(4px)" : "none",
                                transition: "filter 0.3s ease"
                            }}
                        >
                            <BentoCard
                                name={project.name}
                                background={project.background}
                                description={project.description}
                                keyPoints={project.keyPoints}
                                techStack={project.techStack}
                                liveUrl={project.liveUrl}
                                githubUrl={project.githubUrl}
                                isReducedMotion={isReducedMotion}
                                index={index}
                                className="w-full h-full"
                            />
                        </div>
                    ))}
                </BentoGrid>
            </motion.div>
        </section>
    );
}