"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import CloseIcon from '@mui/icons-material/Close';
import LaunchIcon from '@mui/icons-material/Launch';
import GitHubIcon from '@mui/icons-material/GitHub';

interface ExpandedCardProps {
    project: {
        id: string;
        name: string;
        description: string;
        longDescription: string;
        background: React.ReactNode;
        techStack: string[];
        metrics: {
            [key: string]: string;
        };
        features: string[];
    };
    onClose: () => void;
    isReducedMotion?: boolean;
}

export default function ExpandedCard({ project, onClose, isReducedMotion = false }: ExpandedCardProps) {
    return (
        <div
            className={cn(
                "col-span-full relative overflow-hidden rounded-2xl w-full transition-all duration-300 ease-out",
                "backdrop-blur-md bg-white/80 dark:bg-neutral-950/80 border border-neutral-300 dark:border-neutral-800",
                "shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]",
                "min-h-[600px] lg:min-h-[700px]" // Expanded height
            )}
        >
            {/* Background - reduced opacity for readability */}
            <div className="absolute inset-0 opacity-30">
                {project.background}
            </div>

            {/* Close Button */}
            <button
                onClick={onClose}
                className="absolute top-4 right-4 z-50 w-10 h-10 rounded-full bg-black/20 hover:bg-black/40 backdrop-blur-sm border border-white/20 transition-all duration-200 flex items-center justify-center group"
            >
                <CloseIcon className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
            </button>

            {/* Content */}
            <div className="relative z-10 p-6 lg:p-8 h-full">
                {/* Header Section */}
                <div className="mb-8">
                    <div className="flex items-start justify-between mb-4">
                        <div>
                            <h2 className="text-3xl lg:text-4xl font-bold text-neutral-800 dark:text-white mb-2">
                                {project.name}
                            </h2>
                            <p className="text-lg text-neutral-600 dark:text-neutral-300 leading-relaxed max-w-3xl">
                                {project.longDescription}
                            </p>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3 mt-6">
                        <button className="flex items-center gap-2 px-4 py-2 bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/30 rounded-lg transition-all duration-200 text-blue-600 dark:text-blue-400">
                            <LaunchIcon className="w-4 h-4" />
                            <span className="text-sm font-medium">View Live</span>
                        </button>
                        <button className="flex items-center gap-2 px-4 py-2 bg-neutral-500/10 hover:bg-neutral-500/20 border border-neutral-500/30 rounded-lg transition-all duration-200 text-neutral-600 dark:text-neutral-400">
                            <GitHubIcon className="w-4 h-4" />
                            <span className="text-sm font-medium">Source Code</span>
                        </button>
                    </div>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column - Tech Stack & Features */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Tech Stack */}
                        <div>
                            <h3 className="text-xl font-semibold text-neutral-800 dark:text-white mb-4">
                                Technology Stack
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {project.techStack.map((tech, index) => (
                                    <span
                                        key={index}
                                        className="px-3 py-1 bg-neutral-100/50 dark:bg-white/5 border border-neutral-200 dark:border-white/10 rounded-full text-sm font-medium text-neutral-700 dark:text-neutral-300"
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Key Features */}
                        <div>
                            <h3 className="text-xl font-semibold text-neutral-800 dark:text-white mb-4">
                                Key Features
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {project.features.map((feature, index) => (
                                    <div
                                        key={index}
                                        className="flex items-start gap-3 p-3 bg-neutral-50/50 dark:bg-white/5 rounded-lg border border-neutral-200/50 dark:border-white/10"
                                    >
                                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                                        <span className="text-sm text-neutral-700 dark:text-neutral-300">
                                            {feature}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Placeholder for future content */}
                        <div className="space-y-6">
                            {/* Architecture Diagram Placeholder */}
                            <div>
                                <h3 className="text-xl font-semibold text-neutral-800 dark:text-white mb-4">
                                    System Architecture
                                </h3>
                                <div className="h-32 bg-neutral-100/50 dark:bg-white/5 rounded-lg border border-neutral-200 dark:border-white/10 flex items-center justify-center">
                                    <span className="text-neutral-500 dark:text-neutral-400 text-sm">
                                        Architecture diagram coming soon
                                    </span>
                                </div>
                            </div>

                            {/* Code Snippet Placeholder */}
                            <div>
                                <h3 className="text-xl font-semibold text-neutral-800 dark:text-white mb-4">
                                    Code Highlight
                                </h3>
                                <div className="h-32 bg-neutral-100/50 dark:bg-white/5 rounded-lg border border-neutral-200 dark:border-white/10 flex items-center justify-center">
                                    <span className="text-neutral-500 dark:text-neutral-400 text-sm">
                                        Code snippet coming soon
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Metrics & Stats */}
                    <div className="lg:col-span-1">
                        <h3 className="text-xl font-semibold text-neutral-800 dark:text-white mb-4">
                            Project Metrics
                        </h3>
                        <div className="space-y-4">
                            {Object.entries(project.metrics).map(([key, value], index) => (
                                <div
                                    key={index}
                                    className="p-4 bg-neutral-50/50 dark:bg-white/5 rounded-lg border border-neutral-200/50 dark:border-white/10"
                                >
                                    <div className="text-2xl font-bold text-neutral-800 dark:text-white mb-1">
                                        {value}
                                    </div>
                                    <div className="text-sm text-neutral-600 dark:text-neutral-400 capitalize">
                                        {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Additional Info Placeholder */}
                        <div className="mt-8">
                            <h4 className="text-lg font-semibold text-neutral-800 dark:text-white mb-4">
                                Project Timeline
                            </h4>
                            <div className="h-24 bg-neutral-100/50 dark:bg-white/5 rounded-lg border border-neutral-200 dark:border-white/10 flex items-center justify-center">
                                <span className="text-neutral-500 dark:text-neutral-400 text-sm">
                                    Timeline visualization coming soon
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}