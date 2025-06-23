"use client"
// @ts-nocheck
/* eslint-disable @typescript-eslint/no-explicit-any */

import React , {useRef} from 'react';
import Header from '@/components/layout/Header';
import HeroSection from '@/app/components/HeroSection';
import BookPreview from '@/app/components/BookPreview';
import HomePageCategory from "@/app/components/HomePageCategory";
import GrowSection from "@/components/elements/index/grow/GrowSection";
import Faq from "@/components/elements/index/faq";
import Footer from "@/components/layout/Footer";

import {ArrowRight} from "lucide-react";
import ScrollingLearningCards from "@/components/elements/index/ScrollingLearningCards/ScrollingLearningCards";




const Index = () => {

    return (
      <div className="bg-white">
            <Header />
            <HeroSection />
            <BookPreview />

            <HomePageCategory />
          <div className="w-full sm:w-4/5 md:w-3/4 lg:w-2/3 xl:w-1/2 mx-auto px-4 sm:px-6 py-6 sm:py-8 md:py-10 bg-white text-white rounded-lg flex flex-col items-center justify-center">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-4 text-black text-center">
                  Join now
              </h1>
              <p className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 text-black text-center">
                  Get access to over a million books, right now.
              </p>

              <div className="mb-8 sm:mb-12 md:mb-16 w-full flex justify-center">
                  <button className="inline-flex items-center px-6 sm:px-8 py-2 sm:py-3 border border-gray-300 rounded-full text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 group w-full sm:w-auto justify-center">
                      <span className="font-medium text-sm sm:text-base mr-2">Get Started</span>
                      <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
              </div>
          </div>
          <ScrollingLearningCards />
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
