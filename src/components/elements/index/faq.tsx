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
                <div className="flex items-center justify-between font-medium text-base sm:text-lg md:text-xl">
                    <span className="text-left pr-4">{title}</span>
                    <span className={`transition-transform duration-300 flex-shrink-0`}>
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
                <p className="mt-3 text-sm sm:text-base text-gray-600">{description}</p>
            </div>
        </div>
    );
}

const Faq = ({include }: {include : boolean}) => {
    const faq: FaqData[] = [
        {
            title: " How to access digital books and resources?",
            description: "How to access digital books and resources?",
        },
        {
            title: "Creating and managing your account?",
            description: "Creating and managing your account?",
        },
        {
            title: "Troubleshooting access or downloads",
            description: "You can purchase our products through our website or authorized retailers listed on our site.",
        },
        {
            title: "Contributing or suggesting content",
            description: "Our support program funds local environmental initiatives and offers educational resources on sustainability.",
        }

    ];

    return (
        <div className={`w-full ${include ? "px-4 sm:px-6 md:w-4/5 lg:w-3/4 xl:w-1/2 mx-auto mt-8 sm:mt-12 md:mt-16 lg:mt-20" : ""}`}>
            <h2 className="text-center font-bold text-2xl sm:text-3xl md:text-4xl mb-6 sm:mb-8 md:mb-10">
                Do you have any questions?
            </h2>
            <div className="space-y-4 sm:space-y-6">
                {faq.map((item, index) => (
                    <div key={index} className="py-3 sm:py-4 md:py-5">
                        <ToggleFaqDetails {...item} />
                        {index !== faq.length - 1 && <hr className="mt-4 sm:mt-5 border-gray-200" />}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Faq;
