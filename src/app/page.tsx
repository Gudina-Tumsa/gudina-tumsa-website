import React from 'react';
import Header from '@/app/components/Header';
import HeroSection from '@/app/components/HeroSection';
import BookPreview from '@/app/components/BookPreview';
import HomePageCategory from "@/app/components/HomePageCategory";
import MobileAppSection from "@/app/components/MobileAppSection";

const Index = () => {
  return (
      <div className="bg-white">
        <Header />
        <HeroSection />
        <BookPreview />
          <HomePageCategory />
          <MobileAppSection />
      </div>
  );
};

export default Index;
