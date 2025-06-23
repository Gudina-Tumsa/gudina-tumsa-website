"use client"
import React, {useState, useEffect} from 'react';

import {useAppDispatch} from "@/lib/hooks";

import {getCategories} from "@/lib/api/category";
import {getCategoriesSuccess} from "@/app/store/features/categorySlice";
import {useSelector} from "react-redux";
import {RootState} from "@/app/store/store";
import {getBooks} from "@/lib/api/book";
import {getBooksSuccess} from "@/app/store/features/bookSlice";
import {BookData} from "@/types/book";

const HomePageCategory = () => {
    const [activeCategory, setActiveCategory] = useState('Architecture');
    const categories = useSelector((state: RootState) => state.category);
    const books = useSelector((state: RootState) => state.book)


    const dispatch = useAppDispatch();
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await getCategories({ page: 1, limit: 20 });
                dispatch(getCategoriesSuccess(response));
                console.log(response);
            } catch (err: unknown) {
                console.error("Failed to fetch categories:", err);
            }
        };

        const fetchBooks = async () => {
            try {
                const response = await getBooks({page :1 , limit : 20})
                dispatch(getBooksSuccess(response))
                console.log(response)
            } catch ( err : unknown) {
                console.error("failed to fetch books:" , err)
            }
        }

        fetchCategories();
        fetchBooks()
    }, [dispatch]);

    return (
        <div className=" bg-white">
            {/* Hero Section */}
            <div className="text-center py-16 px-4">
                <h1 className="text-5xl md:text-6xl font-bold text-black mb-4">
                    One million textbooks.
                </h1>
                <h2 className="text-4xl md:text-5xl font-bold text-blue-600 italic">
                    One membership.
                </h2>
                <p className={"text-center text-lg mt-[2%] text-gray-600"}>What are you interested in?</p>

            </div>

            {/* Category Tabs */}
            <div className="px-4 mb-8">
                <div className="flex flex-wrap justify-center gap-2 mb-12">

                    {categories?.categories?.data.categories.map((category) => (
                        <button
                            key={category.name}
                            onClick={() => setActiveCategory(category.name)}
                            className={`
                px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 hover:scale-105
                ${activeCategory === category.name
                                ? ' shadow-lg'
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }
              `}
                        >
                            <div className={"flex flex-row"}>
                                <span className="mr-2">{category.icon}</span>
                                {category.name}

                            </div>
                        </button>
                    ))}
                </div>

                {/* Books Grid */}
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
                        {books?.books?.data.books.map((book: BookData) => (
                            <div key={book._id} className="group cursor-pointer">
                                {/* Book Cover */}
                                <div className={`
      ${book.coverImageUrl ? 'bg-cover bg-center' : 'bg-gray-200'} 
      rounded-lg p-4 mb-3 aspect-[3/4] flex flex-col justify-between
      transform transition-all duration-300 group-hover:scale-105 group-hover:shadow-xl
   
      relative overflow-hidden
    `} style={book.coverImageUrl ? { backgroundImage: `url(${'http://localhost:3000'+book.coverImageUrl})` } : {}}>


                                </div>

                                <div className="space-y-1">
                                    <h4 className="font-semibold text-sm text-gray-900 leading-tight group-hover:text-blue-600 transition-colors">
                                        {book.title}
                                    </h4>
                                    <p className="text-sm text-gray-600">{book.author}</p>
                                    <p className="text-sm text-gray-500">{book.publicationYear}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* View All Button */}
                    {/*<div className="text-center mb-16">*/}
                    {/*    <button className="inline-flex items-center px-8 py-3 border border-gray-300 rounded-full text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 group">*/}
                    {/*        <span className="font-medium mr-2">View all in Architecture</span>*/}
                    {/*        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />*/}
                    {/*    </button>*/}
                    {/*</div>*/}
                </div>
            </div>

            {/* Publishers Section */}

        </div>
    );
};
export default HomePageCategory