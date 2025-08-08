/* eslint-disable  */
// @ts-nocheck

import React from 'react';
import Header from "@/components/layout/Header";

const AboutUs = () => {
    return (
        <div className="min-h-screen text-gray-800">
            <Header />

            <main className="w-full max-w-6xl mx-auto px-6 md:px-8 my-10 space-y-16">
                {/* Hero Section */}
                {/*<section className="relative h-96 rounded-xl overflow-hidden">*/}
                {/*    <img*/}
                {/*        src="https://images.unsplash.com/photo-1651480342158-813d193e93ac?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cGVvcGxlJTIwZm9yJTIwY29tcGFueXxlbnwwfHwwfHx8MA%3D%3D"*/}
                {/*        alt="GTL team collaborating"*/}
                {/*        className="object-cover"*/}

                {/*    />*/}
                {/*    <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">*/}
                {/*        <div className="text-center text-white max-w-2xl px-4">*/}
                {/*            <h1 className="text-4xl md:text-5xl font-bold mb-4">Knowledge for the Curious Mind</h1>*/}
                {/*            <p className="text-xl">*/}
                {/*                We make big ideas accessible through powerful summaries you can read or listen to in minutes.*/}
                {/*            </p>*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*</section>*/}

                {/* Our Story */}
                <section className="grid md:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-3xl font-semibold mb-6">Our Story</h2>
                        <p className="text-lg mb-4">
                            The GTL Online Library is a digital knowledge hub dedicated to preserving, sharing, and promoting the life, works, and legacy of Rev. Gudina Tumsa and Tsehay Tolessa. We provide free and easy access to books, articles, archival materials, and multimedia resources that highlight their spiritual, social, and cultural contributions in Ethiopia and beyond.
                        </p>
                        <p className="text-lg mb-4">
                            Our mission is to inspire current and future generations by offering a reliable platform for research, education, and reflection. The GTL Online Library serves students, researchers, church leaders, and the wider public—bridging history with the present through accessible, well-organized resources.                        </p>
                        <p className="text-lg mb-4">
                            Rooted in the values of truth, service, and unity, we are committed to ensuring that this legacy continues to inform and shape conversations around faith, justice, leadership, and community transformation worldwide.
                        </p>

                        {/*<div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">*/}
                        {/*    <p className="font-medium">*/}
                        {/*        The GTL Online Library is a digital knowledge hub dedicated to preserving, sharing, and promoting the life, works, and legacy of Rev. Gudina Tumsa and Tsehay Tolessa. We provide free and easy access to books, articles, archival materials, and multimedia resources that highlight their spiritual, social, and cultural contributions in Ethiopia and beyond.*/}
                        {/*    </p>*/}
                        {/*</div>*/}
                    </div>
                    <div className="relative h-80 rounded-lg overflow-hidden shadow-lg">
                        <img
                            src="https://images.unsplash.com/photo-1651480342158-813d193e93ac?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cGVvcGxlJTIwZm9yJTIwY29tcGFueXxlbnwwfHwwfHx8MA%3D%3D"
                            alt="GTL Berlin office"

                            className="object-cover"
                        />
                    </div>
                </section>

                {/* Team Photos Grid */}
                {/*<section>*/}
                {/*    <h2 className="text-3xl font-semibold mb-8 text-center">Meet The Team</h2>*/}
                {/*    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">*/}
                {/*        {[1, 2, 3, 4].map((item) => (*/}
                {/*            <div key={item} className="relative h-48 rounded-lg overflow-hidden group">*/}
                {/*                <img*/}
                {/*                    src={`/images/team-${item}.jpg`}*/}
                {/*                    alt={`Team member ${item}`}*/}
                {/*                    className="object-cover group-hover:scale-105 transition-transform"*/}
                {/*                />*/}
                {/*                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all flex items-end p-4">*/}
                {/*                    <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity font-medium">*/}
                {/*                        {['Niklas', 'Tina', 'Markus', 'Sophie'][item-1]}*/}
                {/*                    </span>*/}
                {/*                </div>*/}
                {/*            </div>*/}
                {/*        ))}*/}
                {/*    </div>*/}
                {/*</section>*/}

                {/* Values Section */}
                <section className="py-12 bg-gray-50 rounded-xl px-8">
                    <h2 className="text-3xl font-semibold mb-12 text-center">Our Values</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: "/images/lightbulb-icon.svg",
                                title: "Christ-Centered",
                                desc: "At the heart of our mission is Christ. We aim to extend the legacy of Christ’s work, as modeled by Gudina and Tsehay."
                            },
                            {
                                icon: "/images/heart-icon.svg",
                                title: "Servant Leadership",
                                desc: "Both Gudina and Tsehay exemplified servant leadership. We continue this legacy by leading through humility and service."
                            },
                            {

                                icon: "/images/globe-icon.svg",
                                title: "Wisdom",
                                desc: "We encourage communities to pursue truth and knowledge, both spiritual and practical, for transformative living."
                            },
                            {
                                icon : "/images/globe-icon.svg",
                                title: "Self-Improvement",
                                desc: "Despite their difficult beginnings, Gudina and Tsehay grew into influential figures. We believe in the transformative power of perseverance and learning."

                                                      },
                        {
                            icon: "/images/globe-icon.svg",
                             title : "Integrity",
                            desc : "Legacy requires a commitment to truth. Our work is guided by moral integrity and a responsibility to uphold righteousness."

                        },
                        {
                            icon: "/images/globe-icon.svg",
                            title : "Purpose-Driven",
                            desc : "Gudina and Tsehay were unwavering in their calling. Our office operates with clear purpose to accomplish the mission set before us."

                        },{
                            icon: "/images/globe-icon.svg",
                            title :"Steadfastness",
                            desc : "True legacy requires endurance. Our work is not for personal gain but for the greater mission that demanding perseverance, even through sacrifice.",

                        }
                        ].map((value, index) => (
                            <div key={index} className="text-center">
                                <div className="w-16 h-16 mx-auto mb-4 relative">
                                    <img
                                        src={value.icon}
                                        alt=""
                                        className="object-contain"
                                    />
                                </div>
                                <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                                <p className="text-gray-600">{value.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Stats Section */}
                {/*<section className="grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-200">*/}
                {/*    <div className="text-center py-6">*/}
                {/*        <p className="text-4xl font-bold text-blue-600 mb-2">7K+</p>*/}
                {/*        <p className="text-gray-600">Book titles summarized</p>*/}
                {/*    </div>*/}
                {/*    <div className="text-center py-6">*/}
                {/*        <p className="text-4xl font-bold text-blue-600 mb-2">20M+</p>*/}
                {/*        <p className="text-gray-600">Lifelong learners</p>*/}
                {/*    </div>*/}
                {/*    <div className="text-center py-6">*/}
                {/*        <p className="text-4xl font-bold text-blue-600 mb-2">27</p>*/}
                {/*        <p className="text-gray-600">Categories of knowledge</p>*/}
                {/*    </div>*/}
                {/*</section>*/}
            </main>
        </div>
    );
};

export default AboutUs;
