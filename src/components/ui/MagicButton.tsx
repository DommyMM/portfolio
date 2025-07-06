"use client";

import React from "react";

interface MagicButtonProps {
    title: string;
    icon?: React.ReactNode;
    position?: "left" | "right";
    handleClick?: () => void;
    otherClasses?: string;
}

export function MagicButton({
    title,
    icon,
    position = "right",
    handleClick,
    otherClasses = ""
}: MagicButtonProps) {
    
    return (
        <button
            className={`relative inline-flex h-12 overflow-hidden rounded-lg p-[1px] focus:outline-none group ${otherClasses}`}
            onClick={handleClick}
        >
            {/* Spinning conic gradient border */}
            <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
            
            {/* Button content */}
            <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-lg bg-slate-950 group-hover:bg-transparent transition duration-200 px-7 text-sm font-medium text-white backdrop-blur-3xl gap-2">
                {position === "left" && icon}
                {title}
                {position === "right" && icon}
            </span>
        </button>
    );
}
