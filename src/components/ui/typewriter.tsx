"use client";

import { useState, useEffect } from "react";
import { motion } from "motion/react"

interface TypewriterProps {
    phrases: string[];
    className?: string;
    typingSpeed?: number;
    deletingSpeed?: number;
    pauseDuration?: number;
}

export function Typewriter({ 
    phrases, 
    className = "", 
    typingSpeed = 100,
    deletingSpeed = 50,
    pauseDuration = 2000
    }: TypewriterProps) {
    const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
    const [currentText, setCurrentText] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);
    const [isPaused, setIsPaused] = useState(false);

    useEffect(() => {
        const currentPhrase = phrases[currentPhraseIndex];
        
        if (isPaused) {
        const pauseTimer = setTimeout(() => {
            setIsPaused(false);
            setIsDeleting(true);
        }, pauseDuration);
        return () => clearTimeout(pauseTimer);
        }

        const timer = setTimeout(() => {
        if (!isDeleting) {
            // Typing
            if (currentText.length < currentPhrase.length) {
            setCurrentText(currentPhrase.slice(0, currentText.length + 1));
            } else {
            // Finished typing, start pause
            setIsPaused(true);
            }
        } else {
            // Deleting
            if (currentText.length > 0) {
            setCurrentText(currentText.slice(0, -1));
            } else {
            // Finished deleting, move to next phrase
            setIsDeleting(false);
            setCurrentPhraseIndex((prev) => (prev + 1) % phrases.length);
            }
        }
        }, isDeleting ? deletingSpeed : typingSpeed);

        return () => clearTimeout(timer);
    }, [currentText, isDeleting, isPaused, currentPhraseIndex, phrases, typingSpeed, deletingSpeed, pauseDuration]);

    return (
        <div className={`${className}`}>
        <span>{currentText}</span>
        <motion.span
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
            className="text-blue-400"
        >
            |
        </motion.span>
        </div>
    );
}