/* eslint-disable  */
// @ts-nocheck

"use client"


import React, {useEffect} from 'react';
import Header from '@/components/layout/Header';
import HeroSection from '@/app/components/HeroSection';
import BookPreview from '@/app/components/BookPreview';
import HomePageCategory from "@/app/components/HomePageCategory";
import GrowSection from "@/components/elements/index/grow/GrowSection";
import Faq from "@/components/elements/index/faq";
import Footer from "@/components/layout/Footer";
import { useState } from "react";
import {ArrowRightIcon, Bell} from "lucide-react";
import {ArrowLeft, ArrowRight, BellIcon} from "lucide-react";
import ScrollingLearningCards from "@/components/elements/index/ScrollingLearningCards/ScrollingLearningCards";

import Marquee from 'react-fast-marquee';
import {getNews} from "@/app/data/news";

const IconMarquee = () => {

    const items = [
        {name: 'GTF', image: 'gtf.png' , width : "130" , height : "130" },
        {name: 'Ilaamee', image: 'ilame.png' , width: "130" , height: "130" },
        {name : 'GTL', image: 'logo.png' , width: "230" , height: "230" },


    ];
    return (
        <div style={{padding: '20px 0'}}>
            <Marquee
                speed={50}
                gradient={false}
                pauseOnHover={true}
                className={"flex px-5"}
            >

                {items.map((item, index) => (
                    <div key={index} className="flex flex-col items-center mx-[40px] bg-red-500">
                        <img
                            src={item.image}
                            alt={item.name}
                            style={{ width: `${item.width}px`, height: `${item.height}px` }}
                            className={`mb-2`}
                        />
                        <span className="text-sm font-bold">{item.name}</span>
                    </div>
                ))}
            </Marquee>
        </div>
    );
};



function FloatingNews() {
    const [isOpen, setIsOpen] = useState(false);
    const [news , setNews] = useState([])
    useEffect(() => {
        const newsData = getNews()
        setNews(newsData)
    },[])
    return (
        <div className="fixed bottom-6 right-6 z-50">
            {/* Floating Button */}
            {!isOpen && (
                <button
                    onClick={() => setIsOpen(true)}
                    className="relative p-3 rounded-full bg-purple-600 text-white shadow-lg hover:bg-purple-700 transition-all"
                >
                    {/* Bell Icon */}
                    <Bell className="w-5 h-5" />

                    {/* Attention Dot */}
                    <span className="absolute top-1 right-1 block h-2 w-2 rounded-full bg-red-500 animate-ping" />
                    <span className="absolute top-1 right-1 block h-2 w-2 rounded-full bg-red-500" />
                </button>
            )}


            {/* News Panel */}
            {isOpen && (
                <div className="relative w-80 rounded-xl shadow-xl backdrop-blur-md bg-purple-100/10 overflow-hidden">
                    {/* noise overlay */}
                    <div
                        className="absolute inset-0 pointer-events-none z-[-1]"
                        style={{
                            backgroundImage: `
                radial-gradient(circle at 1px 1px, rgba(0,0,0,0.05) 1px, transparent 0),
                radial-gradient(circle at 3px 3px, rgba(0,0,0,0.03) 1px, transparent 0)
              `,
                            backgroundSize: '4px 4px',
                        }}
                    />

                    <div>
                        {news.map((item, index) => (
                            <a
                                key={index}
                                href={`/news/${item.id}`}
                                className="block p-4 transition-colors hover:bg-gray-50 group"
                            >
                                <p className="text-sm text-gray-800 group-hover:text-blue-600">{item.title}</p>
                                <span className="text-xs text-gray-600 mt-1 block">
            Posted {item.date}
        </span>
                            </a>
                        ))}
                    </div>

                    <div className="p-2 flex justify-between items-center">
                        <a
                            href="/newsandevents"
                            className="ml-[2%] text-sm text-indigo-600 flex items-center gap-1 hover:underline"
                        >
                            <ArrowRight className="w-4 h-4" />
                            Read More
                        </a>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="text-xs text-gray-500 hover:text-gray-800"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}



const Index = () => {
    const [showNews, setShowNews] = useState(false);


    return (
        <div className="bg-white relative">
            {/* Floating News Button */}
            {/*<FloatingNews  />*/}


            {/* Rest of your existing content */}
            <Header/>
            <HeroSection/>
            <BookPreview/>

            <HomePageCategory/>
            <div className={"mb-[3%] "}>
                <p className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 text-black text-center">
                    Our partners
                </p>
                <IconMarquee/>
            </div>
            <div
                className="w-full sm:w-4/5 md:w-3/4 lg:w-2/3 xl:w-1/2 mx-auto px-4 sm:px-6 py-6 sm:py-8 md:py-10 bg-white text-white rounded-lg flex flex-col items-center justify-center">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-4 text-black text-center">
                    {/*Join now*/}
                    Join the GTL community
                </h1>
                <p className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 text-black text-center">
                    Explore over a million resources on the life and mission of Gudina Tumsa and Tsehay Tolessa — start your journey now.
                </p>

                <div className="mb-8 sm:mb-12 md:mb-16 w-full flex justify-center">
                    <a href={"/home"}
                       className="inline-flex items-center px-6 sm:px-8 py-2 sm:py-3 border border-gray-300 rounded-full text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 group w-full sm:w-auto justify-center">
                        <span className="font-medium text-sm sm:text-base mr-2">Get Started</span>
                        <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform"/>
                    </a>
                </div>
            </div>

            <ScrollingLearningCards/>
            <GrowSection/>
            <Faq include={true}/>
            <div className="mt-[5%]">
                <Footer/>
            </div>
        </div>
    );
};

export default Index;


//
// <MobileAppSection />
// </div>
// <MobileAppSection />
