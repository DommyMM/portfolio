"use client";

import { useState, useEffect } from "react";

interface PreferencesState {
    isDarkMode: boolean;
    isReducedMotion: boolean;
}

interface PreferencesActions {
    toggleTheme: (newIsDark?: boolean) => void;
    toggleMotion: (newIsReduced?: boolean) => void;
}

export function usePreferences(): PreferencesState & PreferencesActions {
    // Initialize with system preferences
    const [isDarkMode, setIsDarkMode] = useState(true); // Default to dark
    const [isReducedMotion, setIsReducedMotion] = useState(false); // Default to motion enabled

    // Detect system preferences and apply overrides from localStorage
    useEffect(() => {
        // System preference detection
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        // Check localStorage for user overrides
        const savedTheme = localStorage.getItem('theme');
        const savedMotion = localStorage.getItem('motion');

        // Apply theme preference
        if (savedTheme) {
            setIsDarkMode(savedTheme === 'dark');
        } else {
            setIsDarkMode(prefersDark);
        }

        // Apply motion preference
        if (savedMotion) {
            setIsReducedMotion(savedMotion === 'reduced');
        } else {
            setIsReducedMotion(prefersReducedMotion);
        }
    }, []);

    // Apply theme class to document root when theme changes
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

    // Persist preferences to localStorage
    useEffect(() => {
        localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    }, [isDarkMode]);

    useEffect(() => {
        localStorage.setItem('motion', isReducedMotion ? 'reduced' : 'enabled');
    }, [isReducedMotion]);

    // Toggle functions
    const toggleTheme = (newIsDark?: boolean) => {
        if (newIsDark !== undefined) {
            setIsDarkMode(newIsDark);
        } else {
            setIsDarkMode(prev => !prev);
        }
    };

    const toggleMotion = (newIsReduced?: boolean) => {
        if (newIsReduced !== undefined) {
            setIsReducedMotion(newIsReduced);
        } else {
            setIsReducedMotion(prev => !prev);
        }
    };

    return {
        isDarkMode,
        isReducedMotion,
        toggleTheme,
        toggleMotion,
    };
}