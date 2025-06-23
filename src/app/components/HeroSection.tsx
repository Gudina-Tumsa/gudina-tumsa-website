import { ArrowRight, ChevronDown } from "lucide-react";
import React from "react";

const HeroSection = () => {
    return (
        <div className="">
            <div className=" flex flex-col lg:flex-row justify-between px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16 max-w-7xl mx-auto">
                {/* Text Content */}
                <div className="lg:w-1/2 mb-8  lg:mb-0 flex flex-col justify-center sm:space-x-10">
                    <div className="text-center lg:text-left">
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-2">
                            Knowledge{' '}
                        </h1>
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-medium text-gray-900 leading-tight mb-2">
                            At the tip
                        </h1>
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-4 sm:mb-6">
                            of your fingers
                        </h1>
                    </div>

                    <p className="text-lg sm:text-xl text-gray-600 mb-6 sm:mb-8 leading-relaxed text-center lg:text-left">
                        Get the key ideas from the top{' '}
                        <span className="text-blue-500 font-medium">books</span>,{' '}
                        <span className="text-blue-500 font-medium">podcasts</span>, and{' '}
                        <span className="text-blue-500 font-medium">experts</span>
                        <br className="hidden sm:block" />
                        <span className={"mx-2"}>in 15 minutes with the Blinklist app.</span>
                    </p>

                    <div className="flex justify-center lg:justify-start mb-8 sm:mb-12 lg:mb-16">
                        <button
                            className="inline-flex items-center px-6 sm:px-8 py-2 sm:py-3 border border-gray-300 rounded-full text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 group"
                            aria-label="Get Started"
                        >
                            <span className="font-medium mr-2">Get Started</span>
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>
                </div>

                {/* Image */}
                <div className="lg:w-1/2 flex justify-center lg:justify-end items-center">
                    <div className="relative w-full max-w-md lg:max-w-none">
                        <img
                            src="https://static.blinkist.com/cdn-cgi/image/width=508,height=433,format=webp,quality=70,dpr=1/https://static.blinkist.com/web-growth/homepage/hero_desktop.png?c=365"
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
            <div className="text-center mt-4 sm:mt-8 animate-bounce">
                <p className="text-lg font-medium text-gray-700 flex items-center justify-center gap-1">
                    <ChevronDown size={24} className="sm:size-[30px]" />
                </p>
            </div>
        </div>
    );
};

export default HeroSection;