"use client"
import React, {useState, useEffect} from 'react';
import {useAppDispatch} from "@/lib/hooks";
import {getCategories} from "@/lib/api/category";
import {getCategoriesSuccess} from "@/app/store/features/categorySlice";
import {useSelector} from "react-redux";
import {RootState} from "@/app/store/store";
import {getBooks, GetBooksRequest} from "@/lib/api/book";
import {getBooksSuccess} from "@/app/store/features/bookSlice";
import {BookData} from "@/types/book";
import {useRouter} from "next/navigation";

const HomePageCategory = () => {
    const [activeCategory, setActiveCategory] = useState('Academic and Research');
    const categories = useSelector((state: RootState) => state.category);
    const books = useSelector((state: RootState) => state.book)
    const router = useRouter();
    const dispatch = useAppDispatch();
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await getCategories({page: 1, limit: 20});
                dispatch(getCategoriesSuccess(response));
            } catch (err: unknown) {
                console.error("Failed to fetch categories:", err);
            }
        };

        const fetchBooks = async () => {
            try {
                const bookRequest: GetBooksRequest = {
                    page: 1,
                    limit: 20
                }
                const response = await getBooks(bookRequest)
                dispatch(getBooksSuccess(response))
            } catch (err: unknown) {
                console.error("failed to fetch books:", err)
            }
        }

        fetchCategories();
        fetchBooks()
    }, [dispatch]);

    function readBookNavigate(id: string) {

        router.push(`/bookdetail/${id}`);

    }

    return (
        <div className="bg-[#F2F2F2]">
            {/* Hero Section */}
            <div className="text-center py-8 sm:py-12 md:py-16 px-4">
                <h1 className="font-instrument regula sm:text-4xl md:text-5xl lg:text-6xl font-bold text-black mb-1 sm:mb-1 ">
                    A world of legacy resources.
                </h1>
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#9407F2] font-instrument regula mb-2 sm:mb-2">
                    One membership.
                </h2>
                <p className="justify-center text-sm sm:text-2xl md:text-2xl text-gray-600  text-center block ">
                    {/*What are you interested in?*/}
                    What will you discover today?
                </p>
            </div>

            {/* Category Tabs */}
            <div className="px-4 sm:px-6 mb-6 sm:mb-8">
                <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8 sm:mb-12">
                    {categories?.categories?.data.categories.map((category) => (
                        <button
                            key={category.name}
                            onClick={() => setActiveCategory(category.name)}
                            className={`
                                px-3 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-medium 
                                transition-all duration-200 hover:scale-105
                                ${activeCategory === category.name
                                ? 'bg-blue-100 text-[#9407F2] shadow-md'
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }
                            `}
                        >
                            <div className="flex flex-row items-center">
                                {category.icon && (
                                    <span className="mr-1 sm:mr-2 text-sm sm:text-base">
                                        {category.icon}
                                    </span>
                                )}
                                {category.name}
                            </div>
                        </button>
                    ))}
                </div>

                {/* Books Grid */}
                <div className="max-w-7xl mx-auto">
                    <div
                        className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4 md:gap-6 mb-6 sm:mb-8">
                        {books?.books?.data.books.map((book: BookData) => (
                            book.category === activeCategory ?
                            <div key={book._id} className="group cursor-pointer" onClick={() => {
                                readBookNavigate(book._id)
                            }}>
                                {/* Book Cover */}
                                <div
                                    className={`
    ${book.coverImageUrl ? 'bg-contain bg-center bg-no-repeat border border-gray-200' : 'bg-gray-200'} 
    rounded-lg p-3 sm:p-4 mb-2 sm:mb-3 aspect-[3/4] 
    flex flex-col justify-between
    transform transition-all duration-300 
    group-hover:scale-105 group-hover:shadow-lg
    relative overflow-hidden
  `}
                                    style={book.coverImageUrl ? {
                                        backgroundImage: `url(${process.env.NEXT_PUBLIC_BASE_URL + book.coverImageUrl})`,
                                        backgroundColor: 'white'
                                    } : {}}
                                >
                                </div>


                                <div className="space-y-0.5 sm:space-y-1">
                                    <h4 className="font-semibold text-xs sm:text-sm text-gray-900 leading-tight group-hover:text-blue-600 transition-colors line-clamp-2">
                                        {book.title}
                                    </h4>
                                    <p className="text-xs sm:text-sm text-gray-600 line-clamp-1">{book.author}</p>
                                    <p className="text-xs sm:text-sm text-gray-500">{book.publicationYear}</p>
                                </div>
                            </div> : ""
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePageCategory;
