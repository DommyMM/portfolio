"use client";

import { useState, useEffect } from "react";
import AboutHero from "@/components/AboutHero";
import WorkEducation from "@/components/WorkEducation";
import SkillsSection from "@/components/SkillSection";
import WaveGradient from "./ui/Gradient";
import { PortfolioNavbar } from "@/components/Navbar";
import { useActiveSection } from "@/hooks/useActive";
import ContactSection from "./ContactSection";

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

    // Track active section based on scroll
    const activeSection = useActiveSection();

    return (
        <div className="min-h-screen transition-colors duration-300">
        {/* Portfolio Navbar */}
        <PortfolioNavbar 
            isDarkMode={isDarkMode} 
            onThemeToggle={handleThemeToggle}
            activeSection={activeSection}
        />

        <WaveGradient />
        
        {/* Main Content */}
        <section id="about">
            <AboutHero />
        </section>
        
        {/* Other Sections */}
        <div className="max-w-4xl mx-auto px-4 space-y-32 pb-24">
            <section id="projects" className="py-24">
            <h2 className="text-3xl font-semibold text-neutral-800 dark:text-white mb-8">Projects</h2>
            <div className="h-32 bg-neutral-100 dark:bg-white/5 rounded-lg border border-neutral-200 dark:border-white/10 flex items-center justify-center text-neutral-500 dark:text-white/40">
                Coming soon...
            </div>
            </section>

            <WorkEducation />

            <SkillsSection />

            <ContactSection />
        </div>
        </div>
    );
}