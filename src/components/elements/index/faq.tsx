
/* eslint-disable */
// @ts-nocheck
import React, { useState, useRef } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface FaqData {
    title: string;
    description: string;
}

function ToggleFaqDetails({ title, description }: FaqData) {
    const [isOpen, setIsOpen] = useState(false);
    const contentRef = useRef<HTMLDivElement>(null);

    return (
        <div className="w-full">
            <div
                className="cursor-pointer w-full"
                onClick={() => setIsOpen(!isOpen)}
            >
                <div className="flex items-center justify-between text-base sm:text-lg md:text-xl font-medium">
                    <span className="text-left pr-4">{title}</span>
                    <span className="transition-transform duration-300 flex-shrink-0">
                        {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </span>
                </div>
            </div>

            <div
                ref={contentRef}
                className="overflow-hidden transition-all duration-500 ease-in-out"
                style={{
                    maxHeight: isOpen ? `${contentRef.current?.scrollHeight}px` : "0px",
                }}
            >
                <p className="mt-3 text-sm sm:text-base text-gray-600 leading-relaxed">
                    {description}
                </p>
            </div>
        </div>
    );
}

const Faq = ({ include }: { include: boolean }) => {
    const faq: FaqData[] = [
        {
            title: "How to access digital books and resources?",
            description: "You can access our digital collection anytime by logging into your GTL Library account. Use the search bar to find books, articles, podcasts, and more. Materials are available for reading online or downloading to your device. The library is designed for easy use across phones, tablets, and computers.",
        },
        {
            title: "How do I create and manage my account?",
            description: "Creating an account is simple: click “Sign Up,” fill in your details, and confirm your email. Once logged in, you can update your profile, change your password, and set your learning preferences under “Account Settings.”",
        },
        {
            title: "What if I have trouble accessing or downloading materials?",
            description: "If you experience any issues, try refreshing your browser or restarting the app. Make sure your internet connection is stable. For download problems, check your device’s storage space. Still stuck? Contact our support team via the “Contact and Help” section — we’re happy to assist you!",
        },
        {
            title: "How can I contribute or suggest new content?",
            description: "We welcome contributions! If you have books, articles, or other resources related to Rev. Gudina Tumsa and Tsehay Tolessa’s legacy, please reach out via the “Contact Us” page. You can also suggest new materials or ideas to help grow the library’s collection.",
        }
    ];

    return (
        <div className="w-full px-4 sm:px-6 lg:px-8 mt-8 sm:mt-12 md:mt-16 lg:mt-20">
            <div className="max-w-4xl mx-auto">
                <h2 className="text-center font-bold font-instrument regula text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-6 sm:mb-8 md:mb-10 leading-tight">
                    Frequently <br className="sm:hidden" /> Asked Questions
                </h2>

                <div className="space-y-4 sm:space-y-6">
                    {faq.map((item, index) => (
                        <div
                            key={index}
                            className="py-4 sm:py-5 md:py-6 px-6 sm:px-8 md:px-10 bg-white rounded-3xl shadow-sm"
                        >
                            <ToggleFaqDetails {...item} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Faq;
