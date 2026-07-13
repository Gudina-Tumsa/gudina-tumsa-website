/* eslint-disable */
// @ts-nocheck

"use client";

import SearchBar from "@/app/components/SearchBar";
import SidebarLayout from "@/components/layout/sidebar/sidebar-layout";
import LibraryTabs from "@/app/components/LibraryTabs";
import ProgressBookCard from "@/app/components/ProgressBookCard";
import BookGridSkeleton from "@/app/components/BookGridSkeleton";
import LibraryEmptyState from "@/app/components/LibraryEmptyState";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import { useEffect, useState } from "react";
import { getReadingBooks } from "@/lib/api/book";
import { BookData } from "@/types/book";
import { BookOpen } from "lucide-react";

export default function Page() {
    const applyTheme = (selectedTheme: string) => {
        const root = window.document.documentElement;

        if (selectedTheme === "dark") {
            root.classList.add("dark");
        } else if (selectedTheme === "light") {
            root.classList.remove("dark");
        } else {
            // Apply system preference
            const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
            if (prefersDark) {
                root.classList.add("dark");
            } else {
                root.classList.remove("dark");
            }
        }
    };

    useEffect(() => {
        const savedTheme = localStorage.getItem("theme") || "system";
        applyTheme(savedTheme);
    }, []);

    const user = useSelector((state: RootState) => state.user);
    const [books, setBooks] = useState<BookData[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchReadingBooks = async () => {
            try {
                const token = user?.user?.token;
                const response = await getReadingBooks(token ?? "");
                setBooks(response?.data?.books ?? []);
            } catch (err: unknown) {
                setBooks([]);
                console.error("failed to fetch books:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchReadingBooks();
    }, [user?.user?.token]);

    return (
        <SidebarLayout>
            <div className="min-h-screen">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6 mb-8">
                    <div>
                        <h1 className="font-extrabold tracking-tight text-4xl sm:text-5xl text-[#1C1B19] dark:text-white mb-1">
                            Reading
                        </h1>
                        <p className="text-[#8A8374] dark:text-gray-300">
                            {loading
                                ? "Pick up where you left off."
                                : books.length > 0
                                  ? `${books.length} book${books.length === 1 ? "" : "s"} in progress — pick up where you left off.`
                                  : "Pick up where you left off."}
                        </p>
                    </div>
                    <SearchBar className="w-full sm:max-w-xs" />
                </div>

                {/*<LibraryTabs />*/}

                {loading ? (
                    <BookGridSkeleton />
                ) : books.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                        {books.map((book) => (
                            <ProgressBookCard key={book._id} book={book} />
                        ))}
                    </div>
                ) : (
                    <LibraryEmptyState
                        icon={BookOpen}
                        title="Nothing in progress yet"
                        description="Books you start reading will show up here so you can jump right back in."
                        ctaLabel="Browse books"
                        ctaHref="/browse"
                    />
                )}
            </div>
        </SidebarLayout>
    );
}
