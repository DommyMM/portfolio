"use client";

import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";
import CloseIcon from '@mui/icons-material/Close';
import LaunchIcon from '@mui/icons-material/Launch';
import GitHubIcon from '@mui/icons-material/GitHub';
import { createIconComponent } from "@/lib/icons";

interface SimpleModalCardProps {
    isOpen: boolean;
    onClose: () => void;
    project: {
        id: string;
        name: string;
        tagline: string;
        background: React.ReactNode;
        keyMetrics: {
            primary: string;
            secondary: string;
            tertiary: string;
        };
        techStack: string[];
        liveUrl?: string;
        githubUrl?: string;
    };
    isReducedMotion?: boolean;
}

// Simple, lightweight modal for when you do need more detail
export default function SimpleModalCard({ 
    isOpen, 
    onClose, 
    project, 
    isReducedMotion = false 
}: SimpleModalCardProps) {
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: isReducedMotion ? 0 : 0.3 }}
                        onClick={onClose}
                    >
                        {/* Modal */}
                        <motion.div
                            className={cn(
                                "relative w-full max-w-2xl max-h-[80vh] overflow-hidden rounded-2xl",
                                "backdrop-blur-md bg-white/90 dark:bg-neutral-950/90 border border-neutral-300 dark:border-neutral-800",
                                "shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
                            )}
                            initial={isReducedMotion ? {} : { opacity: 0, scale: 0.9, y: 20 }}
                            animate={isReducedMotion ? {} : { opacity: 1, scale: 1, y: 0 }}
                            exit={isReducedMotion ? {} : { opacity: 0, scale: 0.9, y: 20 }}
                            transition={{ duration: isReducedMotion ? 0 : 0.3, ease: "easeOut" }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Background */}
                            <div className="absolute inset-0 opacity-20">
                                {project.background}
                            </div>

                            {/* Close Button */}
                            <button
                                onClick={onClose}
                                className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/20 hover:bg-black/40 backdrop-blur-sm border border-white/20 transition-all duration-200 flex items-center justify-center group"
                            >
                                <CloseIcon className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
                            </button>

                            {/* Content */}
                            <div className="relative z-10 p-8">
                                {/* Header */}
                                <div className="text-center mb-8">
                                    <h2 className="text-3xl font-bold text-neutral-800 dark:text-white mb-2">
                                        {project.name}
                                    </h2>
                                    <p className="text-lg text-neutral-600 dark:text-neutral-300">
                                        {project.tagline}
                                    </p>
                                </div>

                                {/* Key Metrics */}
                                <div className="grid grid-cols-3 gap-6 mb-8">
                                    <div className="text-center p-4 bg-neutral-100/50 dark:bg-white/5 rounded-lg border border-neutral-200/50 dark:border-white/10">
                                        <div className="text-2xl font-bold text-neutral-800 dark:text-white mb-1">
                                            {project.keyMetrics.primary}
                                        </div>
                                        <div className="text-sm text-neutral-600 dark:text-neutral-400">
                                            Primary
                                        </div>
                                    </div>
                                    <div className="text-center p-4 bg-neutral-100/50 dark:bg-white/5 rounded-lg border border-neutral-200/50 dark:border-white/10">
                                        <div className="text-2xl font-bold text-neutral-800 dark:text-white mb-1">
                                            {project.keyMetrics.secondary}
                                        </div>
                                        <div className="text-sm text-neutral-600 dark:text-neutral-400">
                                            Secondary
                                        </div>
                                    </div>
                                    <div className="text-center p-4 bg-neutral-100/50 dark:bg-white/5 rounded-lg border border-neutral-200/50 dark:border-white/10">
                                        <div className="text-2xl font-bold text-neutral-800 dark:text-white mb-1">
                                            {project.keyMetrics.tertiary}
                                        </div>
                                        <div className="text-sm text-neutral-600 dark:text-neutral-400">
                                            Tertiary
                                        </div>
                                    </div>
                                </div>

                                {/* Tech Stack */}
                                <div className="mb-8">
                                    <h3 className="text-lg font-semibold text-neutral-800 dark:text-white mb-4 text-center">
                                        Built With
                                    </h3>
                                    <div className="flex flex-wrap gap-3 justify-center">
                                        {project.techStack.map((tech, index) => (
                                            <div
                                                key={tech}
                                                className="flex items-center gap-2 px-3 py-2 bg-neutral-100/50 dark:bg-white/5 border border-neutral-200 dark:border-white/10 rounded-full"
                                            >
                                                <div className="w-4 h-4">
                                                    {createIconComponent(tech, { className: "w-4 h-4" })}
                                                </div>
                                                <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300 capitalize">
                                                    {tech}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex gap-4 justify-center">
                                    {project.liveUrl && (
                                        <button
                                            onClick={() => window.open(project.liveUrl, '_blank')}
                                            className="flex items-center gap-2 px-6 py-3 bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/30 rounded-lg transition-all duration-200 text-blue-600 dark:text-blue-400"
                                        >
                                            <LaunchIcon className="w-5 h-5" />
                                            <span className="font-medium">View Live</span>
                                        </button>
                                    )}
                                    {project.githubUrl && (
                                        <button
                                            onClick={() => window.open(project.githubUrl, '_blank')}
                                            className="flex items-center gap-2 px-6 py-3 bg-neutral-500/10 hover:bg-neutral-500/20 border border-neutral-500/30 rounded-lg transition-all duration-200 text-neutral-600 dark:text-neutral-400"
                                        >
                                            <GitHubIcon className="w-5 h-5" />
                                            <span className="font-medium">Source Code</span>
                                        </button>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}