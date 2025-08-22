import React from 'react';

import LearningCardGrow from "@/components/elements/index/grow/LearningCardGrow";

const GrowSection = () => {
    const learningScenarios = [
        {
            title: "Doing chores",
            image: "chores.jpg",
            className: "col-span-1"
        },
        {
            title: "Driving",
            image: "driving.jpeg",

            className: "col-span-1"
        },
        {
            title: "Commuting",
            image: "commit.jpeg",

            className: "col-span-1"
        },
        {
            title: "Training",
            image: "sport.jpeg",
            className: "col-span-1"
        }
    ];

    return (
        <div className="mt-[-8%]">
            {/* Hero Section */}
            <div className="container mx-auto px-4 py-16">
                <div className="text-center max-w-4xl mx-auto mb-16">
                    <h1 className="font-instrument regula sm:text-4xl md:text-5xl lg:text-6xl font-bold text-slate-800 mb-6 leading-tight">
                        Grow Wherever You Are
                    </h1>
                    <p className="text-2xl  text-slate-600 leading-relaxed max-w-3xl mx-auto">
                        No need to carve out extra time. Dive into the legacy of Rev. Gudina Tumsa and Tsehay Tolessa—whether you’re in the car, waiting in line, over lunch, or before bed.
                    </p>
                </div>

                {/* Learning Cards Grid */}
                <div className="max-w-6xl mx-auto">
                    {/*<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">*/}
                    {/*{learningScenarios.map((scenario, index) => (*/}
                    {/*    <div*/}
                    {/*        key={scenario.title}*/}
                    {/*        className="animate-fade-in"*/}
                    {/*        style={{ animationDelay: `${index * 0.1}s` }}*/}
                    {/*    >*/}
                    {/*        <LearningCardGrow*/}
                    {/*            title={scenario.title}*/}
                    {/*            image={scenario.image}*/}

                    {/*            className={scenario.className}*/}
                    {/*        />*/}
                    {/*    </div>*/}
                    {/*))}*/}

                    <div className="container mx-auto px-5 py-10">
                        <div className="grid grid-cols-3 gap-4 h-[600px]">
                            {/* Left column - 2 stacked images */}
                            <div className="grid grid-rows-2 gap-4">

                                <div className="relative w-full bg-[#DAB6F2]  rounded-[8%] p-4 flex flex-col  shadow">
                                   <div className={"w-[93%] mx-auto"}>
                                       <h3 className="font-poppins text-5xl font-semibold text-gray-800">Dive into<br /> the legacy</h3>
                                       {/*<p className="text-sm text-gray-600 mt-1">*/}
                                       {/*    A calm and peaceful scenery to refresh your mind and soul.*/}
                                       {/*</p>*/}
                                   </div>
                                    <a
                                        className="left-[8%] bottom-[8%] absolute bg-white inline-flex items-center px-12  py-2  border border-gray-300 rounded-full text-black  hover:border-gray-400 transition-all duration-200 group"
                                        aria-label="Get Started"
                                        href={"/home"}
                                    >
                                        <span className="font-medium mr-2">Get Started</span>
                                    </a>
                                </div>
                                <img
                                    className="w-full h-full object-cover rounded-[8%]"
                                    src="https://tecdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(73).webp"
                                    alt="Bottom"
                                />
                            </div>

                            <div>
                                <img
                                    className="w-full h-full object-cover rounded-[8%]"
                                    src="https://images.unsplash.com/photo-1581091595283-04de15a05a01?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                    // src="https://tecdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(74).webp"
                                    alt="Center"
                                />
                            </div>

                            <div className="flex flex-col gap-4">
                                <img
                                    className="w-full h-[70%] object-cover rounded-[8%]"
                                    src="https://tecdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(75).webp"
                                    alt="Right"
                                />
                                <div className="h-[30%] bg-[#DAB6F2] rounded-[20px] p-4 flex flex-col items-center justify-center">
                                    <h3 className="ml-[5%] font-poppins text-3xl font-semibold text-gray-800">
                                        Always your favourite
                                    </h3>
                                </div>

                            </div>
                        </div>
                    </div>




                </div>
                {/*</div>*/}

                {/* Call to Action */}

            </div>
        </div>
    );
};

export default GrowSection;
