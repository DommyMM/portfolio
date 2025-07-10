"use client";

import { motion } from "motion/react";
import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { useHasHover } from "@/hooks/useResponsive";
import ExpandedCard from "@/components/ui/ExpandedCard";

// Project type definition
interface Project {
    id: string;
    name: string;
    description: string;
    className: string;
    background: React.ReactElement;
    longDescription: string;
    techStack: string[];
    metrics: {
        [key: string]: string;
    };
    features: string[];
}

// Project data with enhanced info for expanded view
const projectsData: Project[] = [
    {
        id: "wuwabuilds",
        name: "WuWaBuilds",
        description: "Gaming platform serving 13k users with 147k page views and 313% organic growth (3 months)",
        className: "col-span-1 md:col-span-2 lg:col-span-3",
        background: (
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-cyan-500/10" />
        ),
        // Enhanced data for expanded view
        longDescription: "A comprehensive gaming platform for Wuthering Waves character builds, serving over 13,000 users with complex game calculations, real-time stat optimization, and mobile-responsive design.",
        techStack: ["React", "TypeScript", "Next.js", "MongoDB", "Vercel"],
        metrics: {
            users: "13K+",
            pageViews: "147K+",
            growth: "313%",
            uptime: "99.9%"
        },
        features: [
            "Real-time damage calculations",
            "Drag-and-drop build management", 
            "Element-themed image generation",
            "Mobile-responsive design"
        ]
    },
    {
        id: "rag-translation",
        name: "RAG Translation", 
        description: "Multi-phase AI translation system using RAG and VectorDB",
        className: "col-span-1 md:col-span-1 lg:col-span-2",
        background: (
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 via-emerald-500/10 to-teal-500/10" />
        ),
        longDescription: "Cost-optimized AI translation pipeline using RAG architecture with ChromaDB for context preservation and DeepSeek for processing, achieving 84% accuracy improvement.",
        techStack: ["Python", "DeepSeek", "ChromaDB", "BGE-M3", "AsyncIO"],
        metrics: {
            cost: "$0.004/chapter",
            accuracy: "84%", 
            speedUp: "100x",
            models: "4"
        },
        features: [
            "Multi-phase self-learning pipeline",
            "Semantic chunking system",
            "Incremental learning with vector upserts",
            "Real-time progress tracking"
        ]
    },
    {
        id: "cv-api",
        name: "Computer Vision",
        description: "Production OCR API with 95% extraction accuracy",
        className: "col-span-1 md:col-span-1 lg:col-span-1",
        background: (
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-red-500/10 to-pink-500/10" />
        ),
        longDescription: "High-performance OCR API processing 60+ requests per minute with 95% extraction accuracy using computer vision and machine learning techniques.",
        techStack: ["FastAPI", "PyTesseract", "OpenCV", "SIFT", "Python"],
        metrics: {
            accuracy: "95%",
            throughput: "60+ req/min",
            latency: "<200ms",
            uptime: "99.8%"
        },
        features: [
            "Dual-engine OCR system",
            "Fuzzy matching algorithms",
            "Asynchronous processing",
            "Automated error correction"
        ]
    },
    {
        id: "expresso",
        name: "Expresso",
        description: "University mentorship platform built with collaborative CI/CD workflow",
        className: "col-span-1 md:col-span-1 lg:col-span-1",
        background: (
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-blue-500/10 to-indigo-500/10" />
        ),
        longDescription: "University mentorship platform connecting students with mentors, built using modern development practices and collaborative workflows.",
        techStack: ["Go", "PostgreSQL", "Next.js", "Tailwind", "Supabase"],
        metrics: {
            students: "500+",
            mentors: "50+",
            matches: "200+",
            satisfaction: "4.8/5"
        },
        features: [
            "Fuzzy search algorithm",
            "Real-time matching system",
            "CI/CD with GitHub Actions",
            "Domain-driven design"
        ]
    },
    {
        id: "voice-chatbot",
        name: "Voice Chatbot",
        description: "Multi-model AI platform with sub-second response times",
        className: "col-span-1 md:col-span-1 lg:col-span-2",
        background: (
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-rose-500/10" />
        ),
        longDescription: "Advanced voice-enabled chatbot platform integrating multiple AI models with streaming architecture for real-time conversations.",
        techStack: ["Next.js", "FastAPI", "Cerebras", "Web Speech API", "Python"],
        metrics: {
            responseTime: "<1s",
            models: "4",
            languages: "10+",
            accuracy: "96%"
        },
        features: [
            "Multi-model AI integration",
            "Speech-to-text pipeline",
            "Real-time streaming",
            "Voice selection system"
        ]
    },
];

