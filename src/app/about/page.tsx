/* eslint-disable  */
// @ts-nocheck

import React from 'react';
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const AboutUs = () => {
    return (
        <div className="min-h-screen text-gray-800">
            <Header />

            <main className="w-full max-w-6xl mx-auto px-6 md:px-8 my-10 space-y-16">

                <section className="grid md:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="font-instrument regula text-5xl font-semibold mb-6">Our Story</h2>
                        <p className="text-md mb-4">
                            The GTL Online Library is a digital knowledge hub dedicated to preserving, sharing, and promoting the life, works, and legacy of Rev. Gudina Tumsa and Tsehay Tolessa. We provide free and easy access to books, articles, archival materials, and multimedia resources that highlight their spiritual, social, and cultural contributions in Ethiopia and beyond.
                        </p>
                        <p className="text-md mb-4">
                            Our mission is to inspire current and future generations by offering a reliable platform for research, education, and reflection. The GTL Online Library serves students, researchers, church leaders, and the wider public—bridging history with the present through accessible, well-organized resources.                        </p>
                        <p className="text-md mb-4">
                            Rooted in the values of truth, service, and unity, we are committed to ensuring that this legacy continues to inform and shape conversations around faith, justice, leadership, and community transformation worldwide.
                        </p>


                    </div>
                    <div className="relative h-80 rounded-lg overflow-hidden shadow-lg">
                        <img
                            src="https://images.unsplash.com/photo-1651480342158-813d193e93ac?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cGVvcGxlJTIwZm9yJTIwY29tcGFueXxlbnwwfHwwfHx8MA%3D%3D"
                            alt="GTL Berlin office"

                            className="object-cover"
                        />
                    </div>
                </section>

             {/* Values Section */}
                <section className="py-12  rounded-xl px-8">
                    <h2 className="font-instrument regula text-5xl font-semibold text-center">Our Values</h2>
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


            </main>
            <Footer />
        </div>
    );
};

export default AboutUs;
