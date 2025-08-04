/* eslint-disable  */
// @ts-nocheck

import React from 'react';

interface LearningCardProps {
    title: string;
    image: string;
    badge?: string;
    className?: string;
}

const LearningCardGrow = ({ title, image,  className = "" }: LearningCardProps) => {
    return (
        <div className={`relative rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 ${className}`}>
            <div className="relative w-full h-[280px]"> {/* Made image taller */}
                <img
                    src={image}
                    alt={title}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />


                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
    <span className="backdrop-blur-sm bg-white/80 px-4 py-1 rounded-full text-sm font-semibold text-gray-800 shadow-md">
        {title}
    </span>
                </div>



            </div>
        </div>
    );
};

export default LearningCardGrow;
