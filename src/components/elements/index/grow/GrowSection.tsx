/* eslint-disable */
// @ts-nocheck


import React from 'react';

const GrowSection = () => {
    return (
        <div className="mt-[-8%]">
            <div className="container mx-auto px-4 py-16">
                {/* Hero Section */}
                <div className="text-center max-w-4xl mx-auto mb-16">
                    <h1 className="font-instrument font-bold text-slate-800 mb-6 leading-tight text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
                        Grow Wherever You Are
                    </h1>
                    <p className="text-lg sm:text-xl text-slate-600 leading-relaxed max-w-3xl mx-auto">
                        No need to carve out extra time. Dive into the legacy of Rev. Gudina Tumsa and Tsehay Tolessa—whether you’re in the car, waiting in line, over lunch, or before bed.
                    </p>
                </div>

                {/* Responsive Card Grid */}
                <div className="container mx-auto px-4 py-10">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">

                        {/* Left Column */}
                        <div className="flex flex-col h-full gap-4">
                            {/* Card with CTA */}
                            <div className="bg-[#DAB6F2] rounded-xl p-6 shadow flex flex-col justify-between flex-grow">
                                <h3 className="font-poppins text-2xl md:text-4xl font-semibold text-gray-800">
                                    Dive into<br /> the legacy
                                </h3>
                                <a
                                    href="/home"
                                    className="mt-6 inline-flex items-center px-6 py-2 border border-gray-300 rounded-full text-black hover:border-gray-400 transition-all duration-200"
                                >
                                    <span className="font-medium">Get Started</span>
                                </a>
                            </div>

                            {/* Image Card */}
                            <div className="flex-1">
                                <img
                                    src="https://tecdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(73).webp"
                                    alt="Bottom"
                                    className="w-full h-full object-cover rounded-xl max-h-[400px]"
                                />
                            </div>
                        </div>

                        {/* Center Column */}
                        <div className="flex flex-col h-full">
                            <img
                                src="https://images.unsplash.com/photo-1581091595283-04de15a05a01?q=80&w=987&auto=format&fit=crop"
                                alt="Center"
                                className="w-full h-full object-cover rounded-xl max-h-[820px]"
                            />
                        </div>

                        {/* Right Column */}
                        <div className="flex flex-col h-full gap-4">
                            <div className="flex-1">
                                <img
                                    src="https://tecdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(75).webp"
                                    alt="Right"
                                    className="w-full h-full object-cover rounded-xl max-h-[400px]"
                                />
                            </div>
                            <div className="bg-[#DAB6F2] rounded-xl p-6 flex items-center justify-center h-[100px] sm:h-[120px]">
                                <h3 className="text-xl md:text-2xl font-poppins font-semibold text-gray-800 text-center">
                                    Always your favourite
                                </h3>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default GrowSection;
