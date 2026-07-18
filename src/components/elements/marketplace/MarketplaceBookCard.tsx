"use client";

import { useRouter } from "next/navigation";
import { BookData } from "@/types/book";

interface MarketplaceBookCardProps {
    book: BookData;
    isOwned: boolean;
    onBuyClick: (book: BookData) => void;
}

const MarketplaceBookCard = ({ book, isOwned, onBuyClick }: MarketplaceBookCardProps) => {
    const router = useRouter();

    return (
        <div className="dark:text-white group rounded-lg overflow-hidden w-full p-3 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
            <div
                className="rounded-lg overflow-hidden relative aspect-[3/4] bg-gray-100 cursor-pointer"
                onClick={() => router.push(`/bookdetail/${book._id}`)}
            >
                <img
                    src={`${process.env.NEXT_PUBLIC_BASE_URL}${book.coverImageUrl}`}
                    alt={book.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute top-2 right-2 bg-black/70 text-white text-xs font-semibold px-2 py-1 rounded-full">
                    {book.price} ETB
                </div>
            </div>

            <div className="mt-4 px-1">
                <h3 className="dark:text-white text-sm font-semibold text-gray-900 line-clamp-2">{book.title}</h3>
                <p className="dark:text-white text-xs text-gray-600 mt-1 truncate">{book.author}</p>

                <button
                    onClick={() =>
                        isOwned ? router.push(`/bookdetail/${book._id}`) : onBuyClick(book)
                    }
                    className={`mt-3 w-full rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                        isOwned
                            ? "border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600"
                            : "bg-[#C084FC] text-white hover:bg-[#C084FC]/90"
                    }`}
                >
                    {isOwned ? "Read" : `Buy for ${book.price} ETB`}
                </button>
            </div>
        </div>
    );
};

export default MarketplaceBookCard;