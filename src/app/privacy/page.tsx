/* eslint-disable  */
// @ts-nocheck

import React from 'react';
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const Index = () => {
    return (
        <div className="min-h-screen text-gray-800">
            <Header />

            <main className="w-full max-w-6xl mx-auto px-6 md:px-8 my-10 space-y-12">
                <section>
                    <h1 className="font-instrument regula text-5xl md:text-5xl font-bold mb-4">
                        Privacy Policy for GTL Online Library
                    </h1>
                    <p><span className="font-bold">Effective Date</span>: August 5, 2025</p>
                    <p className="text-lg mb-4 mt-2">
                        Gudina and Tsehay Legacy Office ("GTL", "we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use the GTL Library website and mobile application (collectively, the "Services").
                    </p>
                    <p className="text-lg mb-4">
                        By accessing or using our Services, you agree to this Privacy Policy.
                    </p>
                </section>

                <section>
                    <h2 className="text-3xl font-semibold mb-4">1. Information We Collect</h2>
                    <p className="text-lg mb-4">
                        We may collect the following types of information:
                    </p>
                    <h3 className="text-xl font-medium mb-2">a) Personal Information</h3>
                    <ul className="list-disc pl-6 space-y-2 text-base text-gray-700 mb-4">
                        <li>Name</li>
                        <li>Email address</li>
                        <li>Phone number</li>
                        <li>Location (if you grant permission)</li>
                    </ul>
                    <h3 className="text-xl font-medium mb-2">b) Usage Data</h3>
                    <ul className="list-disc pl-6 space-y-2 text-base text-gray-700 mb-4">
                        <li>Pages viewed</li>
                        <li>Access times</li>
                        <li>Device type and browser</li>
                        <li>Downloads and search history</li>
                    </ul>
                    <h3 className="text-xl font-medium mb-2">c) Account Information</h3>
                    <ul className="list-disc pl-6 space-y-2 text-base text-gray-700">
                        <li>Login credentials</li>
                        <li>User preferences and bookmarks</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-3xl font-semibold mb-4">2. How We Use Your Information</h2>
                    <p className="text-lg mb-4">
                        We use the information we collect to:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 text-base text-gray-700">
                        <li>Provide and maintain access to digital library content</li>
                        <li>Improve user experience and interface</li>
                        <li>Respond to inquiries and offer support</li>
                        <li>Notify you of updates or changes</li>
                        <li>Monitor and analyze usage for system improvement</li>
                        <li>Comply with legal obligations</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-3xl font-semibold mb-4">3. How We Share Your Information</h2>
                    <p className="text-lg mb-4">
                        We do not sell or rent your personal information.
                    </p>
                    <p className="text-lg mb-4">
                        We may share your data with:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 text-base text-gray-700 mb-4">
                        <li>Internal team members for support or content updates</li>
                        <li>Service providers who help us run the platform (e.g., hosting providers)</li>
                        <li>Authorities when required by law or legal request</li>
                    </ul>
                    <p className="text-lg">
                        All third parties are required to protect your data in accordance with this policy.
                    </p>
                </section>

                <section>
                    <h2 className="text-3xl font-semibold mb-4">4. Data Storage and Security</h2>
                    <p className="text-lg">
                        We use secure servers and protocols to protect your data. However, no method of transmission over the internet or electronic storage is 100% secure. We strive to use industry-standard measures to protect your personal information.
                    </p>
                </section>

                <section>
                    <h2 className="text-3xl font-semibold mb-4">5. Cookies and Tracking Technologies</h2>
                    <p className="text-lg">
                        We may use cookies or similar technologies to personalize your experience, remember your preferences, and analyze usage. You can control cookies through your browser settings.
                    </p>
                </section>

                <section>
                    <h2 className="text-3xl font-semibold mb-4">6. Children's Privacy</h2>
                    <p className="text-lg">
                        The GTL Library is not intended for children under the age of 13. We do not knowingly collect personal information from children.
                    </p>
                </section>

                <section>
                    <h2 className="text-3xl font-semibold mb-4">7. Your Privacy Rights</h2>
                    <p className="text-lg mb-4">
                        You may:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 text-base text-gray-700 mb-4">
                        <li>Request access to the data we hold about you</li>
                        <li>Ask us to correct or delete your information</li>
                        <li>Withdraw consent at any time (where applicable)</li>
                    </ul>
                    <p className="text-lg">
                        To exercise these rights, please contact us at info@gudinaandtsehaylegacy.org.
                    </p>
                </section>

                <section>
                    <h2 className="text-3xl font-semibold mb-4">8. Changes to This Policy</h2>
                    <p className="text-lg">
                        We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated "Effective Date."
                    </p>
                </section>

                {/*<div>*/}
                {/*    <h2 className="text-2xl font-semibold mb-3">9. Contact</h2>*/}
                {/*    <p className="text-lg mb-3">*/}
                {/*        For questions about this policy or content concerns, contact:*/}
                {/*    </p>*/}
                {/*    <div className="space-y-1 pl-6">*/}
                {/*        <p className="text-lg">Gudina and Tsehay Legacy Office</p>*/}
                {/*        <p className="text-lg">Email: <a href="mailto:info@gudinaandtsehaylegacy.org" className="text-blue-600 hover:underline">info@gudinaandtsehaylegacy.org</a></p>*/}
                {/*        <p className="text-lg">Website: <a href="https://www.gudinaandtsehaylegacy.org" className="text-blue-600 hover:underline">www.gudinaandtsehaylegacy.org</a></p>*/}
                {/*        <p className="text-lg">Phone: +251-900916524</p>*/}
                {/*    </div>*/}
                {/*</div>*/}
            </main>
            <Footer />
        </div>
    );
};

export default Index;
