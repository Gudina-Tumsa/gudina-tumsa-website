/* eslint-disable  */
// @ts-nocheck
"use client"
import React, {useEffect} from 'react';
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import {getReadingBooks, getTodaysSelection} from "@/lib/api/book";

const ContentPolicy = () => {
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
            <Header />

            <main className="w-full max-w-6xl mx-auto px-6 md:px-8 my-10 space-y-6">
                <section>
                    <h1 className="font-instrument regula  md:text-5xl mb-2">GTL Library Content Policy</h1>
                    <p className="ml-[1%] text-md text-gray-600">Effective Date: August 5, 2025</p>
                </section>

                <section className="space-y-6">
                    <p className="text-lg">
                        The GTL online Library, operated by the Gudina and Tsehay Legacy (GTL), is committed to maintaining a respectful, informative, and legally compliant digital platform. This Content Policy outlines the types of content permitted on the GTL Library platform (website and mobile app), how we manage it, and the responsibilities of users and contributors.
                    </p>

                    <div className="space-y-8">
                        {/* Section 1 */}
                        <div>
                            <h2 className="text-2xl font-semibold mb-3">1. Purpose of the GTL online Library</h2>
                            <p className="text-lg">
                                The GTL Library exists to preserve, promote, and make accessible materials related to the spiritual, intellectual, and cultural legacy of Rev. Gudina Tumsa and Tsehay Tolessa, as well as resources relevant to theology, mission, ethics, leadership, and human rights in Ethiopia and globally.
                            </p>
                        </div>

                        {/* Section 2 */}
                        <div>
                            <h2 className="text-2xl font-semibold mb-3">2. Acceptable Content</h2>
                            <p className="text-lg mb-3">
                                Content hosted or made available in the GTL online Library must align with the following:
                            </p>
                            <ul className="list-disc pl-6 space-y-2 text-lg">
                                <li>Educational, spiritual, and research value</li>
                                <li>Respect for human dignity, truth, and justice</li>
                                <li>Accuracy and relevance to the GTL mission and themes</li>
                                <li>Cultural and religious sensitivity appropriate to the Ethiopian and global context</li>
                            </ul>
                            <p className="text-lg mt-4 mb-3">
                                Examples of acceptable content include:
                            </p>
                            <ul className="list-disc pl-6 space-y-2 text-lg">
                                <li>Books, articles, and speeches by or about Gudina Tumsa, Tsehay Tolessa, and related figures</li>
                                <li>Theological reflections, sermons, and spiritual resources</li>
                                <li>Academic research, archives, and biographies</li>
                                <li>Audio/video recordings of teachings, interviews, and events</li>
                                <li>Approved user-submitted content (when applicable)</li>
                            </ul>
                        </div>

                        {/* Section 3 */}
                        <div>
                            <h2 className="text-2xl font-semibold mb-3">3. Prohibited Content</h2>
                            <p className="text-lg mb-3">
                                The following types of content are strictly prohibited:
                            </p>
                            <ul className="list-disc pl-6 space-y-2 text-lg">
                                <li>Hate speech, discrimination, or content promoting violence</li>
                                <li>Defamation, misinformation, or unverified claims</li>
                                <li>Pornographic, obscene, or sexually explicit material</li>
                                <li>Plagiarized or copyrighted materials without permission</li>
                                <li>Political propaganda or partisan content not related to the GTL mission</li>
                                <li>Commercial advertisements or spam</li>
                            </ul>
                            <p className="text-lg mt-4">
                                We reserve the right to remove any content that violates this policy.
                            </p>
                        </div>

                        {/* Section 4 */}
                        <div>
                            <h2 className="text-2xl font-semibold mb-3">4. Content Submission and Review</h2>
                            <p className="text-lg mb-3">
                                If content submissions are enabled (e.g., by staff, partners, or approved contributors):
                            </p>
                            <ul className="list-disc pl-6 space-y-2 text-lg">
                                <li>All submissions will be reviewed for relevance, accuracy, and alignment with the GTL online Library's purpose.</li>
                                <li>The GTL Office reserves full editorial discretion to accept, reject, edit, or remove content.</li>
                                <li>Contributors must ensure they have the right to share any materials submitted.</li>
                            </ul>
                        </div>

                        {/* Section 5 */}
                        <div>
                            <h2 className="text-2xl font-semibold mb-3">5. Intellectual Property and Copyright</h2>
                            <ul className="list-disc pl-6 space-y-2 text-lg">
                                <li>All content in the GTL online Library is either owned by GTL, used with permission, or in the public domain.</li>
                                <li>Users may not reproduce or distribute content without proper attribution or permission.</li>
                                <li>For any copyrighted content, appropriate credit must be given and use must comply with applicable laws.</li>
                            </ul>
                        </div>

                        {/* Section 6 */}
                        <div>
                            <h2 className="text-2xl font-semibold mb-3">6. User Responsibilities</h2>
                            <ul className="list-disc pl-6 space-y-2 text-lg">
                                <li>Users must access and use content only for personal, educational, or research purposes.</li>
                                <li>Users must not download, distribute, or publish any content in violation of copyright or this policy.</li>
                                <li>Any misuse of the platform may lead to restricted access or legal action.</li>
                            </ul>
                        </div>
                        <div>
                            <h2 className="text-2xl font-semibold mb-3">8. Policy Changes</h2>
                            <p className="text-lg">
                                We may update this Content Policy as needed. Changes will be communicated via the website or app, and your continued use of the platform constitutes acceptance of the updated policy.
                            </p>
                        </div>

                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
};

export default ContentPolicy;
