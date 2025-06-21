"use client"
import React from 'react';
import Header from '@/app/components/Header';
import HeroSection from '@/app/components/HeroSection';
import BookPreview from '@/app/components/BookPreview';
import HomePageCategory from "@/app/components/HomePageCategory";
import MobileAppSection from "@/app/components/MobileAppSection";
import {ArrowDown, ArrowRight, ChevronDown, Leaf, Star} from 'lucide-react';
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";




const GrowCard = () => {
    const learningScenarios = [
        {
            title: "Doing chores",
            image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=500&h=400&fit=crop",
            className: "mt-0"
        },
        {
            title: "Driving",
            image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=500&h=400&fit=crop",
            badge: "Apple CarPlay",
            className: "mt-12"
        },
        {
            title: "Commuting",
            image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=500&h=400&fit=crop",
            badge: "androidauto",
            className: "mt-6"
        },
        {
            title: "Training",
            image: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=500&h=400&fit=crop",
            className: "mt-16"
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
            {/* Hero Section */}
            <div className="container mx-auto px-4 py-16">
                <div className="text-center max-w-4xl mx-auto mb-16">
                    <h1 className="text-5xl md:text-6xl font-bold text-slate-800 mb-6 leading-tight">
                        Grow wherever you are
                    </h1>
                    <p className="text-xl text-slate-600 leading-relaxed max-w-3xl mx-auto">
                        Forget carving out time. Slip in a little learning in the car, waiting in line, over
                        lunch, before bed, or whenever you've got a moment.
                    </p>
                </div>

                {/* Learning Cards Grid - Staggered Layout */}
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {learningScenarios.map((scenario, index) => (
                            <div
                                key={scenario.title}
                                className={`animate-fade-in ${scenario.className}`}
                                style={{ animationDelay: `${index * 0.1}s` }}
                            >
                                <LearningCard
                                    title={scenario.title}
                                    image={scenario.image}
                                    badge={scenario.badge}
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Call to Action */}
                <div className="text-center mt-16">
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-semibold text-lg transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl">
                        Start Learning Today
                    </button>
                </div>
            </div>
        </div>
    );
};



const Index = () => {
  return (
      <div className="bg-white">
            <Header />
            <HeroSection />
            <BookPreview />

            <HomePageCategory />
          <div className="w-[50%] mx-auto px-6 bg-blue-900 text-white rounded-lg p-8 flex flex-col items-center justify-center mt-[5%]">
              <h1 className="text-4xl font-bold mb-4">Join now</h1>
              <p className="text-xl mb-8">Get access to over a million books, right now.</p>
              <button className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-6 rounded-lg">
                  Join
              </button>
          </div>
          <LearningCarousel />
          {/*  <MobileAppSection />*/}

          {/*</div>*/}
          {/*  <MobileAppSection />*/}

      </div>
  );
};

export default Index;
