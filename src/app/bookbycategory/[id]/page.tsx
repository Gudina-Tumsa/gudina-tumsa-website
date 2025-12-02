/* eslint-disable  */
// @ts-nocheck

"use client"

import SearchBar from "@/app/components/SearchBar";
import SidebarLayout from "@/components/layout/sidebar/sidebar-layout";
import BookGrid from "@/app/components/BookGrid";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import { useEffect, useState, useRef, useCallback } from "react";
import { useParams } from "next/navigation";
import { getBooks, GetBooksRequest } from "@/lib/api/book";
import { BookData, BookListResponse } from "@/types/book";

export default function Page() {
    const user = useSelector((state: RootState) => state.user);
    const params = useParams();
    const categoryName = params?.id ? decodeURIComponent(params.id) : "";

    const [books, setBooks] = useState<BookListResponse | null>(null);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    const observer = useRef<IntersectionObserver>();

    const lastBookRef = useCallback((node: HTMLDivElement) => {
        if (loading) return;
        if (observer.current) observer.current.disconnect();

        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                setPage(prev => prev + 1);
            }
        });

        if (node) observer.current.observe(node);
    }, [loading, hasMore]);

    // fetch books using your async style
    useEffect(() => {
        const fetchRecommendation = async () => {
            setLoading(true);
            try {
                const bookRequest: GetBooksRequest = {
                    page,
                    limit: 20,
                    contentType: "Book",
                    category: categoryName,
                };

                const response = await getBooks(bookRequest);

                console.log({ response : response });

                setBooks(prev => {
                    if (!prev) return response;
                    return {
                        ...response,
                        data: {
                            ...response.data,
                            books: [...prev.data.books, ...response.data.books]
                        }
                    };
                });

                setHasMore((response?.data?.books?.length ?? 0) > 0);

            } catch (err: unknown) {
                console.error("Failed to fetch books:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchRecommendation();
    }, [page, categoryName]);

    useEffect(() => {
        setBooks(null);
        setPage(1);
        setHasMore(true);
    }, [categoryName]);

    return (
        <SidebarLayout>
            <SearchBar />
            <div className="flex flex-row justify-between mb-8 mt-[5%]">
                <h1 className="text-2xl font-[500px]  mb-2">
                     {categoryName}
                </h1>
            </div>

            <BookGrid
                userId={user?.user?._id ?? ""}
                title=""
                books={books}
                lastBookRef={lastBookRef}
            />

            {loading && <p className="text-center mt-4">Loading more books...</p>}
        </SidebarLayout>
    );
}
