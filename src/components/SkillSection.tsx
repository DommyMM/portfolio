"use client";

import { motion } from "motion/react";
import SkillsMarquee, { SkillCategory } from "@/components/ui/Marquee";
import { createIconComponent } from "@/lib/icons";

// Skills data
const skillsData = [
    {
        title: "Programming Languages",
        skills: [
            { name: "Python", icon: "python" },
            { name: "TypeScript", icon: "typescript" },
            { name: "JavaScript", icon: "javascript" },
            { name: "Go", icon: "go" },
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
            { name: "OpenAI APIs", icon: "openai" },
            { name: "Transformers", icon: "huggingface" },
            { name: "RAG Architecture", icon: "rag" },
            { name: "Computer Vision", icon: "computervision" },
            { name: "OpenCV", icon: "opencv" },
            { name: "TensorFlow", icon: "tensorflow" },
            { name: "NumPy", icon: "numpy" }
        ]
    },
    {
        title: "Frontend Development",
        skills: [
            { name: "React", icon: "react" },
            { name: "Next.js", icon: "nextdotjs" },
            { name: "Tailwind CSS", icon: "tailwindcss" },
            { name: "Web Speech API", icon: "speechapi" },
            { name: "Svelte", icon: "svelte" },
            { name: "Vite", icon: "vite" },
            { name: "Figma", icon: "figma" },
            { name: "Vercel", icon: "vercel" }
        ]
    },
    {
        title: "Backend & Infrastructure",
        skills: [
            { name: "FastAPI", icon: "fastapi" },
            { name: "Node.js", icon: "nodedotjs" },
            { name: "CI/CD", icon: "cicd" },
            { name: "SEO", icon: "seo" },
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
    );
}

interface SkillsSectionProps {
    isReducedMotion?: boolean;
}

export default function SkillsSection({ isReducedMotion = false }: SkillsSectionProps) {
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
            </div>

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                className="max-w-6xl mx-auto px-4"
            >
                {/* Single unified glassmorphic container */}
                <div className="relative backdrop-blur-md bg-white/80 dark:bg-neutral-950/80 rounded-2xl border border-neutral-300 dark:border-neutral-800 shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] p-8 overflow-hidden">
                    {/* Skills Grid */}
                    <SimpleSkills skillsData={skillsData} />
                    
                    {/* Marquee Section */}
                    <motion.div 
                        className="mt-12"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        viewport={{ once: true }}
                    >
                        <SkillsMarquee skillsData={skillsData} isReducedMotion={isReducedMotion} />
                    </motion.div>
                    
                    {/* Left fade overlay */}
                    <div className="pointer-events-none absolute inset-y-0 left-0 w-1/6 bg-gradient-to-r from-white/80 dark:from-neutral-950/80 to-transparent rounded-l-2xl"></div>
                    
                    {/* Right fade overlay */}
                    <div className="pointer-events-none absolute inset-y-0 right-0 w-1/6 bg-gradient-to-l from-white/80 dark:from-neutral-950/80 to-transparent rounded-r-2xl"></div>
                </div>
            </motion.div>
        </section>
    );
}