"use client";

import { motion } from "motion/react";
import EmailIcon from '@mui/icons-material/Email';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import CodeIcon from '@mui/icons-material/Code';

const socialLinks = [
    {
        label: "GitHub",
        href: "https://github.com/DommyMM",
        icon: <GitHubIcon className="w-5 h-5" />
    },
    {
        label: "LinkedIn", 
        href: "https://linkedin.com/in/dominic-aung/",
        icon: <LinkedInIcon className="w-5 h-5" />
    },
    {
        label: "Email",
        href: "mailto:dominichhaung@gmail.com",
        icon: <EmailIcon className="w-5 h-5" />
    },
    {
        label: "Source",
        href: "https://github.com/DommyMM/portfolio",
        icon: <CodeIcon className="w-5 h-5" />
    }
];

interface FooterProps {
    isReducedMotion?: boolean;
}

export default function Footer({ isReducedMotion }: FooterProps) {
    return (
        <footer className="border-t border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900">
            <div className="max-w-4xl mx-auto px-4 py-8">
                <div className="flex flex-col items-center gap-6">
                    {/* Social Links */}
                    <div className="flex items-center gap-6">
                        {socialLinks.map((link, index) => (
                            <motion.a
                                key={link.label}
                                href={link.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group flex items-center gap-2 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
                                initial={isReducedMotion ? {} : { opacity: 0, y: 20 }}
                                whileInView={isReducedMotion ? {} : { opacity: 1, y: 0 }}
                                transition={isReducedMotion ? {} : { duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                whileHover={isReducedMotion ? {} : { y: -2 }}
                            >
                                {link.icon}
                                <span className="text-sm font-medium">{link.label}</span>
                            </motion.a>
                        ))}
                    </div>
                    
                    {/* Credit */}
                    <motion.div 
                        className="text-center text-sm text-neutral-500 dark:text-neutral-500"
                        initial={isReducedMotion ? {} : { opacity: 0, y: 20 }}
                        whileInView={isReducedMotion ? {} : { opacity: 1, y: 0 }}
                        transition={isReducedMotion ? {} : { duration: 0.5, delay: 0.4 }}
                        viewport={{ once: true }}
                    >
                        Built with Next.js, TypeScript & Tailwind CSS
                    </motion.div>
                </div>
            </div>
        </footer>
    );
} 