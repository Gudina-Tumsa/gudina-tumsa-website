"use client"
// @ts-nocheck
/* eslint-disable @typescript-eslint/no-explicit-any */

import React , {useRef} from 'react';
import Header from '@/app/components/Header';
import HeroSection from '@/app/components/HeroSection';
import BookPreview from '@/app/components/BookPreview';
import HomePageCategory from "@/app/components/HomePageCategory";
import GrowSection from "@/app/components/grow/GrowSection";
import Faq from "@/app/components/Faq/faq";
import Footer from "@/app/components/Footer";

import {motion,  useScroll, useTransform} from "framer-motion";

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

const ScrollingLearningCards = ({ methods }: ScrollingLearningCardsProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

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
            className="h-screen flex items-center justify-center sticky top-0 w-[70%] mx-auto"
        >
            <div className="bg-gradient-to-br from-purple-100 to-blue-100 w-full py-[2%]">
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

                    {/* Right Content - Card */}
                    <div className="flex justify-center">
                        <div className="relative">
                            {/* Main Card */}
                            <div className={`bg-gradient-to-br ${method.gradient} rounded-3xl p-8 text-white shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-300 w-80 h-96`}>
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
                            <div className={`absolute -top-4 -left-4 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl w-48 h-32 -z-10 transform -rotate-12`}>
                                <div className="p-4 text-white">
                                    <div className="text-xs font-bold mb-1">HOW TO</div>
                                    <div className="text-sm font-bold">{method.features[0] || "Build Better Habits"}</div>
                                </div>
                            </div>

                            <div className={`absolute -bottom-4 -right-4 bg-gradient-to-br from-green-400 to-teal-500 rounded-2xl w-40 h-28 -z-10 transform rotate-12`}>
                                <div className="p-3 text-white">
                                    <div className="text-xs font-bold mb-1">{method.cardType}</div>
                                    <div className="text-sm font-bold">{method.features[1] || "Improve Performance"}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};


const Index = () => {
    const methods: LearningMethod[] = [
        {
            id: 1,
            title: "Focus Mastery",
            subtitle: "Sharpen your concentration",
            description: "Learn techniques to eliminate distractions and achieve deep work states consistently.",
            cardType: "Productivity",
            features: [
                "Eliminate distractions",
                "Deep work techniques"
            ],
            gradient: "from-purple-500 to-indigo-600"
        },
        {
            id: 2,
            title: "Emotional Intelligence",
            subtitle: "Master your emotions",
            description: "Develop self-awareness and emotional regulation skills for better relationships.",
            cardType: "Personal Growth",
            features: [
                "Self-awareness training",
                "Relationship building"
            ],
            gradient: "from-blue-500 to-teal-600"
        },
        {
            id: 3,
            title: "Strategic Thinking",
            subtitle: "Think like a CEO",
            description: "Develop long-term vision and decision-making frameworks used by top executives.",
            cardType: "Leadership",
            features: [
                "Decision frameworks",
                "Vision development"
            ],
            gradient: "from-amber-500 to-orange-600"
        }
    ];

    return (
      <div className="bg-white">
            <Header />
            <HeroSection />
            <BookPreview />

            <HomePageCategory />
          <div className="w-[50%] mx-auto px-6 bg-blue-900 text-white rounded-lg p-8 flex flex-col items-center justify-center mt-[8%]">
              <h1 className="text-4xl font-bold mb-4">Join now</h1>
              <p className="text-xl mb-8">Get access to over a million books, right now.</p>
              <button className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-6 rounded-lg">
                  Get started
              </button>
          </div>
          {/*carousal*/}
          {/*<LearningCarousel />*/}

           <ScrollingLearningCards methods={methods} />
            <GrowSection/>
          {/*grow*/}



          <Faq />
          <div className={"mt-[5%]"}>
              <Footer />
          </div>


      </div>
  );
};

export default Index;



//
// <MobileAppSection />
// </div>
// <MobileAppSection />
