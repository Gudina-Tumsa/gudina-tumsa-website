"use client"

import { useState } from "react";
import {BookData} from "@/types/book";

const BookCover = ({bookData } : {bookData : BookData | null} ) => {
    const [imageError, setImageError] = useState(false);
    console.log(imageError)

    return (

            bookData ? <div className="sticky top-8">
                <div className="bg-white rounded-lg  p-6">
                    <div className="aspect-[3/4] bg-gradient-to-br from-blue-900 to-blue-700 rounded-lg overflow-hidden mb-6 relative">
                        {/*{!imageError ? (*/}
                        <img
                            src={`http://localhost:3000`+ bookData.coverImageUrl}
                            alt="Fundamentals of Building Construction"
                            className="w-full h-full object-cover"
                            onError={() => setImageError(true)}
                        />

                    </div>

                    {/* Format options */}
                    <div className="space-y-3 text-sm text-gray-600">
                        <div className="flex items-center gap-3">
                            <span className="w-5 h-5 text-gray-400">🌐</span>
                            <span>English</span>
                        </div>
                        {/*<div className="flex items-center gap-3">*/}
                        {/*    <span className="w-5 h-5 text-gray-400">📱</span>*/}
                        {/*    <span>ePUB (mobile friendly)</span>*/}
                        {/*</div>*/}
                        {/*<div className="flex items-center gap-3">*/}
                        {/*    <span className="w-5 h-5 text-gray-400">📱</span>*/}
                        {/*    <span>Available on iOS & Android</span>*/}
                        {/*</div>*/}
                    </div>
                </div>
            </div> : ""


    );
};

export default BookCover;