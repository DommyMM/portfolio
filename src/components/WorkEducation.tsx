"use client";

import React from "react";
import { Timeline } from "@/components/ui/Timeline";

const workEducationData = [
    {
        title: (
            <div className="text-center">
                <div className="text-2xl font-bold text-neutral-500">2025</div>
            </div>
        ),
        content: (
            <div>
                <div className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                        <h3 className="text-xl font-semibold text-white">Lumeno AI</h3>
                        <p className="text-gray-400 text-sm">July 2025 – Sep. 2025</p>
                    </div>
                    <div className="flex justify-between items-center">
                        <p className="text-blue-400 font-medium">Software Engineer Intern</p>
                        <p className="text-gray-300 text-sm">New York, NY (Remote)</p>
                    </div>
                </div>
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
                <div className="text-2xl font-bold text-neutral-500">2024</div>
            </div>
        ),
        content: (
            <div>
                <div className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                        <h3 className="text-xl font-semibold text-white">UC Davis Undergraduate Admissions</h3>
                        <p className="text-gray-400 text-sm">May 2024 – May 2025</p>
                    </div>
                    <div className="flex justify-between items-center">
                        <p className="text-blue-400 font-medium">Administrative Assistant</p>
                        <p className="text-gray-300 text-sm">Davis, CA</p>
                    </div>
                </div>
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
                <div className="text-2xl font-bold text-neutral-500">2023</div>
            </div>
        ),
        content: (
            <div>
                <div className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                        <h3 className="text-xl font-semibold text-white">University of California, Davis</h3>
                        <p className="text-gray-400 text-sm">Sept. 2023 – June 2027</p>
                    </div>
                    <div className="flex justify-between items-center">
                        <p className="text-purple-400 font-medium">Bachelor of Science in Computer Science</p>
                        <p className="text-gray-300 text-sm">Davis, CA</p>
                    </div>
                </div>
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
                <div className="text-2xl font-bold text-neutral-500">2022</div>
            </div>
        ),
        content: (
            <div>
                <div className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                        <h3 className="text-xl font-semibold text-white">ACE Data Systems Ltd</h3>
                        <p className="text-gray-400 text-sm">July 2022 – Feb. 2023</p>
                    </div>
                    <div className="flex justify-between items-center">
                        <p className="text-blue-400 font-medium">Software Engineering Intern</p>
                        <p className="text-gray-300 text-sm">Yangon, Myanmar</p>
                    </div>
                </div>
                <div className="space-y-2">
                    <p className="text-gray-300">• <span className="text-blue-400 font-medium">20% faster queries</span> with backend features for fitness tracker using Spring MVC and SQL databases</p>
                    <p className="text-gray-300">• Conducted integration testing to validate database operations and API endpoints, <span className="text-green-400 font-medium">90% coverage</span></p>
                </div>
            </div>
        ),
    },
];

export default function WorkEducation() {
    return (
        <section id="work" className="py-24">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-semibold text-white mb-2">Work & Education</h2>
            </div>
            <Timeline data={workEducationData} />
        </section>
    );
}