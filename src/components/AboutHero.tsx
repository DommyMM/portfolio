"use client";

import { useState, useEffect } from "react";
import { TextDecoder } from "@/components/ui/TextDecoder";
import { TextSlider } from "@/components/ui/TextSlider";
import { TacetMark } from "@/components/ui/TacetMark";
import MagicButton from "@/components/MagicButton";

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
            
            <div className="max-w-4xl text-center space-y-8 relative z-10">
                {/* Main Heading */}
                <div className="space-y-4">
                    <h1 className="text-5xl md:text-8xl font-bold text-amber-200 whitespace-nowrap">
                        <TextDecoder text="Dominic Aung" className="text-amber-200" />
                    </h1>
                    {/* Main Role with Line */}
                    <div className="flex flex-col items-start">
                        <div className="flex items-center gap-2 text-2xl md:text-6xl text-gray-300">
                            <TextSlider 
                                roles={["Full-Stack Developer"]} 
                                startupOnly={true} 
                                className="text-2xl md:text-6xl text-gray-300"
                            />
                            <span className="block h-1 w-64 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full ml-2" />
                        </div>
                        {/* Animated Cycling Specialties */}
                        <div className="mt-4">
                            <TextSlider 
                                roles={specialties} 
                                className="text-lg md:text-6xl text-gray-400" 
                            />
                        </div>
                    </div>
                </div>

                {/* CTA Button */}
                <div className="pt-8">
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