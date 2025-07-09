"use client";

import AboutHero from "@/components/AboutHero";
import WorkEducation from "@/components/WorkEducation";
import SkillsSection from "@/components/SkillSection";
import WaveGradient from "./ui/Gradient";
import { PortfolioNavbar } from "@/components/Navbar";
import { useActiveSection } from "@/hooks/useActive";
import { usePreferences } from "@/hooks/usePreferences";
import ContactSection from "./ContactSection";

export default function Home() {
    // Use unified preferences hook for both theme and motion
    const { isDarkMode, isReducedMotion, toggleTheme, toggleMotion } = usePreferences();

    // Track active section based on scroll
    const activeSection = useActiveSection();

    return (
        <div className="min-h-screen transition-colors duration-300">
        {/* Portfolio Navbar */}
        <PortfolioNavbar 
            isDarkMode={isDarkMode} 
            onThemeToggle={toggleTheme}
            isReducedMotion={isReducedMotion}
            onMotionToggle={toggleMotion}
            activeSection={activeSection}
        />

        <WaveGradient isReducedMotion={isReducedMotion} />
        
        {/* Main Content */}
        <section id="about">
            <AboutHero isReducedMotion={isReducedMotion} />
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

            <SkillsSection isReducedMotion={isReducedMotion} />

            <ContactSection />
        </div>
        </div>
    );
}