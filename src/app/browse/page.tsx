/* eslint-disable  */
// @ts-nocheck
"use client"
import SearchBar from "@/app/components/SearchBar";
import SidebarLayout from "@/components/layout/sidebar/sidebar-layout";
import BookGrid from "@/app/components/BookGrid";
import { CategoryCard } from "@/components/elements/index/browse/CategoryCard";
import { useAppDispatch } from "@/lib/hooks";
import { useEffect, useState } from "react";
import { getCategories } from "@/lib/api/category";
import { getCategoriesSuccess } from "@/app/store/features/categorySlice";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import { useRouter } from "next/navigation";
import { getBooks, getReadingBooks, getTodaysSelection } from "@/lib/api/book";
import { BookListResponse } from "@/types/book";
import FilterPillBar from "@/components/elements/filters/FilterPillBar";
import { CatalogFilters, defaultCatalogFilters } from "@/components/elements/filters/types";

export default function Page() {
    const router = useRouter();
    const categories = useSelector((state: RootState) => state.category);
    const dispatch = useAppDispatch();
    const user = useSelector((state: RootState) => state.user);

    const [catalogFilters, setCatalogFilters] = useState<CatalogFilters>(defaultCatalogFilters);
    const [results, setResults] = useState<BookListResponse | null>(null);
    const [resultsLoading, setResultsLoading] = useState(false);

    const applyTheme = (selectedTheme: string) => {
        const root = window.document.documentElement;

        if (selectedTheme === 'dark') {
            root.classList.add('dark');
        } else if (selectedTheme === 'light') {
            root.classList.remove('dark');
        } else {
            // Apply system preference
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            if (prefersDark) {
                root.classList.add('dark');
            } else {
                root.classList.remove('dark');
            }
        }
    };

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme') || 'system';
        const savedLanguage = localStorage.getItem('language') || 'en';
        applyTheme(savedTheme);
    }, []);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await getCategories({ page: 1, limit: 20 });
                dispatch(getCategoriesSuccess(response));
                console.log(response);
            } catch (err: unknown) {
                console.error("Failed to fetch categories:", err);
            }
        };

        fetchCategories();
    }, [dispatch]);

    useEffect(() => {
        let cancelled = false;
        setResultsLoading(true);

        getBooks({
            page: 1,
            limit: 24,
            category: catalogFilters.category || undefined,
            contentType: catalogFilters.contentType || undefined,
            sort: catalogFilters.sort,
        })
            .then((response) => {
                if (!cancelled) setResults(response);
            })
            .catch((err) => console.error("Failed to fetch books:", err))
            .finally(() => {
                if (!cancelled) setResultsLoading(false);
            });

        return () => {
            cancelled = true;
        };
    }, [catalogFilters]);

    return (
        <SidebarLayout>
            <div className="w-full flex flex-col dark:bg-gray-800">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6 mb-8">
                    <div>
                        <h1 className="font-extrabold tracking-tight text-4xl sm:text-5xl text-[#1C1B19] dark:text-white mb-1">Browse</h1>
                        <p className="text-[#8A8374] dark:text-gray-300">Explore the full collection by topic.</p>
                    </div>
                    <SearchBar className="w-full sm:max-w-xs" />
                </div>

                <div className="h-px bg-[#E8E1D3] dark:bg-gray-700 mb-8" />

                <div className="mb-2 w-full">
                    <FilterPillBar
                        categories={categories?.categories?.data.categories ?? []}
                        filters={catalogFilters}
                        onChange={setCatalogFilters}
                    />
                </div>

                {results?.data?.books && results.data.books.length > 0 && (
                    <BookGrid title="Trending" userId={user?.user?._id ?? ""} books={results} />
                )}
                {!resultsLoading && results && results.data.books.length === 0 && (
                    <p className="text-[#8A8374] dark:text-gray-400 mb-8">No books match these filters.</p>
                )}

                <h2 className="font-bold tracking-tight text-2xl text-[#1C1B19] dark:text-white mb-4">
                    Browse by topic
                </h2>
                <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
                    {categories?.categories?.data.categories.map((category) => (
                        <div
                            key={category._id}
                            onClick={() => {
                                router.push(`/bookbycategory/${category.name}`);
                            }}
                        >
                            <CategoryCard title={category.name} />
                        </div>
                    ))}
                </div>
            </div>
        </SidebarLayout>
    );
}
