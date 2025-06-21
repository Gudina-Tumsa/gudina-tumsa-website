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

import {ArrowRight} from "lucide-react";
import ScrollingLearningCards from "@/app/components/ScrollingLearningCards/ScrollingLearningCards";




const Index = () => {

    return (
      <div className="bg-white">
            <Header />
            <HeroSection />
            <BookPreview />

            <HomePageCategory />
          <div className="w-[50%] mx-auto px-6  text-white rounded-lg p-8 flex flex-col items-center justify-center ">
              <h1 className="text-4xl font-bold mb-4  text-black">Join now</h1>
              <p className="text-xl mb-8 text-black">Get access to over a million books, right now.</p>

              <div className=" mb-16">
                  <button className="inline-flex items-center px-8 py-3 border border-gray-300 rounded-full text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 group">
                      <span className="font-medium mr-2">Get Started</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
              </div>
          </div>
          {/*carousal*/}
          {/*<LearningCarousel />*/}

           <ScrollingLearningCards />
          {/*grow*/}
            <GrowSection/>




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
