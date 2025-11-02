/* eslint-disable  */
// @ts-nocheck

import { ArrowRight, ChevronDown , CircleArrowRight } from "lucide-react";
import React from "react";
import {motion} from "framer-motion";
const textSlideUp = {
    hidden: { opacity: 0, y: 60 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.8,
            ease: "easeOut",
            staggerChildren: 0.15,
        },
    },
};


const HeroSection = () => {
    return (
        <div className="flex flex-col justify-between min-h-screen">
            <div className=" flex flex-col lg:flex-row justify-between px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16 max-w-7xl mx-auto">
                {/* Text Content */}
                <div className="lg:w-1/2  flex flex-col justify-center sm:space-x-10">
                    <div className="text-center lg:text-left font-instrument regula">
                        <motion.h1
                            variants={textSlideUp}
                            className="..."
                        >
                            <h1 className="text-4xl sm:text-8xl lg:text-8xl font-bold text-gray-900 leading-snug mb-2">
                                Knowledge{' '}
                            </h1>

                        </motion.h1>

                        <h1 className="text-4xl sm:text-8xl lg:text-8xl font-bold text-gray-900 leading-tight mb-2">
                            at the tip
                        </h1>
                        <h1 className="text-4xl sm:text-8xl lg:text-8xl font-bold text-gray-900 leading-tight mb-4 sm:mb-6">
                            of your fingers
                        </h1>
                        <p className="text-xl sm:text-xl tracking-tight text-gray-600 mb-6 sm:mb-8 leading-snug font-poppins">
                            Get key insights from{' '}
                            <span className="text-[#9407F2] font-medium"> books</span>,{' '}
                            <span className="text-[#9407F2] font-medium">talks</span>, {' '}
                            <br />
                            <span className="text-[#9407F2] font-medium">and archives on </span>

                            <span>Rev. Gudina Tumsa </span>
                            <br />
                            <span>and Tsehay Tolessa </span>

                            <span>All in minutes with </span>
                            <br className="hidden sm:block" />
                            <span>the GTL app.</span>
                        </p>
                        <div className=" justify-center lg:justify-start mb-8 sm:mb-12 lg:mb-16 font-poppins space-x-2">
                            <a
                                className="relative bg-black inline-flex items-center px-12  py-2  border border-gray-300 rounded-full text-white  hover:border-gray-400 transition-all duration-200 group"
                                aria-label="Get Started"
                                href={"/home"}
                            >
                                <span className="font-medium mr-2">Get Started</span>
                            </a>
                            <a
                                className="inline-flex space-x-2 items-center px-6 sm:px-8 sm:py-2 text-black  transition-all duration-200 group"
                                aria-label="Get Started"
                                href={"/home"}
                            >
                                <CircleArrowRight className=" w-5 h-5 group-hover:translate-x-1 transition-transform -rotate-45" />
                                {/*font-instrument regula*/}
                                <span className=" mr-2">Learn About Us</span>
                                {/*<ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />*/}
                            </a>
                        </div>
                    </div>
                </div>


                {/* Image */}
                <div className="lg:w-1/2 flex justify-center lg:justify-end items-center">
                    <div className="relative w-full max-w-md lg:max-w-none">
                        <img
                            // src="https://static.blinkist.com/cdn-cgi/image/width=508,height=433,format=webp,quality=70,dpr=1/https://static.blinkist.com/web-growth/homepage/hero_desktop.png?c=365"
                            src="back.png"
                            alt="Knowledge at your fingertips"
                            width={508}
                            height={433}
                            className="w-full h-auto"
                            sizes="(max-width: 768px) 100vw, 50vw"
                        />
                    </div>
                </div>
            </div>

            {/* Scroll indicator */}
            <div className="text-center animate-bounce">
                <p className="text-lg font-medium text-gray-700 flex items-center justify-center gap-1">
                    <ChevronDown size={24} className="sm:size-[30px]" />
                </p>
            </div>
            <div></div>
        </div>
    );
};

export default HeroSection;
