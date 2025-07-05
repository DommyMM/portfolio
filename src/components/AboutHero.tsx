"use client";

import { DecoderText } from "@/components/ui/decoder-text";
import { useEffect, useState } from "react";

const specialties = [
    "AI/ML Pipelines",
    "Computer Vision",
    "Databases"
];

export default function AboutHero() {
    const [index, setIndex] = useState(0);
    useEffect(() => {
        const interval = setInterval(() => {
        setIndex((prev) => (prev + 1) % specialties.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section className="min-h-screen flex flex-col items-center justify-center px-4">
        <div className="max-w-4xl text-center space-y-8">
            {/* Main Heading */}
            <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-bold text-white">
                <DecoderText text="Dominic Aung" className="text-white" />
            </h1>
            {/* Main Role with Underline */}
            <div className="flex flex-col items-center">
                <div className="flex items-center gap-2 text-2xl md:text-4xl font-semibold text-gray-300">
                <span>Full-Stack Developer</span>
                <span className="block h-1 w-16 bg-purple-500 rounded-full ml-2" />
                </div>
                {/* Cycling Specialties */}
                <div className="h-10 flex items-center justify-center text-xl md:text-2xl font-medium text-purple-300 relative mt-2" style={{ minHeight: 40 }}>
                {specialties.map((item, i) => (
                    <span
                    key={item}
                    className={`absolute left-1/2 -translate-x-1/2 transition-all duration-700 ease-in-out whitespace-nowrap ${
                        i === index ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 pointer-events-none'
                    }`}
                    aria-hidden={i !== index}
                    >
                    <span className="text-purple-400 mr-2">+</span>
                    {item}
                    </span>
                ))}
                </div>
            </div>
            </div>

            {/* Supporting Text */}
            <div className="space-y-2">
            <p className="text-lg text-gray-400">
                UC Davis Computer Science Student • Available for Internships
            </p>
            <p className="text-xl font-medium text-white">
                Real applications, real users, real impact.
            </p>
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