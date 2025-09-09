// /* eslint-disable  */
// // @ts-nocheck
// "use client"
// import React from 'react';
// import Header from "@/components/layout/Header";
// import Faq from "@/components/elements/index/faq";
// import Footer from "@/components/layout/Footer";
//
// const ContactPage = () => {
//     return (
//         <div className="min-h-screen text-gray-800">
//             <Header />
//
//             <main className="w-full max-w-6xl mx-auto px-6 md:px-8 my-10 space-y-12">
//                 <section>
//                     <h1 className="text-4xl md:text-5xl font-bold mb-4">
//                         Contact and Help
//                     </h1>
//                     <p className="text-lg mb-6">
//                         We're here to support you as you explore the GTL online Library. Whether you need technical assistance, have questions about content, or want to get in touch with our team, you can reach us using the following channels:
//                     </p>
//
//                     <div className="bg-white rounded-lg shadow-md p-6 md:p-8 mb-12">
//                         <form className="space-y-6">
//                             {/* Form fields remain the same as before */}
//                             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                                 <div>
//                                     <label htmlFor="name" className="block text-lg font-medium mb-2">
//                                         Full Name
//                                     </label>
//                                     <input
//                                         type="text"
//                                         id="name"
//                                         name="name"
//                                         className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
//                                         placeholder="Your name"
//                                         required
//                                     />
//                                 </div>
//                                 <div>
//                                     <label htmlFor="email" className="block text-lg font-medium mb-2">
//                                         Email Address
//                                     </label>
//                                     <input
//                                         type="email"
//                                         id="email"
//                                         name="email"
//                                         className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
//                                         placeholder="your@email.com"
//                                         required
//                                     />
//                                 </div>
//                             </div>
//
//                             <div>
//                                 <label htmlFor="subject" className="block text-lg font-medium mb-2">
//                                     Subject
//                                 </label>
//                                 <select
//                                     id="subject"
//                                     name="subject"
//                                     className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
//                                     required
//                                 >
//                                     <option value="">Select a subject</option>
//                                     <option value="support">Account Support</option>
//                                     <option value="billing">Billing Inquiry</option>
//                                     <option value="feedback">Product Feedback</option>
//                                     <option value="press">Press Inquiry</option>
//                                     <option value="partnership">Partnership Opportunity</option>
//                                     <option value="other">Other</option>
//                                 </select>
//                             </div>
//
//                             <div>
//                                 <label htmlFor="message" className="block text-lg font-medium mb-2">
//                                     Message
//                                 </label>
//                                 <textarea
//                                     id="message"
//                                     name="message"
//                                     rows={6}
//                                     className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
//                                     placeholder="Type your message here..."
//                                     required
//                                 ></textarea>
//                             </div>
//
//                             <div className="flex items-center">
//                                 <input
//                                     type="checkbox"
//                                     id="consent"
//                                     name="consent"
//                                     className="h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
//                                     required
//                                 />
//                                 <label htmlFor="consent" className="ml-2 text-lg">
//                                     I agree to the processing of my data according to the <a href="/privacy" className="text-blue-600 hover:underline">Privacy Policy</a>
//                                 </label>
//                             </div>
//
//                             <button
//                                 type="submit"
//                                 className="w-full md:w-auto px-8 py-3 bg-blue-600 text-white text-lg font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
//                             >
//                                 Send Message
//                             </button>
//                         </form>
//                     </div>
//
//                     <div className="mt-12">
//                         <h3 className="text-2xl font-semibold mb-4">Our Location</h3>
//                         <div className="bg-white p-4 rounded-lg shadow-md">
//                             <div className="w-full aspect-w-16 aspect-h-9">
//                                 <iframe
//                                     className="w-full h-96 rounded-lg"
//                                     allowFullScreen
//                                     loading="lazy"
//                                     referrerPolicy="no-referrer-when-downgrade"
//                                     src="https://www.google.com/maps/embed/v1/place?q=Gudina%20Tumsa%20Foundation&key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8"
//                                 ></iframe>
//                             </div>
//                         </div>
//                     </div>
//                 </section>
//             </main>
//             <Footer/>
//         </div>
// );
// };
//
// export default ContactPage;


