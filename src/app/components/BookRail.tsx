"use client";

import { useRef } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { BookData } from "@/types/book";
import BookCard from "./BookCard";
import ProgressBookCard from "./ProgressBookCard";

interface BookRailProps {
    title: string;
    subtitle?: string;
    books: BookData[];
    userId: string;
    href?: string;
    showProgress?: boolean;
}

const arrowClass =
    "hidden sm:flex h-9 w-9 items-center justify-center rounded-full border border-[#E8E1D3] dark:border-gray-600 bg-white dark:bg-gray-700 text-[#1C1B19] dark:text-white transition-colors hover:bg-[#F5EEE0] dark:hover:bg-gray-600";

const BookRail = ({ title, subtitle, books, userId, href, showProgress }: BookRailProps) => {
    const scrollerRef = useRef<HTMLDivElement>(null);

    if (!books || books.length === 0) return null;

    const scroll = (direction: number) => {
        const el = scrollerRef.current;
        if (!el) return;
        el.scrollBy({ left: direction * el.clientWidth * 0.8, behavior: "smooth" });
    };

    return (
        <section className="mb-12">
            <div className="flex items-end justify-between gap-4 mb-4">
                <div className="min-w-0">
                    <h2 className="font-serif text-2xl sm:text-3xl text-[#1C1B19] dark:text-white">
                        {title}
                    </h2>
                    {subtitle && (
                        <p className="text-sm text-[#8A8374] dark:text-gray-400 mt-1">{subtitle}</p>
                    )}
                </div>
                <div className="flex items-center gap-2 shrink-0">
                    {href && (
                        <Link
                            href={href}
                            className="text-sm font-medium text-[#9407F2] dark:text-[#C084FC] hover:underline mr-1 whitespace-nowrap"
                        >
                            Show all
                        </Link>
                    )}
                    <button onClick={() => scroll(-1)} aria-label={`Scroll ${title} left`} className={arrowClass}>
                        <ChevronLeft className="h-4 w-4" />
                    </button>
                    <button onClick={() => scroll(1)} aria-label={`Scroll ${title} right`} className={arrowClass}>
                        <ChevronRight className="h-4 w-4" />
                    </button>
                </div>
            </div>

            <div
                ref={scrollerRef}
                className="flex gap-5 overflow-x-auto pb-2 snap-x [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
                {books.map((book) => (
                    <div key={book._id} className="w-40 sm:w-44 lg:w-48 shrink-0 snap-start">
                        {showProgress ? (
                            <ProgressBookCard book={book} />
                        ) : (
                            <BookCard
                                id={book._id}
                                userId={userId}
                                title={book.title}
                                writer={book.author}
                                year={book.publicationYear}
                                coverImage={`${process.env.NEXT_PUBLIC_BASE_URL}${book.coverImageUrl}`}
                            />
                        )}
                    </div>
                ))}
            </div>
        </section>
    );
};

export default BookRail;
