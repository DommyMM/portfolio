"use client";

import { motion } from "motion/react";
import { MagicButton } from "@/components/ui/Button";

const contactInfo = [
    {
        label: "Email",
        value: "daung@ucdavis.edu",
        href: "mailto:daung@ucdavis.edu",
        icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 7.89a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
        )
    },
    {
        label: "Phone",
        value: "(619) 984-2069",
        href: "tel:+16199842069",
        icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
        )
    },
    {
        label: "Location",
        value: "Davis, CA",
        href: "https://maps.google.com/?q=Davis,CA",
        icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
        )
    }
];

const socialLinks = [
    {
        label: "GitHub",
        value: "github.com/DommyMM",
        href: "https://github.com/DommyMM",
        icon: (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
            </svg>
        )
    },
    {
        label: "LinkedIn",
        value: "linkedin.com/in/dominic-aung",
        href: "https://linkedin.com/in/dominic-aung/",
        icon: (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
        )
    },
    {
        label: "Portfolio",
        value: "dominicau.ng",
        href: "https://dominicau.ng",
        icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
            </svg>
        )
    }
];

export default function ContactSection() {
    const handleEmailClick = () => {
        window.location.href = "mailto:daung@ucdavis.edu?subject=Let's work together!&body=Hi Dominic,%0A%0AI'd love to discuss...";
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
                        Let's Build Something Amazing
                    </motion.h2>
                    <motion.p 
                        className="text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        viewport={{ once: true }}
                    >
                        Open to <span className="text-blue-400 font-medium">internship opportunities</span> and 
                        exciting projects. Currently exploring roles in AI/ML, full-stack development, and 
                        innovative tech solutions.
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
                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Contact Information */}
                        <div className="space-y-6">
                            <h3 className="text-xl font-semibold text-neutral-800 dark:text-white mb-4">
                                Get In Touch
                            </h3>
                            
                            {contactInfo.map((item, index) => (
                                <motion.a
                                    key={item.label}
                                    href={item.href}
                                    target={item.label === "Location" ? "_blank" : undefined}
                                    rel={item.label === "Location" ? "noopener noreferrer" : undefined}
                                    className="flex items-center space-x-3 p-3 rounded-lg transition-all duration-300 hover:bg-neutral-100/50 dark:hover:bg-white/5 group"
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                                    viewport={{ once: true }}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-500/10 dark:bg-blue-500/20 flex items-center justify-center text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform duration-300">
                                        {item.icon}
                                    </div>
                                    <div>
                                        <p className="text-sm text-neutral-500 dark:text-neutral-400">{item.label}</p>
                                        <p className="text-neutral-800 dark:text-neutral-200 font-medium">{item.value}</p>
                                    </div>
                                </motion.a>
                            ))}
                        </div>

                        {/* Social Links & CTA */}
                        <div className="space-y-6">
                            <h3 className="text-xl font-semibold text-neutral-800 dark:text-white mb-4">
                                Connect With Me
                            </h3>
                            
                            <div className="space-y-4">
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
                                        <div>
                                            <p className="text-sm text-neutral-500 dark:text-neutral-400">{link.label}</p>
                                            <p className="text-neutral-800 dark:text-neutral-200 font-medium">{link.value}</p>
                                        </div>
                                    </motion.a>
                                ))}
                            </div>

                            {/* CTA Button */}
                            <motion.div 
                                className="pt-6 border-t border-neutral-200 dark:border-neutral-700"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.8 }}
                                viewport={{ once: true }}
                            >
                                <MagicButton
                                    title="Send Me an Email"
                                    icon={
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                        </svg>
                                    }
                                    position="right"
                                    handleClick={handleEmailClick}
                                    otherClasses="w-full justify-center"
                                />
                            </motion.div>

                            {/* Availability Status */}
                            <motion.div 
                                className="flex items-center space-x-2 text-sm text-green-600 dark:text-green-400"
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                transition={{ duration: 0.6, delay: 1 }}
                                viewport={{ once: true }}
                            >
                                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                <span>Available for internship opportunities</span>
                            </motion.div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}