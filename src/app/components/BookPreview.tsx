/* eslint-disable  */
// @ts-nocheck

"use client"

import React, {useRef, useState} from 'react';
import {ArrowDown, Leaf, Star , View , Library} from "lucide-react";
import {motion, useInView} from "framer-motion";

const sentences = [
    "We exist to make the legacy accessible.",
    "In collaboration with scholars, researchers, and publishers, we’re building a digital library of works on Rev. Gudina Tumsa and Tsehay Tolessa — accessible anywhere in the world."
];


const BookPreview = () => {
    const pRefs = useRef<HTMLParagraphElement[]>([]);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: false, margin: "-20% 0px -20% 0px" });

    const playCursor =
        "url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"120\" height=\"120\" viewBox=\"0 0 60 60\" fill=\"white\"><circle cx=\"25\" cy=\"25\" r=\"23\" stroke=\"gray\" stroke-width=\"2\" fill=\"none\"/><path d=\"M20 17v18l14-9-14-9z\"/></svg>') 25 25, auto";

    const pauseCursor =
        "url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"120\" height=\"120\" viewBox=\"0 0 60 60\" fill=\"white\"><circle cx=\"25\" cy=\"25\" r=\"23\" stroke=\"gray\" stroke-width=\"2\" fill=\"none\"/><path d=\"M20 15h3v20h-3zM29 15h3v20h-3z\"/></svg>') 25 25, auto";


    const videoRef = useRef<HTMLVideoElement>(null);
    const [isHovered, setIsHovered] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const togglePlay = () => {
        const video = videoRef.current;
        if (!video) return;

        if (video.paused) {
            video.play();
            setIsPlaying(true);
        } else {
            video.pause();
            setIsPlaying(false);
        }
    };

    return (
        <div className="px-4 sm:px-6 py-4 md:py-4 flex flex-col items-center">
            <div className="max-w-6xl w-full mx-auto">

                <div className="w-full">
                    <div className="max-w-6xl w-full mx-auto pt-4 md:pt-[2%]">
                        <div className="text-sm text-gray-900  sm:text-2xl md:text-2xl relative text-center w-full sm:w-[90%] md:w-[80%] mx-auto space-y-4">
                            {sentences.map((sentence, index) => (
                                <div
                                    key={index}
                                    className="relative overflow-hidden"
                                    style={{position: 'relative', display: 'inline-block'}}
                                >
                                    <p className={`font-poppins ${index == 0 ? "italic" : ""}`} ref={(el) => {
                                        if (el) pRefs.current[index] = el;
                                    }}>
                                        {sentence}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="mt-6 md:mt-[2%] max-w-7xl mx-auto">
                        <div className="flex flex-col sm:flex-row justify-center items-center gap-6 sm:gap-8 md:gap-16 p-4 sm:p-8">
                            {/* Downloads Section */}
                            <div className="text-center">
                                <div className="w-full flex justify-center">

                                    <View className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" strokeWidth={2} color="#9407F2"/>
                                </div>
                                <h2 className="text-2xl sm:text-3xl font-bold mt-2">
                                    100<span className="relative top-[-0.3em]">+</span> daily views
                                </h2>
                                <p className="text-gray-500 text-sm sm:text-base">Views</p>
                            </div>

                            {/* Ratings Section */}
                            <div className="text-center">
                                <div className="flex justify-center items-center space-x-1">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className="w-5 h-5 sm:w-[22px] sm:h-[22px] md:w-6 md:h-6" strokeWidth={2} color="#9407F2"/>
                                    ))}
                                </div>
                                <h2 className="text-2xl sm:text-3xl font-bold mt-2">4.7 Stars</h2>
                                <p className="text-gray-500 text-sm sm:text-base">Average ratings on iOS and Google Play</p>
                            </div>

                            {/* Experience Section */}
                            <div className="text-center">
                                <div className="w-full flex justify-center">
                                    <Library className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" strokeWidth={2} color="#9407F2"/>
                                </div>
                                {/*<h2 className="text-2xl sm:text-3xl font-bold mt-2">100+ contents</h2>*/}
                                <h2 className="text-2xl sm:text-3xl font-bold mt-2">100 <span className="relative top-[-0.3em]">+</span> contents</h2>
                                <p className="text-gray-500 text-sm sm:text-base">Explore 100 more audios and books</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/*<div className="text-center mb-6 md:mb-8 mt-4 md:mt-[5%]">*/}
                {/*    <h2 className="font-bold text-2xl sm:text-3xl md:text-4xl">*/}
                {/*        Understand key ideas <br className="hidden sm:block" /> in 15 minutes*/}
                {/*    </h2>*/}
                {/*</div>*/}

                {/*<motion.div*/}
                {/*    ref={ref}*/}
                {/*    animate={{*/}
                {/*        scale: isInView ? 1.12 : 0.98,*/}
                {/*    }}*/}
                {/*    transition={{*/}
                {/*        type: "spring",*/}
                {/*        stiffness: 60, // lower for smoother*/}
                {/*        damping: 20,   // slightly higher for smoother end*/}
                {/*        mass: 1.5,     // heavier mass = slower acceleration/deceleration*/}
                {/*        restDelta: 0.001, // sensitivity to stop the motion*/}
                {/*    }}*/}
                {/*    className="rounded-lg shadow-2xl overflow-hidden mb-8 sm:mb-12 mt-4 md:mt-[5%]"*/}
                {/*>*/}
                {/*    <div className="h-[40vh] sm:h-[50vh] md:h-[60vh] lg:h-[70vh] w-full">*/}

                {/*        <div*/}
                {/*            className="relative w-full h-full bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600"*/}
                {/*            onMouseEnter={() => setIsHovered(true)}*/}
                {/*            onMouseLeave={() => setIsHovered(false)}*/}
                {/*            onClick={togglePlay}*/}
                {/*            style={{*/}
                {/*                cursor: isHovered ? (isPlaying ? pauseCursor : playCursor) : "auto",*/}
                {/*            }}*/}
                {/*        >*/}
                {/*            <video*/}
                {/*                className="w-full h-full object-cover"*/}
                {/*                src="/library.mp4"*/}
                {/*                ref={videoRef}*/}
                {/*                loop*/}
                {/*                muted*/}
                {/*                playsInline*/}
                {/*            />*/}
                {/*        </div>*/}
                {/*            /!*<div*!/*/}
                {/*            /!*    className="relative w-full h-full bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600"*!/*/}
                {/*            /!*    onMouseEnter={() => setIsHovered(true)}*!/*/}
                {/*            /!*    onMouseLeave={() => setIsHovered(false)}*!/*/}
                {/*            /!*    onClick={togglePlay}*!/*/}
                {/*            /!*>*!/*/}
                {/*            /!*    <video*!/*/}
                {/*            /!*        className="w-full h-full object-cover"*!/*/}
                {/*            /!*        src="/library.mp4"*!/*/}
                {/*            /!*        ref={videoRef}*!/*/}
                {/*            /!*        loop*!/*/}
                {/*            /!*        muted*!/*/}
                {/*            /!*        playsInline*!/*/}
                {/*            /!*    />*!/*/}

                {/*            /!*    {isHovered && (*!/*/}
                {/*            /!*        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">*!/*/}
                {/*            /!*            {isPlaying ? (*!/*/}
                {/*            /!*                <Pause size={64} className="text-white opacity-90" />*!/*/}
                {/*            /!*            ) : (*!/*/}
                {/*            /!*                <Play size={64} className="text-white opacity-90" />*!/*/}
                {/*            /!*            )}*!/*/}
                {/*            /!*        </div>*!/*/}
                {/*            /!*    )}*!/*/}
                {/*            /!*</div>*!/*/}
                {/*    </div>*/}
                {/*</motion.div>*/}
            </div>


        </div>
    );
};

export default BookPreview;
