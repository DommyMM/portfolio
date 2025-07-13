"use client";

import { motion } from "motion/react";

interface AboutSectionProps {
    isReducedMotion?: boolean;
}

export default function AboutSection({ isReducedMotion = false }: AboutSectionProps) {
    return (
        <section id="about" className="py-24 relative">
            <div className="max-w-4xl mx-auto px-4">
                <motion.div 
                    className="text-center mb-4"
                    initial={isReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    whileInView={isReducedMotion ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
                    transition={isReducedMotion ? {} : { duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-3xl font-semibold text-neutral-800 dark:text-white">
                        About Me
                    </h2>
                </motion.div>

                <motion.div 
                    className="max-w-3xl mx-auto"
                    initial={isReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    whileInView={isReducedMotion ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
                    transition={isReducedMotion ? {} : { duration: 0.8, delay: 0.2 }}
                    viewport={{ once: true }}
                >
                    <div className="space-y-6 text-lg leading-relaxed">
                    <p className="text-neutral-700 dark:text-neutral-300">
                        I didn't start building to change the world. I built to stop being annoyed.
                    </p>

                    <p className="text-neutral-700 dark:text-neutral-300">
                        I got tired of manually inputting game stats, so I built a platform that scans images and calculates for you. 
                        Across five months and countless reworks, it has received 140,000+ page views.
                        Another issue that really irked me: machine translations of webnovels were still headache inducing, while humans took ages.
                        I built an AI system that achieves a 78% preference over baseline translations, only costing $0.004 per chapter.
                    </p>

                    <p className="text-neutral-700 dark:text-neutral-300">
                        Turns out my annoyances are pretty universal — these tools now serve 13,000+ users across 100 countries.
                        I primarily work full-stack for control and customization, while also integrating AI/ML for ease and efficiency (sometimes cost).
                        Currently, I'm exploring personalization algorithms as a Software Engineer Intern at Lumeno AI.
                    </p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
} 