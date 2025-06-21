"use client"
import React, { useEffect, useState, useRef } from 'react';

const sentences = [
    "We exist to make knowledge more accessible.",
    "Working with educators and publishers to create a digital library of more than a million books, available anywhere in the world.",
    "Designing study tools to help you learn more effectively.",
    "Giving you everything you need to spark the biggest thoughts, dig into the tiniest detail, or just get that assignment done.",
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
        <div className="bg-gray-50 px-6 py-16 flex flex-col items-center">
            <div className="max-w-6xl w-full">
                {/* Gradient Box */}
                <div className=" rounded-lg shadow-2xl overflow-hidden mb-12">
                    <div className="h-[400px] w-full">
                        <div className="w-full h-full bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600" />
                    </div>
                </div>
            </div>
            {/* Sentences with roller */}
<div className={"w-full "}>

    <div className="max-w-6xl w-full mx-auto pt-[8%]">
                    <div className="space-y-6 text-gray-800 text-3xl relative text-center w-[90%] sm:w-[80%] mx-auto ">
                        {sentences.map((sentence, index) => (
                            <div
                                key={index}
                                className="relative overflow-hidden "
                                style={{ position: 'relative', display: 'inline-block' }}
                            >
                                {/* Roller overlay */}
                                {activeIndex === index && (
                                    <div
                                        className="absolute top-0 left-0 h-full bg-orange-300 opacity-40"
                                        style={{
                                            width: widths[index] ? widths[index] + 'px' : '0px',
                                            animation: 'slideRoller 3s linear forwards',
                                            borderRadius: '4px',
                                        }}
                                    />
                                )}

                                <p
                                    ref={(el) => (pRefs.current[index] = el)}

                                >
                                    {sentence}
                                </p>
                            </div>
                        ))}
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