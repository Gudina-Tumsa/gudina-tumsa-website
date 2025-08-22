/* eslint-disable  */
// @ts-nocheck

"use client"

import { useState } from "react";
import {BookData} from "@/types/book";

const BookCover = ({bookData } : {bookData : BookData | null} ) => {
    const [imageError, setImageError] = useState(false);
    console.log(imageError)

    return (

            bookData ? <div className="sticky top-8">
                <div className="bg-white rounded-lg  p-6">
                    <div className="aspect-[3/4] bg-gradient-to-br  rounded-lg overflow-hidden mb-6 relative">
                        {/*{!imageError ? (*/}
                        <img
                            src={process.env.NEXT_PUBLIC_BASE_URL+ bookData.coverImageUrl}
                            alt=""
                            className=" object-contains"
                            onError={() => setImageError(true)}
                        />

                    </div>

                    {/* Format options */}
                    <div className="space-y-3 text-sm text-gray-600">
                        {/*<div className="flex items-center gap-3">*/}
                        {/*    <span className="w-5 h-5 text-gray-400">🌐</span>*/}
                        {/*    <span>English</span>*/}
                        {/*</div>*/}
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