/* eslint-disable */
// @ts-nocheck
"use client";

import React, {useEffect} from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import {getReadingBooks, getTodaysSelection} from "@/lib/api/book";

const ContactPage = () => {

    const applyTheme = (selectedTheme: string) => {
        const root = window.document.documentElement;

        if (selectedTheme === 'dark') {
            root.classList.add('dark');
        } else if (selectedTheme === 'light') {
            root.classList.remove('dark');
        } else {
            // Apply system preference
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            if (prefersDark) {
                root.classList.add('dark');
            } else {
                root.classList.remove('dark');
            }
        }
    };

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme') || 'system';
        const savedLanguage = localStorage.getItem('language') || 'en';
        applyTheme(savedTheme);
    }, []);

    return (
        <div className="min-h-screen text-gray-800">
            {/* Header */}
            <Header />

            <section className="relative w-full h-96 md:h-[400px] overflow-hidden">
                <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center px-6 md:px-12">

                    <div>
                        <h1 className="font-instrument regual text-6xl font-bold text-white mb-2">Contacts</h1>

                    </div>
                </div>
            </section>

            <main className="w-full max-w-6xl mx-auto px-6 md:px-8 py-16 space-y-16">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">
                            We are always ready to help you and answer your questions
                        </h2>
                        <p className="text-gray-600 mb-8 leading-relaxed">
                            We're here to support you as you explore the GTL online Library. Whether you need technical assistance, have questions about content, or want to get in touch with our team, you can reach us using the following channels:
                        </p>

                        <div className="space-y-6">
                            <div>
                                <h3 className="font-semibold text-lg mb-2">Phone number</h3>
                                <p className="text-gray-700">
                                    <span className="block">+251-900916524</span>
                                </p>
                            </div>

                            <div>
                                <h3 className="font-semibold text-lg mb-2">Email</h3>
                                <p className="text-gray-700">email@gmail.com</p>
                            </div>

                            <div>
                                <h3 className="font-semibold text-lg mb-2">Our Location</h3>
                                <p className="text-gray-700">
                                    Yerer, Leka Building<br />
                                    3rd Floo
                                </p>
                            </div>

                        </div>
                    </div>

                    <div className="bg-gray-50 p-8 rounded-xl shadow-lg">
                        <h3 className="text-xl font-semibold mb-4">Get in Touch</h3>


                        <form className="space-y-5">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full name</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                                    placeholder="Your full name"
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                                    placeholder="your@email.com"
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                                <select
                                    id="subject"
                                    name="subject"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                                    required
                                >
                                    <option value="">Select a subject</option>
                                    <option value="support">Support</option>
                                    <option value="billing">Billing</option>
                                    <option value="feedback">Feedback</option>
                                    <option value="press">Press</option>
                                    <option value="partnership">Partnership</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>

                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    rows={4}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                                    placeholder="Type your message here..."
                                    required
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                className="w-full px-6 py-3 bg-black text-white text-sm font-medium rounded-md hover:bg-gray-800 transition-colors flex items-center justify-center"
                            >
                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                </svg>
                                Send a message
                            </button>
                        </form>
                    </div>
                </div>

                {/* Map Section */}
                <div className="mt-12">
                                             <h3 className="text-2xl font-semibold mb-4">Our Location</h3>
                                             <div className="bg-white p-4 rounded-lg shadow-md">
                                                 <div className="w-full aspect-w-16 aspect-h-9">
                                                     <iframe
                                                        className="w-full h-96 rounded-lg"
                                                        allowFullScreen
                                                        loading="lazy"
                                                        referrerPolicy="no-referrer-when-downgrade"
                                                        src="https://www.google.com/maps/embed/v1/place?q=Gudina%20Tumsa%20Foundation&key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8"
                                                    ></iframe>
                                                </div>
                                            </div>
                                        </div>
            </main>


           <Footer/>
        </div>
    );
};

export default ContactPage;
