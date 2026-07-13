/* eslint-disable */
// @ts-nocheck

"use client";

import SearchBar from "@/app/components/SearchBar";
import BookGrid from "@/app/components/BookGrid";
import BookRail from "@/app/components/BookRail";
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
import { getEvents } from "@/lib/api/events";
import { BookListResponse } from "@/types/book";
import { EventData } from "@/types/events";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Link from "next/link";
import { Loader2, Sparkles, CalendarIcon, MapPin } from "lucide-react";
import { createUserBookInteraction } from "@/lib/api/userbookinteraction";
import MarketplaceSection from "@/components/elements/marketplace/MarketplaceSection";
import FilterPillBar from "@/components/elements/filters/FilterPillBar";
import { useCategories } from "@/lib/hooks/useCategories";
import { CatalogFilters, defaultCatalogFilters } from "@/components/elements/filters/types";

// ------------------ Today's Selection Hero ------------------
const TodaysSelectionHero = ({ todaysSelectionResponse }) => {
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
    const user = useSelector((state: RootState) => state.user);
    const router = useRouter();

    useEffect(() => {
        setIsUserLoggedIn(Boolean(user?.user));
    }, [user]);

    // Whichever book is first in the admin-controlled selection is shown — no rotation, no list.
    const book = todaysSelectionResponse?.data?.books?.[0];
    if (!book) return null;

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
        <div className="relative overflow-hidden rounded-2xl bg-white dark:bg-gray-700 border border-[#E8E1D3] dark:border-gray-600">
            <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-[#9407F2]/10 blur-3xl" />

            <div className="relative flex flex-col-reverse sm:flex-row sm:items-center gap-6 p-5 sm:p-6">
                <div className="flex-1 min-w-0">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-[#9407F2]/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[#9407F2] dark:bg-[#9407F2]/20 dark:text-[#C084FC]">
                        <Sparkles className="h-3 w-3" />
                        Today&apos;s selection
                    </span>

                    <h2 className="font-extrabold tracking-tight text-2xl sm:text-3xl text-[#1C1B19] dark:text-white mt-3 leading-tight">
                        {book.title}
                    </h2>
                    <p className="text-sm text-[#8A8374] dark:text-gray-300 mt-1">by {book.author}</p>

                    {book.description && (
                        <p className="text-sm text-[#5C564A] dark:text-gray-300 mt-3 max-w-xl line-clamp-2">
                            {book.description}
                        </p>
                    )}

                    <div className="flex flex-wrap items-center gap-3 mt-4">
                        <button
                            onClick={handleReadClick}
                            className="rounded-full bg-[#9407F2] px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-[#7d06cc]"
                        >
                            {isUserLoggedIn ? "Read now" : "Login to read"}
                        </button>
                        <button
                            onClick={handleSaveClick}
                            className="rounded-full border border-[#1C1B19]/20 dark:border-white/30 px-5 py-2 text-sm font-medium text-[#1C1B19] dark:text-white transition-colors hover:bg-white/60 dark:hover:bg-white/10"
                        >
                            {isUserLoggedIn ? "Save for later" : "Login to save"}
                        </button>
                    </div>
                </div>

                <div className="shrink-0 self-center sm:self-auto">
                    <div className="w-28 sm:w-32 lg:w-36 aspect-[3/4] rounded-lg overflow-hidden shadow-lg bg-gray-200 dark:bg-gray-600">
                        <img
                            className="w-full h-full object-cover"
                            src={`${process.env.NEXT_PUBLIC_BASE_URL}${book.coverImageUrl}`}
                            alt={`Cover of ${book.title}`}
                            loading="lazy"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

// ------------------ Upcoming Events ------------------
const UpcomingEventsCard = ({ events }: { events: EventData[] }) => {
    const [index, setIndex] = useState(0);
    const hasEvents = events && events.length > 0;

    useEffect(() => {
        setIndex(0);
    }, [events]);

    useEffect(() => {
        if (!hasEvents || events.length < 2) return;
        const timer = setInterval(() => {
            setIndex((i) => (i + 1) % events.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [hasEvents, events.length]);

    const event = hasEvents ? events[index % events.length] : null;
    const startDate = event ? new Date(event.startDate) : null;

    return (
        <div className="rounded-2xl bg-white dark:bg-gray-700 border border-[#E8E1D3] dark:border-gray-600 p-6 h-full flex flex-col">
            <h2 className="font-bold text-lg text-[#1C1B19] dark:text-white flex items-center gap-2 mb-5">
                <CalendarIcon className="h-5 w-5 text-[#9407F2] dark:text-[#C084FC]" />
                Upcoming events
            </h2>

            {event ? (
                <Link href="/events" className="flex-1 flex flex-col gap-4 hover:opacity-80 transition-opacity">
                    <div className="rounded-xl bg-[#9407F2]/10 dark:bg-[#9407F2]/20 text-[#9407F2] dark:text-[#C084FC] text-center px-4 py-3 w-fit">
                        <div className="text-2xl font-bold leading-none">
                            {startDate.toLocaleDateString("en-US", { day: "numeric" })}
                        </div>
                        <div className="text-xs uppercase font-semibold mt-1">
                            {startDate.toLocaleDateString("en-US", { month: "short" })}
                        </div>
                    </div>
                    <div className="min-w-0">
                        <h3 className="font-bold text-xl text-[#1C1B19] dark:text-white leading-tight line-clamp-2">
                            {event.title}
                        </h3>
                        {event.location && (
                            <p className="flex items-center gap-1 text-sm text-[#8A8374] dark:text-gray-400 mt-2">
                                <MapPin className="h-3.5 w-3.5 shrink-0" />
                                {event.location}
                            </p>
                        )}
                    </div>
                    {event.description && (
                        <p className="text-sm text-[#5C564A] dark:text-gray-300 line-clamp-4">{event.description}</p>
                    )}
                </Link>
            ) : (
                <div className="flex-1 flex flex-col items-center justify-center text-center gap-2 py-6">
                    <CalendarIcon className="h-6 w-6 text-[#8A8374] dark:text-gray-400" />
                    <p className="text-sm font-medium text-[#1C1B19] dark:text-white">No upcoming events</p>
                    <p className="text-xs text-[#8A8374] dark:text-gray-400">Check back soon for new events.</p>
                </div>
            )}
        </div>
    );
};

const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
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
    const [upcomingEvents, setUpcomingEvents] = useState<EventData[]>([]);

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
                const eventsPromise = getEvents({ page: 1, limit: 20, isActive: true });

                const [today, rec, audio, reading, events] = await Promise.all([
                    todayPromise,
                    recPromise,
                    audioPromise,
                    readingPromise,
                    eventsPromise,
                ]);

                setTodaysSelection(today);
                setRecommendations(rec);
                setAudioBooks(audio);
                if (reading) setCurrentlyReading(reading);

                const now = new Date();
                const upcoming = (events?.data?.events ?? [])
                    .filter((event) => new Date(event.endDate) >= now)
                    .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime())
                    .slice(0, 3);
                setUpcomingEvents(upcoming);
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
                    {/* Greeting + search */}
                    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
                        <div>
                            <h1 className="font-extrabold tracking-tight text-3xl sm:text-4xl text-[#1C1B19] dark:text-white">
                                {getGreeting()}, {user?.user?.firstName || "reader"}
                            </h1>
                            <p className="text-[#8A8374] dark:text-gray-400 mt-1">
                                What will you discover today?
                            </p>
                        </div>
                        <SearchBar className="w-full sm:max-w-xs" />
                    </div>

                    {/* Today's Selection + Upcoming Events */}
                    <div className="flex flex-col lg:flex-row gap-6 mb-12">
                        <div className="flex-1 min-w-0">
                            <TodaysSelectionHero todaysSelectionResponse={todaysSelection} />
                        </div>
                        <div className="w-full lg:w-80 shrink-0">
                            <UpcomingEventsCard events={upcomingEvents} />
                        </div>
                    </div>

                    {/* Continue reading */}
                    {currentlyReading?.data?.books?.length! > 0 && (
                        <BookRail
                            title="Continue reading"
                            subtitle="Pick up where you left off"
                            href="/reading"
                            userId={user?.user?._id ?? ""}
                            books={currentlyReading.data.books}
                            showProgress
                        />
                    )}

                    {/* Audio Books */}
                    {audioBooks?.data?.books?.length! > 0 && (
                        <BookRail
                            title="Audio books"
                            subtitle="Listen while you're on the go"
                            href="/browse"
                            userId={user?.user?._id ?? ""}
                            books={audioBooks.data.books}
                        />
                    )}

                    {/* Recommendations */}
                    {recommendations?.data?.books?.length! > 0 && (
                        <BookRail
                            title="Top picks for you"
                            subtitle="Based on what you've been reading"
                            userId={user?.user?._id ?? ""}
                            books={recommendations.data.books}
                        />
                    )}

                    {/* Marketplace */}
                    <MarketplaceSection mode="preview" title="Marketplace" limit={4} />

                    {/* Main Book List (Lazy Loaded) */}
                    {user.user?._id == null && (
                        <>
                            <h2 className="font-extrabold tracking-tight text-2xl sm:text-3xl text-[#1C1B19] dark:text-white mb-1">
                                Explore the library
                            </h2>
                            <p className="text-sm text-[#8A8374] dark:text-gray-400 mb-5">
                                {total > 0 ? `${total} books and counting` : "Browse the full collection"}
                            </p>
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
                        <div className="flex items-center justify-center gap-2 py-6 text-[#8A8374] dark:text-gray-400">
                            <Loader2 className="h-4 w-4 animate-spin" />
                            <span className="text-sm">Loading more books…</span>
                        </div>
                    )}
                </div>
            </div>
        </SidebarLayout>
    );
}
