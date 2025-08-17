/* eslint-disable  */
// @ts-nocheck


"use client"
import SearchBar from "@/app/components/SearchBar";

import SidebarLayout from "@/components/layout/sidebar/sidebar-layout";
import BookGrid from "@/app/components/BookGrid";
import {useSelector} from "react-redux";
import {RootState} from "@/app/store/store";
import {useAppDispatch} from "@/lib/hooks";
import {useEffect, useState} from "react";
import { useParams } from "next/navigation";
import {getBooks, GetBooksRequest} from "@/lib/api/book";
import { BookListResponse } from '@/types/book';
import {getBooksSuccess} from "@/app/store/features/bookSlice";

export default function Page() {


    const books = useSelector((state: RootState) => state.book)
    const [category, setCategory] = useState("");
    const user = useSelector((state: RootState) => state.user)
    const params = useParams();
    const categoryId = params?.id as string;

    const dispatch = useAppDispatch();
    useEffect(() => {

        const fetchBooks = async () => {
            try {
                const bookRequest:GetBooksRequest =  {
                    page : 1,
                    limit: 20
                }
                const response = await getBooks(bookRequest)

                let filteredBooks = response?.data?.books.filter((book , index)=>(  book.category._id != categoryId))

                let bookListResponse:BookListResponse =  {
                    data : {
                        books : filteredBooks,
                        total : filteredBooks.length,
                        page : response?.data?.page,
                        limit: response?.data?.limit,

                    }
                }
                dispatch(getBooksSuccess(bookListResponse))
            } catch (err: unknown) {
                console.error("failed to fetch books:", err)
            }
        }

        fetchBooks()
    }, [dispatch]);

    return (
        <SidebarLayout>

            <SearchBar />
            <div className="flex flex-row justify-between">
                <div className="mb-8 mt-[5%]">
                    <h1 className="text-4xl font-[500px] text-gray-900 mb-2">
                        {category}
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


