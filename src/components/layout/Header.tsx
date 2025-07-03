"use client"
import React from 'react';
import { useState } from "react"
import { ChevronDown, Menu, X } from "lucide-react"
import { Globe } from 'lucide-react';
import Link from "next/link"
import {useTranslations} from 'next-intl'
import {Locale, locales} from "@/i18n/config";
import {setUserLocale} from "@/services/locale";

const languageMap: Record<string, Locale> = {
    English: 'en',
    Amharic: 'am',
    Oromiffa: 'om',
};

function LanguageSelector() {
    const [open, setOpen] = useState(false)
    const toggleDropdown = () => setOpen(!open)

    const selectLanguage = (lang: string) => {
        const locale = languageMap[lang]
        setUserLocale(locale)
    }

    return (
        <div className="relative inline-block text-left">
            <button
                onClick={toggleDropdown}
                className="p-2 flex items-center gap-1"
                aria-label="Language selector"
            >
                <Globe className="w-6 h-6 text-gray-700" />
                <ChevronDown className="w-6 h-6 text-black" />
            </button>

            {open && (
                <div className="absolute right-0 mt-2 w-[200px] bg-white border border-gray-200 rounded-md shadow-lg z-10">
                    <div className={"py-4 px-4"}>
                        <p className={"text-black"}>Website Language</p>
                        {["English", "Amharic", "Oromiffa"].map((lang) => (
                            <button
                                key={lang}
                                onClick={() => selectLanguage(lang)}
                                className="w-full text-left px-4 py-2 text-black text-sm hover:bg-gray-100"
                            >
                                {lang}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}

const Header = () => {
    const t = useTranslations('header')
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [showNotification, setShowNotification] = useState(true)

    // Example event data - replace with your actual event data
    const currentEvent = {
        title: "Special Event: Annual Conference 2024",
        link: "/events/conference-2024",
        date: "June 15-17, 2024"
    }

    return (
        <>
            {/* Notification Banner */}
            {showNotification && (
                <div className="bg-blue-600 text-white">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-2 flex justify-between items-center">
                        <div className="flex items-center">
                            <span className="font-medium mr-2">📢</span>
                            <Link
                                href={currentEvent.link}
                                className="hover:underline"
                            >
                                {currentEvent.title} - {currentEvent.date}
                            </Link>
                        </div>
                        <button
                            onClick={() => setShowNotification(false)}
                            className="p-1 rounded-full hover:bg-blue-700"
                            aria-label="Close notification"
                        >
                            <X className="h-4 w-4" />
                        </button>
                    </div>
                </div>
            )}

            {/* Main Header */}
            <header className="bg-white border-b border-gray-200 py-4">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between">
                        {/* Logo */}
                        <div className="flex items-center">
                            <h1 className="text-2xl font-bold text-black">{t('logo')}</h1>
                        </div>

                        {/* Desktop Navigation */}
                        <nav className="hidden md:flex items-center space-x-8">
                            {/*<Link*/}
                            {/*    href="/login"*/}
                            {/*    className="font-bold text-gray-700 hover:text-gray-900 transition-colors"*/}
                            {/*>*/}
                            {/*    Login*/}
                            {/*</Link>*/}
                            <Link
                                href="/home"
                                className="font-bold text-gray-700 hover:text-gray-900 transition-colors"
                            >
                                Get Started
                            </Link>
                            <div className="flex items-center space-x-4">
                                <Link
                                    href="/signup"
                                    className="border-[0.5px] border-black text-black px-6 py-2 rounded-md transition-transform duration-200 hover:-translate-y-1"
                                >
                                    Sign up
                                </Link>
                                <LanguageSelector/>
                            </div>
                        </nav>

                        {/* Mobile menu button */}
                        <div className="md:hidden flex items-center">
                            <LanguageSelector/>
                            <button
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                className="ml-4 p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none"
                                aria-label="Toggle menu"
                            >
                                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                            </button>
                        </div>
                    </div>

                    {/* Mobile Navigation */}
                    {mobileMenuOpen && (
                        <div className="md:hidden mt-4 pb-4 space-y-4 ">
                            <Link
                                href="/home"
                                className="block font-bold text-gray-700 hover:text-gray-900 transition-colors py-2"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Get Started
                            </Link>
                            {/*<Link*/}
                            {/*    href="/login"*/}
                            {/*    className="block font-bold text-gray-700 hover:text-gray-900 transition-colors py-2"*/}
                            {/*    onClick={() => setMobileMenuOpen(false)}*/}
                            {/*>*/}
                            {/*    Login*/}
                            {/*</Link>*/}
                            <Link
                                href="/signup"
                                className="block border-[0.5px] border-black text-black px-6 py-2 rounded-md w-max"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Sign up
                            </Link>
                        </div>
                    )}
                </div>
            </header>
        </>
    );
};

export default Header;