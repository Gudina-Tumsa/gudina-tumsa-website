/* eslint-disable  */
// @ts-nocheck
"use client"
import React from 'react';
import Header from "@/components/layout/Header";
import Faq from "@/components/elements/index/faq";
import Footer from "@/components/layout/Footer";

const ContactPage = () => {
    return (
        <div className="min-h-screen text-gray-800">
            <Header />

            <main className="w-full max-w-6xl mx-auto px-6 md:px-8 my-10 space-y-12">
                <section>
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
                        Contact and Help
                    </h1>
                    <p className="text-lg mb-6">
                        We're here to support you as you explore the GTL online Library. Whether you need technical assistance, have questions about content, or want to get in touch with our team, you can reach us using the following channels:
                    </p>

                    <div className="bg-white rounded-lg shadow-md p-6 md:p-8 mb-12">
                        <form className="space-y-6">
                            {/* Form fields remain the same as before */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="name" className="block text-lg font-medium mb-2">
                                        Full Name
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
                                        placeholder="Your name"
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-lg font-medium mb-2">
                                        Email Address
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
                                        placeholder="your@email.com"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="subject" className="block text-lg font-medium mb-2">
                                    Subject
                                </label>
                                <select
                                    id="subject"
                                    name="subject"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
                                    required
                                >
                                    <option value="">Select a subject</option>
                                    <option value="support">Account Support</option>
                                    <option value="billing">Billing Inquiry</option>
                                    <option value="feedback">Product Feedback</option>
                                    <option value="press">Press Inquiry</option>
                                    <option value="partnership">Partnership Opportunity</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>

                            <div>
                                <label htmlFor="message" className="block text-lg font-medium mb-2">
                                    Message
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    rows={6}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
                                    placeholder="Type your message here..."
                                    required
                                ></textarea>
                            </div>

                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    id="consent"
                                    name="consent"
                                    className="h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
                                    required
                                />
                                <label htmlFor="consent" className="ml-2 text-lg">
                                    I agree to the processing of my data according to the <a href="/privacy" className="text-blue-600 hover:underline">Privacy Policy</a>
                                </label>
                            </div>

                            <button
                                type="submit"
                                className="w-full md:w-auto px-8 py-3 bg-blue-600 text-white text-lg font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                            >
                                Send Message
                            </button>
                        </form>
                    </div>
                    <Faq include={false}/>
                    <div className="mt-[5%] grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* Phone Support Card */}
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <div className="text-3xl mb-3">📞</div>
                            <h3 className="text-xl font-semibold mb-3">Phone Support</h3>
                            <p className="text-gray-700 mb-2">
                                Call us during working hours for direct assistance:
                            </p>
                            <p className="text-lg font-medium mb-1">
                                +251-900916524
                            </p>
                            <p className="text-gray-600 text-sm">
                                Monday to Friday, 9:00 AM – 5:00 PM (East Africa Time)
                            </p>
                        </div>

                        {/* Email Support Card */}
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <div className="text-3xl mb-3">📧</div>
                            <h3 className="text-xl font-semibold mb-3">Email Support</h3>
                            <p className="text-gray-700 mb-2">
                                For general inquiries, feedback, or support:
                            </p>
                            <a href="mailto:info@gudinaandtsehaylegacy.org" className="text-lg font-medium text-blue-600 hover:underline block mb-1">
                                info@gudinaandtsehaylegacy.org
                            </a>
                            <p className="text-gray-600 text-sm">
                                Response within 1–2 business days
                            </p>
                        </div>


                        <div className="bg-white rounded-lg shadow-md p-6">
                            <div className="text-3xl mb-3">🌐</div>
                            <h3 className="text-xl font-semibold mb-3">Website</h3>
                            <p className="text-gray-700 mb-2">
                                Learn more about the Gudina and Tsehay Legacy:
                            </p>
                            <div className="space-y-1">
                                <a href="https://www.gudinatumsa.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline block">
                                    www.gudinatumsa.com
                                </a>
                                <a href="https://www.gudinaandtsehaylegacy.org" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline block">
                                    www.gudinaandtsehaylegacy.org
                                </a>
                            </div>
                        </div>


                        {/*<div className="bg-white rounded-lg shadow-md p-6">*/}
                        {/*    <div className="text-3xl mb-3">📝</div>*/}
                        {/*    <h3 className="text-xl font-semibold mb-3">Feedback</h3>*/}
                        {/*    <p className="text-gray-700 mb-2">*/}
                        {/*        We value your input and suggestions:*/}
                        {/*    </p>*/}
                        {/*    <a href="mailto:info@gudinaandtsehaylegacy.org" className="text-blue-600 hover:underline">*/}
                        {/*        info@gudinaandtsehaylegacy.org*/}
                        {/*    </a>*/}
                        {/*</div>*/}


                    </div>


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
                </section>
            </main>
            <Footer/>
        </div>
);
};

export default ContactPage;
