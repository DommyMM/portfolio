"use client";

import React, { useEffect, useRef, useState } from "react";
import { useScroll, useTransform, motion } from "motion/react";

const workEducationData = [
    {
        title: (
        <div className="text-center">
            <div className="text-sm text-green-400 mb-1">Start</div>
            <div>July 2025</div>
            <div className="text-sm text-red-400 mt-2 mb-1">End</div>
            <div>Sep. 2025</div>
        </div>
        ),
        content: (
        <div>
            <div className="mb-4">
            <h3 className="text-xl font-semibold text-white">Lumeno AI</h3>
            <p className="text-blue-400 font-medium">Software Engineer Intern</p>
            </div>
            <p className="text-gray-300 mb-4">New York, NY (Remote)</p>
            <div className="space-y-2">
            <p className="text-gray-300">• Incoming position developing AI-powered applications</p>
            <p className="text-gray-300">• Focus on machine learning infrastructure and data processing</p>
            </div>
        </div>
        ),
    },
    {
        title: (
        <div className="text-center">
            <div className="text-sm text-green-400 mb-1">Start</div>
            <div>May 2024</div>
            <div className="text-sm text-red-400 mt-2 mb-1">End</div>
            <div>May 2025</div>
        </div>
        ),
        content: (
        <div>
            <div className="mb-4">
            <h3 className="text-xl font-semibold text-white">UC Davis Shared Services Organization</h3>
            <p className="text-blue-400 font-medium">Administrative Assistant</p>
            </div>
            <p className="text-gray-300 mb-4">Davis, CA</p>
            <div className="space-y-2">
            <p className="text-gray-300">• <span className="text-blue-400 font-medium">30% reduction</span> in completion time through document workflow optimization, processing <span className="text-green-400 font-medium">1000+ applications</span></p>
            <p className="text-gray-300">• Automated document processing workflows using OnBase enterprise software for efficient document handling</p>
            </div>
        </div>
        ),
    },
    {
        title: (
        <div className="text-center">
            <div className="text-sm text-green-400 mb-1">Start</div>
            <div>Sept. 2023</div>
            <div className="text-sm text-red-400 mt-2 mb-1">End</div>
            <div>June 2027</div>
        </div>
        ),
        content: (
        <div>
            <div className="mb-4">
            <h3 className="text-xl font-semibold text-white">University of California, Davis</h3>
            <p className="text-purple-400 font-medium">Bachelor of Science in Computer Science</p>
            </div>
            <p className="text-gray-300 mb-4">Davis, CA</p>
            <div className="space-y-2">
            <p className="text-gray-300">• <span className="text-green-400 font-medium">3.8 GPA</span> in Computer Science Department</p>
            <p className="text-gray-300">• Relevant Coursework: Data Structures, Algorithms, Software Engineering, Database Systems</p>
            <p className="text-gray-300">• Expected Graduation: June 2027</p>
            </div>
        </div>
        ),
    },
    {
        title: (
        <div className="text-center">
            <div className="text-sm text-green-400 mb-1">Start</div>
            <div>July 2022</div>
            <div className="text-sm text-red-400 mt-2 mb-1">End</div>
            <div>Feb. 2023</div>
        </div>
        ),
        content: (
        <div>
            <div className="mb-4">
            <h3 className="text-xl font-semibold text-white">ACE Data Systems Ltd</h3>
            <p className="text-blue-400 font-medium">Software Engineering Intern</p>
            </div>
            <p className="text-gray-300 mb-4">Yangon, Myanmar</p>
            <div className="space-y-2">
            <p className="text-gray-300">• <span className="text-blue-400 font-medium">20% faster queries</span> with backend features for fitness tracker using Spring MVC and SQL databases</p>
            <p className="text-gray-300">• Conducted integration testing to validate database operations and API endpoints, <span className="text-green-400 font-medium">90% coverage</span></p>
            </div>
        </div>
        ),
    },
    ];

    const Timeline = ({ data }: { data: { title: React.ReactNode; content: React.ReactNode }[] }) => {
    const ref = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [height, setHeight] = useState(0);

    useEffect(() => {
        if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        setHeight(rect.height);
        }
    }, [ref]);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start 10%", "end 50%"],
    });

    const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
    const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

    return (
        <div className="w-full bg-transparent font-sans md:px-10" ref={containerRef}>
        <div className="max-w-7xl mx-auto py-20 px-4 md:px-8 lg:px-10">
            <div ref={ref} className="relative max-w-5xl mx-auto pb-20">
            {data.map((item, index) => (
                <div
                key={index}
                className="flex justify-start pt-10 md:pt-40 md:gap-8"
                >
                <div className="sticky flex flex-col md:flex-row z-40 items-center top-40 self-start max-w-[200px] lg:max-w-[220px] md:w-[200px] flex-shrink-0">
                    <div className="h-10 absolute left-3 md:left-3 w-10 rounded-full bg-black dark:bg-white flex items-center justify-center">
                    <div className="h-4 w-4 rounded-full bg-neutral-200 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 p-2" />
                    </div>
                    <div className="hidden md:block text-lg md:pl-16 md:text-2xl font-bold text-neutral-500 dark:text-neutral-500">
                    {item.title}
                    </div>
                </div>

                <div className="relative pl-20 pr-4 md:pl-4 w-full flex-grow">
                    <div className="md:hidden block text-lg mb-4 text-left font-bold text-neutral-500 dark:text-neutral-500">
                    {item.title}
                    </div>
                    <div className="bg-white/5 rounded-lg border border-white/10 p-6 backdrop-blur-sm">
                    {item.content}
                    </div>
                </div>
                </div>
            ))}
            <div
                style={{
                height: height + "px",
                }}
                className="absolute md:left-8 left-8 top-0 overflow-hidden w-[2px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-neutral-200 dark:via-neutral-700 to-transparent to-[99%]  [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)] "
            >
                <motion.div
                style={{
                    height: heightTransform,
                    opacity: opacityTransform,
                }}
                className="absolute inset-x-0 top-0  w-[2px] bg-gradient-to-t from-purple-500 via-blue-500 to-transparent from-[0%] via-[10%] rounded-full"
                />
            </div>
            </div>
        </div>
        </div>
    );
};

export default function WorkEducation() {
    return (
        <section id="work" className="py-24">
        <h2 className="text-3xl font-semibold text-white mb-12 text-center">Work & Education</h2>
        <Timeline data={workEducationData} />
        </section>
    );
}