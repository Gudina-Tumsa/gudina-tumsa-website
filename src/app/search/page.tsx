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
            <p className="">Search result</p>
            <div className="py-4 px-8 space-x-10 w-full ">
                <BookGrid

                    userId = {user?.user?._id ?? ""}
                    title=""
                    books={books.books}
                />
            </div>

        </SidebarLayout>
    )
}


