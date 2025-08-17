"use client"
import SearchBar from "@/app/components/SearchBar";

import SidebarLayout from "@/components/layout/sidebar/sidebar-layout";
import BookGrid from "@/app/components/BookGrid";
import {useSelector} from "react-redux";
import {RootState} from "@/app/store/store";
import {useAppDispatch} from "@/lib/hooks";
import {useEffect} from "react";
import {getCompletedBooks} from "@/lib/api/book";
import {getBooksSuccess} from "@/app/store/features/bookSlice";

export default function Page() {


    const books = useSelector((state: RootState) => state.book)
    const user = useSelector((state: RootState) => state.user)

    const dispatch = useAppDispatch();
    useEffect(() => {

        const fetchFinishedbooks = async () => {
            try {
                const  token = user?.user?.token
                const response = await getCompletedBooks(token ?? "")
                dispatch(getBooksSuccess(response))
            } catch (err: unknown) {
                console.error("failed to fetch books:", err)
            }
        }

        fetchFinishedbooks()
    }, [dispatch]);

    return (
        <SidebarLayout>

            <SearchBar />
            <div className="flex flex-row justify-between">
                <div className="mb-8 mt-[5%]">
                    <h1 className="text-4xl font-[500px] text-gray-900 mb-2">
                        Completed
                    </h1>

                </div>

            </div>

            <BookGrid
                userId = {user?.user?._id ?? ""}
                title=""
                books={books.books}
            />

        </SidebarLayout>
    )
}


