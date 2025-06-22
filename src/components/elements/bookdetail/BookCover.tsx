"use client"

import { useState } from "react";

const BookCover = () => {
    const [imageError, setImageError] = useState(false);
    console.log(imageError)

    return (
        <div className="sticky top-8">
            <div className="bg-white rounded-lg  p-6">
                <div className="aspect-[3/4] bg-gradient-to-br from-blue-900 to-blue-700 rounded-lg overflow-hidden mb-6 relative">
                    {/*{!imageError ? (*/}
                        <img
                            src="https://images.unsplash.com/photo-1641154748135-8032a61a3f80?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Ym9vayUyMGNvdmVyfGVufDB8fDB8fHww"
                            alt="Fundamentals of Building Construction"
                            className="w-full h-full object-cover"
                            onError={() => setImageError(true)}
                        />
                     {/*) */}
                     {/*    : (*/}
                     {/*    <div className="w-full h-full flex flex-col items-center justify-center text-white p-4">*/}
                     {/*        <div className="text-center">*/}
                     {/*            <h3 className="text-lg font-bold mb-2">FUNDAMENTALS OF</h3>*/}
                     {/*            <h2 className="text-2xl font-bold text-orange-400 mb-2">BUILDING CONSTRUCTION</h2>*/}
                     {/*            <p className="text-sm mb-4">MATERIALS AND METHODS</p>*/}
                     {/*            <div className="text-xs space-y-1">*/}
                     {/*                <p>EDWARD ALLEN</p>*/}
                     {/*                <p>JOSEPH IANO</p>*/}
                     {/*            </div>*/}
                     {/*            <p className="text-xs mt-4 bg-white/20 px-2 py-1 rounded">SEVENTH EDITION</p>*/}
                     {/*            <div className="absolute bottom-4 right-4">*/}
                     {/*                <span className="text-xs bg-white/20 px-2 py-1 rounded">WILEY</span>*/}
                     {/*            </div>*/}
                     {/*        </div>*/}
                     {/*    </div>*/}
                     {/*)}*/}
                </div>

                {/* Format options */}
                <div className="space-y-3 text-sm text-gray-600">
                    <div className="flex items-center gap-3">
                        <span className="w-5 h-5 text-gray-400">🌐</span>
                        <span>English</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <span className="w-5 h-5 text-gray-400">📱</span>
                        <span>ePUB (mobile friendly)</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <span className="w-5 h-5 text-gray-400">📱</span>
                        <span>Available on iOS & Android</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookCover;