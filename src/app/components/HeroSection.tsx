//
// import React from 'react';
//
// import { Search } from 'lucide-react';
//
// const HeroSection = () => {
//     return (
//         <div className="bg-gray-50 pt-10 px-6">
//             <div className=" mx-auto text-center mt-[5%]">
//                 <h1 className="text-5xl md:text-6xl font-bold mb-8 leading-tight">
//                     <span className="text-blue-600 italic">The digital library</span>
//                     <br />
//                     <span className="text-black">that powers your learning.</span>
//                 </h1>
//
//                 <div className="relative max-w-2xl mx-auto mt-[3%]">
//                     <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
//                         <Search className="h-5 w-5 text-black" />
//                     </div>
//                     <input
//                         type="text"
//                         placeholder="Find all your university books, right here."
//                         className="w-full pl-12 pr-4 py-4 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
//                     />
//                 </div>
//             </div>
//         </div>
//     );
// };
//
// export default HeroSection;


import {ArrowRight, ChevronDown} from "lucide-react";
import React from "react";

const HeroSection = () => {
    return (

        <div className={""}>
            <div className="mt-[6%] flex flex-col lg:flex-row  justify-between px-6 py-16 max-w-7xl mx-auto">
                <div className="lg:w-1/2 mb-12 lg:mb-0">
                    <div className={""}>
                        <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-2">
                            Knowledge{' '} <br />
                        </h1>
                        <h1 className="text-5xl lg:text-6xl font-[500px] text-gray-900 leading-tight mb-2">At the tip</h1>
                        <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">of your fingers</h1>
                    </div>

                    <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                        Get the key ideas from the top{' '} <br />
                        <span className="text-blue-500 font-medium rounded-full px-2 py-2 ">books</span>,{' '}
                        <span className="text-blue-500 font-medium rounded-full px-2 py-2 ">podcasts</span>, and{' '}
                        <span className="text-blue-500 font-medium rounded-full px-2 py-2 ">experts</span>
                        <br />
                        in 15 minutes with the Blinklist app.
                    </p>


                    <div className=" mb-16">
                        <button className="inline-flex items-center px-8 py-3 border border-gray-300 rounded-full text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 group">
                            <span className="font-medium mr-2">Get Started</span>
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>

                    {/*<button className="bg-green-500 hover:bg-green-600 text-black px-8 py-2 rounded-md text-lg font-medium transition-all duration-200 hover:scale-105">*/}
                    {/*    Get started*/}
                    {/*</button>*/}
                </div>

                <img

                    src={"https://static.blinkist.com/cdn-cgi/image/width=508,height=433,format=webp,quality=70,dpr=1/https://static.blinkist.com/web-growth/homepage/hero_desktop.png?c=365"}

                />
                {/*<div className="lg:w-1/2 flex justify-center">*/}
                {/*    <div className="relative">*/}
                {/*        /!* Decorative elements *!/*/}
                {/*        <div className="absolute -top-8 -left-8 w-16 h-16 bg-orange-300 rounded-full opacity-60"></div>*/}
                {/*        <div className="absolute -bottom-4 -right-4 w-12 h-12 bg-yellow-300 rounded-full opacity-60"></div>*/}
                {/*        <div className="absolute top-1/4 -right-8 w-8 h-8 bg-blue-300 rounded-full opacity-60"></div>*/}

                {/*        /!* Phone mockups *!/*/}
                {/*        <div className="relative z-10">*/}
                {/*            <div className="relative">*/}
                {/*                /!* Main phone *!/*/}
                {/*                <div className="w-64 h-96 bg-black rounded-3xl p-1 shadow-2xl transform rotate-6">*/}
                {/*                    <div className="w-full h-full bg-gradient-to-br from-orange-500 to-red-600 rounded-3xl p-4 flex flex-col">*/}
                {/*                        <div className="bg-green-800 text-white text-xs px-2 py-1 rounded mb-2 w-fit">*/}
                {/*                            THE 5 AM CLUB*/}
                {/*                        </div>*/}
                {/*                        <h3 className="text-white font-bold text-lg mb-2">Giving attention to each...</h3>*/}
                {/*                        <p className="text-white text-sm opacity-90 mb-4">The 5 AM Club</p>*/}
                {/*                        <div className="flex-1"></div>*/}
                {/*                        <div className="flex items-center justify-between bg-black bg-opacity-20 rounded-lg p-3">*/}
                {/*                            <div className="w-8 h-8 bg-white rounded-full"></div>*/}
                {/*                            <div className="flex space-x-3">*/}
                {/*                                <button className="text-white">⏮</button>*/}
                {/*                                <button className="text-white text-xl">⏸</button>*/}
                {/*                                <button className="text-white">⏭</button>*/}
                {/*                                <button className="text-white">↻</button>*/}
                {/*                            </div>*/}
                {/*                        </div>*/}
                {/*                    </div>*/}
                {/*                </div>*/}

                {/*                /!* Secondary phone *!/*/}
                {/*                <div className="absolute -left-16 top-8 w-48 h-72 bg-white rounded-2xl shadow-xl border transform -rotate-12">*/}
                {/*                    <div className="p-4">*/}
                {/*                        <div className="text-xs text-gray-500 mb-2">Sunday 4:16 AM</div>*/}
                {/*                        <h4 className="font-bold text-sm mb-3">The 30/30/30 Method</h4>*/}
                {/*                        <p className="text-xs text-gray-600 leading-relaxed">*/}
                {/*                            Standing in the stillness of the ancient bottom of Rome, Spanish Steps, it was the entrepreneur...*/}
                {/*                        </p>*/}
                {/*                    </div>*/}
                {/*                </div>*/}

                {/*                /!* Desktop mockup *!/*/}
                {/*                <div className="absolute -right-12 -top-4 w-40 h-28 bg-gray-800 rounded-lg shadow-lg transform rotate-12">*/}
                {/*                    <div className="w-full h-4 bg-gray-700 rounded-t-lg flex items-center px-2 space-x-1">*/}
                {/*                        <div className="w-2 h-2 bg-red-400 rounded-full"></div>*/}
                {/*                        <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>*/}
                {/*                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>*/}
                {/*                    </div>*/}
                {/*                    <div className="p-2 bg-white rounded-b-lg h-20">*/}
                {/*                        <div className="flex space-x-1 mb-2">*/}
                {/*                            <div className="w-4 h-1 bg-gray-300 rounded"></div>*/}
                {/*                            <div className="w-3 h-1 bg-red-400 rounded"></div>*/}
                {/*                            <div className="w-2 h-1 bg-gray-300 rounded"></div>*/}
                {/*                        </div>*/}
                {/*                        <div className="space-y-1">*/}
                {/*                            <div className="w-full h-1 bg-gray-200 rounded"></div>*/}
                {/*                            <div className="w-3/4 h-1 bg-gray-200 rounded"></div>*/}
                {/*                        </div>*/}
                {/*                    </div>*/}
                {/*                </div>*/}
                {/*            </div>*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*</div>*/}
            </div>

            <div className="text-center mt-8 animate-bounce">
                <p className="text-lg font-medium text-gray-700 flex items-center justify-center gap-1">
                    <ChevronDown size={30} className={"font-[100px]"} />
                </p>
            </div>
        </div>

    );
};


export default HeroSection