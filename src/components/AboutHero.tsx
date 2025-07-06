"use client";

import { useState, useEffect } from "react";
import { TextDecoder } from "@/components/ui/TextDecoder";
import { TextSlider } from "@/components/ui/TextSlider";
import { TacetMark } from "@/components/ui/TacetMark";
import { MagicButton } from "@/components/ui/MagicButton";

const specialties = [
    "AI/ML Pipelines",
    "Computer Vision",  
    "Databases",
    "Web Development",
    "API Engineering",
    "Gacha Games"
];

export default function AboutHero() {
    const [isAwakened, setIsAwakened] = useState(false);

    useEffect(() => {
        // Awakening happens after startup sequence completes
        const awakeningTimer = setTimeout(() => {
            setIsAwakened(true);
        }, 5000); // After first startup animation

        return () => clearTimeout(awakeningTimer);
    }, []);

    return (
        <section className="min-h-screen flex flex-col items-center justify-center px-4 relative overflow-hidden">
            {/* Background Tacet Mark with Dynamic Animation */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute -left-125 top-10 h-full flex items-center">
                    <TacetMark 
                        className={`drop-shadow-[0_0_50px_rgba(251,191,36,0.4)] rotate-135 ${
                            isAwakened ? 'awakened' : 'startup'
                        }`}
                        width={1280} 
                        height={1280}
                    />
                </div>
            </div>
            
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
                        <div className="flex items-center justify-center text-xl md:text-5xl lg:text-6xl text-gray-400">
                            <TextSlider 
                                roles={specialties} 
                                className="text-xl md:text-5xl lg:text-6xl text-gray-400"
                            />
                        </div>
                        
                        {/* Level 4: Education */}
                        <div className="text-base md:text-3xl lg:text-4xl text-gray-500 font-light">
                            CS @ UC Davis
                        </div>
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