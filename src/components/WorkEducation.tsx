"use client";

import React from "react";
import { Timeline } from "@/components/ui/Timeline";

const workEducationData = [
    {
        title: (
            <div className="text-center">
                <div className="text-4xl font-black">2025</div>
            </div>
        ),
        content: (
            <div>
                <div className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                        <h3 className="text-xl font-semibold text-white">
                            <a href="https://www.lumenoai.com/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 transition-colors underline">
                                Lumeno AI
                            </a>
                        </h3>
                        <p className="text-gray-400 text-sm">July 2025 – Sep. 2025</p>
                    </div>
                    <div className="flex justify-between items-center">
                        <p className="text-white font-medium">Software Engineer Intern</p>
                        <p className="text-gray-300 text-sm">New York, NY (Remote)</p>
                    </div>
                </div>
                <div className="space-y-2">
                    <p className="text-gray-300">• Upcoming position developing AI-powered applications</p>
                    <p className="text-gray-300">• Focus on machine learning infrastructure and data processing</p>
                </div>
            </div>
        ),
    },
    {
        title: (
            <div className="text-center">
                <div className="text-4xl font-black">2025</div>
            </div>
        ),
        content: (
            <div>
                <div className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                        <h3 className="text-xl font-semibold text-white">
                            <a href="https://aggieworks.org/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 transition-colors underline">
                                AggieWorks
                            </a>
                        </h3>
                        <p className="text-gray-400 text-sm">Apr 2025 – Present</p>
                    </div>
                    <div className="flex justify-between items-center">
                        <p className="text-white font-medium">Software Engineer</p>
                        <p className="text-gray-300 text-sm">Davis, CA</p>
                    </div>
                </div>
                <div className="space-y-2">
                    <p className="text-gray-300">• Working on <a href="https://www.expressodavis.org/" target="_blank" rel="noopener noreferrer" className="text-blue-400 font-medium hover:text-blue-300 underline">Expresso</a>, a university mentorship platform connecting students with mentors and seniors</p>
                    <p className="text-gray-300">• Built unified search API in <span className="text-green-400 font-medium">Go</span>, processing multi-parameter queries</p>
                    <p className="text-gray-300">• Implemented fuzzy matching algorithm, enabling partial searches like ("Spa" → "Space Exploration")</p>
                    <p className="text-gray-300">• Developed <span className="text-blue-400 font-medium">React + Tailwind</span> front-end with aesthetic animations, debounced queries and error handling</p>
                </div>
            </div>
        ),
    },
    {
        title: (
            <div className="text-center">
                <div className="text-4xl font-black">2024</div>
            </div>
        ),
        content: (
            <div>
                <div className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                        <h3 className="text-xl font-semibold text-white">
                            <a href="https://www.ucdavis.edu/admissions/undergraduate" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 transition-colors underline">
                                UC Davis Undergraduate Admissions
                            </a>
                        </h3>
                        <p className="text-gray-400 text-sm">Jun 2024 – May 2025</p>
                    </div>
                    <div className="flex justify-between items-center">
                        <p className="text-white font-medium">Admissions Operations Student Worker</p>
                        <p className="text-gray-300 text-sm">Davis, CA</p>
                    </div>
                </div>
                <div className="space-y-2">
                    <p className="text-gray-300">• Optimized document processing workflows achieving <span className="text-blue-400 font-medium">30% reduction</span> in completion time across <span className="text-green-400 font-medium">1000+ applications</span></p>
                    <p className="text-gray-300">• Automated workflows using <span className="text-blue-400 font-medium">OnBase enterprise software</span> for efficient document handling and data integrity verification</p>
                    <p className="text-gray-300">• Processed transcripts, test scores, and application materials with indexing and database management</p>
                </div>
            </div>
        ),
    },
    {
        title: (
            <div className="text-center">
                <div className="text-4xl font-black">2023</div>
            </div>
        ),
        content: (
            <div>
                <div className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                        <h3 className="text-xl font-semibold text-white">
                            <a href="https://www.ucdavis.edu/admissions/undergraduate" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 transition-colors underline">
                                University of California, Davis
                            </a>
                        </h3>
                        <p className="text-gray-400 text-sm">Sep 2023 – Jun 2027</p>
                    </div>
                    <div className="flex justify-between items-center">
                        <p className="text-white font-medium">Bachelor of Engineering - Computer Science</p>
                        <p className="text-gray-300 text-sm">Davis, CA</p>
                    </div>
                </div>
                <div className="space-y-2">
                    <p className="text-gray-300">• <span className="text-green-400 font-medium">3.8 GPA</span> in Computer Science Department</p>
                    <p className="text-gray-300">• <span className="text-blue-400 font-medium">Activities:</span> CS Tutoring, AggieWorks</p>
                    <p className="text-gray-300">• <span className="text-blue-400 font-medium">Coursework:</span> Data Structures & Algorithms, Programming Languages, AI, HCI, Theory of Computation, Software Development (C++), Discrete Math, Computer Organization, Probability & Statistics</p>
                    <p className="text-gray-300">• Expected Graduation: June 2027</p>
                </div>
            </div>
        ),
    },
    {
        title: (
            <div className="text-center">
                <div className="text-4xl font-black">2022</div>
            </div>
        ),
        content: (
            <div>
                <div className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                        <h3 className="text-xl font-semibold text-white">
                            <a href="https://acedatasystems.com/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 transition-colors underline">
                                ACE Data Systems Ltd
                            </a>
                        </h3>
                        <p className="text-gray-400 text-sm">July 2022 – Feb. 2023</p>
                    </div>
                    <div className="flex justify-between items-center">
                        <p className="text-white font-medium">Software Engineering Intern</p>
                        <p className="text-gray-300 text-sm">Yangon, Myanmar</p>
                    </div>
                </div>
                <div className="space-y-2">
                    <p className="text-gray-300">• Developed backend features for fitness tracking application using <span className="text-blue-400 font-medium">Spring MVC and SQL</span>, achieving <span className="text-green-400 font-medium">20% faster query performance</span></p>
                    <p className="text-gray-300">• Implemented secure user authentication with <span className="text-blue-400 font-medium">JWT</span> and hashed credentials, plus activity tracking systems</p>
                    <p className="text-gray-300">• Conducted integration testing validating database operations and API endpoints with <span className="text-green-400 font-medium">90% test coverage</span></p>
                    <p className="text-gray-300">• Collaborated on mobile application workflow and server-side logistics</p>
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