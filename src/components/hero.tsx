"use client";

import { TextDecoder } from "@/components/ui/text-decoder";
import { TextSlider } from "@/components/ui/text-slider";
import { MagicButton } from "@/components/ui/button";
import { TextGenerateEffect } from "@/components/ui/text-generate";
import { LinkPreview } from "@/components/ui/link-preview";
import ContactPageIcon from '@mui/icons-material/ContactPage';
import { motion } from "motion/react";

const specialties = [
    "Full-Stack Development",
    "AI/ML Pipelines",   
    "Computer Vision",
    "System Architecture",
    "API Engineering",
    "Gacha Games"
];

interface HeroSectionProps {
    isReducedMotion?: boolean;
}

export default function HeroSection({ isReducedMotion = false }: HeroSectionProps) {
    const handleViewResume = () => {
        // Open resume in new tab
        window.open('/CSResume.pdf', '_blank');
    };

    return (
        <section className="min-h-screen flex flex-col items-center justify-center px-4 relative overflow-hidden transition-colors duration-300">
            <div className="max-w-6xl text-center space-y-12 relative z-10">
                {/* Main Heading */}
                <div className="space-y-8 mb-4">
                    <h1 className="text-[54px] md:text-9xl lg:text-[10rem] font-bold whitespace-nowrap leading-none mb-2 md:mb-8 select-none">
                        {isReducedMotion ? (
                            <TextGenerateEffect 
                                words="Dominic Aung"
                                useGradient={true}
                            />
                        ) : (
                            <TextDecoder text="Dominic Aung" />
                        )}
                    </h1>
                    {/* Triangular Layout */}
                    <div className="flex flex-col items-center mt-2 md:mt-8 space-y-6">
                        {/* Level 2 */}
                        <TextSlider 
                            roles={["Niche Problems, Real Solutions"]} 
                            isReducedMotion={isReducedMotion}
                            className="text-base md:text-4xl lg:text-5xl tracking-tight mb-2 md:mb-4 select-none"
                        />
                        
                        {/* Level 3: Cycling Specialties */}
                        <div className="flex items-center justify-center mb-0 select-none">
                            <TextSlider 
                                roles={specialties} 
                                isReducedMotion={isReducedMotion}
                                className="text-base md:text-4xl lg:text-5xl"
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
                    <LinkPreview 
                        url="/CSResume.pdf" 
                        isStatic={true} 
                        imageSrc="/resume-preview.png"
                        width={300}
                        height={400}
                        className="inline-block"
                    >
                        <MagicButton
                            title="My Resume"
                            icon={<ContactPageIcon className="w-4 h-4" />}
                            position="right"
                            otherClasses="w-auto"
                            handleClick={handleViewResume}
                        />
                    </LinkPreview>
                </motion.div>
            </div>
        </section>
    );
}