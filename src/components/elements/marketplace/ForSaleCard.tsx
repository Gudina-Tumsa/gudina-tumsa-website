"use client";

import { useRouter } from "next/navigation";
import { BookData } from "@/types/book";

interface ForSaleCardProps {
    book: BookData;
    isOwned: boolean;
    onBuyClick: (book: BookData) => void;
}

const ForSaleCard = ({ book, isOwned, onBuyClick }: ForSaleCardProps) => {
    const router = useRouter();

    return (
        <div className="flex flex-col">
            <div
                className="rounded-2xl overflow-hidden relative aspect-[3/4] bg-gray-100 dark:bg-gray-700 cursor-pointer shadow-sm"
                onClick={() => router.push(`/bookdetail/${book._id}`)}
            >
                <img
                    src={`${process.env.NEXT_PUBLIC_BASE_URL}${book.coverImageUrl}`}
                    alt={book.title}
                    className="w-full h-full object-cover"
                />
                <span className="absolute top-3 right-3 bg-white/95 text-gray-900 text-xs font-semibold px-2.5 py-1 rounded-full">
                    {book.price} ETB
                </span>
            </div>

            <h3 className="mt-3 font-semibold text-gray-900 dark:text-white line-clamp-2">{book.title}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 truncate">{book.author}</p>

            <button
                onClick={() => (isOwned ? router.push(`/bookdetail/${book._id}`) : onBuyClick(book))}
                className="mt-3 border border-[#9407F2] text-[#9407F2] dark:border-[#C084FC] dark:text-[#C084FC] rounded-full px-4 py-2 text-sm font-medium hover:bg-[#9407F2] hover:border-[#9407F2] hover:text-white dark:hover:bg-[#9407F2] dark:hover:text-white transition-colors"
            >
                {isOwned ? "Read" : `Buy · ${book.price} ETB`}
            </button>
        </div>
    );
};

export default ForSaleCard;
