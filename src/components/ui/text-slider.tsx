"use client";

import { useEffect, useState } from "react";

interface TextSliderProps {
    roles: string[];
    interval?: number;
    className?: string;
}

export function TextSlider({ roles, interval = 5000, className = "" }: TextSliderProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [animationState, setAnimationState] = useState<'entering' | 'entered' | 'exiting'>('entering');

    useEffect(() => {
        const timer = setInterval(() => {
        setAnimationState('exiting');
        
        setTimeout(() => {
            setCurrentIndex((prev) => (prev + 1) % roles.length);
            setAnimationState('entering');
            
            setTimeout(() => {
            setAnimationState('entered');
            }, 1500); // Match the animation duration
        }, 500); // Exit animation duration
        }, interval);

        return () => clearInterval(timer);
    }, [roles.length, interval]);

    useEffect(() => {
        // Initial animation
        setTimeout(() => {
        setAnimationState('entered');
        }, 1500);
    }, []);

    const currentRole = roles[currentIndex];

    return (
        <div className={`relative inline-block ${className}`}>
        <div className="flex items-center">
            <span className="text-2xl md:text-4xl font-semibold text-purple-400 mr-2">+</span>
            <div className="relative overflow-hidden">
            <span className={`
                inline-block text-2xl md:text-6xl font-semibold relative
                transition-all duration-500 ease-out
                ${animationState === 'entering' ? 'text-transparent' : ''}
                ${animationState === 'entered' ? 'text-purple-400' : ''}
                ${animationState === 'exiting' ? 'text-purple-400 opacity-0 transition-opacity duration-300 delay-200' : ''}
                `}
            >
                {currentRole}
                
                {/* Sliding overlay effect */}
                <span 
                className={`
                    absolute inset-0 bg-purple-500 
                    transition-transform duration-1500 ease-out
                    ${animationState === 'entering' ? 'transform scale-x-100 origin-left' : ''}
                    ${animationState === 'entered' ? 'transform scale-x-0 origin-right' : ''}
                    ${animationState === 'exiting' ? 'transform scale-x-0 origin-right' : ''}
                `}
                style={{
                    animationDelay: animationState === 'entering' ? '0ms' : '0ms'
                }}
                />
            </span>
            </div>
        </div>
        </div>
    );
}