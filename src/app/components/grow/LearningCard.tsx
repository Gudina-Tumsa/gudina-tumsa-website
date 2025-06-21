import React from 'react';

interface LearningCardProps {
    title: string;
    image: string;
    badge?: string;
    className?: string;
}

const LearningCard = ({ title, image, badge, className = "" }: LearningCardProps) => {
    return (
        <div className={`relative rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 ${className}`}>
            <div className="aspect-[4/3] relative">
                <img
                    src={image}
                    alt={title}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/30" />

                {/* Centered title */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <h3 className="text-white text-xl font-semibold text-center px-4">
                        {title}
                    </h3>
                </div>

                {/* Badge overlay at bottom */}
                {badge && (
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                        <div className="bg-white rounded-full px-4 py-2 shadow-md flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <span className="text-sm font-medium text-gray-800">{badge}</span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default LearningCard;