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
import { ArrowRight} from "lucide-react";
import {motion} from "framer-motion";

const textVariant = {
    hidden: { opacity: 0, y: 50 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.8,
            ease: "easeOut"
        }
    }
};

const containerVariant = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.2,
        },
    },
};

const cardVariant = {
    hidden: { opacity: 0, y: 40 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: "easeOut",
        },
    },
};

const IconGrid = () => {
    const items = [
        // {name: 'GTL', image: 'gtf.png' , width : "130" , height : "130" , link : "https://gudinaandtsehaylegacy.org/" },
        // {name: 'Ilaamee', image: 'ilame.png' , width: "130" , height: "130" , link : "https://gudinatumsafoundation.org/" },
        // {name : 'GTF', image: 'logo.png' , width: "250" , height: "250"  , link : "#" },
        // {name : "Biftuu Bole" , image: "biftu.jpg" , width: "110" , height: "110" , link : "https://biftubole.org/" },
        //
        {name: 'GTL', image: 'cropped.webp' , width : "130" , height : "130" , link : "https://gudinaandtsehaylegacy.org/" },
        {name: 'Ilaamee', image: 'cropped.webp' , width: "130" , height: "130" , link : "https://gudinatumsafoundation.org/" },
        {name : 'GTF', image: 'cropped.webp' , width: "130" , height: "130"  , link : "#" },
        {name : "Biftuu Bole" , image: "cropped.webp" , width: "130" , height: "130" , link : "https://biftubole.org/" },



    ];

    return (
        <div className="py- px-4 sm:px-6 lg:px-8">
            <div className="w-full">
                <div className="w-[80%] mx-auto">

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 md:gap-8 lg:gap-10">
                        {items.map((item, index) => (
                            <a
                                href={item.link}
                                key={index}
                                className="flex flex-col items-center justify-center"
                            >
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    style={{
                                        width: `${item.width}px`,
                                        height: `${item.height}px`,
                                        maxWidth: '100%',
                                        objectFit: 'contain'
                                    }}
                                    className="mb-2"
                                />
                                {/*<p>{item.name}</p>*/}


                                {/* Uncomment if you want to show the name */}
                                {/* <span className="text-sm font-medium mt-2">{item.name}</span> */}
                            </a>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
};

const FeatureCards = () => {
    const features = [
        {
            title: "Learn Anywhere, Anytime",
            description: "Read, research, and reflect on the legacy of Rev. Gudina Tumsa and Tsehay Tolessa from any device, wherever inspiration strikes.",
            image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&auto=format&fit=crop&q=80",
            gradient: "bg-gradient-to-br from-purple-200 via-purple-300 to-purple-400"
        },
        {
            title: "Instant Legacy Access",
            description: "Explore curated books, archives, and resources on Rev. Gudina Tumsa and Tsehay Tolessa—ready whenever you are.",
            image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&auto=format&fit=crop&q=80",
            gradient: "bg-gradient-to-br from-blue-200 via-blue-300 to-blue-400"
        },
        {
            title: "Community of Discovery",
            description: "Engage in meaningful discussions with others passionate about preserving and exploring the legacy of Rev. Gudina Tumsa and Tsehay Tolessa.",
            image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&auto=format&fit=crop&q=80",
            gradient: "bg-gradient-to-br from-pink-200 via-pink-300 to-pink-400"
        }
    ];

    return (
        <section className="px-6 py-16">
            <div className="w-[90%] mx-auto flex justify-center items-start relative">
                {features.map((feature, index) => {
                    let rotation = "rotate-0";
                    let zIndex = index;
                    let translateY = ""
                    if (index === 0) rotation = "-rotate-[4deg]";
                    if (index === features.length - 1) {
                        rotation = "rotate-[4deg]";
                        zIndex = features.length;
                    }
                    if (index === 1) translateY = "-translate-y-10";

                    return (
                        <div
                            key={index}
                            className={`relative ${rotation} ${translateY} ${feature.gradient} border-0 p-6 rounded-3xl shadow-md hover:shadow-xl transition-shadow duration-300`}
                            style={{ marginLeft: index === 0 ? 0 : "-10px", zIndex }}
                        >
                            <h3 className="text-xl font-semibold text-gray-800 mb-[25%]">
                                {feature.title}
                            </h3>
                            <div className="flex items-center justify-between">
                                <p className="text-gray-700 text-sm leading-relaxed max-w-[65%]">
                                    {feature.description}
                                </p>
                                <img
                                    src={feature.image}
                                    alt={feature.title}
                                    className="rounded-md w-[100px] h-[100px] object-cover"
                                />
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
};



const Index = () => {
    const [showNews, setShowNews] = useState(false);


    return (
        <div className="bg-[#F2F2F2] relative font-poppins">

            <Header/>
            <HeroSection/>
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                viewport={{ once: true, amount: 0.3 }}
            >
            <BookPreview/>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                viewport={{ once: true, amount: 0.3 }}
            >
            <HomePageCategory/>
            </motion.div>

            <div
                className="w-full sm:w-4/5 md:w-3/4 lg:w-2/3 xl:w-1/2 mx-auto px-4 sm:px-6 py-6 sm:py-8 md:py-10 bg-[#F2F2F2] text-white rounded-lg flex flex-col items-center justify-center">
                <motion.h1
                    variants={textVariant}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="font-instrument regula sm:text-4xl md:text-5xl font-bold mb-2 sm:mb-4 text-black text-center"
                >
                    Join the GTL community
                </motion.h1>

                <motion.p
                    variants={textVariant}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="justify-center sm:text-lg md:text-lg text-gray-600 text-center block mb-[4%]"
                >
                    Explore over a million resources on the life and mission of Gudina Tumsa and Tsehay Tolessa — start your journey now.
                </motion.p>


                <div className=" w-full flex justify-center">
                    <a href={"/home"}
                       className="inline-flex items-center px-6 sm:px-8 py-2 sm:py-3 border border-gray-300 rounded-full text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 group w-full sm:w-auto justify-center">
                        <span className="font-medium text-sm sm:text-base mr-2">Get Started</span>
                        <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform"/>
                    </a>
                </div>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                viewport={{ once: true, amount: 0.3 }}
            >
                <FeatureCards />
            </motion.div>
            <div className={"mb-[8%] mt-[5%] "}>
                <motion.h1
                    variants={textVariant}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="font-instrument regula sm:text-3xl md:text-3xl font-bold text-black text-center"
                >
                    Backing our Vision
                </motion.h1>

                <IconGrid/>
            </div>
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                viewport={{ once: true, amount: 0.3 }}
            >
            <GrowSection/>
            </motion.div>
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                viewport={{ once: true, amount: 0.3 }}
            >
            <Faq include={true}/>
            </motion.div>
            <div className="mt-[5%]">
                <Footer/>
            </div>
        </div>
    );
};

export default Index;

