import React from 'react';

import LearningCardGrow from "@/app/components/grow/LearningCardGrow";

const GrowSection = () => {
    const learningScenarios = [
        {
            title: "Doing chores",
            image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=500&h=400&fit=crop",
            className: "col-span-1"
        },
        {
            title: "Driving",
            image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=500&h=400&fit=crop",

            className: "col-span-1"
        },
        {
            title: "Commuting",
            image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=500&h=400&fit=crop",

            className: "col-span-1"
        },
        {
            title: "Training",
            image: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=500&h=400&fit=crop",
            className: "col-span-1"
        }
    ];

    return (
        <div className="">
            {/* Hero Section */}
            <div className="container mx-auto px-4 py-16">
                <div className="text-center max-w-4xl mx-auto mb-16">
                    <h1 className="text-5xl md:text-6xl font-bold text-slate-800 mb-6 leading-tight">
                        Grow wherever you are
                    </h1>
                    <p className="text-xl text-slate-600 leading-relaxed max-w-3xl mx-auto">
                        Forget carving out time. Slip in a little learning in the car, waiting in line, over
                        lunch, before bed, or whenever you've got a moment.
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
                                    badge={scenario.badge}
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