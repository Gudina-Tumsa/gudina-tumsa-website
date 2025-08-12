import React, {useState} from "react";
import {ChevronLeft, ChevronRight} from "lucide-react";

interface LearningMethod {
    id: number;
    title: string;
    subtitle: string;
    description: string;
    image?: string;
    cardType: string;
    features: string[];
    gradient: string;
}

interface LearningCardProps {
    method: LearningMethod;
}


const LearningCard = ({ method }: LearningCardProps) => {
    return (
        <div className="bg-gradient-to-br from-purple-100 to-blue-100 py-[2%]">
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                {/* Left Content */}
                <div className="space-y-6">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-bold text-purple-600 mb-2">
                            {method.title}
                        </h2>
                        <h3 className="text-2xl md:text-3xl font-bold text-slate-800">
                            {method.subtitle}
                        </h3>
                    </div>

                    <p className="text-lg text-slate-600 leading-relaxed">
                        {method.description}
                    </p>
                </div>

                {/* Right Content - Card */}
                <div className="flex justify-center">
                    <div className="relative">
                        {/* Main Card */}
                        <div className={`bg-gradient-to-br ${method.gradient} rounded-3xl p-8 text-white shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-300 w-80 h-96`}>
                            <div className="space-y-4">
                                {/* Scale Icon */}
                                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                                    <div className="w-6 h-6 bg-white/60 rounded"></div>
                                </div>

                                {/* Badge */}
                                {/*<div className="inline-block bg-white/20 px-3 py-1 rounded-full text-sm font-medium">*/}
                                {/*    /!*Guided plan*!/*/}
                                {/*</div>*/}

                                {/* Content */}
                                <div className="space-y-3">
                                    <h4 className="font-bold text-lg">How to</h4>
                                    <h5 className="font-bold text-xl leading-tight">
                                        Master Robert Glazers 4 Capacities For Success
                                    </h5>

                                    {/* Exclusive Badge */}
                                    <div className="inline-block bg-red-500 px-3 py-1 rounded-lg text-sm font-bold">
                                        Exclusive
                                    </div>
                                </div>

                                {/* Bottom Section */}
                                <div className="absolute bottom-6 left-8 right-8">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm font-medium">Expert tips</span>
                                        <div className="w-8 h-8 bg-white/20 rounded-full"></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Background Cards */}
                        <div className={`absolute -top-4 -left-4 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl w-48 h-32 -z-10 transform -rotate-12`}>
                            <div className="p-4 text-white">
                                <div className="text-xs font-bold mb-1">HOW TO</div>
                                <div className="text-sm font-bold">BUILD BOUNDARIES FOR BETTER MENTAL HEALTH</div>
                            </div>
                        </div>

                        <div className={`absolute -bottom-4 -right-4 bg-gradient-to-br from-green-400 to-teal-500 rounded-2xl w-40 h-28 -z-10 transform rotate-12`}>
                            <div className="p-3 text-white">
                                <div className="text-xs font-bold mb-1">Lead Effective</div>
                                <div className="text-sm font-bold">Performance Reviews</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};



const learningMethods = [
    {
        id: 1,
        title: "An expert in your ear",
        subtitle: "with Guides",
        description: "Let a pro lead you through today's must-know topics and apply what you learn right away with interactive tools and activities.",
        image: "/lovable-uploads/55cdb2fe-c1b0-4013-9076-5b7205bdf735.png",
        cardType: "guide",
        features: ["Expert tips", "Guided plan", "How to Master Robert Glazer's 4 Capacities For Success", "Exclusive"],
        gradient: "from-purple-500 to-indigo-600"
    },
    {
        id: 2,
        title: "Learning,",
        subtitle: "simplified",
        description: "Make a learning playlist that keeps you inspired and start that book club!",
        cardType: "playlist",
        features: ["Curated content", "Book clubs", "Discussion groups", "Community"],
        gradient: "from-amber-400 to-orange-500"
    },
    {
        id: 3,
        title: "Interactive",
        subtitle: "experiences",
        description: "Dive deep with hands-on activities, quizzes, and real-world applications.",
        cardType: "interactive",
        features: ["Hands-on activities", "Real-time feedback", "Progress tracking", "Achievements"],
        gradient: "from-emerald-400 to-teal-600"
    }
];

const LearningCarousel = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === learningMethods.length - 1 ? 0 : prevIndex + 1
        );
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? learningMethods.length - 1 : prevIndex - 1
        );
    };

    return (
        <div className="max-w-7xl mx-auto mt-[8%]">
            {/* Header */}
            <div className="text-center mb-12">
                <h1 className="text-4xl md:text-6xl font-bold text-slate-800 mb-4">
                    How will you level up?
                </h1>
                <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                    Listen, read, or get interactive—however you like to learn, youll find it here!
                </p>
            </div>

            {/* Carousel Container */}
            <div className="relative">
                <div className="overflow-hidden rounded-3xl">
                    <div
                        className="flex transition-transform duration-500 ease-in-out"
                        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                    >
                        {learningMethods.map((method) => (
                            <div key={method.id} className="w-full flex-shrink-0">
                                <LearningCard method={method} />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Navigation Arrows */}


                {/* Dots Indicator */}
                <div className="flex justify-center mt-8 space-x-3">
                    {learningMethods.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentIndex(index)}
                            className={` mt-[1%] w-[7%] h-1 rounded-full transition-all duration-200 ${
                                index === currentIndex
                                    ? 'bg-slate-700 w-8'
                                    : 'bg-slate-300 hover:bg-slate-400'
                            }`}
                        />
                    ))}
                </div>

            </div>
            <div className={"flex flex-row  justify-between"}>
                <div></div>
                <div className={"mr-[5%]"}>
                    <button
                        onClick={prevSlide}
                        className=" mt-[1%] -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-3 transition-all duration-200 hover:scale-110"
                    >
                        <ChevronLeft className="w-6 h-6 text-slate-700 hover:text-black" />
                    </button>

                    <button
                        onClick={nextSlide}
                        className=" mt-[1%] -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-3 transition-all duration-200 hover:scale-110"
                    >
                        <ChevronRight className="w-6 h-6 text-slate-700 hover:text-black" />
                    </button>
                </div>
            </div>

        </div>
    );
};
export default LearningCarousel
