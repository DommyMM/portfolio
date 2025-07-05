"use client";

import { useEffect, useState, useRef } from "react";

interface TextSliderProps {
    roles: string[];
    interval?: number;
    className?: string;
    startupOnly?: boolean;
    showPlus?: boolean;
}

export function TextSlider({ 
    roles, 
    interval = 5000, 
    className = "", 
    startupOnly = false,
    showPlus = true
}: TextSliderProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(true);
    const [isVisible, setIsVisible] = useState(false);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        // Initial reveal animation
        const revealTimer = setTimeout(() => {
            setIsVisible(true);
            setIsAnimating(false);
        }, 500);
    
        // Setup cycling if not startupOnly
        if (!startupOnly && roles.length > 1) {
            intervalRef.current = setInterval(() => {
                // Hide text and start overlay animation
                setIsVisible(false);
                setIsAnimating(true);
                
                // Change text while hidden
                setTimeout(() => {
                    setCurrentIndex((prev) => (prev + 1) % roles.length);
                }, 10); // Small delay to ensure text is hidden first
                
                // End the slide animation and reveal text
                setTimeout(() => {
                    setIsAnimating(false);
                    setIsVisible(true);
                }, 1000);
                
            }, interval);
        }
    
        return () => {
            clearTimeout(revealTimer);
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [roles.length, interval, startupOnly]);

    if (roles.length === 0) return null;

    const currentRole = roles[currentIndex];

    return (
        <div className={`relative inline-flex items-center ${className}`}>
            <div className="relative overflow-hidden">
                <span 
                    className={`
                        inline-block relative
                        transition-all duration-500 ease-out
                        ${isVisible ? 'text-gray-300' : 'text-transparent'}
                    `}
                >
                    {showPlus && !startupOnly && (
                        <span className="text-purple-400 mr-2 opacity-40">+</span>
                    )}
                    {currentRole}
                    
                    {/* Sliding overlay */}
                    <span 
                        className={`
                            absolute inset-0 bg-purple-500 z-10
                            transition-transform duration-1000 ease-out
                            ${isAnimating 
                                ? 'transform scale-x-100 origin-left' 
                                : 'transform scale-x-0 origin-right'
                            }
                        `}
                    />
                </span>
            </div>
        </div>
    );
}