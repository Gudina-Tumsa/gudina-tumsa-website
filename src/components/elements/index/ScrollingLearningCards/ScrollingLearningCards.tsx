import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface LearningMethod {
    id: number;
    title: string;
    subtitle: string;
    description: string;
    image?: string;
    cardType: string;
    features: string[];
    gradient: string;
}

const ScrollingLearningCards = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    const methods: LearningMethod[] = [
        {
            id: 1,
            title: "Cross-Platform Learning",
            subtitle: "Sharpen your concentration",
            description: "Access your learning materials across all devices and maintain focus wherever you are.",
            cardType: "Productivity",
            features: [
                "Sync progress across devices",
                "Distraction-free interfaces"
            ],
            gradient: "from-purple-500 to-indigo-600"
        },
        {
            id: 2,
            title: "Instant Knowledge Access",
            subtitle: "Master your learning journey",
            description: "Get immediate access to curated knowledge resources tailored to your goals.",
            cardType: "Personal Growth",
            features: [
                "On-demand learning",
                "Personalized recommendations"
            ],
            gradient: "from-blue-500 to-cyan-600"
        },
        {
            id: 3,
            title: "Social Learning Spaces",
            subtitle: "Collaborate and grow together",
            description: "Join communities of learners to discuss ideas and accelerate your progress.",
            cardType: "Community",
            features: [
                "Group discussions",
                "Peer feedback systems"
            ],
            gradient: "from-green-500 to-emerald-600"
        }
    ];

    return (
        <div ref={containerRef} className="relative">
            {methods.map((method, index) => (
                <LearningCardWithScroll
                    key={method.id}
                    method={method}
                    index={index}
                    totalCards={methods.length}
                    progress={scrollYProgress}
                />
            ))}
        </div>
    );
};

interface LearningCardWithScrollProps {
    method: LearningMethod;
    index: number;
    totalCards: number;
    progress: any;
}

const LearningCardWithScroll = ({
                                    method,
                                    index,
                                    totalCards,
                                    progress,
                                }: LearningCardWithScrollProps) => {
    const opacity = useTransform(
        progress,
        [
            (index - 0.5) / totalCards,
            index / totalCards,
            (index + 0.5) / totalCards
        ],
        [0, 1, 1]
    );

    const y = useTransform(
        progress,
        [
            (index - 0.5) / totalCards,
            index / totalCards,
        ],
        [100, 0]
    );

    const scale = useTransform(
        progress,
        [
            (index - 0.5) / totalCards,
            index / totalCards,
        ],
        [0.9, 1]
    );

    return (
        <motion.div
            style={{ opacity, y, scale }}
            className="h-screen flex items-center justify-center sticky top-0 w-full px-4 sm:px-6 md:w-4/5 lg:w-3/4 xl:w-[70%] mx-auto"
        >
            {index === 0 && (
                <div className="absolute top-[-3%] sm:top-[5%] w-full px-4">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-black mb-2 sm:mb-4 text-center">
                        How will you level up?
                    </h1>
                    <span className="hidden sm:flex justify-center text-base sm:text-lg md:text-xl text-gray-600 font-medium text-center block">
                        Listen, read, or get interactive — however you like to learn, you'll find it here
                    </span>
                </div>
            )}

            <div className={`bg-gradient-to-br from-purple-100 to-blue-100 w-full py-6 sm:py-8 md:py-[2%] rounded-xl sm:rounded-2xl`}>
                <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-12 items-center px-4 sm:px-6">
                    {/* Left Content */}
                    <div className="space-y-4 sm:space-y-6">
                        <div>
                            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-purple-600 mb-1 sm:mb-2">
                                {method.title}
                            </h2>
                            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-800">
                                {method.subtitle}
                            </h3>
                        </div>

                        <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
                            {method.description}
                        </p>
                    </div>

                    {/* Right Content - Card */}
                    <div className="flex justify-center">
                        <div className="relative w-full max-w-xs sm:max-w-sm">
                            <div className={`bg-gradient-to-br ${method.gradient} rounded-2xl sm:rounded-3xl p-6 sm:p-8 text-white shadow-xl sm:shadow-2xl w-full h-80 sm:h-96`}>
                                <div className="space-y-3 sm:space-y-4">
                                    {/* Scale Icon */}
                                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 rounded-lg flex items-center justify-center">
                                        <div className="w-4 h-4 sm:w-6 sm:h-6 bg-white/60 rounded"></div>
                                    </div>

                                    {/* Badge */}
                                    <div className="inline-block bg-white/20 px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm font-medium">
                                        Guided plan
                                    </div>

                                    {/* Content */}
                                    <div className="space-y-2 sm:space-y-3">
                                        <h4 className="font-bold text-base sm:text-lg">How to</h4>
                                        <h5 className="font-bold text-lg sm:text-xl leading-tight">
                                            Master {method.title}
                                        </h5>

                                        {/* Exclusive Badge */}
                                        <div className="inline-block bg-red-500 px-2 py-1 sm:px-3 sm:py-1 rounded-lg text-xs sm:text-sm font-bold">
                                            Exclusive
                                        </div>
                                    </div>

                                    {/* Bottom Section */}
                                    <div className="absolute bottom-4 sm:bottom-6 left-6 sm:left-8 right-6 sm:right-8">
                                        <div className="flex items-center justify-between">
                                            <span className="text-xs sm:text-sm font-medium">Expert tips</span>
                                            <div className="w-6 h-6 sm:w-8 sm:h-8 bg-white/20 rounded-full"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default ScrollingLearningCards;