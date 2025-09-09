/* eslint-disable  */
// @ts-nocheck

/* eslint-disable  */
// @ts-nocheck

"use client"
import React, {useState, ChangeEvent, FormEvent, useEffect} from 'react';
import Header from "@/components/layout/Header";
import Link from "next/link";
import {getReadingBooks, getTodaysSelection} from "@/lib/api/book";

type FormData = {
    name: string;
    email: string;
    organization: string;
    contributionType: string;
    description: string;
    files: File | null;
    message: string;
    agreeToTerms: boolean;
};

type FormErrors = {
    name?: string;
    email?: string;
    organization?: string;
    contributionType?: string;
    description?: string;
    files?: string;
    message?: string;
    agreeToTerms?: string;
};

const CollaborationPage = () => {
    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        organization: '',
        contributionType: '',
        description: '',
        files: null,
        message: '',
        agreeToTerms: false
    });

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

    const [activeTab, setActiveTab] = useState<'form' | 'info'>('form');
    const [errors, setErrors] = useState<FormErrors>({});
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [submitSuccess, setSubmitSuccess] = useState<boolean>(false);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setFormData(prev => ({
                ...prev,
                files: file
            }));

            // Create preview URL
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewUrl(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: checked
        }));
    };

    const validateForm = (): boolean => {
        const newErrors: FormErrors = {};
        if (!formData.name.trim()) newErrors.name = 'Name is required';
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email';
        }
        if (!formData.organization.trim()) newErrors.organization = 'Organization is required';
        if (!formData.contributionType) newErrors.contributionType = 'Please select a contribution type';
        if (!formData.description.trim()) newErrors.description = 'Please describe your contribution';
        if (!formData.message.trim()) newErrors.message = 'Please enter your message';
        if (!formData.agreeToTerms) newErrors.agreeToTerms = 'You must agree to the terms';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!validateForm()) return;

        setIsSubmitting(true);

        // Simulate API call with file upload
        try {
            await new Promise(resolve => setTimeout(resolve, 2000));
            setSubmitSuccess(true);
            setFormData({
                name: '',
                email: '',
                organization: '',
                contributionType: '',
                description: '',
                files: null,
                message: '',
                agreeToTerms: false
            });
            setPreviewUrl(null);
        } catch (error) {
            console.error('Submission error:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen text-gray-800">
            <Header />

            <main className="w-full max-w-6xl mx-auto px-6 md:px-8 my-10 space-y-12">
                {/* Hero Section */}
                <section className="relative h-64 rounded-xl overflow-hidden mb-12">

                    <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                        <div className="text-center text-white max-w-2xl px-4">
                            <h1 className="font-instrument regula  md:text-5xl font-bold mb-2">Collaborate With Us</h1>
                            <p className=" font-medium ">Join us in preserving and sharing the legacy of Rev. Gudina Tumsa and Tsehay Tolessa</p>
                        </div>
                    </div>
                </section>

                {submitSuccess ? (
                    <div className="text-center py-12">
                        <div className="w-20 h-20 mx-auto mb-6 relative">
                            <img
                                src="/images/success-icon.svg"
                                alt="Success icon"
                                className="object-contain"
                            />
                        </div>
                        <h2 className="text-2xl font-semibold mb-4">Submission Received!</h2>
                        <p className="text-lg mb-6 max-w-2xl mx-auto">
                            Thank you for your interest in collaborating with the GTL online Library.
                            Our team will review your submission and get back to you soon.
                        </p>
                        <button
                            onClick={() => setSubmitSuccess(false)}
                            className="bg-blue-600 text-white px-6 py-3 rounded-full font-medium hover:bg-blue-700 transition"
                        >
                            Submit Another Collaboration
                        </button>
                    </div>
                ) : (
                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Sidebar */}
                        <div className="md:col-span-1 bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-fit sticky top-8">
                            <h3 className="text-xl font-semibold mb-4">Ways to Collaborate</h3>
                            <nav className="space-y-2">
                                <button
                                    onClick={() => setActiveTab('form')}
                                    className={`w-full text-left px-4 py-2 rounded-lg transition ${activeTab === 'form' ? 'bg-blue-50 text-[#9407F2] font-medium' : 'text-gray-700 hover:bg-gray-50'}`}
                                >
                                    Submit Collaboration
                                </button>
                                <button
                                    onClick={() => setActiveTab('info')}
                                    className={`w-full text-left px-4 py-2 rounded-lg transition ${activeTab === 'info' ? 'bg-blue-50 text-[#9407F2] font-medium' : 'text-gray-700 hover:bg-gray-50'}`}
                                >
                                    Collaboration Info
                                </button>
                            </nav>

                            <div className="mt-8">

                                <Link href={"/contactus"}><h4 className="font-medium mb-2">Contact Us</h4> </Link>
                                {/*<p className="text-sm text-gray-600 mb-1">Email: info@gudinaandtsehaylegacy.org</p>*/}
                                {/*<p className="text-sm text-gray-600">Phone: +251-900916524</p>*/}
                            </div>
                        </div>

                        {/* Main Content */}
                        <div className="md:col-span-2">
                            {activeTab === 'form' ? (
                                <section className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                                    <h2 className="text-2xl font-semibold mb-6">Collaboration Submission Form</h2>
                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        <div>
                                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                                                Your Name *
                                            </label>
                                            <input
                                                type="text"
                                                id="name"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                className={`w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                                            />
                                            {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                                        </div>

                                        <div>
                                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                                Email Address *
                                            </label>
                                            <input
                                                type="email"
                                                id="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                className={`w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                                            />
                                            {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                                        </div>

                                        <div>
                                            <label htmlFor="organization" className="block text-sm font-medium text-gray-700 mb-1">
                                                Organization *
                                            </label>
                                            <input
                                                type="text"
                                                id="organization"
                                                name="organization"
                                                value={formData.organization}
                                                onChange={handleChange}
                                                className={`w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 ${errors.organization ? 'border-red-500' : 'border-gray-300'}`}
                                            />
                                            {errors.organization && <p className="mt-1 text-sm text-red-600">{errors.organization}</p>}
                                        </div>

                                        <div>
                                            <label htmlFor="contributionType" className="block text-sm font-medium text-gray-700 mb-1">
                                                Type of Collaboration *
                                            </label>
                                            <select
                                                id="contributionType"
                                                name="contributionType"
                                                value={formData.contributionType}
                                                onChange={handleChange}
                                                className={`w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 ${errors.contributionType ? 'border-red-500' : 'border-gray-300'}`}
                                            >
                                                <option value="">Select collaboration type</option>
                                                <option value="content">Content Contribution</option>
                                                <option value="institutional">Institutional Partnership</option>
                                                <option value="volunteering">Volunteering/Internship</option>
                                                <option value="technical">Technical Support</option>
                                                <option value="other">Other</option>
                                            </select>
                                            {errors.contributionType && <p className="mt-1 text-sm text-red-600">{errors.contributionType}</p>}
                                        </div>

                                        <div>
                                            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                                                Description of Contribution *
                                            </label>
                                            <textarea
                                                id="description"
                                                name="description"
                                                rows={3}
                                                value={formData.description}
                                                onChange={handleChange}
                                                className={`w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 ${errors.description ? 'border-red-500' : 'border-gray-300'}`}
                                                placeholder="Please describe what you would like to contribute..."
                                            />
                                            {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
                                        </div>

                                        <div>
                                            <label htmlFor="files" className="block text-sm font-medium text-gray-700 mb-1">
                                                Supporting Materials (Optional)
                                            </label>
                                            <div className={`border-2 border-dashed rounded-lg p-4 ${errors.files ? 'border-red-500' : 'border-gray-300'}`}>
                                                <input
                                                    type="file"
                                                    id="files"
                                                    name="files"
                                                    onChange={handleFileChange}
                                                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.mp3,.mp4"
                                                    className="hidden"
                                                />
                                                <label htmlFor="files" className="cursor-pointer">
                                                    {previewUrl ? (
                                                        <div className="flex items-center space-x-4">
                                                            <div className="w-16 h-16 relative bg-gray-100 rounded flex items-center justify-center">
                                                                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
                                                                </svg>
                                                            </div>
                                                            <div>
                                                                <p className="font-medium">{formData.files?.name}</p>
                                                                <p className="text-sm text-gray-500">
                                                                    {(formData.files?.size ? formData.files.size / 1000 : 0).toFixed(2)} KB
                                                                </p>
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <div className="text-center py-8">
                                                            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                                                            </svg>
                                                            <p className="mt-2 text-sm text-gray-600">
                                                                <span className="font-medium text-[#9407F2]">Click to upload</span> or drag and drop
                                                            </p>
                                                            <p className="text-xs text-gray-500 mt-1">
                                                                PDF, DOC, Images, Audio up to 20MB
                                                            </p>
                                                        </div>
                                                    )}
                                                </label>
                                            </div>
                                            {errors.files && <p className="mt-1 text-sm text-red-600">{errors.files}</p>}
                                        </div>

                                        <div>
                                            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                                                Additional Message *
                                            </label>
                                            <textarea
                                                id="message"
                                                name="message"
                                                rows={5}
                                                value={formData.message}
                                                onChange={handleChange}
                                                className={`w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 ${errors.message ? 'border-red-500' : 'border-gray-300'}`}
                                                placeholder="Tell us more about your proposed collaboration..."
                                            />
                                            {errors.message && <p className="mt-1 text-sm text-red-600">{errors.message}</p>}
                                        </div>

                                        <div className="flex items-start">
                                            <div className="flex items-center h-5">
                                                <input
                                                    id="agreeToTerms"
                                                    name="agreeToTerms"
                                                    type="checkbox"
                                                    checked={formData.agreeToTerms}
                                                    onChange={handleCheckboxChange}
                                                    className="w-4 h-4 text-[#9407F2] border-gray-300 rounded focus:ring-blue-500"
                                                />
                                            </div>
                                            <label htmlFor="agreeToTerms" className="ml-3 text-sm text-gray-700">
                                                I confirm that I have the rights to share any materials submitted and agree to the <a href="/terms" className="text-[#9407F2] hover:underline">collaboration terms</a>. *
                                            </label>
                                        </div>
                                        {errors.agreeToTerms && <p className="mt-1 text-sm text-red-600">{errors.agreeToTerms}</p>}

                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className={`w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                                        >
                                            {isSubmitting ? (
                                                <span className="flex items-center justify-center">
                                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                    </svg>
                                                    Submitting...
                                                </span>
                                            ) : 'Submit Collaboration'}
                                        </button>
                                    </form>
                                </section>
                            ) : (
                                <section className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                                    <h2 className="font-instrument regula text-4xl font-semibold mb-6">Collaboration Information</h2>

                                    <div className="mb-8">
                                        <h3 className="text-xl font-semibold mb-4">About GTL Online Library</h3>
                                        <p className="text-gray-700 mb-4">
                                            The GTL online Library is a living digital archive built on the legacy of Rev. Gudina Tumsa and Tsehay Tolessa.
                                            We believe that collaboration is essential to expanding its reach, enriching its content, and making it a
                                            transformative resource for future generations.
                                        </p>
                                        <p className="text-gray-700">
                                            We warmly welcome partnerships with individuals, institutions, and communities who share our mission.
                                        </p>
                                    </div>

                                    <div className="mb-8">
                                        <h3 className="text-xl font-semibold mb-4">Ways to Collaborate</h3>

                                        <div className="mb-6">
                                            <h4 className="font-semibold text-lg mb-2 text-[#9407F2]">1. Content Contribution</h4>
                                            <p className="text-gray-700 mb-3">
                                                We invite scholars, writers, church leaders, and institutions to contribute:
                                            </p>
                                            <ul className="list-disc pl-5 space-y-1 text-gray-700">
                                                <li>Original research and publications</li>
                                                <li>Historical documents and archives</li>
                                                <li>Audio/video recordings of teachings or testimonies</li>
                                                <li>Translations of relevant texts</li>
                                                <li>Books or manuscripts related to theology, ethics, leadership, and justice</li>
                                            </ul>
                                            <p className="text-gray-700 mt-3">
                                                All contributions will be reviewed for relevance, accuracy, and alignment with our mission.
                                            </p>
                                        </div>

                                        <div className="mb-6">
                                            <h4 className="font-semibold text-lg mb-2 text-[#9407F2]">2. Institutional Partnerships</h4>
                                            <p className="text-gray-700 mb-3">
                                                We are open to collaboration with:
                                            </p>
                                            <ul className="list-disc pl-5 space-y-1 text-gray-700">
                                                <li>Universities and theological seminaries</li>
                                                <li>Libraries and archives</li>
                                                <li>Churches and ecumenical organizations</li>
                                                <li>Human rights and peace-building institutions</li>
                                                <li>Digital platforms and publishers</li>
                                            </ul>
                                            <p className="text-[#9407F2] mt-3">
                                                Together, we can co-develop educational materials, host joint events, and share resources.
                                            </p>
                                        </div>

                                        <div className="mb-6">
                                            <h4 className="font-semibold text-lg mb-2 text-[#9407F2]">3. Volunteering and Internships</h4>
                                            <p className="text-gray-700 mb-3">
                                                We welcome individuals especially students, researchers, and young professionals who are passionate
                                                about contributing to the legacy of Rev. Gudina Tumsa and Tsehay Tolessa through research and knowledge preservation.
                                            </p>
                                            <p className="text-gray-700 mb-3">
                                                As a volunteer or intern with the GTL online Library, you can be part of meaningful work such as:
                                            </p>
                                            <ul className="list-disc pl-5 space-y-1 text-gray-700">
                                                <li>Conducting historical and theological research</li>
                                                <li>Gathering oral histories and testimonies</li>
                                                <li>Documenting and organizing archival materials</li>
                                                <li>Assisting in the preparation of publications</li>
                                                <li>Supporting translation of key texts</li>
                                                <li>Collaborating on academic projects or exhibitions</li>
                                            </ul>
                                            <p className="text-gray-700 mt-3">
                                                This is a unique opportunity to gain hands-on experience while contributing to a growing body of knowledge
                                                that honors two of Ethiopia's most courageous and visionary Christian leaders.
                                            </p>
                                        </div>

                                        <div>
                                            <h4 className="font-semibold text-lg mb-2 text-[#9407F2]">4. Technical Support & Innovation</h4>
                                            <p className="text-gray-700 mb-3">
                                                If you're a developer, designer, or IT expert, you can help us:
                                            </p>
                                            <ul className="list-disc pl-5 space-y-1 text-gray-700">
                                                <li>Improve user experience on our web and mobile platforms</li>
                                                <li>Build tools for search, accessibility, or multilingual support</li>
                                                <li>Strengthen our digital infrastructure and security</li>
                                            </ul>
                                        </div>
                                    </div>

                                    <div className="bg-blue-50 p-6 rounded-lg">
                                        <h3 className="text-xl font-semibold mb-4 text-blue-700">Together, We Preserve and Share the Legacy</h3>
                                        <p className="text-gray-700">
                                            Your partnership helps ensure that the spiritual, theological, and ethical wisdom of Rev. Gudina Tumsa and
                                            Tsehay Tolessa continues to inspire lives across generations and continents.
                                        </p>
                                    </div>
                                </section>
                            )}
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};

export default CollaborationPage;
