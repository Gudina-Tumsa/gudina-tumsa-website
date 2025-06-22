import React, { useState , useRef } from "react";

import { ChevronDown , ChevronUp} from "lucide-react"
interface FaqData {
    title: string;
    description: string;
}
// chevron-down

function ToggleFaqDetails({ title, description }: FaqData) {
    const [isOpen, setIsOpen] = useState(false);
    const contentRef = useRef<HTMLDivElement>(null);

    return (
        <div>
            <div className="cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
                <div className="flex items-center justify-between font-medium text-lg">
                    <span>{title}</span>
                    <span className={`transition-transform duration-300`}>
                        {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </span>
                </div>
            </div>

            <div
                ref={contentRef}
                className="overflow-hidden transition-all duration-500 ease-in-out"
                style={{
                    maxHeight: isOpen ? contentRef.current?.scrollHeight : 0,
                }}
            >
                <p className="mt-3 text-sm text-gray-600">{description}</p>
            </div>
        </div>
    );
}

const Faq = () => {
    const faq: FaqData[] = [
        {
            title: "What is EkoSofia?",
            description:
                "EkoSofia is a sustainable brand committed to creating eco-friendly products that blend nature and technology.",
        },
        {
            title: "What materials are used?",
            description:
                "We use biodegradable, recycled, and ethically sourced materials in all our products.",
        },
        {
            title: "How can I buy your products?",
            description:
                "You can purchase our products through our website or authorized retailers listed on our site.",
        },
        {
            title: "What is your sustainability support program?",
            description:
                "Our support program funds local environmental initiatives and offers educational resources on sustainability.",
        },
        {
            title: "What’s your return or exchange policy?",
            description:
                "We accept returns within 30 days of purchase. Products must be unused and in original packaging.",
        },
        {
            title: "How do you use technology for nature?",
            description:
                "We use AI and IoT to optimize supply chains, reduce waste, and track environmental impact.",
        },
        {
            title: "Do you offer customization?",
            description:
                "Yes, we offer customization options for bulk and personal orders. Contact support for more info.",
        },
    ];

    return (
        <div className="w-[45%] mx-auto mt-[5%]">
            <p className={"text-center font-bold text-4xl mb-[5%]"}>Do you have any questions?</p>
            {faq.map((item, index) => (

                <div className="py-5 space-y-5" key={index}>
                    <ToggleFaqDetails {...item} />
                    { index != faq.length -1 ?<hr/> : ""}
                </div>

            ))}
        </div>
    );
};

export default Faq;
