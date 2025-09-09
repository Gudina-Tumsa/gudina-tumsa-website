/* eslint-disable  */
// @ts-nocheck

"use client"
import Header from '@/components/layout/Header';
import {ArrowRightIcon, CalendarIcon, NewspaperIcon} from 'lucide-react';
import Footer from "@/components/layout/Footer";
import { useEffect, useState } from 'react';
import {getEvents} from "@/lib/api/events";
import {EventData} from "@/types/events";
import Link from "next/link";
import {getNews} from "@/app/data/news";
import {getReadingBooks, getTodaysSelection} from "@/lib/api/book";

const Page = () => {

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

    const [isClient, setIsClient] = useState(false);
    const [events, setEvents] = useState<EventData[]>([]);
    useEffect(() => {
        setIsClient(true);
    }, []);

    useEffect(() => {
        getEvents({page : 1 , limit : 100}).then((data)=>{
            setEvents(data?.data?.events ?? [])
        }).catch((err)=>{
            console.log(err);
        })
    }, []);

    const formatDate = (dateString: string) => {
        if (!isClient) return dateString; // Return raw string during SSR
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

    };

    const formatEventDate = (dateString : string) => {
        if (!isClient) return dateString; // Return raw string during SSR
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });

    };

    const getDay = (dateString : string) => {
        if (!isClient) return '';
        return new Date(dateString).getDate();

    };

    const getMonth = (dateString : string) => {
        if (!isClient) return '';
        return new Date(dateString).toLocaleDateString('en-US', { month: 'short' });

    };




    return (
        <div className="bg-white min-h-screen">
            <Header />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Page Header */}
                <div className="text-center mb-16">
                    <h1 className="font-instrument regula text-5xl font-bold text-gray-900 mb-4">Events</h1>
                    <p className="text-xl text-gray-600 mx-auto">
                        Stay updated with the latest library  events
                    </p>
                </div>


                <section className="mb-20">

                </section>

                <section>
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                            <CalendarIcon className="h-6 w-6 mr-2 text-[#9407F2]" />
                            Upcoming Events
                        </h2>
                              </div>

                    <div className="space-y-6">
                        {events.map((event) => {
                            const currentDate = new Date();
                            const eventDate = new Date(event.endDate);

                            if (eventDate < currentDate) {
                                return "";
                            }

                            // check
                            return(
                            <div key={event.id} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow duration-300">
                                <div className="p-6 md:flex md:items-center md:justify-between">
                                    <div className="md:flex md:items-center md:space-x-6">
                                        <div className="bg-blue-50 text-blue-600 rounded-lg p-4 text-center mb-4 md:mb-0 min-w-[100px]">
                                            <div className="text-2xl font-bold">
                                                {getDay(event.startDate)}
                                            </div>
                                            <div className="text-sm uppercase">
                                                {getMonth(event.startDate)}
                                            </div>
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-gray-900 mb-1">{event.title}</h3>
                                            <p className="text-gray-600 mb-2">{event.description}</p>
                                            <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                                                <span className="flex items-center">
                                                    <CalendarIcon className="h-4 w-4 mr-1" />

                                                    {event.startDate && (
                                                        <>
                                                            {new Date(event.startDate).toLocaleDateString('en-US', {
                                                                weekday: 'short',
                                                                month: 'short',
                                                                day: 'numeric',
                                                            })}
                                                            {event.endDate && (
                                                                <> - {new Date(event.endDate).toLocaleDateString('en-US', {
                                                                    weekday: 'short',
                                                                    month: 'short',
                                                                    day: 'numeric',
                                                                })}</>
                                                            )}
                                                        </>
                                                    )}
                                                </span>
                                                {event.location && (
                                                    <span className="flex items-center">
                                                        <ArrowRightIcon className="h-4 w-4 mr-1" />
                                                        {event.location}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        )})}
                    </div>
                </section>
            </div>

            <Footer />
        </div>
    );
};

export default Page;
