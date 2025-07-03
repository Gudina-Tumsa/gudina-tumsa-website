"use client"
// @ts-nocheck
/* eslint-disable @typescript-eslint/no-explicit-any */

import React from 'react';
import Header from '@/components/layout/Header';
import HeroSection from '@/app/components/HeroSection';
import BookPreview from '@/app/components/BookPreview';
import HomePageCategory from "@/app/components/HomePageCategory";
import GrowSection from "@/components/elements/index/grow/GrowSection";
import Faq from "@/components/elements/index/faq";
import Footer from "@/components/layout/Footer";

import {ArrowRight, BellIcon} from "lucide-react";
import ScrollingLearningCards from "@/components/elements/index/ScrollingLearningCards/ScrollingLearningCards";
import { useState } from 'react';

import Marquee from 'react-fast-marquee';

const IconMarquee = () => {

    const items = [
        { name: 'Nature', image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bW9iaWxlJTIwYXBwbGljYXRpb258ZW58MHx8MHx8fDA%3D' },
        { name: 'Technology', image: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8VGVjaG5vbG9neXxlbnwwfHwwfHx8MA%3D%3D' },
        { name: 'Food', image: 'https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Rm9vZHxlbnwwfHwwfHx8MA%3D%3D' },
        { name: 'Travel', image: 'https://images.unsplash.com/photo-1707344088547-3cf7cea5ca49?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDF8MHxzZWFyY2h8MXx8VHJhdmVsfGVufDB8fDB8fHww' },
        { name: 'Animals', image: 'https://images.unsplash.com/photo-1529778873920-4da4926a72c2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8QW5pbWFsc3xlbnwwfHwwfHx8MA%3D%3D' },
        { name: 'Architecture', image: 'https://images.unsplash.com/photo-1488972685288-c3fd157d7c7a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8QXJjaGl0ZWN0dXJlfGVufDB8fDB8fHww' },
        { name: 'Art', image: 'https://images.unsplash.com/flagged/photo-1572392640988-ba48d1a74457?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8QXJ0fGVufDB8fDB8fHww' },
        { name: 'Sports', image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8U3BvcnRzfGVufDB8fDB8fHww' },

    ];
    return (
        <div style={{ padding: '20px 0' }}>
            <Marquee
                speed={50}
                gradient={false}
                pauseOnHover={true}
            >
                {items.map((item, index) => (
                    <div key={index} style={{
                        margin: '0 20px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center'
                    }}>
                        <img
                            src={item.image}
                            alt={item.name}
                            style={{
                                width: '80px',
                                height: '80px',
                                borderRadius: '50%',
                                objectFit: 'cover',
                                marginBottom: '8px'
                            }}
                        />
                        <span style={{ fontSize: '14px', fontWeight: 'bold' }}>{item.name}</span>
                    </div>
                ))}
            </Marquee>
        </div>
    );
};


const Index = () => {
    const [showNews, setShowNews] = useState(false);
    const [news] = useState([
        "Summer Reading Challenge starts June 1st!",
        "New eBook collection just added",
        "Library will be closed on July 4th",
        "Meet the author event next Tuesday"
    ]);

    return (
        <div className="bg-white relative">
            {/* Floating News Button */}
            <div className="fixed bottom-6 right-6 z-50">
                <button
                    onClick={() => setShowNews(!showNews)}
                    className="bg-blue-600 hover:bg-blue-700 text-white rounded-full p-4 shadow-lg transition-all duration-300 flex items-center justify-center"
                    aria-label="News and events"
                >
                    <BellIcon className="h-6 w-6" />
                    {!showNews && (
                        <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 animate-pulse"></span>
                    )}
                </button>

                {/* News Panel */}
                {showNews && (
                    <div className="absolute bottom-16 right-0 w-72 sm:w-80 bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden">
                        <div className="bg-blue-600 text-white p-3 flex justify-between items-center">
                            <h3 className="font-bold">News & Events</h3>
                            <button
                                onClick={() => setShowNews(false)}
                                className="text-white hover:text-gray-200"
                            >
                                <BellIcon className="h-5 w-5" />
                            </button>
                        </div>

                        <div className="max-h-60 overflow-y-auto">
                            {news.map((item, index) => (
                                <div
                                    key={index}
                                    className="p-3 border-b border-gray-100 hover:bg-gray-50 transition-colors"
                                >
                                    <p className="text-sm text-gray-700">{item}</p>
                                    <span className="text-xs text-gray-500 mt-1 block">Posted {Math.max(1, index + 1)} day{index > 0 ? 's' : ''} ago</span>
                                </div>
                            ))}
                        </div>

                        <div className="bg-gray-50 p-2 text-center">
                            <a href="/newsandevents" className="text-sm text-blue-600 hover:underline">
                                View all announcements
                            </a>
                        </div>
                    </div>
                )}
            </div>

            {/* Rest of your existing content */}
            <Header />
            <HeroSection />
            <BookPreview />
            <div className={"my-[2%]"}>
                <IconMarquee/>
            </div>
            <HomePageCategory />

            <div className="w-full sm:w-4/5 md:w-3/4 lg:w-2/3 xl:w-1/2 mx-auto px-4 sm:px-6 py-6 sm:py-8 md:py-10 bg-white text-white rounded-lg flex flex-col items-center justify-center">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-4 text-black text-center">
                    Join now
                </h1>
                <p className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 text-black text-center">
                    Get access to over a million books, right now.
                </p>

                <div className="mb-8 sm:mb-12 md:mb-16 w-full flex justify-center">
                    <a href={"/home"} className="inline-flex items-center px-6 sm:px-8 py-2 sm:py-3 border border-gray-300 rounded-full text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 group w-full sm:w-auto justify-center">
                        <span className="font-medium text-sm sm:text-base mr-2">Get Started</span>
                        <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
                    </a>
                </div>
            </div>

            <ScrollingLearningCards />
            <GrowSection/>
            <Faq />
            <div className="mt-[5%]">
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
