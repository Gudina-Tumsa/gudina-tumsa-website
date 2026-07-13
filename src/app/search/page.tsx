/* eslint-disable  */
// @ts-nocheck

"use client"
import SearchBar from "@/app/components/SearchBar";
import SidebarLayout from "@/components/layout/sidebar/sidebar-layout";
import BookGrid from "@/app/components/BookGrid";
import {useSelector} from "react-redux";
import {RootState} from "@/app/store/store";

export default function Page() {
    const books = useSelector((state: RootState) => state.book)
    const user = useSelector((state: RootState) => state.user)

    return (
        <SidebarLayout>
            <div className="w-full flex flex-col justify-between">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-8 w-full">
                    <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Search Results</h1>
                    <SearchBar className="w-full sm:max-w-xs" />
                </div>

                <div className="w-full">
                    {books.books.data.books.length > 0 ? (
                        <BookGrid
                            userId={user?.user?._id ?? ""}
                            title=""
                            books={books.books}
                        />
                    ) : (
                        <div className="flex flex-col items-center justify-center py-20 text-gray-500">
                            <p className="text-lg font-medium">No results found</p>
                            <p className="text-sm">Try adjusting your search or explore other categories.</p>
                        </div>
                    )}
                </div>
            </div>
        </SidebarLayout>
    )
}
