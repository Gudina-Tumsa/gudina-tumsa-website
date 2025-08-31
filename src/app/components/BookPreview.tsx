"use client"

import React, { useRef, useState } from "react";
import { Star, View, Library } from "lucide-react";
import { motion, useInView } from "framer-motion";

const sentences = [
    "We exist to make the legacy accessible.",
    "In collaboration with scholars, researchers, and publishers, we’re building a digital library of works on Rev. Gudina Tumsa and Tsehay Tolessa — accessible anywhere in the world.",
];

const BookPreview = () => {
    const pRefs = useRef<HTMLParagraphElement[]>([]);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: false, margin: "-20% 0px -20% 0px" });

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
        <div className="px-4 sm:px-6 py-6 md:py-8 flex flex-col items-center">
            <div className="max-w-7xl w-full mx-auto">
                {/* Sentences */}
                <div className="w-full">
                    <div className="max-w-5xl mx-auto pt-4 md:pt-6">
                        <div className="text-gray-900 text-center w-full sm:w-[90%] md:w-[80%] mx-auto space-y-5">
                            {sentences.map((sentence, index) => (
                                <div
                                    key={index}
                                    className="relative overflow-hidden inline-block"
                                    style={{ position: "relative" }}
                                >
                                    <p
                                        className={`font-poppins ${
                                            index === 0 ? "italic text-lg sm:text-xl md:text-2xl" : "text-base sm:text-lg md:text-xl"
                                        }`}
                                        ref={(el) => {
                                            if (el) pRefs.current[index] = el;
                                        }}
                                    >
                                        {sentence}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Stats Section */}
                    <div className="mt-8 max-w-7xl mx-auto px-4 sm:px-0">
                        <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-10 md:gap-16">
                            {/* Views */}
                            <div className="text-center flex flex-col items-center min-w-[120px]">
                                <View
                                    className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10"
                                    strokeWidth={2}
                                    color="#9407F2"
                                />
                                <h2 className="text-2xl sm:text-3xl font-bold mt-2">
                                    100<span className="relative top-[-0.3em]">+</span> daily views
                                </h2>
                                <p className="text-gray-500 text-sm sm:text-base">Views</p>
                            </div>

                            {/* Ratings */}
                            <div className="text-center flex flex-col items-center min-w-[120px]">
                                <div className="flex justify-center items-center space-x-1">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6"
                                            strokeWidth={2}
                                            color="#9407F2"
                                        />
                                    ))}
                                </div>
                                <h2 className="text-2xl sm:text-3xl font-bold mt-2">4.7 Stars</h2>
                                <p className="text-gray-500 text-sm sm:text-base">
                                    Average ratings on iOS and Google Play
                                </p>
                            </div>

                            {/* Contents */}
                            <div className="text-center flex flex-col items-center min-w-[120px]">
                                <Library
                                    className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10"
                                    strokeWidth={2}
                                    color="#9407F2"
                                />
                                <h2 className="text-2xl sm:text-3xl font-bold mt-2">
                                    100 <span className="relative top-[-0.3em]">+</span> contents
                                </h2>
                                <p className="text-gray-500 text-sm sm:text-base">
                                    Explore 100 more audios and books
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Video Section - Uncomment and make responsive if needed */}
                {/* <motion.div
          ref={ref}
          animate={{
            scale: isInView ? 1.12 : 0.98,
          }}
          transition={{
            type: "spring",
            stiffness: 60,
            damping: 20,
            mass: 1.5,
            restDelta: 0.001,
          }}
          className="rounded-lg shadow-2xl overflow-hidden mb-8 sm:mb-12 mt-8"
        >
          <div className="h-[40vh] sm:h-[50vh] md:h-[60vh] lg:h-[70vh] w-full">
            <div
              className="relative w-full h-full bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              onClick={togglePlay}
              style={{
                cursor: isHovered ? (isPlaying ? pauseCursor : playCursor) : "auto",
              }}
            >
              <video
                className="w-full h-full object-cover"
                src="/library.mp4"
                ref={videoRef}
                loop
                muted
                playsInline
              />
              {isHovered && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  {isPlaying ? (
                    <Pause size={64} className="text-white opacity-90" />
                  ) : (
                    <Play size={64} className="text-white opacity-90" />
                  )}
                </div>
              )}
            </div>
          </div>
        </motion.div> */}
            </div>
        </div>
    );
};

export default BookPreview;
