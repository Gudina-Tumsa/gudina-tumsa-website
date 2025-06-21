"use client"
import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';

const HomePageCategory = () => {
    const [activeCategory, setActiveCategory] = useState('Architecture');

    const categories = [
        { name: 'Architecture', icon: '🏛️', color: 'bg-yellow-100 text-yellow-800' },
        { name: 'Art', icon: '🎨', color: 'bg-orange-100 text-orange-800' },
        { name: 'Philosophy', icon: '🤔', color: 'bg-purple-100 text-purple-800' },
        { name: 'History', icon: '📚', color: 'bg-purple-100 text-purple-800' },
        { name: 'Economics', icon: '📊', color: 'bg-red-100 text-red-800' },
        { name: 'Business', icon: '💼', color: 'bg-red-100 text-red-800' },
        { name: 'Computer Science', icon: '💻', color: 'bg-blue-100 text-blue-800' },
        { name: 'Literature', icon: '📖', color: 'bg-yellow-100 text-yellow-800' },
        { name: 'Social Sciences', icon: '🏛️', color: 'bg-pink-100 text-pink-800' },
    ];

    const books = [
        {
            id: 1,
            title: 'The Interior Design Reference & Specification Book',
            author: 'Chris Grimley',
            year: '2018',
            cover: 'bg-yellow-400',
            coverText: 'Interior Design',
            subtitle: 'EVERYTHING INTERIOR DESIGNERS NEED TO KNOW EVERY DAY'
        },
        {
            id: 2,
            title: 'The Sources of Modern Architecture and Design',
            author: 'Nikolaus Pevsner',
            year: '2024',
            cover: 'bg-gray-100',
            coverText: 'World of Art',
            isVertical: true
        },
        {
            id: 3,
            title: '25 Concepts in Modern Architecture',
            author: 'Stephanie Travis',
            year: '2021',
            cover: 'bg-pink-500',
            coverText: '25 CONCEPTS IN MODERN ARCHITECTURE',
            subtitle: 'A GUIDE FOR VISUAL THINKERS'
        },
        {
            id: 4,
            title: 'Restorative Cities',
            author: 'Jenny Roe',
            year: '2021',
            cover: 'bg-green-100',
            coverText: 'RESTORATIVE CITIES',
            isIllustrated: true
        },
        {
            id: 5,
            title: 'Architecture in the Age of Artificial Intelligence',
            author: 'Neil Leach',
            year: '2021',
            cover: 'bg-gray-800',
            coverText: 'Architecture',
            subtitle: 'AN INTRODUCTION TO AI FOR THE ARCHITECTURAL PROFESSION'
        },
        {
            id: 6,
            title: 'Biophilic Design',
            author: 'Stephen R. Kellert',
            year: '2011',
            cover: 'bg-green-800',
            coverText: 'Biophilic Design',
            isNature: true
        }
    ];

    const publishers = [
        'CAMBRIDGE',
        'Taylor & Francis Group',
        'ELSEVIER',
        'STANFORD UNIVERSITY PRESS',
        'WILEY',
        'Harvard University Press'
    ];

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <div className="text-center py-16 px-4">
                <h1 className="text-5xl md:text-6xl font-bold text-black mb-4">
                    One million textbooks.
                </h1>
                <h2 className="text-4xl md:text-5xl font-bold text-blue-600 italic">
                    One membership.
                </h2>
            </div>

            {/* Category Tabs */}
            <div className="px-4 mb-8">
                <div className="flex flex-wrap justify-center gap-2 mb-12">
                    {categories.map((category) => (
                        <button
                            key={category.name}
                            onClick={() => setActiveCategory(category.name)}
                            className={`
                px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 hover:scale-105
                ${activeCategory === category.name
                                ? category.color + ' shadow-lg'
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }
              `}
                        >
                            <span className="mr-2">{category.icon}</span>
                            {category.name}
                        </button>
                    ))}
                </div>

                {/* Books Grid */}
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
                        {books.map((book) => (
                            <div key={book.id} className="group cursor-pointer">
                                {/* Book Cover */}
                                <div className={`
                  ${book.cover} rounded-lg p-4 mb-3 aspect-[3/4] flex flex-col justify-between
                  transform transition-all duration-300 group-hover:scale-105 group-hover:shadow-xl
                  ${book.id === 1 ? 'text-black' : ''}
                  ${book.id === 3 ? 'text-white' : ''}
                  ${book.id === 5 ? 'text-white' : ''}
                  ${book.id === 6 ? 'text-white' : ''}
                  relative overflow-hidden
                `}>
                                    {book.id === 1 && (
                                        <>
                                            <div>
                                                <h3 className="font-bold text-lg mb-2">{book.coverText}</h3>
                                                <div className="w-12 h-12 border-2 border-black rounded mb-2"></div>
                                            </div>
                                            <div>
                                                <p className="text-xs font-medium">{book.subtitle}</p>
                                            </div>
                                        </>
                                    )}
                                    {book.id === 2 && (
                                        <div className="bg-white h-full rounded flex items-center justify-center">
                                            <div className="text-center text-gray-800">
                                                <p className="font-bold text-sm mb-2">{book.coverText}</p>
                                                <div className="w-full h-32 bg-gray-200 rounded mb-2"></div>
                                            </div>
                                        </div>
                                    )}
                                    {book.id === 3 && (
                                        <>
                                            <div>
                                                <h3 className="font-bold text-sm leading-tight mb-4">{book.coverText}</h3>
                                            </div>
                                            <div>
                                                <p className="text-xs">{book.subtitle}</p>
                                            </div>
                                        </>
                                    )}
                                    {book.id === 4 && (
                                        <div className="text-center text-gray-800">
                                            <h3 className="font-bold text-lg mb-2">{book.coverText}</h3>
                                            <div className="w-full h-24 bg-green-200 rounded mb-2 flex items-center justify-center">
                                                <div className="text-xs">🏙️ City Illustration</div>
                                            </div>
                                        </div>
                                    )}
                                    {book.id === 5 && (
                                        <>
                                            <div>
                                                <h3 className="font-bold text-sm mb-2">{book.coverText}</h3>
                                            </div>
                                            <div>
                                                <div className="w-full h-16 bg-gray-600 rounded mb-2"></div>
                                                <p className="text-xs">{book.subtitle}</p>
                                            </div>
                                        </>
                                    )}
                                    {book.id === 6 && (
                                        <div className="relative h-full">
                                            <div className="absolute inset-0 bg-gradient-to-b from-green-600 to-green-900"></div>
                                            <div className="relative z-10 h-full flex flex-col justify-between">
                                                <div></div>
                                                <div className="text-center">
                                                    <h3 className="font-bold text-lg">{book.coverText}</h3>
                                                    <div className="text-xs mt-2">🌿 Nature Pattern</div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Book Details */}
                                <div className="space-y-1">
                                    <h4 className="font-semibold text-sm text-gray-900 leading-tight group-hover:text-blue-600 transition-colors">
                                        {book.title}
                                    </h4>
                                    <p className="text-sm text-gray-600">{book.author}</p>
                                    <p className="text-sm text-gray-500">{book.year}</p>
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