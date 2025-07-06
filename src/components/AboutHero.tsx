"use client";

import { TextDecoder } from "@/components/ui/TextDecoder";
import { TextSlider } from "@/components/ui/TextSlider";
import { MagicButton } from "@/components/ui/MagicButton";
import { TextGenerateEffect } from "@/components/ui/TextGenerate";

const specialties = [
    "AI/ML Pipelines",
    "Computer Vision",  
    "Databases",
    "Web Development",
    "API Engineering",
    "Gacha Games"
];

export default function AboutHero() {
    return (
        <section className="min-h-screen flex flex-col items-center justify-center px-4 relative overflow-hidden">
            <div className="max-w-6xl text-center space-y-12 relative z-10">
                {/* Main Heading */}
                <div className="space-y-8 mb-4">
                    <h1 className="text-6xl md:text-9xl lg:text-[10rem] font-bold whitespace-nowrap leading-none">
                        <TextDecoder text="Dominic Aung" />
                    </h1>
                    {/* Triangular Layout */}
                    <div className="flex flex-col items-center mt-12 space-y-6">
                        {/* Level 2 */}
                        <div className="text-3xl md:text-7xl lg:text-8xl text-gray-300">
                            <TextSlider 
                                roles={["Full-Stack Developer"]} 
                                startupOnly={true} 
                                className="text-3xl md:text-7xl lg:text-8xl text-gray-300"
                            />
                        </div>
                        
                        {/* Level 3: Cycling Specialties */}
                        <div className="flex items-center justify-center text-xl md:text-5xl lg:text-6xl text-gray-400 mb-2">
                            <TextSlider 
                                roles={specialties} 
                                className="text-xl md:text-5xl lg:text-6xl text-gray-400"
                            />
                        </div>
                        
                        {/* Level 4: Education */}
                        <TextGenerateEffect 
                            words="CS @ UC Davis" 
                            className="text-base md:text-3xl lg:text-4xl font-light mb-0" 
                            filter={true}
                            duration={1}
                        />
                    </div>
                </div>

                {/* Level 5: CTA Button */}
                <div className="pt-4">
                    <MagicButton
                        title="View My Work"
                        icon={<span className="text-sm">→</span>}
                        position="right"
                        otherClasses="w-auto"
                    />
                </div>
            </div>
        </section>
    );
}