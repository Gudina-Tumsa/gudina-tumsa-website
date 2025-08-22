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
                <div className="mb-8 w-full">
                    <SearchBar />
                    <h1 className="text-2xl font-medium mt-8 text-gray-900 mb-2">Search Results</h1>
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
