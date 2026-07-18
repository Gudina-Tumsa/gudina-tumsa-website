"use client";

import Link from "next/link";
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

const BookRail = ({ title, subtitle, books, userId, href, showProgress }: BookRailProps) => {
    if (!books || books.length === 0) return null;

    return (
        <section className="mb-12">
            <div className="flex items-end justify-between gap-4 mb-4">
                <div className="min-w-0">
                    <h2 className="font-extrabold tracking-tight text-2xl sm:text-3xl text-[#1C1B19] dark:text-white">
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

                </div>
            </div>

            <div className="flex flex-wrap gap-5">
                {books.map((book) => (
                    <div key={book._id} className="w-40 sm:w-44 lg:w-48">
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
                                category={book.category}
                                rating={book.rating}
                                pageCount={book.pageCount}
                                hasAudio={!!book.audioSummarizationUrl}
                            />
                        )}
                    </div>
                ))}
            </div>
        </section>
    );
};

export default BookRail;
