"use client";

import HeroSection from "@/components/hero";
import AboutSection from "@/components/about-section";
import ProjectsSection from "@/components/projects-section";
import WorkEducation from "@/components/work-education";
import SkillsSection from "@/components/skill-section";
import { PortfolioNavbar } from "@/components/navbar";
import { useActiveSection } from "@/hooks/useActive";
import { usePreferences } from "@/hooks/usePreferences";
import ContactSection from "./contact-section";

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
            
            <HeroSection isReducedMotion={isReducedMotion} />
            <AboutSection isReducedMotion={isReducedMotion} />
            
            <div className="max-w-4xl mx-auto px-4 space-y-32 pb-24">
                <ProjectsSection isReducedMotion={isReducedMotion} />
                <WorkEducation />
                <SkillsSection isReducedMotion={isReducedMotion} />
                <ContactSection />
            </div>
        </div>
    );
}