"use client";

import { useState, useEffect } from "react";

interface ResponsiveState {
    // Screen size categories
    isMobile: boolean;
    isTablet: boolean;
    isDesktop: boolean;
    isLargeDesktop: boolean;
    
    // Specific breakpoints (matching Tailwind + custom)
    isSmall: boolean;      // <= 640px (sm)
    isMedium: boolean;     // <= 768px (md) 
    isLarge: boolean;      // <= 1024px (lg)
    isExtraLarge: boolean; // <= 1280px (xl)
    isUltraWide: boolean;  // <= 1400px (custom)
    is4K: boolean;         // <= 1920px (custom)
    
    // Touch/interaction capabilities
    isTouchDevice: boolean;
    hasHover: boolean;
    
    // Current window dimensions
    width: number;
    height: number;
}

export function useResponsive(): ResponsiveState {
    const [state, setState] = useState<ResponsiveState>({
        // Default to mobile-first approach
        isMobile: true,
        isTablet: false,
        isDesktop: false,
        isLargeDesktop: false,
        isSmall: true,
        isMedium: true,
        isLarge: true,
        isExtraLarge: true,
        isUltraWide: true,
        is4K: true,
        isTouchDevice: true,
        hasHover: false,
        width: 0,
        height: 0,
    });

    useEffect(() => {
        function updateResponsiveState() {
            const width = window.innerWidth;
            const height = window.innerHeight;
            
            // Touch device detection
            const isTouchDevice = ('ontouchstart' in window) || 
                                    (navigator.maxTouchPoints > 0) ||
                                    (window.matchMedia("(pointer: coarse)").matches);
            
            // Hover capability detection  
            const hasHover = window.matchMedia("(hover: hover)").matches;
            
            // Breakpoint detection (Tailwind CSS + custom breakpoints)
            const isSmall = width <= 640;      // sm
            const isMedium = width <= 768;     // md
            const isLarge = width <= 1024;     // lg
            const isExtraLarge = width <= 1280; // xl
            const isUltraWide = width <= 1400;  // custom (navbar breakpoint)
            const is4K = width <= 1920;         // custom (navbar breakpoint)
            
            // Semantic categories
            const isMobile = width <= 768;
            const isTablet = width > 768 && width <= 1024;
            const isDesktop = width > 1024 && width <= 1920;
            const isLargeDesktop = width > 1920;

            setState({
                isMobile,
                isTablet,
                isDesktop,
                isLargeDesktop,
                isSmall,
                isMedium,
                isLarge,
                isExtraLarge,
                isUltraWide,
                is4K,
                isTouchDevice,
                hasHover,
                width,
                height,
            });
        }

        // Initial call
        updateResponsiveState();
        
        // Listen for resize events
        window.addEventListener("resize", updateResponsiveState);
        
        // Listen for orientation changes (mobile)
        window.addEventListener("orientationchange", updateResponsiveState);
        
        // Cleanup
        return () => {
            window.removeEventListener("resize", updateResponsiveState);
            window.removeEventListener("orientationchange", updateResponsiveState);
        };
    }, []);

    return state;
}

// Utility hook for specific use cases
export function useIsMobile(): boolean {
    const { isMobile } = useResponsive();
    return isMobile;
}

export function useIsTouchDevice(): boolean {
    const { isTouchDevice } = useResponsive();
    return isTouchDevice;
}

export function useHasHover(): boolean {
    const { hasHover } = useResponsive();
    return hasHover;
} 