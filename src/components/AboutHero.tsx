"use client";

import { TextDecoder } from "@/components/ui/TextDecoder";
import { TextSlider } from "@/components/ui/TextSlider";
import { TacetMark } from "@/components/ui/TacetMark";

const specialties = [
    "AI/ML Pipelines",
    "Computer Vision",  
    "Databases",
    "Web Development",
    "API Engineering"
];

export default function AboutHero() {
    return (
        <section className="min-h-screen flex flex-col items-center justify-center px-4">
        <div className="max-w-4xl text-center space-y-8">
            {/* Main Heading */}
            <div className="space-y-4">
                <h1 className="text-5xl md:text-8xl font-bold text-amber-200 whitespace-nowrap">
                    <TextDecoder text="Dominic Aung" className="text-amber-200" />
                </h1>
                {/* Main Role with Animated TextSlider */}
                <div className="flex flex-col items-start">
                    <div className="flex items-center gap-2 text-2xl md:text-6xl text-gray-300">
                    <TextSlider roles={["Full-Stack Developer"]} startupOnly={true} className="text-2xl md:text-6xl  text-gray-300"/>
                    <span className="block h-1 w-64 bg-purple-500 rounded-full ml-2" />
                    </div>
                    {/* Animated Cycling Specialties */}
                    <div className="mt-4">
                        <TextSlider roles={specialties} className="text-lg md:text-6xl text-gray-400" />
                    </div>
                </div>
            </div>

            {/* Tacet Mark Visualization */}
            <div className="mt-16 flex justify-center">
                <div className="text-center">
                    <TacetMark 
                        className="transform rotate-90" 
                        width={1024} 
                        height={1024}
                    />
                </div>
            </div>

            {/* Supporting Text */}
            <div className="space-y-2">
            </div>

            {/* CTA Button */}
            <div className="pt-8">
            <button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors duration-200 border border-purple-500 hover:border-purple-400">
                View My Work →
            </button>
            </div>
        </div>
        </section>
    );
}