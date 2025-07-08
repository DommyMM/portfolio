"use client";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "motion/react";
import React, { useRef, useState, useEffect } from "react";

interface NavbarProps {
    children: React.ReactNode;
    className?: string;
}

interface NavBodyProps {
    children: React.ReactNode;
    className?: string;
    visible?: boolean;
}

interface NavItemsProps {
    items: {
        name: string;
        link: string;
    }[];
    className?: string;
    onItemClick?: () => void;
    visible?: boolean;
    activeSection?: string;
}

interface MobileNavProps {
    children: React.ReactNode;
    className?: string;
    visible?: boolean;
}

interface MobileNavHeaderProps {
    children: React.ReactNode;
    className?: string;
}

interface MobileNavMenuProps {
    children: React.ReactNode;
    className?: string;
    isOpen: boolean;
}

export const Navbar = ({ children, className }: NavbarProps) => {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollY } = useScroll({
        target: ref,
        offset: ["start start", "end start"],
    });
    const [visible, setVisible] = useState<boolean>(false);

    useMotionValueEvent(scrollY, "change", (latest) => {
        if (latest > 100) {
            setVisible(true);
        } else {
            setVisible(false);
        }
    });

    return (
        <motion.div
            ref={ref}
            className={cn("fixed inset-x-0 top-4 z-50 w-full", className)}
        >
            {React.Children.map(children, (child) =>
                React.isValidElement(child)
                    ? React.cloneElement(
                        child as React.ReactElement<{ visible?: boolean }>,
                        { visible },
                    )
                    : child,
            )}
        </motion.div>
    );
};

export const NavBody = ({ children, className, visible }: NavBodyProps) => {
    const [width, setWidth] = useState("100%");

    useEffect(() => {
        function updateWidth() {
            const vw = window.innerWidth;
            if (!visible) {
                setWidth("100%");
            } else if (vw <= 640) {
                setWidth("85%");
            } else if (vw <= 1400) {
                setWidth("65%");
            } else if (vw <= 1920) {
                setWidth("50%");
            } else {
                setWidth("40%");
            }
        }
        updateWidth();
        window.addEventListener("resize", updateWidth);
        return () => window.removeEventListener("resize", updateWidth);
    }, [visible]);

    return (
        <motion.div
            animate={{
                width,
                backdropFilter: visible ? "blur(10px)" : "none",
                boxShadow: visible
                    ? "0 0 24px rgba(34, 42, 53, 0.06), 0 1px 1px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(34, 42, 53, 0.04), 0 0 4px rgba(34, 42, 53, 0.08), 0 16px 68px rgba(47, 48, 55, 0.05), 0 1px 0 rgba(255, 255, 255, 0.1) inset"
                    : "none",
                y: visible ? 0 : 0,
            }}
            transition={{
                type: "spring",
                stiffness: 200,
                damping: 50,
            }}
            className={cn(
                "relative z-[60] mx-auto hidden flex-row items-center self-start rounded-full bg-transparent lg:flex dark:bg-transparent px-4 py-2 lg:px-6 lg:py-3 xl:px-8 xl:py-4 justify-between",
                visible && "bg-white/80 dark:bg-neutral-950/80",
                className,
            )}
        >
            {React.Children.map(children, (child) =>
                React.isValidElement(child) && typeof child.type !== "string"
                    ? React.cloneElement(
                        child as React.ReactElement<{ visible?: boolean }>,
                        { visible },
                    )
                    : child,
            )}
        </motion.div>
    );
};

export const NavItems = ({ items, className, onItemClick, visible, activeSection }: NavItemsProps) => {
    const [hovered, setHovered] = useState<number | null>(null);

    return (
        <motion.div
            onMouseLeave={() => setHovered(null)}
            className={cn(
                "absolute inset-0 hidden flex-1 flex-row items-center justify-center space-x-2 font-medium text-zinc-600 transition-all duration-300 hover:text-zinc-800 lg:flex lg:space-x-2",
                visible ? "text-xl" : "text-2xl",
                className,
            )}
        >
            {items.map((item, idx) => {
                const sectionId = item.link.substring(1); // Remove # from link
                const isActive = activeSection === sectionId;
                return (
                    <a
                        onMouseEnter={() => setHovered(idx)}
                        onClick={onItemClick}
                        className={cn(
                            "relative px-5 py-3 transition-colors duration-300",
                            isActive 
                                ? "text-blue-600 dark:text-blue-400 font-semibold" 
                                : "text-neutral-600 dark:text-neutral-300"
                        )}
                        key={`link-${idx}`}
                        href={item.link}
                    >
                        {/* Active section highlight */}
                        {isActive && (
                            <motion.div
                                layoutId="activeSection"
                                className="absolute inset-0 h-full w-full rounded-full bg-blue-100/50 dark:bg-blue-900/30"
                                transition={{ duration: 0.3, ease: "easeOut" }}
                            />
                        )}
                        {/* Hover effect - existing functionality */}
                        {hovered === idx && !isActive && (
                            <motion.div
                                layoutId="hovered"
                                className="absolute inset-0 h-full w-full rounded-full bg-gray-100 dark:bg-neutral-800"
                            />
                        )}
                        <span className="relative z-20">{item.name}</span>
                    </a>
                );
            })}
        </motion.div>
    );
};

