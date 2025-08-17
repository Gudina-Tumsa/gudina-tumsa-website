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
            <p className="text-xl font-semibold px-8">Search result</p>

            <div className="py-4 px-8 w-full">
                {books.books.length > 0 ? (
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
        </SidebarLayout>
    )
}
