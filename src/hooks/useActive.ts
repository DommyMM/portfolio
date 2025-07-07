"use client";

import { useState, useEffect } from "react";
import { useScroll } from "motion/react";

const sections = ['about', 'projects', 'work', 'skills', 'contact'];

export function useActiveSection() {
    const [activeSection, setActiveSection] = useState<string>('about');
    const { scrollYProgress } = useScroll();

    useEffect(() => {
        const unsubscribe = scrollYProgress.on("change", (progress) => {
            // Calculate which section should be active based on scroll progress
            const sectionIndex = Math.floor(progress * sections.length);
            
            // Handle edge cases
            if (progress === 0) {
                setActiveSection('about');
            } else if (progress >= 0.95) {
                setActiveSection('contact');
            } else {
                const currentSection = sections[sectionIndex] || 'about';
                setActiveSection(currentSection);
            }
        });

        return () => unsubscribe();
    }, [scrollYProgress]);

    return activeSection;
}