export const MobileNav = ({ children, className, visible }: MobileNavProps) => {
    return (
        <motion.div
            animate={{
                backdropFilter: visible ? "blur(10px)" : "none",
                boxShadow: visible
                    ? "0 0 24px rgba(34, 42, 53, 0.06), 0 1px 1px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(34, 42, 53, 0.04), 0 0 4px rgba(34, 42, 53, 0.08), 0 16px 68px rgba(47, 48, 55, 0.05), 0 1px 0 rgba(255, 255, 255, 0.1) inset"
                    : "none",
                width: visible ? "85%" : "100%",
                paddingRight: visible ? "16px" : "0px",
                paddingLeft: visible ? "16px" : "0px",
                borderRadius: visible ? "12px" : "2rem",
                y: visible ? 0 : 0,
            }}
            transition={{
                type: "spring",
                stiffness: 200,
                damping: 50,
            }}
            className={cn(
                "relative z-50 mx-auto flex w-full max-w-[calc(100vw-2rem)] flex-col items-center justify-between bg-transparent px-0 py-3 lg:hidden",
                visible && "bg-white/80 dark:bg-neutral-950/80",
                className,
            )}
        >
            {children}
        </motion.div>
    );
};

export const MobileNavHeader = ({
    children,
    className,
}: MobileNavHeaderProps) => {
    return (
        <div
            className={cn(
                "flex w-full flex-row items-center justify-between",
                className,
            )}
        >
            {children}
        </div>
    );
};

export const MobileNavMenu = ({
    children,
    className,
    isOpen,
}: MobileNavMenuProps) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className={cn(
                        "absolute inset-x-0 top-16 z-50 flex w-full flex-col items-start justify-start gap-4 rounded-lg bg-white/95 dark:bg-neutral-950/95 backdrop-blur-md px-4 py-8 shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] mt-6 border-t border-neutral-300 dark:border-neutral-800",
                        className,
                    )}
                >
                    {children}
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export const MobileNavToggle = ({
    isOpen,
    onClick,
}: {
    isOpen: boolean;
    onClick: () => void;
}) => {
    return (
        <button
            className={cn(
                "hamburger hamburger--squeeze",
                isOpen && "is-active"
            )}
            onClick={onClick}
            aria-label="Toggle menu"
            type="button"
        >
            <span className="hamburger-box">
                <span className={cn(
                    "hamburger-inner",
                    "bg-black dark:bg-white",
                )}></span>
            </span>
        </button>
    );
};

export const NavbarLogo = ({ visible }: { visible?: boolean }) => {
    return (
        <a
            href="#"
            className="relative z-20 flex items-center space-x-2 px-3 py-2 font-normal text-black w-full justify-center md:w-auto md:justify-start"
        >
            <span className={cn(
                "font-bold text-black dark:text-white transition-all duration-300",
                visible ? "text-2xl" : "text-3xl"
            )}>
                {visible ? "DA" : "Dominic Aung"}
            </span>
        </a>
    );
};

export const NavbarButton = ({
    href,
    as: Tag = "a",
    children,
    className,
    variant = "primary",
    ...props
}: {
    href?: string;
    as?: React.ElementType;
    children: React.ReactNode;
    className?: string;
    variant?: "primary" | "secondary" | "dark" | "gradient";
} & (
    | React.ComponentPropsWithoutRef<"a">
    | React.ComponentPropsWithoutRef<"button">
)) => {
    const baseStyles =
        "px-4 py-2 rounded-md bg-white button bg-white text-black font-bold relative cursor-pointer hover:-translate-y-0.5 transition duration-200 inline-block text-center";

    const variantStyles = {
        primary:
            "shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]",
        secondary: "bg-transparent shadow-none dark:text-white",
        dark: "bg-black text-white shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]",
        gradient:
            "bg-gradient-to-b from-blue-500 to-blue-700 text-white shadow-[0px_2px_0px_0px_rgba(255,255,255,0.3)_inset]",
    };

    return (
        <Tag
            href={href || undefined}
            className={cn(baseStyles, variantStyles[variant], className)}
            {...props}
        >
            {children}
        </Tag>
    );
};