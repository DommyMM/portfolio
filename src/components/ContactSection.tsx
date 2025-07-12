"use client";

import { motion } from "motion/react";
import { MagicButton } from "@/components/ui/Button";
import { useState } from "react";
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import LaunchIcon from '@mui/icons-material/Launch';
import SendIcon from '@mui/icons-material/Send';

const contactInfo = [
    {
        label: "Email",
        value: "dominichhaung@gmail.com",
        href: "mailto:dominichhaung@gmail.com",
        icon: <EmailIcon className="w-5 h-5" />
    },
    {
        label: "Phone",
        value: "(619) 984-2069",
        href: "tel:+16199842069",
        icon: <PhoneIcon className="w-5 h-5" />
    },
    {
        label: "Location",
        value: "Davis, CA",
        href: undefined,
        icon: <LocationOnIcon className="w-5 h-5" />
    }
];

const socialLinks = [
    {
        label: "GitHub",
        value: "github.com/DommyMM",
        href: "https://github.com/DommyMM",
        icon: <GitHubIcon className="w-5 h-5" />
    },
    {
        label: "LinkedIn",
        value: "linkedin.com/in/dominic-aung",
        href: "https://linkedin.com/in/dominic-aung/",
        icon: <LinkedInIcon className="w-5 h-5" />
    }
];

export default function ContactSection() {
    const [showToast, setShowToast] = useState(false);
    const [toastText, setToastText] = useState("");

    const handleEmailClick = () => {
        // Try mailto first
        window.location.href = "mailto:dominichhaung@gmail.com?subject=Let's work together!&body=Hi Dominic,%0A%0AI'd love to discuss...";
        
        // Fallback: copy to clipboard after delay
        setTimeout(() => {
            navigator.clipboard.writeText("dominichhaung@gmail.com")
                .then(() => {
                    setToastText("Email copied to clipboard!");
                    setShowToast(true);
                    setTimeout(() => setShowToast(false), 3000);
                })
                .catch(() => {
                    setToastText("Please copy: dominichhaung@gmail.com");
                    setShowToast(true);
                    setTimeout(() => setShowToast(false), 3000);
                });
        }, 1000);
    };

    return (
        <section id="contact" className="py-24 relative">
            <div className="max-w-4xl mx-auto px-4">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <motion.h2 
                        className="text-3xl font-semibold text-neutral-800 dark:text-white mb-4"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        Let&apos;s Connect
                    </motion.h2>
                    <motion.p 
                        className="text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        viewport={{ once: true }}
                    >
                        Open to exciting projects and collaboration opportunities.
                    </motion.p>
                </div>

                {/* Main Contact Container */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="relative backdrop-blur-md bg-white/80 dark:bg-neutral-950/80 rounded-2xl border border-neutral-300 dark:border-neutral-800 shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] p-8"
                >
                    {/* Headers */}
                    <div className="grid md:grid-cols-2 gap-8 mb-4">
                        <h3 className="text-xl font-semibold text-neutral-800 dark:text-white text-center">
                            Get In Touch
                        </h3>
                        <h3 className="text-xl font-semibold text-neutral-800 dark:text-white text-center">
                            Connect With Me
                        </h3>
                    </div>

                    {/* Contact Items - 2x3 Grid */}
                    <div className="grid md:grid-cols-2 gap-6">
                        {/* Contact Info */}
                        {contactInfo.map((info, index) => (
                            <motion.div
                                key={info.label}
                                className={`flex items-center space-x-3 p-3 rounded-lg transition-all duration-300 hover:bg-neutral-100/50 dark:hover:bg-white/5 group ${info.href ? 'cursor-pointer' : ''}`}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                                viewport={{ once: true }}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => info.href && window.open(info.href, info.href.startsWith('mailto:') ? '_self' : '_blank')}
                            >
                                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-500/10 dark:bg-blue-500/20 flex items-center justify-center text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform duration-300">
                                    {info.icon}
                                </div>
                                <div className="flex-grow">
                                    <p className="text-sm text-neutral-500 dark:text-neutral-400">{info.label}</p>
                                    <p className="text-neutral-800 dark:text-neutral-200 font-medium">{info.value}</p>
                                </div>
                            </motion.div>
                        ))}

                        {/* Social Links */}
                        {socialLinks.map((link, index) => (
                            <motion.a
                                key={link.label}
                                href={link.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center space-x-3 p-3 rounded-lg transition-all duration-300 hover:bg-neutral-100/50 dark:hover:bg-white/5 group"
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                                viewport={{ once: true }}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-purple-500/10 dark:bg-purple-500/20 flex items-center justify-center text-purple-600 dark:text-purple-400 group-hover:scale-110 transition-transform duration-300">
                                    {link.icon}
                                </div>
                                <div className="flex-grow">
                                    <p className="text-sm text-neutral-500 dark:text-neutral-400">{link.label}</p>
                                    <p className="text-neutral-800 dark:text-neutral-200 font-medium">{link.value}</p>
                                </div>
                                <LaunchIcon className="w-4 h-4 text-neutral-400 group-hover:text-neutral-600 dark:group-hover:text-neutral-300 transition-colors duration-300" />
                            </motion.a>
                        ))}
                    </div>
                </motion.div>

                {/* CTA Button */}
                <motion.div 
                    className="mt-8 flex justify-center relative"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    viewport={{ once: true }}
                >
                    {/* Toast Notification - Absolutely Positioned Above Button */}
                    {showToast && (
                        <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.9 }}
                            transition={{ duration: 0.3, ease: "easeOut" }}
                            className="absolute -top-16 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg text-sm font-medium z-10"
                        >
                            {toastText}
                        </motion.div>
                    )}
                    
                    <MagicButton
                        title="Send Me an Email"
                        icon={<SendIcon className="w-4 h-4" />}
                        position="right"
                        handleClick={handleEmailClick}
                        otherClasses="justify-center"
                    />
                </motion.div>
            </div>
        </section>
    );
}