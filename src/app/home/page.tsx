/* eslint-disable */
// @ts-nocheck

"use client";

import SearchBar from "@/app/components/SearchBar";
import BookGrid from "@/app/components/BookGrid";
import SidebarLayout from "@/components/layout/sidebar/sidebar-layout";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import { useEffect, useState, useRef, useCallback } from "react";
import {
    getBooks,
    getBookSuggestions,
    getReadingBooks,
    getTodaysSelection,
} from "@/lib/api/book";
import { BookListResponse } from "@/types/book";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { createUserBookInteraction } from "@/lib/api/userbookinteraction";
import MarketplaceSection from "@/components/elements/marketplace/MarketplaceSection";
import FilterPillBar from "@/components/elements/filters/FilterPillBar";
import { useCategories } from "@/lib/hooks/useCategories";
import { CatalogFilters, defaultCatalogFilters } from "@/components/elements/filters/types";

// ------------------ TodaysSelectionCard ------------------
const TodaysSelectionCard = ({ todaysSelectionResponse }) => {
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
    const user = useSelector((state: RootState) => state.user);
    const router = useRouter();

    const book = todaysSelectionResponse?.data?.books?.[0];
    if (!book) return null;
    console.log({book : book})

    useEffect(() => {
        setIsUserLoggedIn(Boolean(user?.user));
    }, [user]);

    const handleReadClick = () => {
        if (!isUserLoggedIn) {
            router.push("/login");
        } else {
            router.push(`/bookdetail/${book._id}`);
        }
    };

    const handleSaveClick = async () => {
        if (!isUserLoggedIn) {
            router.push("/login");
            return;
        }
        try {
            await createUserBookInteraction({
                userId: user.user._id,
                bookId: book._id,
                interactionType: "save",
            });
            toast.success("Book saved successfully!");
        } catch (err) {
            toast.error("Failed to save book.");
        }
    };

    return (
        <div className="bg-yellow-50 rounded-lg shadow-md w-full max-w-4xl mx-auto p-4 md:p-6">
            <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-1/2 flex flex-col justify-center">
                    <h3 className="text-xl font-semibold text-gray-800">{book.title}</h3>
                    <p className="text-gray-600 mt-1">by {book.author}</p>
                    <hr className="my-4 border-gray-300 md:hidden" />
                </div>

                <div className="hidden md:block border-l border-gray-300"></div>

                <div className="md:w-1/2 flex flex-col lg:flex-row gap-6 items-center min-w-0">
                    <div className="w-full lg:w-1/2 bg-gray-200 overflow-hidden rounded-md">
                        <div className="aspect-[3/4] w-full">
                            <img
                                className="w-full h-full object-cover"
                                src={`${process.env.NEXT_PUBLIC_BASE_URL}${book.coverImageUrl}`}
                                alt={`Cover of ${book.title}`}
                                loading="lazy"
                            />
                        </div>
                    </div>

                    <div className="flex flex-col w-full sm:w-auto gap-3">
                        <button
                            onClick={handleReadClick}
                            className="w-full sm:w-auto rounded-md px-4 py-2 bg-black text-white hover:bg-gray-800 transition-colors"
                        >
                            {isUserLoggedIn ? "Read" : "Login to Read"}
                        </button>
                        <button
                            onClick={handleSaveClick}
                            className="w-full sm:w-auto rounded-md px-4 py-2 border border-gray-300 text-gray-800 hover:bg-gray-100 transition-colors"
                        >
                            {isUserLoggedIn ? "Save" : "Login to Save"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

// ------------------ EventCard (Placeholder) ------------------
const EventCard = () => {
    // You can implement real event rendering later
    return (
        <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 h-full flex items-center justify-center">
            <span className="text-gray-500 dark:text-gray-300">Upcoming Events</span>
        </div>
    );
};

// ------------------ Main Page ------------------
export default function HomePage() {
    const user = useSelector((state: RootState) => state.user);
    const router = useRouter();

    // Static sections (fetched once)
    const [currentlyReading, setCurrentlyReading] = useState<BookListResponse | null>(null);
    const [todaysSelection, setTodaysSelection] = useState<BookListResponse | null>(null);
    const [recommendations, setRecommendations] = useState<BookListResponse | null>(null);
    const [audioBooks, setAudioBooks] = useState<BookListResponse | null>(null);

    // Infinite scroll state for main book list
    const [books, setBooks] = useState<BookListResponse["data"]["books"]>([]);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);
    const [catalogFilters, setCatalogFilters] = useState<CatalogFilters>(defaultCatalogFilters);
    const { categories } = useCategories();

    const sentinelRef = useRef<HTMLDivElement>(null);

    // Fetch non-scrolling sections on mount
    useEffect(() => {
        const token = user?.user?.token;

        const loadStaticData = async () => {
            try {
                // Parallel fetches for efficiency
                const todayPromise = getTodaysSelection(token);
                const recPromise = getBookSuggestions(token);
                const audioPromise = getBooks({ page: 1, limit: 20, contentType: "Audio" });
                const readingPromise = token ? getReadingBooks(token) : null;

                const [today, rec, audio, reading] = await Promise.all([
                    todayPromise,
                    recPromise,
                    audioPromise,
                    readingPromise,
                ]);

                setTodaysSelection(today);
                setRecommendations(rec);
                setAudioBooks(audio);
                if (reading) setCurrentlyReading(reading);
            } catch (err) {
                console.error("Error loading static ", err);
            }
        };

        loadStaticData();
    }, [user?.user?.token]);

    // Fetch next page of books (main list)
    const fetchBooks = useCallback(async () => {
        if (loading || !hasMore) return;

        setLoading(true);
        try {
            const response = await getBooks({
                page,
                limit: 20,
                category: catalogFilters.category || undefined,
                contentType: catalogFilters.contentType || undefined,
                sort: catalogFilters.sort,
            });
            const newBooks = response?.data?.books || [];
            const totalCount = response?.data?.total || 0;

            setBooks((prev) => [...prev, ...newBooks]);
            setTotal(totalCount);

            // Check if we've loaded all books
            const loadedCount = books.length + newBooks.length;
            setHasMore(loadedCount < totalCount && newBooks.length > 0);
        } catch (err) {
            console.error("Failed to fetch books:", err);
            toast.error("Unable to load more books");
        } finally {
            setLoading(false);
        }
    }, [page, loading, hasMore, books.length, catalogFilters]);

    // Reset and load the first page of the catalog whenever filters change (including initial mount)
    useEffect(() => {
        let cancelled = false;

        setBooks([]);
        setTotal(0);
        setHasMore(true);
        setPage(2);
        setLoading(true);

        getBooks({
            page: 1,
            limit: 20,
            category: catalogFilters.category || undefined,
            contentType: catalogFilters.contentType || undefined,
            sort: catalogFilters.sort,
        })
            .then((response) => {
                if (cancelled) return;
                const newBooks = response?.data?.books || [];
                const totalCount = response?.data?.total || 0;
                setBooks(newBooks);
                setTotal(totalCount);
                setHasMore(newBooks.length < totalCount && newBooks.length > 0);
            })
            .catch((err) => {
                console.error("Failed to fetch books:", err);
                toast.error("Unable to load more books");
            })
            .finally(() => {
                if (!cancelled) setLoading(false);
            });

        return () => {
            cancelled = true;
        };
    }, [catalogFilters]);

    // Set up IntersectionObserver to trigger fetch on scroll
    useEffect(() => {
        if (!sentinelRef.current) return;

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && !loading && hasMore) {
                    fetchBooks();
                    setPage((p) => p + 1); // increment for next fetch
                }
            },
            { rootMargin: "400px" } // start loading early
        );

        observer.observe(sentinelRef.current);

        return () => {
            observer.disconnect();
        };
    }, [fetchBooks, loading, hasMore]);

    return (
        <SidebarLayout>
            <div className="w-full dark:bg-gray-800 min-h-screen">
                <div className="mb-8 w-full px-4 sm:px-6">
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-2">
                        <h1 className="dark:text-white text-2xl font-semibold text-gray-900">
                            Hi {user?.user?.firstName || "user"} 👋
                        </h1>
                        <SearchBar className="w-full sm:max-w-xs" />
                    </div>

                    {/* Today's Selection */}
                    {todaysSelection?.data?.books?.length! > 0 && (
                        <div className="mb-8">
                            <p className="dark:text-white text-gray-600 mb-4">Today's selection!</p>
                            <div className="flex flex-col md:flex-row gap-4 w-full">
                                <div className="w-full md:w-[65%]">
                                    <TodaysSelectionCard todaysSelectionResponse={todaysSelection} />
                                </div>
                                <div className="w-full md:w-[35%]">
                                    <EventCard />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Currently Reading */}
                    {currentlyReading?.data?.books?.length! > 0 && (
                        <BookGrid
                            title="Reading"
                            userId={user?.user?._id ?? ""}
                            books={currentlyReading}
                            showCurrentlyReading={true}
                        />
                    )}

                    {/* Audio Books */}
                    {audioBooks?.data?.books?.length! > 0 && (
                        <BookGrid
                            title="Audio Books"
                            userId={user?.user?._id ?? ""}
                            books={audioBooks}
                        />
                    )}

                    {/* Recommendations */}
                    {recommendations?.data?.books?.length! > 0 && (
                        <BookGrid
                            title="Top Picks for You"
                            userId={user?.user?._id ?? ""}
                            books={recommendations}
                        />
                    )}

                    {/* Marketplace */}
                    <MarketplaceSection mode="preview" title="Marketplace" limit={4} />

                    {/* Main Book List (Lazy Loaded) */}
                    {user.user?._id == null && (
                        <>
                            <h2 className="dark:text-white text-xl font-semibold text-gray-900 mb-4">All Books</h2>
                            <FilterPillBar
                                categories={categories}
                                filters={catalogFilters}
                                onChange={setCatalogFilters}
                            />
                            {books.length > 0 && (
                                <BookGrid
                                    title=""
                                    userId={user?.user?._id ?? ""}
                                    books={{ data: { books, total } }}
                                />
                            )}
                        </>
                    )}

                    {/* Sentinel for infinite scroll */}
                    <div ref={sentinelRef} className="h-px" aria-hidden="true" />

                    {/* Loading / End indicators */}
                    {loading && hasMore && (
                        <div className="text-center py-4 text-gray-500 dark:text-gray-400">
                            Loading more books...
                        </div>
                    )}

                    {/*{!hasMore && books.length > 0 && (*/}
                    {/*    <div className="text-center py-4 text-gray-500 dark:text-gray-400 text-sm">*/}
                    {/*        That’s all the books we have! 📚*/}
                    {/*    </div>*/}
                    {/*)}*/}
                </div>
            </div>
        </SidebarLayout>
    );
}
