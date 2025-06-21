"use client"
import React, { useEffect, useState, useRef } from 'react';
import {ArrowDown, Leaf, Star} from "lucide-react";

const sentences = [
    "We exist to make knowledge more accessible.",
    "Working with educators and publishers to create a digital library of more than a million books, available anywhere in the world."

];

const BookPreview = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const pRefs = useRef<(HTMLParagraphElement | null)[]>([]);
    const [widths, setWidths] = useState<number[]>([]);

    useEffect(() => {
        const updateWidths = () => {
            const newWidths = pRefs.current.map((p) => p?.offsetWidth || 0);
            setWidths(newWidths);
        };

        updateWidths();

        window.addEventListener('resize', updateWidths);
        return () => window.removeEventListener('resize', updateWidths);
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % sentences.length);
        }, 3500);

        return () => clearInterval(interval);
    }, []);


    return (
        <div className=" px-6 py-16 flex flex-col items-center ">
            <div className="max-w-6xl w-full">
                <div className={"text-center my-[2%]"}>
                    <p className={"font-bold text-4xl"}>Understand key ideas <br/> in 15 minutes</p>
                </div>

                <div className="rounded-lg shadow-2xl overflow-hidden mb-12 mt-[5%]">
                    <div className="h-[50vh] sm:h-[40vh] md:h-[50vh] lg:h-[60vh] xl:h-[70vh] w-full">
                        <div className="w-full h-full bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600" />
                    </div>
                </div>
            </div>
            {/* Sentences with roller */}
<div className={"w-full "}>

    <div className="max-w-6xl w-full mx-auto pt-[2%]">
                    <div className=" text-gray-800 text-3xl relative text-center w-[90%] sm:w-[80%] mx-auto ">
                        {sentences.map((sentence, index) => (
                            <div
                                key={index}
                                className="relative overflow-hidden "
                                style={{ position: 'relative', display: 'inline-block' }}
                            >
                                {/* Roller overlay */}
                                {/*{activeIndex === index && (*/}
                                {/*    <div*/}
                                {/*        className="absolute top-0 left-0 h-full bg-orange-300 opacity-40"*/}
                                {/*        style={{*/}
                                {/*            width: widths[index] ? widths[index] + 'px' : '0px',*/}
                                {/*            animation: 'slideRoller 3s linear forwards',*/}
                                {/*            borderRadius: '4px',*/}
                                {/*        }}*/}
                                {/*    />*/}
                                {/*)}*/}

                                <p
                                    ref={(el) => (pRefs.current[index] = el)}

                                >
                                    {sentence}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
    <div className={"mt-[2%]  max-w-7xl mx-auto"}>
        <div className="flex justify-center items-center space-x-16 p-8">
            {/* Downloads Section */}
            <div className="text-center ">
                <div className={"w-full flex justify-center"}>
                    <ArrowDown size={32} strokeWidth={2} color="#007bff" />
                </div>
                <h2 className="text-3xl font-bold mt-2">37 Million</h2>
                <p className="text-gray-500">Downloads on all platforms</p>
            </div>

            {/* Ratings Section */}
            <div className="text-center">
                <div className="flex justify-center items-center space-x-1">
                    <Star size={24} strokeWidth={2} color="#FFD700" />
                    <Star size={24} strokeWidth={2} color="#FFD700" />
                    <Star size={24} strokeWidth={2} color="#FFD700" />
                    <Star size={24} strokeWidth={2} color="#FFD700" />
                    <Star size={24} strokeWidth={2} color="#FFD700" />
                </div>
                <h2 className="text-3xl font-bold mt-2">4.7 Stars</h2>
                <p className="text-gray-500">Average ratings on iOS and Google Play</p>
            </div>

            {/* Experience Section */}
            <div className="text-center">

                <div className={"w-full flex justify-center"}>
                    <Leaf size={32} strokeWidth={2} color="#007bff" />
                </div>

                <h2 className="text-3xl font-bold mt-2">10+ years</h2>
                <p className="text-gray-500">Experience igniting personal growth</p>
            </div>
        </div>
    </div>
            </div>

            {/* Animation Keyframes */}
            <style>{`
        @keyframes slideRoller {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(0%);
          }
        }
      `}</style>
        </div>
    );
};

export default BookPreview;



/*

import React from 'react';

const BookPreview = () => {
    // const useImage = true; // Set to false to use gradient background

    return (
        <div className="bg-gray-50  px-6">
            <div className="max-w-6xl mx-auto">
                <div className="bg-white rounded-lg shadow-2xl overflow-hidden">
                    <div className="h-[400px] w-full">
                        {useImage ? (
   <img
        src="https://source.unsplash.com/featured/?book"
        alt="Book preview"
        className="w-full h-full object-cover"
    />
) : (
// <div className="w-full h-full bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600" />
//  )}
// </div>
// </div>
// </div>
// </div>
// );
// };
 */