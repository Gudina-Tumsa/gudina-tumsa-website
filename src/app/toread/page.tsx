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

    return (
        <SidebarLayout>
<div className="h-screen ">
    <SearchBar />
    <div className="flex flex-row justify-between mt-[5%]">
        <div className="mb-2">
            <h1 className="dark:text-white text-4xl font-[500px] text-gray-900 mb-2">
                To read
            </h1>

        </div>

    </div>

    <BookGrid
        title=""
        userId = {user?.user?._id ?? ""}
        books={books.books}
        showCurrentlyReading={true}
    />

</div>



        </SidebarLayout>
    )
}


