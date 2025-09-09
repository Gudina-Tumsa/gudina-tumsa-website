/* eslint-disable  */
// @ts-nocheck

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
import {getCompletedBooks, getReadingBooks, getTodaysSelection} from "@/lib/api/book";
import {getBooksSuccess} from "@/app/store/features/bookSlice";
import {BookListResponse} from "@/types/book";

export default function Page() {

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
    const books = useSelector((state: RootState) => state.book)
    const user = useSelector((state: RootState) => state.user)

    const dispatch = useAppDispatch();
    useEffect(() => {

        const fetchFinishedbooks = async () => {
            try {
                console.log("string here")
                const  token = user?.user?.token
                console.log("the token: ", token)
                const response = await getCompletedBooks(token ?? "")

                dispatch(getBooksSuccess(response))
            } catch (err: unknown) {
                const bookListResponse: BookListResponse = {
                    data : {
                        books: [],
                        total: 0,
                        page: 0,
                        limit: 0,
                    }
                }
                dispatch(getBooksSuccess(bookListResponse))
                console.error("failed to fetch books:", err)
            }
        }

        fetchFinishedbooks()
    }, [dispatch]);

    return (
        <SidebarLayout>
<div className={"h-screen"}>
    <SearchBar />
    <div className="flex flex-row justify-between">
        <div className="mb-8 mt-[5%]">
            <h1 className="dark:text-white text-4xl font-[500px] text-gray-900 mb-2">
                Completed
            </h1>

        </div>

    </div>

    <BookGrid
        userId = {user?.user?._id ?? ""}
        title=""
        books={books.books}
    />
</div>


        </SidebarLayout>
    )
}


