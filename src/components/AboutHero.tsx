"use client";

import { TextDecoder } from "@/components/ui/TextDecoder";
import { TextSlider } from "@/components/ui/TextSlider";
import { MagicButton } from "@/components/ui/Button";
import { TextGenerateEffect } from "@/components/ui/TextGenerate";
import { motion } from "motion/react";
import { TacetMark } from "./ui/TacetMark";

const specialties = [
    "AI/ML Pipelines",
    "Computer Vision",  
    "Databases",
    "Web Development",
    "API Programming",
    "Gacha Games"
];

export default function AboutHero() {
    return (
        <section className="min-h-screen flex flex-col items-center justify-center px-4 relative overflow-hidden">
            <div className="max-w-6xl text-center space-y-12 relative z-10">
                {/* Main Heading */}
                <div className="space-y-8 mb-4">
                    <h1 className="text-6xl md:text-9xl lg:text-[10rem] font-bold whitespace-nowrap leading-none select-none">
                        <TextDecoder text="Dominic Aung" />
                    </h1>
                    {/* Triangular Layout */}
                    <div className="flex flex-col items-center mt-12 space-y-6">
                        {/* Level 2 */}
                        <div className="text-3xl md:text-6xl lg:text-7xl text-gray-300 select-none">
                            <TextSlider 
                                roles={["Full-Stack Developer"]} 
                                startupOnly={true} 
                                className="text-3xl md:text-6xl lg:text-7xl text-gray-300"
                            />
                        </div>
                        
                        {/* Level 3: Cycling Specialties */}
                        <div className="flex items-center justify-center text-xl md:text-5xl lg:text-6xl text-gray-400 mb-2 select-none">
                            <TextSlider 
                                roles={specialties} 
                                className="text-xl md:text-5xl lg:text-6xl text-gray-400"
                            />
                        </div>
                        
                        {/* Level 4: Education */}
                        <TextGenerateEffect 
                            words="CS @ UC Davis" 
                            className="font-light mb-0 select-none" 
                            filter={true}
                            duration={1}
                        />
                    </div>
                </div>

                {/* Level 5: CTA Button with Animation */}
                <motion.div 
                    className="pt-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ 
                        duration: 0.8, 
                        delay: 1,
                        ease: [0.21, 1.11, 0.81, 0.99]
                    }}
                >
                    <MagicButton
                        title="View My Work"
                        icon={<span className="text-sm">→</span>}
                        position="right"
                        otherClasses="w-auto"
                    />
                </motion.div>
            </div>
        </section>
    );
}