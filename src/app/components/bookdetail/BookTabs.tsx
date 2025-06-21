"use client"

import { useState } from "react";


const BookTabs = () => {
    const [activeTab, setActiveTab] = useState("details");
    const [showFullDescription, setShowFullDescription] = useState(false);

    const tabs = [
        { id: "details", label: "Book details" },
        // { id: "contents", label: "Table of contents" }
    ];

    return (
        <div className={"mb-[5%]"}>
            {/* Tab Navigation */}
            <div className="border-b border-gray-200 mb-6">
                <div className="flex gap-8">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`pb-3 px-1 text-sm font-medium border-b-2 transition-colors ${
                                activeTab === tab.id
                                    ? "border-blue-600 text-blue-600"
                                    : "border-transparent text-gray-500 hover:text-gray-700"
                            }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Tab Content */}
            {activeTab === "details" && (
                <div className="space-y-6">
                    <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-4">About This Book</h3>
                        <div className="prose prose-gray max-w-none">
                            <p className="text-gray-700 leading-relaxed mb-4">
                                <strong>THE #1 REFERENCE ON BUILDING CONSTRUCTION—UPDATED FROM THE GROUND UP</strong>
                            </p>

                            <p className="text-gray-700 leading-relaxed mb-4">
                                Edward Allen and Joseph Ianos Fundamentals of Building Construction has been the go-to reference for thousands
                                of professionals and students of architecture, engineering, and construction technology for over thirty years. The
                                materials and methods described in this new Seventh Edition have been thoroughly updated to reflect the latest
                                advancements in the industry. Carefully selected and logically arranged topics—ranging from basic building
                                methods to the principles of structure and enclosure—help readers gain a working knowledge of the field in an
                                enjoyable, easy-to-understand manner.
                                {showFullDescription && (
                                    <span> All major construction systems, including light wood frame, mass timber, masonry, steel frame, light gauge steel, and reinforced concrete construction, are addressed.</span>
                                )}
                            </p>

                            {!showFullDescription ? (
                                <button
                                    onClick={() => setShowFullDescription(true)}
                                    className="text-blue-600 hover:text-blue-800 p-0 h-auto font-normal underline"
                                >
                                    Read More
                                </button>
                            ) : (
                                <button
                                    onClick={() => setShowFullDescription(false)}
                                    className="text-blue-600 hover:text-blue-800 p-0 h-auto font-normal underline"
                                >
                                    Read Less
                                </button>
                            )}

                        </div>
                    </div>

                    {/* Information Section */}
                    <div >

                        <div className="flex flex-wrap gap-2 mb-6">
                            <a href="#" className="text-blue-600 hover:text-blue-800 font-medium">
                                Edward Allen
                            </a>
                            <span className="text-gray-400">,</span>
                            <a href="#" className="text-blue-600 hover:text-blue-800 font-medium">
                                Joseph Iano
                            </a>
                        </div>

                        <div className="bg-gray-50 rounded-lg p-6">
                            <h4 className="text-lg font-semibold text-gray-900 mb-4">Information</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <h5 className="text-sm font-medium text-gray-600 mb-2">Publisher</h5>
                                    <p className="text-gray-900">Wiley</p>
                                </div>
                                <div>
                                    <h5 className="text-sm font-medium text-gray-600 mb-2">Topic</h5>
                                    <p className="text-gray-900">Architecture</p>
                                </div>
                                <div>
                                    <h5 className="text-sm font-medium text-gray-600 mb-2">Year</h5>
                                    <p className="text-gray-900">2019</p>
                                </div>
                                <div>
                                    <h5 className="text-sm font-medium text-gray-600 mb-2">Subtopic</h5>
                                    <p className="text-gray-900">Architecture Methods & Materials</p>
                                </div>
                                <div>
                                    <h5 className="text-sm font-medium text-gray-600 mb-2">Edition</h5>
                                    <p className="text-gray-900">7</p>
                                </div>
                                <div>
                                    <h5 className="text-sm font-medium text-gray-600 mb-2">ISBN</h5>
                                    <p className="text-gray-900">9781119450252, 9781119446194</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {activeTab === "contents" && (
                <div className="space-y-4">
                    <div className="text-center py-12 text-gray-500">
                        <p>Table of contents will be available here.</p>
                        <p className="text-sm mt-2">Content loading...</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BookTabs;
