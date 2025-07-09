"use client";

import { motion } from "motion/react";
import { MagicButton } from "@/components/ui/Button";
import { useGamingProfilesModal, GamingProfilesModal } from "@/components/ui/GameModal";
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import LaunchIcon from '@mui/icons-material/Launch';
import SendIcon from '@mui/icons-material/Send';

const contactInfo = [
    {
        label: "Email",
        value: "daung@ucdavis.edu",
        href: "mailto:daung@ucdavis.edu",
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
    },
    {
        label: "Game Corner",
        value: "Let's play together!",
        href: undefined,
        icon: <SportsEsportsIcon className="w-5 h-5" />,
        isModal: true
    }
];

export default function ContactSection() {
    const { isOpen, openModal, closeModal } = useGamingProfilesModal();

    const handleEmailClick = () => {
        window.location.href = "mailto:daung@ucdavis.edu?subject=Let's work together!&body=Hi Dominic,%0A%0AI'd love to discuss...";
    };

    const handleSocialClick = (link: any) => {
        if (link.isModal) {
            openModal();
        } else if (link.href) {
            window.open(link.href, '_blank');
        }
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
                    {/* Headers - Outside the grid */}
                    <div className="grid md:grid-cols-2 gap-8 mb-4">
                        <h3 className="text-xl font-semibold text-neutral-800 dark:text-white text-center">
                            Get In Touch
                        </h3>
                        <h3 className="text-xl font-semibold text-neutral-800 dark:text-white text-center">
                            Connect With Me
                        </h3>
                    </div>

                    {/* Contact Items - 2x3 Grid */}
                    <div className="grid md:grid-cols-2 md:grid-rows-3 gap-6">
                        {/* Row 1: Email & GitHub */}
                        <motion.a
                            href={contactInfo[0].href}
                            className="flex items-center space-x-3 p-3 rounded-lg transition-all duration-300 hover:bg-neutral-100/50 dark:hover:bg-white/5 group"
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            viewport={{ once: true }}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-500/10 dark:bg-blue-500/20 flex items-center justify-center text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform duration-300">
                                {contactInfo[0].icon}
                            </div>
                            <div className="flex-grow">
                                <p className="text-sm text-neutral-500 dark:text-neutral-400">{contactInfo[0].label}</p>
                                <p className="text-neutral-800 dark:text-neutral-200 font-medium">{contactInfo[0].value}</p>
                            </div>
                        </motion.a>

                        <motion.a
                            href={socialLinks[0].href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center space-x-3 p-3 rounded-lg transition-all duration-300 hover:bg-neutral-100/50 dark:hover:bg-white/5 group"
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                            viewport={{ once: true }}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-purple-500/10 dark:bg-purple-500/20 flex items-center justify-center text-purple-600 dark:text-purple-400 group-hover:scale-110 transition-transform duration-300">
                                {socialLinks[0].icon}
                            </div>
                            <div className="flex-grow">
                                <p className="text-sm text-neutral-500 dark:text-neutral-400">{socialLinks[0].label}</p>
                                <p className="text-neutral-800 dark:text-neutral-200 font-medium">{socialLinks[0].value}</p>
                            </div>
                            <LaunchIcon className="w-4 h-4 text-neutral-400 group-hover:text-neutral-600 dark:group-hover:text-neutral-300 transition-colors duration-300" />
                        </motion.a>

                        {/* Row 2: Phone & LinkedIn */}
                        <motion.a
                            href={contactInfo[1].href}
                            className="flex items-center space-x-3 p-3 rounded-lg transition-all duration-300 hover:bg-neutral-100/50 dark:hover:bg-white/5 group"
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                            viewport={{ once: true }}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-500/10 dark:bg-blue-500/20 flex items-center justify-center text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform duration-300">
                                {contactInfo[1].icon}
                            </div>
                            <div className="flex-grow">
                                <p className="text-sm text-neutral-500 dark:text-neutral-400">{contactInfo[1].label}</p>
                                <p className="text-neutral-800 dark:text-neutral-200 font-medium">{contactInfo[1].value}</p>
                            </div>
                        </motion.a>

                        <motion.a
                            href={socialLinks[1].href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center space-x-3 p-3 rounded-lg transition-all duration-300 hover:bg-neutral-100/50 dark:hover:bg-white/5 group"
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.5 }}
                            viewport={{ once: true }}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-purple-500/10 dark:bg-purple-500/20 flex items-center justify-center text-purple-600 dark:text-purple-400 group-hover:scale-110 transition-transform duration-300">
                                {socialLinks[1].icon}
                            </div>
                            <div className="flex-grow">
                                <p className="text-sm text-neutral-500 dark:text-neutral-400">{socialLinks[1].label}</p>
                                <p className="text-neutral-800 dark:text-neutral-200 font-medium">{socialLinks[1].value}</p>
                            </div>
                            <LaunchIcon className="w-4 h-4 text-neutral-400 group-hover:text-neutral-600 dark:group-hover:text-neutral-300 transition-colors duration-300" />
                        </motion.a>

                        {/* Row 3: Location & Game Corner */}
                        <motion.div
                            className="flex items-center space-x-3 p-3 rounded-lg transition-all duration-300 hover:bg-neutral-100/50 dark:hover:bg-white/5 group"
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.5 }}
                            viewport={{ once: true }}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-500/10 dark:bg-blue-500/20 flex items-center justify-center text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform duration-300">
                                {contactInfo[2].icon}
                            </div>
                            <div className="flex-grow">
                                <p className="text-sm text-neutral-500 dark:text-neutral-400">{contactInfo[2].label}</p>
                                <p className="text-neutral-800 dark:text-neutral-200 font-medium">{contactInfo[2].value}</p>
                            </div>
                        </motion.div>

                        <motion.button
                            onClick={() => handleSocialClick(socialLinks[2])}
                            className="flex items-center space-x-3 p-3 rounded-lg transition-all duration-300 hover:bg-neutral-100/50 dark:hover:bg-white/5 group"
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.6 }}
                            viewport={{ once: true }}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-purple-500/10 dark:bg-purple-500/20 flex items-center justify-center text-purple-600 dark:text-purple-400 group-hover:scale-110 transition-transform duration-300">
                                {socialLinks[2].icon}
                            </div>
                            <div className="flex-grow">
                                <p className="text-sm text-neutral-500 dark:text-neutral-400">{socialLinks[2].label}</p>
                                <p className="text-neutral-800 dark:text-neutral-200 font-medium">{socialLinks[2].value}</p>
                            </div>
                        </motion.button>
                    </div>
                </motion.div>

                {/* CTA Button - Outside the glassmorphic box */}
                <motion.div 
                    className="mt-8 flex justify-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    viewport={{ once: true }}
                >
                    <MagicButton
                        title="Send Me an Email"
                        icon={<SendIcon className="w-4 h-4" />}
                        position="right"
                        handleClick={handleEmailClick}
                        otherClasses="justify-center"
                    />
                </motion.div>
            </div>

            {/* Gaming Profiles Modal */}
            <GamingProfilesModal isOpen={isOpen} onClose={closeModal} />
        </section>
    );
}