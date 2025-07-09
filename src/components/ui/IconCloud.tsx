"use client";

import React, { useEffect, useRef, useState } from "react";

interface Icon {
    x: number;
    y: number;
    z: number;
    scale: number;
    opacity: number;
    id: number;
}

interface IconCloudProps {
    icons?: React.ReactNode[];
    images?: string[];
}

function easeOutCubic(t: number): number {
    return 1 - Math.pow(1 - t, 3);
}

export function IconCloud({ icons, images }: IconCloudProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [iconPositions, setIconPositions] = useState<Icon[]>([]);
    const [rotation, setRotation] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const [lastMousePos, setLastMousePos] = useState({ x: 0, y: 0 });
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [targetRotation, setTargetRotation] = useState<{
        x: number;
        y: number;
        startX: number;
        startY: number;
        distance: number;
        startTime: number;
        duration: number;
    } | null>(null);
    const animationFrameRef = useRef<number | undefined>(undefined);
    const rotationRef = useRef(rotation);

    // Generate initial icon positions on a sphere
    useEffect(() => {
        const items = icons || images || [];
        const newIcons: Icon[] = [];
        const numIcons = items.length || 20;

        // Fibonacci sphere parameters
        const offset = 2 / numIcons;
        const increment = Math.PI * (3 - Math.sqrt(5));

        for (let i = 0; i < numIcons; i++) {
            const y = i * offset - 1 + offset / 2;
            const r = Math.sqrt(1 - y * y);
            const phi = i * increment;

            const x = Math.cos(phi) * r;
            const z = Math.sin(phi) * r;

            newIcons.push({
                x: x * 120,
                y: y * 120,
                z: z * 120,
                scale: 1,
                opacity: 1,
                id: i,
            });
        }
        setIconPositions(newIcons);
    }, [icons, images]);

    // Handle mouse events
    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = containerRef.current?.getBoundingClientRect();
        if (!rect) return;

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Check if clicking on an icon for focus animation
        iconPositions.forEach((icon) => {
            const cosX = Math.cos(rotationRef.current.x);
            const sinX = Math.sin(rotationRef.current.x);
            const cosY = Math.cos(rotationRef.current.y);
            const sinY = Math.sin(rotationRef.current.y);

            const rotatedX = icon.x * cosY - icon.z * sinY;
            const rotatedZ = icon.x * sinY + icon.z * cosY;
            const rotatedY = icon.y * cosX + rotatedZ * sinX;

            const screenX = 200 + rotatedX;
            const screenY = 200 + rotatedY;

            const scale = (rotatedZ + 200) / 300;
            const radius = 20 * scale;
            const dx = x - screenX;
            const dy = y - screenY;

            if (dx * dx + dy * dy < radius * radius) {
                const targetX = -Math.atan2(
                    icon.y,
                    Math.sqrt(icon.x * icon.x + icon.z * icon.z),
                );
                const targetY = Math.atan2(icon.x, icon.z);

                const currentX = rotationRef.current.x;
                const currentY = rotationRef.current.y;
                const distance = Math.sqrt(
                    Math.pow(targetX - currentX, 2) + Math.pow(targetY - currentY, 2),
                );

                const duration = Math.min(2000, Math.max(800, distance * 1000));

                setTargetRotation({
                    x: targetX,
                    y: targetY,
                    startX: currentX,
                    startY: currentY,
                    distance,
                    startTime: performance.now(),
                    duration,
                });
                return;
            }
        });

        setIsDragging(true);
        setLastMousePos({ x: e.clientX, y: e.clientY });
    };

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = containerRef.current?.getBoundingClientRect();
        if (rect) {
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            setMousePos({ x, y });
        }

        if (isDragging) {
            const deltaX = e.clientX - lastMousePos.x;
            const deltaY = e.clientY - lastMousePos.y;

            rotationRef.current = {
                x: rotationRef.current.x + deltaY * 0.002,
                y: rotationRef.current.y + deltaX * 0.002,
            };

            setLastMousePos({ x: e.clientX, y: e.clientY });
        }
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    // Animation loop
    useEffect(() => {
        const animate = () => {
            const centerX = 200;
            const centerY = 200;
            const maxDistance = Math.sqrt(centerX * centerX + centerY * centerY);
            const dx = mousePos.x - centerX;
            const dy = mousePos.y - centerY;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const speed = 0.003 + (distance / maxDistance) * 0.01;

            if (targetRotation) {
                const elapsed = performance.now() - targetRotation.startTime;
                const progress = Math.min(1, elapsed / targetRotation.duration);
                const easedProgress = easeOutCubic(progress);

                rotationRef.current = {
                    x:
                        targetRotation.startX +
                        (targetRotation.x - targetRotation.startX) * easedProgress,
                    y:
                        targetRotation.startY +
                        (targetRotation.y - targetRotation.startY) * easedProgress,
                };

                if (progress >= 1) {
                    setTargetRotation(null);
                }
            } else if (!isDragging) {
                rotationRef.current = {
                    x: rotationRef.current.x + (dy / 400) * speed,
                    y: rotationRef.current.y + (dx / 400) * speed,
                };
            }

            setRotation({ ...rotationRef.current });
            animationFrameRef.current = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
        };
    }, [mousePos, isDragging, targetRotation]);

    const items = icons || images || [];

    return (
        <div
            ref={containerRef}
            className="relative w-[400px] h-[400px] rounded-lg overflow-hidden cursor-grab active:cursor-grabbing"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            aria-label="Interactive 3D Icon Cloud"
            role="img"
            style={{ 
                perspective: '800px',
                transformStyle: 'preserve-3d'
            }}
        >
            <div 
                className="absolute inset-0 transition-transform duration-75 ease-out"
                style={{
                    transform: `rotateX(${rotation.x}rad) rotateY(${rotation.y}rad)`,
                    transformStyle: 'preserve-3d'
                }}
            >
                {iconPositions.map((icon, index) => {
                    if (index >= items.length) return null;

                    const cosX = Math.cos(rotation.x);
                    const sinX = Math.sin(rotation.x);
                    const cosY = Math.cos(rotation.y);
                    const sinY = Math.sin(rotation.y);

                    const rotatedX = icon.x * cosY - icon.z * sinY;
                    const rotatedZ = icon.x * sinY + icon.z * cosY;
                    const rotatedY = icon.y * cosX + rotatedZ * sinX;

                    const scale = Math.max(0.3, Math.min(1.2, (rotatedZ + 200) / 300));
                    const opacity = Math.max(0.2, Math.min(1, (rotatedZ + 150) / 200));
                    const zIndex = Math.round(rotatedZ + 200);

                    return (
                        <div
                            key={index}
                            className="absolute transition-all duration-100 ease-out hover:scale-110"
                            style={{
                                left: '50%',
                                top: '50%',
                                transform: `translate(-50%, -50%) translate3d(${rotatedX}px, ${rotatedY}px, ${rotatedZ}px) scale(${scale})`,
                                opacity,
                                zIndex,
                                transformStyle: 'preserve-3d'
                            }}
                        >
                            <div className="w-10 h-10 flex items-center justify-center transition-transform duration-200 hover:scale-110">
                                {icons ? (
                                    // Render React component
                                    <div className="w-8 h-8 flex items-center justify-center">
                                        {items[index]}
                                    </div>
                                ) : images ? (
                                    // Render image
                                    <img
                                        src={items[index] as string}
                                        alt={`Icon ${index + 1}`}
                                        className="w-8 h-8 object-contain rounded"
                                        loading="lazy"
                                    />
                                ) : (
                                    // Fallback numbered circles
                                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                                        {icon.id + 1}
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}