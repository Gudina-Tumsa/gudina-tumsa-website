/* eslint-disable  */
// @ts-nocheck

"use client"
import { Search } from "lucide-react";

import ProfileDropdown from "@/app/components/ProfileDropdown";
const SearchBar = () => {
    return (
        <div className="flex items-center space-x-4 mb-8 mt-[5px]">
            {/*<div className="flex items-center bg-gray-100 rounded-md">*/}
            {/*    <button className="flex items-center px-4 py-2 text-sm text-gray-600 hover:bg-gray-200 rounded-l-md border-r border-gray-200">*/}
            {/*        Title Search*/}
            {/*        <ChevronDown className="ml-2 h-4 w-4" />*/}
            {/*    </button>*/}
            {/*</div>*/}
            <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                    type="text"
                    placeholder="Search by book title, author, publisher & ISBN"
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
            </div>
            {/*<ProfileDropdown/>*/}
        </div>
    );
};






export default SearchBar;