"use client";

import { TextDecoder } from "@/components/ui/TextDecoder";
import { TextSlider } from "@/components/ui/TextSlider";
import { MagicButton } from "@/components/ui/Button";
import { TextGenerateEffect } from "@/components/ui/TextGenerate";
import { motion } from "motion/react";
import FileDownloadIcon from '@mui/icons-material/FileDownload';

const specialties = [
    "AI/ML Pipelines",
    "Computer Vision",  
    "Databases",
    "Web Development",
    "API Engineering",
    "Gacha Games"
];

interface AboutHeroProps {
    isReducedMotion?: boolean;
}

export default function AboutHero({ isReducedMotion = false }: AboutHeroProps) {
    const handleDownloadResume = () => {
        // Create a temporary link element to trigger download
        const link = document.createElement('a');
        link.href = '/resume.pdf';
        link.download = 'resume.pdf';
        link.click();
    };

    return (
        <section className="min-h-screen flex flex-col items-center justify-center px-4 relative overflow-hidden transition-colors duration-300">
            <div className="max-w-6xl text-center space-y-12 relative z-10">
                {/* Main Heading */}
                <div className="space-y-8 mb-4">
                    <h1 className="text-5xl md:text-9xl lg:text-[10rem] font-bold whitespace-nowrap leading-none select-none">
                        {isReducedMotion ? (
                            <TextGenerateEffect 
                                words="Dominic Aung" 
                                className="text-5xl md:text-9xl lg:text-[10rem] font-bold whitespace-nowrap leading-none [&>div>div]:!text-5xl [&>div>div]:md:!text-9xl [&>div>div]:lg:!text-[10rem] [&>div>div]:!leading-none" 
                                useGradient={true}
                            />
                        ) : (
                            <TextDecoder text="Dominic Aung" />
                        )}
                    </h1>
                    {/* Triangular Layout */}
                    <div className="flex flex-col items-center mt-12 space-y-6">
                        {/* Level 2 */}
                        <div className="text-2xl md:text-6xl lg:text-7xl select-none">
                            <TextSlider 
                                roles={["Full-Stack Developer"]} 
                                isReducedMotion={isReducedMotion}
                                className="text-2xl md:text-6xl lg:text-7xl"
                            />
                        </div>
                        
                        {/* Level 3: Cycling Specialties */}
                        <div className="flex items-center justify-center text-xl md:text-5xl lg:text-6xl mb-2 select-none">
                            <TextSlider 
                                roles={specialties} 
                                isReducedMotion={isReducedMotion}
                                className="text-xl md:text-5xl lg:text-6xl"
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
                        title="Download Resume"
                        icon={<FileDownloadIcon className="w-4 h-4" />}
                        position="right"
                        otherClasses="w-auto"
                        handleClick={handleDownloadResume}
                    />
                </motion.div>
            </div>
        </section>
    );
}