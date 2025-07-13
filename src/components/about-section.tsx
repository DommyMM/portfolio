"use client";

import { motion } from "motion/react";
import { LinkPreview } from "@/components/ui/link-preview";

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

                <div className="max-w-3xl mx-auto">
                    <div className="space-y-6 text-lg leading-relaxed">
                        {/* Paragraph 1 */}
                        <motion.p 
                            className="text-neutral-700 dark:text-neutral-300"
                            initial={isReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                            whileInView={isReducedMotion ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
                            transition={isReducedMotion ? {} : { 
                                duration: 0.6, 
                                delay: 0.2,
                                ease: "easeOut"
                            }}
                            viewport={{ once: true, amount: 0.3 }}
                        >
                            I started building to reduce things that <span className="font-semibold">annoy me</span>.
                        </motion.p>

                        {/* Paragraph 2 */}
                        <motion.div 
                            className="text-neutral-700 dark:text-neutral-300"
                            initial={isReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                            whileInView={isReducedMotion ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
                            transition={isReducedMotion ? {} : { 
                                duration: 0.6, 
                                delay: 0.4,
                                ease: "easeOut"
                            }}
                            viewport={{ once: true, amount: 0.3 }}
                        >
                            I got tired of manually inputting game stats, so I built a platform that scans images and calculates for you.
                            It started off pretty simple, but now it has <motion.span
                                initial={isReducedMotion ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                                whileInView={isReducedMotion ? { opacity: 1, x: 0 } : { opacity: 1, x: 0 }}
                                transition={isReducedMotion ? {} : { 
                                    duration: 0.4, 
                                    delay: 0.7,
                                    ease: "easeOut"
                                }}
                                viewport={{ once: true, amount: 0.3 }}
                                className="inline-block"
                            ><LinkPreview url="#" isStatic={true} imageSrc="/wuwabuilds-views.png" width={400} height={300} className="inline-block"><span className="font-semibold">150,000+ views</span></LinkPreview></motion.span> and counting. 
                            Another issue that really irked me: machine translations of webnovels were still headache inducing, while humans took ages.
                            I built an AI system with RAG that produces output comparable to professional translations, only costing <motion.span
                                initial={isReducedMotion ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                                whileInView={isReducedMotion ? { opacity: 1, x: 0 } : { opacity: 1, x: 0 }}
                                transition={isReducedMotion ? {} : { 
                                    duration: 0.4, 
                                    delay: 0.8,
                                    ease: "easeOut"
                                }}
                                viewport={{ once: true, amount: 0.3 }}
                                className="inline-block"
                            ><LinkPreview url="#" isStatic={true} imageSrc="/translation-cost.png" width={400} height={300} className="inline-block"><span className="font-semibold">$0.004 per chapter</span></LinkPreview></motion.span>.
                        </motion.div>

                        {/* Paragraph 3 */}
                        <motion.div 
                            className="text-neutral-700 dark:text-neutral-300"
                            initial={isReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                            whileInView={isReducedMotion ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
                            transition={isReducedMotion ? {} : { 
                                duration: 0.6, 
                                delay: 0.6,
                                ease: "easeOut"
                            }}
                            viewport={{ once: true, amount: 0.3 }}
                        >
                            Turns out, my annoyances are pretty universal. These tools now serve <motion.span
                                initial={isReducedMotion ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                                whileInView={isReducedMotion ? { opacity: 1, x: 0 } : { opacity: 1, x: 0 }}
                                transition={isReducedMotion ? {} : { 
                                    duration: 0.4, 
                                    delay: 0.9,
                                    ease: "easeOut"
                                }}
                                viewport={{ once: true, amount: 0.3 }}
                                className="inline-block"
                            ><LinkPreview url="#" isStatic={true} imageSrc="/cloudflare.png" width={400} height={300} className="inline-block"><span className="font-semibold">tens of thousands</span></LinkPreview></motion.span> of users across 100+ countries.
                            This is where I learnt that true impact is not about changing the world, but rather solving problems that matter to people, even if it&apos;s just a niche few.
                        </motion.div>

                        {/* Paragraph 4 */}
                        <motion.div 
                            className="text-neutral-700 dark:text-neutral-300"
                            initial={isReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                            whileInView={isReducedMotion ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
                            transition={isReducedMotion ? {} : { 
                                duration: 0.6, 
                                delay: 0.8,
                                ease: "easeOut"
                            }}
                            viewport={{ once: true, amount: 0.3 }}
                        >
                            Across all the technology I&apos;ve worked with, I enjoy the control that full-stack provides — particularly with AI/ML integrations that offer even more efficiency and cost savings. 
                            I am currently exploring personalization algorithms as a Software Engineer Intern at <LinkPreview url="https://www.lumenoai.com/" className="font-semibold underline hover:text-blue-500 transition-colors">Lumeno AI</LinkPreview>.
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
} 