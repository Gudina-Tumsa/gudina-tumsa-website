"use client"
import React from 'react';
import Header from '@/app/components/Header';
import HeroSection from '@/app/components/HeroSection';
import BookPreview from '@/app/components/BookPreview';
import HomePageCategory from "@/app/components/HomePageCategory";
import MobileAppSection from "@/app/components/MobileAppSection";
import LearningCarousel from './components/LearningCarousal/LearningCarousel';
import GrowSection from "@/app/components/grow/GrowSection";
import Faq from "@/app/components/Faq/faq";
import Footer from "@/app/components/Footer";






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
          {/*carousal*/}
          <LearningCarousel />
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
