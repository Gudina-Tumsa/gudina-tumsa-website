"use client"
import React from 'react';
import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { Globe } from 'lucide-react';


function LanguageSelector() {
    const [open, setOpen] = useState(false)
    const [selected, setSelected] = useState("English")
    console.log(selected)
    const toggleDropdown = () => setOpen(!open)

    const selectLanguage = (lang: string) => {
        setSelected(lang)
        setOpen(false)
    }

    return (
        <div className="relative inline-block text-left">
            <button
                onClick={toggleDropdown}
                className="p-2 flex items-center gap-1"
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
                                className="w-full text-left px-4 py-2 text-black text-sm"
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
    return (
        //px-[3%]
        <header className="bg-white border-b border-gray-200  py-4">
            <div className={"w-[60%] mx-auto "}>
                <div className=" flex items-center justify-between">
                    <div className="flex items-center">
                        <h1 className="text-2xl font-bold text-black">GTL</h1>
                    </div>

                    <nav className="hidden md:flex items-center space-x-8">
                        <a href="#" className="font-bold text-gray-700 hover:text-gray-900 transition-colors">Browse</a>
                        <a href="#" className="font-bold text-gray-700 hover:text-gray-900 transition-colors">Institutions</a>
                        <a href="#" className="font-bold text-gray-700 hover:text-gray-900 transition-colors">Learners</a>
                        <a href="#" className="font-bold text-gray-700 hover:text-gray-900 transition-colors">Login</a>
                        <div className="flex items-center space-x-4">
                            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md">
                                Sign up to read
                            </button>


                            <LanguageSelector/>
                        </div>
                    </nav>


                </div>
            </div>

        </header>
    );
};

export default Header;