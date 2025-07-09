"use client";

import { motion } from "motion/react";
import SkillsMarquee from "@/components/ui/Marquee";

// Skills data
const skillsData = [
    {
        title: "Programming Languages",
        skills: [
            { name: "Python", icon: "python" },
            { name: "TypeScript", icon: "typescript" },
            { name: "JavaScript", icon: "javascript" },
            { name: "Go", icon: "go" },
            { name: "Java", icon: "java" },
            { name: "C++", icon: "cplusplus" },
            { name: "SQL", icon: "postgresql" }
        ]
    },
    {
        title: "AI/ML Engineering",
        skills: [
            { name: "PyTorch", icon: "pytorch" },
            { name: "Computer Vision", icon: "opencv" },
            { name: "OpenAI APIs", icon: "openai" },
            { name: "TensorFlow", icon: "tensorflow" },
            { name: "Jupyter", icon: "jupyter" },
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
            { name: "PostgreSQL", icon: "postgresql" },
            { name: "MongoDB", icon: "mongodb" },
            { name: "Docker", icon: "docker" },
            { name: "AWS", icon: "amazonaws" },
            { name: "Git", icon: "git" }
        ]
    }
];

export default function SkillsSection() {
    return (
        <section id="skills" className="py-24 relative">
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
                    className="text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    viewport={{ once: true }}
                >
                </motion.p>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                className="max-w-6xl mx-auto px-4"
            >
                <SkillsMarquee skillsData={skillsData} />
            </motion.div>
        </section>
    );
}