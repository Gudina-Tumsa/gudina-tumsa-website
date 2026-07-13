/* eslint-disable  */
// @ts-nocheck

"use client"

import { useState } from "react";
import {BookData} from "@/types/book";

const BookCover = ({bookData } : {bookData : BookData | null} ) => {
    const [imageError, setImageError] = useState(false);

    if (!bookData) return null;

    return (
        <div className="sticky top-8">
            <div className="rounded-lg p-6">
                <div className="aspect-[3/4] bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden mb-6 relative">
                    {!imageError ? (
                        <img
                            src={process.env.NEXT_PUBLIC_BASE_URL + bookData.coverImageUrl}
                            alt={bookData.title}
                            className="w-full h-full object-contain"
                            onError={() => setImageError(true)}
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-sm text-gray-400 dark:text-gray-500">
                            No cover available
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default BookCover;
