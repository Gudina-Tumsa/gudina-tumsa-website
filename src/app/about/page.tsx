import React from 'react';
import Header from "@/components/layout/Header";

const AboutUs = () => {
    return (
        <div className="min-h-screen text-gray-800">
            <Header />

            <main className="w-full max-w-6xl mx-auto px-6 md:px-8 my-10 space-y-16">
                {/* Hero Section */}
                <section className="relative h-96 rounded-xl overflow-hidden">
                    <img
                        src="https://images.unsplash.com/photo-1651480342158-813d193e93ac?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cGVvcGxlJTIwZm9yJTIwY29tcGFueXxlbnwwfHwwfHx8MA%3D%3D"
                        alt="Blinkist team collaborating"
                        className="object-cover"

                    />
                    <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                        <div className="text-center text-white max-w-2xl px-4">
                            <h1 className="text-4xl md:text-5xl font-bold mb-4">Knowledge for the Curious Mind</h1>
                            <p className="text-xl">
                                We make big ideas accessible through powerful summaries you can read or listen to in minutes.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Our Story */}
                <section className="grid md:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-3xl font-semibold mb-6">Our Story</h2>
                        <p className="text-lg mb-4">
                            Today, we serve millions of curious minds across the globe, helping busy people learn more
                            and stress less through our expertly crafted summaries.
                        </p>
                        <p className="text-lg mb-4">
                            Today, we serve millions of curious minds across the globe, helping busy people learn more
                            and stress less through our expertly crafted summaries.
                        </p>
                        <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
                            <p className="font-medium">
                                "We believe learning should fit into your life, not the other way around."
                            </p>
                        </div>
                    </div>
                    <div className="relative h-80 rounded-lg overflow-hidden shadow-lg">
                        <img
                            src="https://images.unsplash.com/photo-1651480342158-813d193e93ac?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cGVvcGxlJTIwZm9yJTIwY29tcGFueXxlbnwwfHwwfHx8MA%3D%3D"
                            alt="Blinkist Berlin office"

                            className="object-cover"
                        />
                    </div>
                </section>

                {/* Team Photos Grid */}
                <section>
                    <h2 className="text-3xl font-semibold mb-8 text-center">Meet The Team</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[1, 2, 3, 4].map((item) => (
                            <div key={item} className="relative h-48 rounded-lg overflow-hidden group">
                                <img
                                    src={`/images/team-${item}.jpg`}
                                    alt={`Team member ${item}`}
                                    className="object-cover group-hover:scale-105 transition-transform"
                                />
                                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all flex items-end p-4">
                                    <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity font-medium">
                                        {['Niklas', 'Tina', 'Markus', 'Sophie'][item-1]}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Values Section */}
                <section className="py-12 bg-gray-50 rounded-xl px-8">
                    <h2 className="text-3xl font-semibold mb-12 text-center">Our Values</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: "/images/lightbulb-icon.svg",
                                title: "Curiosity First",
                                desc: "We never stop asking questions and challenging assumptions"
                            },
                            {
                                icon: "/images/heart-icon.svg",
                                title: "Human-Centered",
                                desc: "We design for real people with busy lives"
                            },
                            {
                                icon: "/images/globe-icon.svg",
                                title: "Impact Driven",
                                desc: "We measure success by how much we help people grow"
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
                <section className="grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-200">
                    <div className="text-center py-6">
                        <p className="text-4xl font-bold text-blue-600 mb-2">7K+</p>
                        <p className="text-gray-600">Book titles summarized</p>
                    </div>
                    <div className="text-center py-6">
                        <p className="text-4xl font-bold text-blue-600 mb-2">20M+</p>
                        <p className="text-gray-600">Lifelong learners</p>
                    </div>
                    <div className="text-center py-6">
                        <p className="text-4xl font-bold text-blue-600 mb-2">27</p>
                        <p className="text-gray-600">Categories of knowledge</p>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default AboutUs;