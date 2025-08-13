import React from 'react';

import LearningCardGrow from "@/components/elements/index/grow/LearningCardGrow";

const GrowSection = () => {
    const learningScenarios = [
        {
            title: "Doing chores",
            image: "chores.jpg",
            className: "col-span-1"
        },
        {
            title: "Driving",
            image: "driving.jpeg",

            className: "col-span-1"
        },
        {
            title: "Commuting",
            image: "commit.jpeg",

            className: "col-span-1"
        },
        {
            title: "Training",
            image: "sport.jpeg",
            className: "col-span-1"
        }
    ];

    return (
        <div className="mt-[-8%]">
            {/* Hero Section */}
            <div className="container mx-auto px-4 py-16">
                <div className="text-center max-w-4xl mx-auto mb-16">
                    <h1 className="text-5xl md:text-6xl font-bold text-slate-800 mb-6 leading-tight">
                        Grow Wherever You Are
                    </h1>
                    <p className="text-xl text-slate-600 leading-relaxed max-w-3xl mx-auto">
                        No need to carve out extra time. Dive into the legacy of Rev. Gudina Tumsa and Tsehay Tolessa—whether you’re in the car, waiting in line, over lunch, or before bed.
                    </p>
                </div>

                {/* Learning Cards Grid */}
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {learningScenarios.map((scenario, index) => (
                            <div
                                key={scenario.title}
                                className="animate-fade-in"
                                style={{ animationDelay: `${index * 0.1}s` }}
                            >
                                <LearningCardGrow
                                    title={scenario.title}
                                    image={scenario.image}

                                    className={scenario.className}
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Call to Action */}

            </div>
        </div>
    );
};

export default GrowSection;
