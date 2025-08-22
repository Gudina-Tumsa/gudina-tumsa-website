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
                <div className="flex items-center justify-between  text-base sm:text-lg md:text-xl">
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
            title: "How can i contribute or suggest new contents?",
            description: "We welcome contributions! If you have books, articles, or other resources related to Rev. Gudina Tumsa and Tsehay Tolessa’s legacy, please reach out via the “Contact Us” page. You can also suggest new materials or ideas to help grow the library’s collection.",
        }

    ];

    return (
        <div className={`w-[60%] mx-auto px-4 sm:px-6  mt-8 sm:mt-12 md:mt-16 lg:mt-20" `}>
            <h2 className="text-center font-bold font-instrument regula sm:text-4xl md:text-5xl mb-6 sm:mb-8 md:mb-10">
                {/*Do you have any questions?*/}
                Frequently <br />Asked Questions?
            </h2>
            <div className="w-full mx-auto  space-y-4 sm:space-y-6">
                {faq.map((item, index) => (
                    <div key={index} className="py-3 sm:py-4 md:py-5 shadow-sm rounded-[40px] bg-white w-full px-10">
                        <ToggleFaqDetails {...item} />
                        {/*{index !== faq.length - 1 && <hr className="mt-4 sm:mt-5 border-gray-200" />}*/}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Faq;
