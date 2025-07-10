"use client";

import AboutHero from "@/components/Hero";
import ProjectsSection from "@/components/ProjectsSection";
import WorkEducation from "@/components/WorkEducation";
import SkillsSection from "@/components/SkillSection";
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
            
            <AboutHero isReducedMotion={isReducedMotion} />
            
            <div className="max-w-4xl mx-auto px-4 space-y-32 pb-24">
                <ProjectsSection isReducedMotion={isReducedMotion} />
                <WorkEducation />
                <SkillsSection isReducedMotion={isReducedMotion} />
                <ContactSection />
            </div>
        </div>
    );
}