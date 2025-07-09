"use client";

import { motion } from "motion/react";
import { useState } from "react";
import SkillsMarquee, { SkillCategory } from "@/components/ui/Marquee";
import { createIconComponent } from "@/lib/icons";

// Skills data
const skillsData = [
    {
        title: "Programming Languages",
        skills: [
            { name: "Python", icon: "python" },
            { name: "Go", icon: "go" },
            { name: "TypeScript", icon: "typescript" },
            { name: "JavaScript", icon: "javascript" },
            { name: "C++", icon: "cplusplus" },
            { name: "Java", icon: "java" },
            { name: "SQL", icon: "postgresql" },
            { name: "C", icon: "c" }
        ]
    },
    {
        title: "AI/ML Engineering",
        skills: [
            { name: "PyTorch", icon: "pytorch" },
            { name: "Computer Vision", icon: "computervision" },
            { name: "OpenAI APIs", icon: "openai" },
            { name: "TensorFlow", icon: "tensorflow" },
            { name: "OpenCV", icon: "opencv" },
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
            { name: "HTML", icon: "html5" },
            { name: "CSS", icon: "css3" },
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
            { name: "Vercel", icon: "vercel" },
            { name: "MongoDB", icon: "mongodb" },
            { name: "Docker", icon: "docker" },
            { name: "AWS", icon: "amazonaws" },
            { name: "Git", icon: "git" }
        ]
    }
];


// Skills Grid Component
function SimpleSkills({ skillsData }: { skillsData: SkillCategory[] }) {
    return (
        <div className="relative backdrop-blur-md bg-white/80 dark:bg-neutral-950/80 rounded-2xl border border-neutral-300 dark:border-neutral-800 shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {skillsData.map((category, categoryIndex) => (
                    <motion.div
                        key={category.title}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
                        viewport={{ once: true }}
                        className="space-y-4"
                    >
                        <h3 className="text-lg font-semibold text-neutral-800 dark:text-white mb-4 border-b border-neutral-200 dark:border-neutral-700 pb-2">
                            {category.title}
                        </h3>
                        <div className="grid grid-cols-2 gap-3">
                            {category.skills.map((skill, skillIndex) => (
                                <motion.div
                                    key={skill.name}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ 
                                        duration: 0.4, 
                                        delay: categoryIndex * 0.1 + skillIndex * 0.05 
                                    }}
                                    viewport={{ once: true }}
                                    className="flex items-center space-x-3 p-3 rounded-lg bg-neutral-100/50 dark:bg-white/5 hover:bg-neutral-200/50 dark:hover:bg-white/10 transition-colors duration-200"
                                >
                                    <div className="w-5 h-5 flex items-center justify-center">
                                        {createIconComponent(skill.icon, { className: "w-5 h-5" })}
                                    </div>
                                    <span className="text-sm font-medium text-neutral-800 dark:text-neutral-300">
                                        {skill.name}
                                    </span>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}

export default function SkillsSection() {
    const [viewMode, setViewMode] = useState<'marquee' | 'grid'>('marquee');

    return (
        <section id="skills" className="py-24">
            <div className="text-center mb-12">
                <motion.h2 
                    className="text-3xl font-semibold text-neutral-800 dark:text-white mb-4"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    Skills & Technologies
                </motion.h2>
                <motion.p 
                    className="text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    viewport={{ once: true }}
                >
                    Explore my technical expertise across multiple domains
                </motion.p>

                {/* Toggle Buttons */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="flex justify-center space-x-2 mb-8"
                >
                    <button
                        onClick={() => setViewMode('marquee')}
                        className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                            viewMode === 'marquee'
                                ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/25'
                                : 'bg-neutral-200/50 dark:bg-white/10 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-300/50 dark:hover:bg-white/20'
                        }`}
                    >
                        Marquee
                    </button>
                    <button
                        onClick={() => setViewMode('grid')}
                        className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                            viewMode === 'grid'
                                ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/25'
                                : 'bg-neutral-200/50 dark:bg-white/10 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-300/50 dark:hover:bg-white/20'
                        }`}
                    >
                        Simple
                    </button>
                </motion.div>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                viewport={{ once: true }}
                className="max-w-6xl mx-auto px-4"
            >
                {viewMode === 'marquee' ? (
                    <SkillsMarquee skillsData={skillsData} />
                ) : (
                    <SimpleSkills skillsData={skillsData} />
                )}
            </motion.div>
        </section>
    );
}