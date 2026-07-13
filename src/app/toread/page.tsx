/* eslint-disable  */
// @ts-nocheck

"use client"
import SearchBar from "@/app/components/SearchBar";
import SidebarLayout from "@/components/layout/sidebar/sidebar-layout";
import BookGrid from "@/app/components/BookGrid";
import {useSelector} from "react-redux";
import {RootState} from "@/app/store/store";
import {useAppDispatch} from "@/lib/hooks";
import {useEffect} from "react";
import {getBooks} from "@/lib/api/book";
import {getBooksSuccess} from "@/app/store/features/bookSlice";

export default function Page() {


    const books = useSelector((state: RootState) => state.book)
    const user = useSelector((state: RootState) => state.user)
    const dispatch = useAppDispatch();
    useEffect(() => {

        const fetchBooks = async () => {
            try {
                const response = await getBooks({page: 1, limit: 20 ,  savedByUser : user?.user?._id ?? ""})
                dispatch(getBooksSuccess(response))
            } catch (err: unknown) {
                console.error("failed to fetch books:", err)
            }
        }

        fetchBooks()
    }, [dispatch]);

    const hasBooks = (books?.books?.data?.books?.length ?? 0) > 0;

    return (
        <SidebarLayout>
            <div className="w-full">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6 mb-8">
                    <div>
                        <h1 className="font-extrabold tracking-tight text-4xl sm:text-5xl text-[#1C1B19] dark:text-white mb-1">
                            My library
                        </h1>
                        <p className="text-[#8A8374] dark:text-gray-300">Books you&apos;ve saved to read.</p>
                    </div>
                    <SearchBar className="w-full sm:max-w-xs" />
                </div>

                <div className="h-px bg-[#E8E1D3] dark:bg-gray-700 mb-8" />

                {hasBooks ? (
                    <BookGrid
                        title=""
                        userId={user?.user?._id ?? ""}
                        books={books.books}
                        showCurrentlyReading={true}
                    />
                ) : (
                    <p className="text-[#8A8374] dark:text-gray-400">
                        You haven&apos;t saved any books yet — browse the collection to add some.
                    </p>
                )}
            </div>
        </SidebarLayout>
    )
}
