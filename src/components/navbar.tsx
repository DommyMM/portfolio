"use client";

import { Navbar, NavBody, NavItems, MobileNav, NavbarLogo, MobileNavHeader, MobileNavToggle, MobileNavMenu } from "@/components/ui/floating-navbar";
import { ToggleButton, MotionToggle } from "@/components/ui/button";
import { Tooltip } from "@/components/ui/tooltip";
import { useState } from "react";

interface PortfolioNavbarProps {
    isDarkMode: boolean;
    onThemeToggle: (isDark: boolean) => void;
    isReducedMotion: boolean;
    onMotionToggle: (isReduced: boolean) => void;
    activeSection?: string;
}

export function PortfolioNavbar({ isDarkMode, onThemeToggle, isReducedMotion, onMotionToggle, activeSection }: PortfolioNavbarProps) {
    const navItems = [
        {
            name: "About",
            link: "#about",
        },
        {
            name: "Projects", 
            link: "#projects",
        },
        {
            name: "Work",
            link: "#work",
        },
        {
            name: "Skills",
            link: "#skills",
        },
        {
            name: "Contact",
            link: "#contact",
        },
    ];

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <Navbar>
            {/* Desktop Navigation */}
            <NavBody>
                <NavbarLogo />
                <NavItems items={navItems} activeSection={activeSection} />
                <div className="flex items-center gap-4">
                    <Tooltip 
                        content={isReducedMotion ? "Enable animations" : "Reduce motion"}
                        placement="bottom"
                        delay={150}
                    >
                        <MotionToggle
                            isReducedMotion={isReducedMotion}
                            onToggle={onMotionToggle}
                            className="scale-90"
                        />
                    </Tooltip>
                    <Tooltip 
                        content={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
                        placement="bottom"
                        delay={150}
                    >
                        <ToggleButton 
                            isDark={isDarkMode} 
                            onToggle={onThemeToggle}
                            className="scale-75"
                        />
                    </Tooltip>
                </div>
            </NavBody>

            {/* Mobile Navigation */}
            <MobileNav>
                <MobileNavHeader>
                    {/* Invisible hamburger clone on LEFT for spacing */}
                    <div className="invisible">
                        <MobileNavToggle isOpen={false} onClick={() => {}} />
                    </div>
                    {/* Perfectly centered title */}
                    <NavbarLogo 
                        activeSection={activeSection}
                        isMobile={true}
                    />
                    {/* Real hamburger on RIGHT */}
                    <MobileNavToggle
                        isOpen={isMobileMenuOpen}
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    />
                </MobileNavHeader>

                <MobileNavMenu isOpen={isMobileMenuOpen}>
                    {navItems.map((item, idx) => (
                        <a
                            key={`mobile-link-${idx}`}
                            href={item.link}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="relative text-neutral-600 dark:text-neutral-300 py-2"
                        >
                            <span className="block text-lg">{item.name}</span>
                        </a>
                    ))}
                    <div className="flex w-full flex-col gap-4 mt-4 pt-4 border-t border-gray-300 dark:border-gray-700">
                        <div className="flex items-center justify-center gap-4">
                            <Tooltip 
                                content={isReducedMotion ? "Enable animations" : "Reduce motion"}
                                placement="top"
                                delay={500}
                            >
                                <MotionToggle
                                    isReducedMotion={isReducedMotion}
                                    onToggle={onMotionToggle}
                                />
                            </Tooltip>
                            <Tooltip 
                                content={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
                                placement="top"
                                delay={500}
                            >
                                <ToggleButton 
                                    isDark={isDarkMode} 
                                    onToggle={onThemeToggle}
                                />
                            </Tooltip>
                        </div>
                    </div>
                </MobileNavMenu>
            </MobileNav>
        </Navbar>
    );
}