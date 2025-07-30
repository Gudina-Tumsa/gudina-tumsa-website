"use client"
import React, { useState, ChangeEvent, FormEvent } from 'react';
import Header from "@/components/layout/Header";

type FormData = {
    name: string;
    email: string;
    organization: string;
    bookTitle: string;
    bookCategory: string;
    manuscript: File | null;
    message: string;
    agreeToTerms: boolean;
};

type FormErrors = {
    name?: string;
    email?: string;
    organization?: string;
    bookTitle?: string;
    bookCategory?: string;
    manuscript?: string;
    message?: string;
    agreeToTerms?: string;
};

const BookSubmission = () => {
    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        organization: '',
        bookTitle: '',
        bookCategory: '',
        manuscript: null,
        message: '',
        agreeToTerms: false
    });

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
                manuscript: file
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
        if (!formData.bookTitle.trim()) newErrors.bookTitle = 'Book title is required';
        if (!formData.bookCategory) newErrors.bookCategory = 'Please select a category';
        if (!formData.manuscript) newErrors.manuscript = 'Manuscript is required';
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
                bookTitle: '',
                bookCategory: '',
                manuscript: null,
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
                    <img
                        src="/images/book-submission-hero.jpg"
                        alt="Books on a table"
                        className="object-cover"

                    />
                    <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                        <div className="text-center text-white max-w-2xl px-4">
                            <h1 className="text-3xl md:text-4xl font-bold mb-2">Submit Your Book</h1>
                            <p className="text-lg">Share your knowledge with millions of readers</p>
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
                            Thank you for submitting your book. Our editorial team will review your submission
                            and get back to you within 10-14 business days.
                        </p>
                        <button
                            onClick={() => setSubmitSuccess(false)}
                            className="bg-blue-600 text-white px-6 py-3 rounded-full font-medium hover:bg-blue-700 transition"
                        >
                            Submit Another Book
                        </button>
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 gap-12">
                        {/* Form Section */}
                        <section className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                            <h2 className="text-2xl font-semibold mb-6">Book Submission Form</h2>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                                        Author Name *
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
                                        Publisher/Organization *
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
                                    <label htmlFor="bookTitle" className="block text-sm font-medium text-gray-700 mb-1">
                                        Book Title *
                                    </label>
                                    <input
                                        type="text"
                                        id="bookTitle"
                                        name="bookTitle"
                                        value={formData.bookTitle}
                                        onChange={handleChange}
                                        className={`w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 ${errors.bookTitle ? 'border-red-500' : 'border-gray-300'}`}
                                    />
                                    {errors.bookTitle && <p className="mt-1 text-sm text-red-600">{errors.bookTitle}</p>}
                                </div>

                                <div>
                                    <label htmlFor="bookCategory" className="block text-sm font-medium text-gray-700 mb-1">
                                        Book Category *
                                    </label>
                                    <select
                                        id="bookCategory"
                                        name="bookCategory"
                                        value={formData.bookCategory}
                                        onChange={handleChange}
                                        className={`w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 ${errors.bookCategory ? 'border-red-500' : 'border-gray-300'}`}
                                    >
                                        <option value="">Select a category</option>
                                        <option value="business">Business & Finance</option>
                                        <option value="self-help">Personal Development</option>
                                        <option value="science">Science & Technology</option>
                                        <option value="history">History & Biography</option>
                                        <option value="health">Health & Wellness</option>
                                        <option value="fiction">Fiction</option>
                                        <option value="other">Other</option>
                                    </select>
                                    {errors.bookCategory && <p className="mt-1 text-sm text-red-600">{errors.bookCategory}</p>}
                                </div>

                                <div>
                                    <label htmlFor="manuscript" className="block text-sm font-medium text-gray-700 mb-1">
                                        Manuscript Upload *
                                    </label>
                                    <div className={`border-2 border-dashed rounded-lg p-4 ${errors.manuscript ? 'border-red-500' : 'border-gray-300'}`}>
                                        <input
                                            type="file"
                                            id="manuscript"
                                            name="manuscript"
                                            onChange={handleFileChange}
                                            accept=".pdf,.doc,.docx,.epub,.txt"
                                            className="hidden"
                                        />
                                        <label htmlFor="manuscript" className="cursor-pointer">
                                            {previewUrl ? (
                                                <div className="flex items-center space-x-4">
                                                    <div className="w-16 h-16 relative bg-gray-100 rounded flex items-center justify-center">
                                                        <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
                                                        </svg>
                                                    </div>
                                                    <div>
                                                        <p className="font-medium">{formData.manuscript?.name}</p>
                                                        <p className="text-sm text-gray-500">
                                                            {(formData.manuscript?.size ? formData.manuscript.size / 1000 : 0).toFixed(2)} KB
                                                        </p>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="text-center py-8">
                                                    <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                                                    </svg>
                                                    <p className="mt-2 text-sm text-gray-600">
                                                        <span className="font-medium text-blue-600">Click to upload</span> or drag and drop
                                                    </p>
                                                    <p className="text-xs text-gray-500 mt-1">
                                                        PDF, DOC, EPUB up to 10MB
                                                    </p>
                                                </div>
                                            )}
                                        </label>
                                    </div>
                                    {errors.manuscript && <p className="mt-1 text-sm text-red-600">{errors.manuscript}</p>}
                                </div>

                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                                        About This Book *
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        rows={5}
                                        value={formData.message}
                                        onChange={handleChange}
                                        className={`w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 ${errors.message ? 'border-red-500' : 'border-gray-300'}`}
                                        placeholder="Tell us about your book, target audience, and why it would be valuable for GTL readers..."
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
                                            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                        />
                                    </div>
                                    <label htmlFor="agreeToTerms" className="ml-3 text-sm text-gray-700">
                                        I confirm I have the rights to publish this work and agree to the <a href="/terms" className="text-blue-600 hover:underline">submission terms</a>. *
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
                                    ) : 'Submit Book'}
                                </button>
                            </form>
                        </section>

                        {/* Info Section */}
                        <section>
                            <div className="bg-blue-50 p-8 rounded-xl mb-8">
                                <h3 className="text-xl font-semibold mb-4">Why Publish With Us?</h3>
                                <ul className="space-y-4">
                                    <li className="flex items-start">
                                        <div className="bg-blue-100 p-1 rounded-full mr-3">
                                            <svg className="h-5 w-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                        <div>
                                            <h4 className="font-medium">Reach Millions of Readers</h4>
                                            <p className="text-gray-600 text-sm mt-1">Get your ideas to our global community of curious learners</p>
                                        </div>
                                    </li>
                                    <li className="flex items-start">
                                        <div className="bg-blue-100 p-1 rounded-full mr-3">
                                            <svg className="h-5 w-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                        <div>
                                            <h4 className="font-medium">Professional Summarization</h4>
                                            <p className="text-gray-600 text-sm mt-1">Our editorial team creates high-quality, faithful summaries</p>
                                        </div>
                                    </li>
                                    <li className="flex items-start">
                                        <div className="bg-blue-100 p-1 rounded-full mr-3">
                                            <svg className="h-5 w-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                        <div>
                                            <h4 className="font-medium">Boost Book Sales</h4>
                                            <p className="text-gray-600 text-sm mt-1">Many readers purchase the full book after sampling our summaries</p>
                                        </div>
                                    </li>
                                </ul>
                            </div>

                            <div className="border border-gray-200 rounded-xl p-6">
                                <h3 className="text-xl font-semibold mb-4">Our Selection Criteria</h3>
                                <div className="space-y-4">
                                    <div className="flex items-start">
                                        <div className="flex-shrink-0 mt-1">
                                            <div className="flex items-center justify-center h-6 w-6 rounded-full bg-blue-100 text-blue-600 text-sm font-medium">1</div>
                                        </div>
                                        <div className="ml-4">
                                            <p className="text-gray-700">Original, well-researched content with fresh insights</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start">
                                        <div className="flex-shrink-0 mt-1">
                                            <div className="flex items-center justify-center h-6 w-6 rounded-full bg-blue-100 text-blue-600 text-sm font-medium">2</div>
                                        </div>
                                        <div className="ml-4">
                                            <p className="text-gray-700">Clear structure and actionable takeaways</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start">
                                        <div className="flex-shrink-0 mt-1">
                                            <div className="flex items-center justify-center h-6 w-6 rounded-full bg-blue-100 text-blue-600 text-sm font-medium">3</div>
                                        </div>
                                        <div className="ml-4">
                                            <p className="text-gray-700">Relevance to our readers' interests</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8 bg-gray-50 p-6 rounded-xl">
                                <h3 className="text-xl font-semibold mb-4">Have Questions?</h3>
                                <p className="text-gray-600 mb-4">Check our <a href="/faq" className="text-blue-600 hover:underline">Author FAQ</a> or contact our partnerships team:</p>
                                <p className="text-blue-600 font-medium">authors@gtl.com</p>
                            </div>
                        </section>
                    </div>
                )}
            </main>
        </div>
    );
};

export default BookSubmission;