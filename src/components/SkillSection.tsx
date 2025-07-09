"use client";

import { motion } from "motion/react";
import SkillsMarquee from "@/components/ui/Marquee";

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
                <SkillsMarquee />
            </motion.div>
        </section>
    );
}