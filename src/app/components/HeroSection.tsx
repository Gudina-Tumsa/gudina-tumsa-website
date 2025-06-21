
import React from 'react';

import { Search } from 'lucide-react';

const HeroSection = () => {
    return (
        <div className="bg-gray-50 pt-10 px-6">
            <div className=" mx-auto text-center mt-[5%]">
                <h1 className="text-5xl md:text-6xl font-bold mb-8 leading-tight">
                    <span className="text-blue-600 italic">The digital library</span>
                    <br />
                    <span className="text-black">that powers your learning.</span>
                </h1>

                <div className="relative max-w-2xl mx-auto mt-[3%]">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Search className="h-5 w-5 text-black" />
                    </div>
                    <input
                        type="text"
                        placeholder="Find all your university books, right here."
                        className="w-full pl-12 pr-4 py-4 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                    />
                </div>
            </div>
        </div>
    );
};

export default HeroSection;