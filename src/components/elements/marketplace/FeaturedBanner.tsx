"use client";

import { BookData } from "@/types/book";

interface FeaturedBannerProps {
    book: BookData;
    isOwned: boolean;
    onBuyClick: (book: BookData) => void;
}

const FeaturedBanner = ({ book, isOwned, onBuyClick }: FeaturedBannerProps) => {
    return (
        <div className="bg-gray-900 rounded-2xl p-8 flex flex-col md:flex-row items-start md:items-center gap-8 mb-8">
            <div className="w-32 h-44 sm:w-40 sm:h-56 rounded-lg overflow-hidden bg-gray-800 flex-shrink-0">
                <img
                    src={`${process.env.NEXT_PUBLIC_BASE_URL}${book.coverImageUrl}`}
                    alt={book.title}
                    className="w-full h-full object-cover"
                />
            </div>

            <div className="flex-1 min-w-0">
                <div className="text-xs font-semibold tracking-widest uppercase text-[#C084FC] mb-3">
                    Featured this week
                </div>
                <h2 className="font-serif text-3xl sm:text-4xl text-white mb-1">{book.title}</h2>
                <p className="text-gray-400 mb-4">by {book.author}</p>
                <p className="text-gray-300 max-w-xl line-clamp-2">{book.description}</p>
            </div>

            <div className="flex flex-row md:flex-col items-center md:items-end justify-between md:justify-center gap-4 flex-shrink-0 w-full md:w-auto">
                <div className="text-white font-serif text-3xl whitespace-nowrap">
                    {book.price} <span className="text-sm text-gray-400 font-sans font-normal">ETB</span>
                </div>
                <button
                    onClick={() => !isOwned && onBuyClick(book)}
                    disabled={isOwned}
                    className="bg-[#9407F2] text-white font-semibold px-6 py-3 rounded-full hover:bg-[#7d06cc] transition-colors disabled:opacity-70 disabled:cursor-default whitespace-nowrap"
                >
                    {isOwned ? "Owned" : "Buy now"}
                </button>
            </div>
        </div>
    );
};

export default FeaturedBanner;
