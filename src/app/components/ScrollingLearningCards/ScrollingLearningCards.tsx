import React, {useRef} from "react";
import {motion, useScroll, useTransform} from "framer-motion";

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

interface ScrollingLearningCardsProps {
    methods: LearningMethod[];
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
            gradient: "from-purple-500 to-indigo-600" // Good for tech/digital themes
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
            gradient: "from-blue-500 to-cyan-600" // Good for knowledge/learning themes
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
            gradient: "from-green-500 to-emerald-600" // Good for social/community themes
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    progress: any;
}

const LearningCardWithScroll = ({
                                    method,
                                    index,
                                    totalCards,
                                    progress,
                                }: LearningCardWithScrollProps) => {
    // Animation for the card appearance
    const opacity = useTransform(
        progress,
        [
            (index - 0.5) / totalCards, // Start appearing
            index / totalCards,          // Fully visible
            (index + 0.5) / totalCards   // Stay visible
        ],
        [0, 1, 1] // Don't fade out
    );

    const y = useTransform(
        progress,
        [
            (index - 0.5) / totalCards, // Start slightly below
            index / totalCards,          // Move to center
        ],
        [100, 0] // Only animate up, not down
    );

    const scale = useTransform(
        progress,
        [
            (index - 0.5) / totalCards, // Start smaller
            index / totalCards,          // Scale to normal
        ],
        [0.9, 1] // Only scale up, not down
    );

    return (
        <motion.div
            style={{
                opacity,
                y,
                scale,
            }}
            className="h-screen flex items-center justify-center sticky top-0 w-[70%] mx-auto" >

            {/* Only show this heading for the first card (index === 0) */}
            {index === 0 && (
                <div className="absolute top-[5%] w-full">
                    <h1 className="text-5xl md:text-6xl font-bold text-black mb-4 text-center">
                        How will you level up?
                        <br />
                    </h1>
                    <span className="text-xl text-gray-600 font-[500px] text-center block">
        Listen, read, or get interactive -- however you like to learn, you'll find it here
    </span>
                </div>
            )}

            <div className="bg-gradient-to-br from-purple-100 to-blue-100 w-full py-[2%]">
                {/* Rest of your card content remains the same */}
                <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Left Content */}
                    <div className="space-y-6">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-bold text-purple-600 mb-2">
                                {method.title}
                            </h2>
                            <h3 className="text-2xl md:text-3xl font-bold text-slate-800">
                                {method.subtitle}
                            </h3>
                        </div>

                        <p className="text-lg text-slate-600 leading-relaxed">
                            {method.description}
                        </p>
                    </div>
                    {/*<div className="flex justify-center">*/}
                    {/*    <img*/}
                    {/*        src ={"https://images.unsplash.com/photo-1746483966755-273b467b24fa?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw3fHx8ZW58MHx8fHx8"}*/}
                    {/*        />*/}
                    {/*</div>*/}
                    {/* Right Content - Card */}
                    <div className="flex justify-center">
                        <div className="relative">
                            {/* Main Card */}
                            <div className={`bg-gradient-to-br ${method.gradient} rounded-3xl p-8 text-white shadow-2xl   w-80 h-96`}>
                                <div className="space-y-4">
                                    {/* Scale Icon */}
                                    <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                                        <div className="w-6 h-6 bg-white/60 rounded"></div>
                                    </div>
                    
                                    {/* Badge */}
                                    <div className="inline-block bg-white/20 px-3 py-1 rounded-full text-sm font-medium">
                                        Guided plan
                                    </div>
                    
                                    {/* Content */}
                                    <div className="space-y-3">
                                        <h4 className="font-bold text-lg">How to</h4>
                                        <h5 className="font-bold text-xl leading-tight">
                                            Master {method.title}
                                        </h5>
                    
                                        {/* Exclusive Badge */}
                                        <div className="inline-block bg-red-500 px-3 py-1 rounded-lg text-sm font-bold">
                                            Exclusive
                                        </div>
                                    </div>
                    
                                    {/* Bottom Section */}
                                    <div className="absolute bottom-6 left-8 right-8">
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm font-medium">Expert tips</span>
                                            <div className="w-8 h-8 bg-white/20 rounded-full"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                    
                            {/* Background Cards */}
                            {/*<div className={`absolute -top-4 -left-4 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl w-48 h-32 -z-10 transform -rotate-12`}>*/}
                            {/*    <div className="p-4 text-white">*/}
                            {/*        <div className="text-xs font-bold mb-1">HOW TO</div>*/}
                            {/*        <div className="text-sm font-bold">{method.features[0] || "Build Better Habits"}</div>*/}
                            {/*    </div>*/}
                            {/*</div>*/}
                    
                            {/*<div className={`absolute -bottom-4 -right-4 bg-gradient-to-br from-green-400 to-teal-500 rounded-2xl w-40 h-28 -z-10 transform rotate-12`}>*/}
                            {/*    <div className="p-3 text-white">*/}
                            {/*        <div className="text-xs font-bold mb-1">{method.cardType}</div>*/}
                            {/*        <div className="text-sm font-bold">{method.features[1] || "Improve Performance"}</div>*/}
                            {/*    </div>*/}
                            {/*</div>*/}
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default ScrollingLearningCards