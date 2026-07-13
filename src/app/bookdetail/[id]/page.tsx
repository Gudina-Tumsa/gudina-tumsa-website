/* eslint-disable  */
// @ts-nocheck

'use client'
import BookCover from "@/components/elements/bookdetail/BookCover";
import BookDetails from "@/components/elements/bookdetail/BookDetails";
import BookActions from "@/components/elements/bookdetail/BookActions";
import BookTabs from "@/components/elements/bookdetail/BookTabs";
import SidebarLayout from "@/components/layout/sidebar/sidebar-layout";
import {getBookById} from "@/lib/api/book";
import { useParams } from 'next/navigation';
import {useEffect, useState} from "react";
import {BookData} from "@/types/book";
import {RootState} from "@/app/store/store";
import {useSelector} from "react-redux";

const Index = () => {

    const params = useParams();
    const id = params?.id as string;
    const books = useSelector((state: RootState) => state.book)
    const user = useSelector((state: RootState) => state.user)
    const [currentbook , setCurrentBook] = useState<BookData | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [hasError, setHasError] = useState(false)

    useEffect(() => {
        if (!id || !books) return

        const fetchBook = async () => {
            setIsLoading(true)
            setHasError(false)
            try {
                const foundBook = await getBookById(id)
                setCurrentBook(foundBook || null)
                if (!foundBook) setHasError(true)
            } catch (error) {
                console.error("Error fetching book:", error)
                setCurrentBook(null)
                setHasError(true)
            } finally {
                setIsLoading(false)
            }
        }

        fetchBook()
    }, [id, books])


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
    return (
        <SidebarLayout>
            <div className="min-h-screen mt-[6%]">
                <div className="">
                    {isLoading && (
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-pulse">
                            <div className="lg:col-span-1">
                                <div className="aspect-[3/4] bg-gray-200 dark:bg-gray-700 rounded-lg"/>
                            </div>
                            <div className="lg:col-span-2 space-y-4">
                                <div className="h-9 w-3/4 bg-gray-200 dark:bg-gray-700 rounded"/>
                                <div className="h-5 w-1/3 bg-gray-200 dark:bg-gray-700 rounded"/>
                                <div className="h-11 w-64 bg-gray-200 dark:bg-gray-700 rounded-xl"/>
                            </div>
                        </div>
                    )}

                    {!isLoading && hasError && (
                        <div className="flex flex-col items-center justify-center py-24 text-center">
                            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                                We couldn&apos;t find this book
                            </h2>
                            <p className="text-gray-600 dark:text-gray-400">
                                It may have been removed, or the link might be incorrect.
                            </p>
                        </div>
                    )}

                    {!isLoading && !hasError && currentbook && (
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            <div className="lg:col-span-1">
                                <BookCover bookData={currentbook}/>
                            </div>

                            <div className="lg:col-span-2">
                                <BookDetails bookData={currentbook} />
                                <BookActions bookData={currentbook}/>
                                <div className="mt-8">
                                    <BookTabs bookData={currentbook} userData={user?.user} />
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </SidebarLayout>

    );
};

export default Index;

