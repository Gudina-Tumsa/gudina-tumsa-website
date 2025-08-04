/* eslint-disable  */
// @ts-nocheck

'use client'
import BookCover from "@/components/elements/bookdetail/BookCover";
import BookDetails from "@/components/elements/bookdetail/BookDetails";
import BookActions from "@/components/elements/bookdetail/BookActions";
import BookTabs from "@/components/elements/bookdetail/BookTabs";
import SidebarLayout from "@/components/layout/sidebar/sidebar-layout";

import { useParams } from 'next/navigation';
import {useEffect, useState} from "react";
import {BookData} from "@/types/book";
import {RootState} from "@/app/store/store";
import {useSelector} from "react-redux";
import {UserResponse} from "@/types/auth";

const Index = () => {

    const params = useParams();
    const id = params?.id as string;
    const books = useSelector((state: RootState) => state.book)
    const user = useSelector((state: RootState) => state.user)
    const [currentbook , setCurrentBook] = useState<BookData | null>(null)
    useEffect(() => {
        if (!id || !books) return

        const foundBook = books?.books?.data.books.find(bookData  => bookData._id === id)
        setCurrentBook(foundBook || null)
    }, [id, books])


    return (
        <SidebarLayout>
            <div className="min-h-screen mt-[6%]">
                {/* Header with subscribe notification */}
                <div className="">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {currentbook ? <div className="lg:col-span-1">
                            <BookCover bookData={currentbook}/>
                        </div> : ""}


                        {currentbook ?
                            <div className="lg:col-span-2">
                            <BookDetails bookData={currentbook} />
                            <BookActions bookData={currentbook}/>
                            <div className="mt-8">
                                <BookTabs bookData={currentbook} userData={user?.user} />
                            </div>
                        </div> : "" }
                    </div>
                </div>
            </div>
        </SidebarLayout>

    );
};

export default Index;