// Project Card component with click handling
const ProjectCard = ({ 
    project, 
    index, 
    hovered, 
    setHovered,
    hasHover,
    isReducedMotion,
    expandedCard,
    setExpandedCard
}: {
    project: Project;
    index: number;
    hovered: number | null;
    setHovered: React.Dispatch<React.SetStateAction<number | null>>;
    hasHover: boolean;
    isReducedMotion: boolean;
    expandedCard: string | null;
    setExpandedCard: React.Dispatch<React.SetStateAction<string | null>>;
}) => {
    const isExpanded = expandedCard === project.id;
    const isOtherExpanded = expandedCard !== null && expandedCard !== project.id;

    const handleClick = () => {
        if (isExpanded) {
            setExpandedCard(null); // Close if already expanded
        } else {
            setExpandedCard(project.id); // Expand this card
        }
    };

    // Hide non-expanded cards when something is expanded
    if (isOtherExpanded) {
        return null;
    }

    // Render expanded card
    if (isExpanded) {
        return (
            <ExpandedCard 
                project={project}
                onClose={() => setExpandedCard(null)}
                isReducedMotion={isReducedMotion}
            />
        );
    }

    // Normal card
    return (
        <div
            onMouseEnter={hasHover ? () => setHovered(index) : undefined}
            onMouseLeave={hasHover ? () => setHovered(null) : undefined}
            onClick={handleClick}
            className={cn(
                "relative overflow-hidden rounded-2xl h-60 md:h-80 w-full transition-all duration-300 ease-out cursor-pointer",
                "backdrop-blur-md bg-white/80 dark:bg-neutral-950/80 border border-neutral-300 dark:border-neutral-800",
                "shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]",
                hasHover && hovered !== null && hovered !== index && "blur-sm scale-[0.98]",
                project.className
            )}
        >
            {/* Background */}
            {project.background}

            {/* Title overlay - always visible */}
            <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-xl md:text-2xl font-semibold text-white drop-shadow-lg">
                    {project.name}
                </h3>
            </div>

            {/* Description overlay - show on hover if hasHover */}
            <div
                className={cn(
                    "absolute inset-0 bg-black/50 flex items-center justify-center p-6 transition-opacity duration-300",
                    hasHover 
                        ? (hovered === index ? "opacity-100" : "opacity-0")
                        : "opacity-0"
                )}
            >
                <div className="text-center">
                    <h3 className="text-xl md:text-2xl font-semibold text-white mb-4">
                        {project.name}
                    </h3>
                    <p className="text-sm md:text-base text-neutral-200 leading-relaxed mb-4">
                        {project.description}
                    </p>
                    <p className="text-xs text-neutral-300">
                        Click to expand
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

export default function ProjectsSection({ isReducedMotion = false }: ProjectsSectionProps) {
    const hasHover = useHasHover();
    const [hovered, setHovered] = useState<number | null>(null);
    const [expandedCard, setExpandedCard] = useState<string | null>(null);

    // Close expanded card on ESC key
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && expandedCard) {
                setExpandedCard(null);
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [expandedCard]);

    // Click outside to close
    const handleOverlayClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget && expandedCard) {
            setExpandedCard(null);
        }
    };

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
                onClick={handleOverlayClick}
            >
                {/* Bento Grid */}
                <div className={cn(
                    "grid gap-4 md:gap-6",
                    expandedCard 
                        ? "grid-cols-1" // Full width when expanded
                        : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" // Normal grid
                )}>
                    {projectsData.map((project, index) => (
                        <ProjectCard
                            key={project.id}
                            project={project}
                            index={index}
                            hovered={hovered}
                            setHovered={setHovered}
                            hasHover={hasHover}
                            isReducedMotion={isReducedMotion}
                            expandedCard={expandedCard}
                            setExpandedCard={setExpandedCard}
                        />
                    ))}
                </div>
            </motion.div>
        </section>
    );
}