"use client";

import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { createIconComponent } from "@/lib/icons";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import LaunchIcon from '@mui/icons-material/Launch';
import CloseIcon from '@mui/icons-material/Close';

interface GamingProfile {
    game: string;
    username?: string;
    userId?: string;
    url?: string;
    iconSlug: string;
    featured?: boolean;
}

const gamingProfiles: GamingProfile[] = [
    {
        game: "Wuthering Waves",
        userId: "500006092",
        iconSlug: "wuwa",
        featured: true
    },
    {
        game: "Steam",
        username: "dommynated", 
        url: "https://steamcommunity.com/id/dommynated/",
        iconSlug: "steam"
    },
    {
        game: "Discord",
        username: "grassless",
        iconSlug: "discord"
    },
    {
        game: "Genshin Impact",
        userId: "806453523",
        iconSlug: "genshin"
    },
    {
        game: "Honkai Star Rail",
        userId: "800758425",
        iconSlug: "honkai"
    }
];

interface GamingProfilesModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function GamingProfilesModal({ isOpen, onClose }: GamingProfilesModalProps) {
    const [copiedId, setCopiedId] = useState<string>("");
    const [showToast, setShowToast] = useState(false);
    const [toastText, setToastText] = useState("");

    const copyToClipboard = async (text: string, game: string) => {
        try {
            await navigator.clipboard.writeText(text);
            setCopiedId(game);
            
            // Determine if it's a UID (numeric) or username
            const isUID = /^\d+$/.test(text);
            setToastText(isUID ? "UID copied" : "Username copied");
            setShowToast(true);
            
            // Hide button state after 2s
            setTimeout(() => setCopiedId(""), 2000);
            
            // Hide toast after 3s
            setTimeout(() => setShowToast(false), 3000);
        } catch (err) {
            console.error('Failed to copy: ', err);
            setToastText("Failed to copy");
            setShowToast(true);
            setTimeout(() => setShowToast(false), 3000);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Modal Container with Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            transition={{ duration: 0.3, ease: "easeOut" }}
                            className="relative backdrop-blur-md bg-white/90 dark:bg-neutral-950/90 rounded-2xl border border-neutral-300 dark:border-neutral-800 shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
                            onClick={(e) => e.stopPropagation()}
                        >
                            
                            {/* Toast */}
                            <AnimatePresence>
                                {showToast && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -20, scale: 0.9 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: -20, scale: 0.9 }}
                                        transition={{ duration: 0.3, ease: "easeOut" }}
                                        className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg text-sm font-medium"
                                    >
                                        {toastText}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                            
                            {/* Header */}
                            <div className="flex items-center justify-center mb-6 relative">
                                <h3 className="text-2xl font-semibold text-neutral-800 dark:text-white">
                                    Accounts
                                </h3>
                                <button
                                    onClick={onClose}
                                    className="absolute right-0 p-2 rounded-full hover:bg-neutral-200/50 dark:hover:bg-white/10 transition-colors duration-200"
                                >
                                    <CloseIcon className="w-5 h-5 text-neutral-600 dark:text-neutral-400" />
                                </button>
                            </div>

                            {/* Featured Profile */}
                            {gamingProfiles.filter(profile => profile.featured).map((profile) => (
                                <motion.div
                                    key={profile.game}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 }}
                                    className="mb-6 p-4 rounded-xl bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20"
                                >
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-3">
                                            <div className="w-10 h-10 flex items-center justify-center">
                                                {createIconComponent(profile.iconSlug, { className: "w-8 h-8" })}
                                            </div>
                                            <div>
                                                <p className="font-semibold text-neutral-800 dark:text-white">{profile.game}</p>
                                                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                                                    Creator of WuWaBuilds
                                                </p>
                                                {profile.userId && (
                                                    <p className="text-sm font-mono text-neutral-700 dark:text-neutral-300">
                                                        ID: {profile.userId}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                        {profile.userId && (
                                            <button
                                                onClick={() => copyToClipboard(profile.userId!, profile.game)}
                                                className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-blue-500/20 hover:bg-blue-500/30 transition-colors duration-200"
                                            >
                                                <ContentCopyIcon className="w-4 h-4" />
                                                <span className="text-sm">
                                                    {copiedId === profile.game ? "Copied!" : "Copy ID"}
                                                </span>
                                            </button>
                                        )}
                                    </div>
                                </motion.div>
                            ))}

                            {/* Other Profiles */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {gamingProfiles.filter(profile => !profile.featured).map((profile, index) => (
                                    <motion.div
                                        key={profile.game}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.2 + index * 0.1 }}
                                        className="flex items-center space-x-3 p-4 rounded-lg bg-neutral-100/50 dark:bg-white/5 hover:bg-neutral-200/50 dark:hover:bg-white/10 transition-all duration-200 group"
                                    >
                                        <div className="w-10 h-10 flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                                            {createIconComponent(profile.iconSlug, { className: "w-8 h-8" })}
                                        </div>
                                        <div className="flex-grow">
                                            <p className="font-medium text-neutral-800 dark:text-white">{profile.game}</p>
                                            <p className="text-sm text-neutral-600 dark:text-neutral-400 font-mono">
                                                {profile.username || profile.userId}
                                            </p>
                                        </div>
                                        {profile.url ? (
                                            <a
                                                href={profile.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="p-2 rounded-lg hover:bg-neutral-300/50 dark:hover:bg-white/20 transition-colors duration-200"
                                            >
                                                <LaunchIcon className="w-4 h-4 text-neutral-600 dark:text-neutral-400" />
                                            </a>
                                        ) : (
                                            <button
                                                onClick={() => copyToClipboard(profile.username || profile.userId!, profile.game)}
                                                className="p-2 rounded-lg hover:bg-neutral-300/50 dark:hover:bg-white/20 transition-colors duration-200"
                                            >
                                                <ContentCopyIcon className={`w-4 h-4 ${copiedId === profile.game ? 'text-green-500' : 'text-neutral-600 dark:text-neutral-400'}`} />
                                            </button>
                                        )}
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}

// Hook to use the modal
export function useGamingProfilesModal() {
    const [isOpen, setIsOpen] = useState(false);

    return {
        isOpen,
        openModal: () => setIsOpen(true),
        closeModal: () => setIsOpen(false),
        Modal: (props: object) => (
            <GamingProfilesModal isOpen={isOpen} onClose={() => setIsOpen(false)} {...props} />
        )
    };
}