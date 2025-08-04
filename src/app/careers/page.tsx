/* eslint-disable  */
// @ts-nocheck

import React from 'react';
import Header from "@/components/layout/Header";
import Image from "next/image";

const Careers = () => {
    return (
        <div className="min-h-screen text-gray-800">
            <Header />

            <main className="w-full max-w-6xl mx-auto px-6 md:px-8 my-10 space-y-16">
                {/* Hero Section */}
                <section className="relative h-96 rounded-xl overflow-hidden">
                    <Image
                        src="/images/careers-hero.jpg"
                        alt="GTL team working together"
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                        <div className="text-center text-white max-w-2xl px-4">
                            <h1 className="text-4xl md:text-5xl font-bold mb-4">Join Our Mission</h1>
                            <p className="text-xl">
                                We're building the future of accessible learning
                            </p>
                        </div>
                    </div>
                </section>

                {/* Current Hiring Status */}
                <section className="text-center py-12 bg-blue-50 rounded-xl">
                    <div className="max-w-2xl mx-auto">
                        <div className="w-20 h-20 mx-auto mb-6 relative">
                            <Image
                                src="/images/pause-icon.svg"
                                alt="Pause icon"
                                fill
                                className="object-contain"
                            />
                        </div>
                        <h2 className="text-3xl font-semibold mb-4">We're Not Currently Hiring</h2>
                        <p className="text-lg mb-6">
                            At this time, we don't have any open positions at GTL.
                            We appreciate your interest in joining our team!
                        </p>
                        <div className="bg-white p-6 rounded-lg inline-block shadow-sm">
                            <p className="font-medium">
                                Check back later or follow us on
                                <a href="https://linkedin.com/company/GTL"
                                   className="text-blue-600 hover:underline ml-1"
                                   target="_blank"
                                   rel="noopener noreferrer">
                                    LinkedIn
                                </a>
                                 <span className={"ml-[2%]"}>for future opportunities.</span>
                            </p>
                        </div>
                    </div>
                </section>

                {/* Why Work With Us */}
                <section>
                    <h2 className="text-3xl font-semibold mb-8 text-center">Why GTL?</h2>
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                            <h3 className="text-xl font-semibold mb-4 flex items-center">
                                <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mr-3">1</span>
                                Our Culture
                            </h3>
                            <p className="text-gray-600">
                                We're a diverse team of lifelong learners who value curiosity, collaboration, and work-life balance.
                                Our Berlin office is designed for creativity and focus.
                            </p>
                        </div>
                        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                            <h3 className="text-xl font-semibold mb-4 flex items-center">
                                <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mr-3">2</span>
                                Growth Opportunities
                            </h3>
                            <p className="text-gray-600">
                                We invest in our team's development with learning budgets, mentorship programs,
                                and regular skill-building workshops.
                            </p>
                        </div>
                    </div>
                </section>

              


                <section className="text-center py-12 border-t border-gray-200">
                    <h2 className="text-3xl font-semibold mb-4">Stay in Touch</h2>
                    <p className="text-lg mb-6 max-w-2xl mx-auto">
                        While we're not hiring now, we're always excited to connect with talented people
                        who share our passion for learning.
                    </p>
                    <button
                        className="bg-gray-800 text-white px-6 py-3 rounded-full font-medium hover:bg-gray-700 transition disabled:opacity-70"
                        disabled
                        aria-label="Currently not accepting applications"
                    >
                        Notify Me About Future Openings
                    </button>

                </section>
            </main>
        </div>
    );
};

export default Careers;