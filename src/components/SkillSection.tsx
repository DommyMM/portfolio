"use client";

import { useState } from "react";
import { AnimatedCard } from "@/components/ui/AnimatedCard";
import { motion } from "motion/react";

const skillsData = [
    {
        title: "Frontend Development",
        description: "Modern web interfaces & user experiences",
        skills: ["React/Next.js", "TypeScript", "Tailwind CSS", "Svelte", "Web Speech API"]
    },
    {
        title: "Backend Systems", 
        description: "APIs, databases & server architecture",
        skills: ["FastAPI", "Node.js/Express", "Go/Gin", "REST APIs", "JWT Auth"]
    },
    {
        title: "AI/ML Engineering",
        description: "Machine learning & intelligent systems", 
        skills: ["PyTorch", "Computer Vision", "RAG Architecture", "Multi-Model Systems", "OpenAI APIs"]
    },
    {
        title: "Infrastructure",
        description: "Deployment, databases & development tools",
        skills: ["PostgreSQL/MongoDB", "Docker", "Vercel/Railway", "Git/CI-CD", "AWS"]
    }
];

export default function SkillsSection() {
    const [viewMode, setViewMode] = useState<'grid' | '3d'>('grid');

    return (
        <section id="skills" className="py-24 relative">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-semibold text-neutral-800 dark:text-white mb-4">
                    Skills & Technologies
                </h2>
                
                {/* View Toggle */}
                <div className="flex items-center justify-center gap-2 mb-8">
                    <button
                        onClick={() => setViewMode('grid')}
                        className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                            viewMode === 'grid' 
                                ? 'bg-blue-500 text-white shadow-lg' 
                                : 'bg-neutral-200 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-300 dark:hover:bg-neutral-700'
                        }`}
                    >
                        📋 Grid View
                    </button>
                    <button
                        onClick={() => setViewMode('3d')}
                        className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                            viewMode === '3d' 
                                ? 'bg-blue-500 text-white shadow-lg' 
                                : 'bg-neutral-200 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-300 dark:hover:bg-neutral-700'
                        }`}
                    >
                        🎮 3D View
                    </button>
                </div>
            </div>

            <motion.div
                key={viewMode}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-6xl mx-auto px-4"
            >
                {viewMode === 'grid' ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {skillsData.map((category, index) => (
                            <motion.div
                                key={category.title}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                            >
                                <AnimatedCard
                                    title={category.title}
                                    description={category.description}
                                    className="p-6 h-40 flex flex-col justify-center"
                                >
                                    <div className="space-y-2">
                                        {category.skills.map((skill, skillIndex) => (
                                            <motion.div
                                                key={skill}
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ 
                                                    duration: 0.4, 
                                                    delay: (index * 0.1) + (skillIndex * 0.05) + 0.2 
                                                }}
                                                className="flex items-center space-x-2 text-sm text-neutral-700 dark:text-neutral-300"
                                            >
                                                <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                                                <span>{skill}</span>
                                            </motion.div>
                                        ))}
                                    </div>
                                </AnimatedCard>
                            </motion.div>
                        ))}
                    </div>
                ) : (
                    <div className="h-[600px] bg-neutral-100 dark:bg-white/5 rounded-lg border border-neutral-200 dark:border-white/10 flex items-center justify-center text-neutral-500 dark:text-white/40">
                        <div className="text-center">
                            <div className="text-6xl mb-4">🚧</div>
                            <h3 className="text-xl font-semibold mb-2">3D Marquee View</h3>
                            <p>Coming soon... (3D skills marquee will go here)</p>
                        </div>
                    </div>
                )}
            </motion.div>
        </section>
    );
}