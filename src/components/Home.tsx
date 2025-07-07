"use client";

import { useState, useEffect } from "react";
import AboutHero from "@/components/AboutHero";
import WorkEducation from "@/components/WorkEducation";
import { ToggleButton } from "@/components/ui/Button";
import WaveGradient from "./ui/Gradient";

export default function Home() {
  // Initialize theme state (default to dark mode)
    const [isDarkMode, setIsDarkMode] = useState(true);

    // Apply theme class to document root on mount and theme changes
    useEffect(() => {
        const root = document.documentElement;
        if (isDarkMode) {
        root.classList.add('dark');
        root.classList.remove('light');
        } else {
        root.classList.add('light');
        root.classList.remove('dark');
        }
    }, [isDarkMode]);

    // Persist theme preference in localStorage
    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
        setIsDarkMode(savedTheme === 'dark');
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    }, [isDarkMode]);

    const handleThemeToggle = (newIsDark: boolean) => {
        setIsDarkMode(newIsDark);
    };

    return (
        <div className="min-h-screen transition-colors duration-300">
        {/* Fixed Theme Toggle - Top Right */}
        <div className="fixed top-4 right-4 z-50">
            <ToggleButton 
            isDark={isDarkMode} 
            onToggle={handleThemeToggle} 
            />
        </div>

        <WaveGradient />
        {/* Main Content */}
        <AboutHero />
        
        {/* Other Sections */}
        <div className="max-w-4xl mx-auto px-4 space-y-32 pb-24">
            <section id="projects" className="py-24">
            <h2 className="text-3xl font-semibold text-neutral-800 dark:text-white mb-8">Projects</h2>
            <div className="h-32 bg-neutral-100 dark:bg-white/5 rounded-lg border border-neutral-200 dark:border-white/10 flex items-center justify-center text-neutral-500 dark:text-white/40">
                Coming soon...
            </div>
            </section>

            <WorkEducation />

            <section id="skills" className="py-24">
            <h2 className="text-3xl font-semibold text-neutral-800 dark:text-white mb-8">Skills & Tech</h2>
            <div className="h-32 bg-neutral-100 dark:bg-white/5 rounded-lg border border-neutral-200 dark:border-white/10 flex items-center justify-center text-neutral-500 dark:text-white/40">
                Coming soon...
            </div>
            </section>

            <section id="contact" className="py-24">
            <h2 className="text-3xl font-semibold text-neutral-800 dark:text-white mb-8">Contact</h2>
            <div className="h-32 bg-neutral-100 dark:bg-white/5 rounded-lg border border-neutral-200 dark:border-white/10 flex items-center justify-center text-neutral-500 dark:text-white/40">
                Coming soon...
            </div>
            </section>
        </div>
        </div>
    );
}