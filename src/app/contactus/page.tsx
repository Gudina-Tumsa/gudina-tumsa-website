import React from 'react';
import Header from "@/components/layout/Header";

const ContactPage = () => {
    return (
        <div className="min-h-screen text-gray-800">
            <Header />

            <main className="w-full max-w-6xl mx-auto px-6 md:px-8 my-10 space-y-12">
                <section>
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
                        Contact Us
                    </h1>
                    <p className="text-lg mb-6">
                        Have questions or feedback? Fill out the form below and we'll get back to you as soon as possible.
                    </p>

                    <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
                        <form className="space-y-6">
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
                </section>

                <section className="grid md:grid-cols-3 gap-8">
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h3 className="text-xl font-semibold mb-4">Email Us</h3>
                        <p className="text-lg">
                            <a href="mailto:support@gtl.com" className="text-blue-600 hover:underline">
                                support@gtl.com
                            </a>
                        </p>
                        <p className="text-gray-600 mt-2">
                            General inquiries and support
                        </p>
                    </div>

                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h3 className="text-xl font-semibold mb-4">Call Us</h3>
                        <p className="text-lg">
                            +49 30 123 4567
                        </p>
                        <p className="text-gray-600 mt-2">
                            Mon-Fri, 9am-6pm CET
                        </p>
                    </div>

                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h3 className="text-xl font-semibold mb-4">Visit Us</h3>
                        <p className="text-lg">
                            Blinks Labs GmbH<br />
                            Friedrichstraße 68<br />
                            10117 Berlin, Germany
                        </p>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default ContactPage;