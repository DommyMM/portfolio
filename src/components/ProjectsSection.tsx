"use client";

import { motion } from "motion/react";
import { BentoGrid, BentoCard } from "@/components/ui/Bento";
import { createIconComponent } from "@/lib/icons";

// Sample project data - replace with your actual projects
const projectsData = [
    {
        name: "WuWa Builds",
        description: "Comprehensive character build guide and database for Wuthering Waves with interactive stat calculators and team compositions.",
        href: "https://wuwabuilds.com",
        cta: "Visit Site",
        className: "md:col-span-2 lg:col-span-2",
        icon: createIconComponent("react", { className: "w-8 h-8" }),
        background: (
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-600/20 flex items-center justify-center">
                <div className="text-6xl opacity-30">🎮</div>
            </div>
        ),
    },
    {
        name: "AI Chat Assistant",
        description: "Full-stack chat application with AI integration, real-time messaging, and smart response generation.",
        href: "https://github.com/DommyMM",
        cta: "View Code",
        className: "md:col-span-1 lg:col-span-1",
        icon: createIconComponent("openai", { className: "w-8 h-8" }),
        background: (
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-blue-500/20 flex items-center justify-center">
                <div className="text-6xl opacity-30">🤖</div>
            </div>
        ),
    },
    {
        name: "Portfolio Website",
        description: "Modern, responsive portfolio built with Next.js, featuring dark mode, animations, and custom UI components.",
        href: "https://github.com/DommyMM",
        cta: "View Code",
        className: "md:col-span-1 lg:col-span-1",
        icon: createIconComponent("nextdotjs", { className: "w-8 h-8" }),
        background: (
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center">
                <div className="text-6xl opacity-30">💼</div>
            </div>
        ),
    },
    {
        name: "Computer Vision Project",
        description: "Machine learning project using OpenCV and Python for object detection and image processing with real-time analysis.",
        href: "https://github.com/DommyMM",
        cta: "View Code",
        className: "md:col-span-2 lg:col-span-2",
        icon: createIconComponent("opencv", { className: "w-8 h-8" }),
        background: (
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-red-500/20 flex items-center justify-center">
                <div className="text-6xl opacity-30">👁️</div>
            </div>
        ),
    },
];

interface ProjectsSectionProps {
    isReducedMotion?: boolean;
}

export default function ProjectsSection({ isReducedMotion = false }: ProjectsSectionProps) {
    return (
        <section id="projects" className="py-24">
            <div className="text-center mb-12">
                <motion.h2 
                    className="text-3xl font-semibold text-neutral-800 dark:text-white mb-4"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    Featured Projects
                </motion.h2>
                <motion.p 
                    className="text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    viewport={{ once: true }}
                >
                    A showcase of my recent work in web development, AI/ML, and software engineering
                </motion.p>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
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