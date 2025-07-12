"use client";

import { useState, useEffect } from "react";

interface ResponsiveState {
    // Simple semantic categories  
    isMobile: boolean;     // <= 768px (phones)
    isLaptop: boolean;     // 769px - 1400px (laptops)
    isDesktop: boolean;    // 1401px - 1920px (desktops)
    is4K: boolean;         // > 1920px (ultra-wide)
    
    // Touch capabilities (the important stuff)
    isTouchDevice: boolean;
    hasHover: boolean;
    
    // Raw dimensions
    width: number;
    height: number;
    
    // Specific breakpoints for edge cases
    isSmall: boolean;      // <= 640px (for navbar)
}

export function useResponsive(): ResponsiveState {
    const [state, setState] = useState<ResponsiveState>({
        isMobile: false,
        isLaptop: true,
        isDesktop: false,
        is4K: false,
        isTouchDevice: false,
        hasHover: false,
        width: 0,
        height: 0,
        isSmall: false,
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
            
            // Simple breakpoint detection
            const isSmall = width <= 640;      // for navbar
            
            // Clean semantic categories
            const isMobile = width <= 768;
            const isLaptop = width > 768 && width <= 1400;
            const isDesktop = width > 1400 && width <= 1920;
            const is4K = width > 1920;

            setState({
                isMobile,
                isLaptop,
                isDesktop,
                is4K,
                isTouchDevice,
                hasHover,
                width,
                height,
                isSmall,
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

// Utility hooks for common use cases
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