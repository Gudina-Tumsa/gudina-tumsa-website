"use client";

import { useState } from "react";
import { Search, Loader2 } from "lucide-react";
import { getBooks } from "@/lib/api/book";
import { getBooksSuccess } from "@/app/store/features/bookSlice";
import { useAppDispatch } from "@/lib/hooks";
import { useRouter } from "next/navigation";

interface SearchBarProps {
    className?: string;
}

const SearchBar = ({ className = "w-full max-w-md mb-6" }: SearchBarProps) => {
    const [value, setValue] = useState("");
    const [loading, setLoading] = useState(false);
    const dispatch = useAppDispatch();
    const router = useRouter();

    const callGetBooks = async () => {
        if (!value.trim() || loading) return;

        setLoading(true);
        try {
            const result = await getBooks({ search: value });
            dispatch(getBooksSuccess(result));
            router.push(`/search`);
        } catch (error) {
            console.error("Error fetching books:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={`relative ${className}`}>
            {loading ? (
                <Loader2 className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[#B4AC9C] animate-spin" />
            ) : (
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[#B4AC9C]" />
            )}
            <input
                type="text"
                placeholder="Search for a book, author"
                className="w-full h-11 pl-11 pr-4 rounded-full border border-[#E8E1D3] dark:border-gray-600 bg-white dark:bg-gray-700 text-sm text-[#1C1B19] dark:text-white outline-none focus:ring-2 focus:ring-[#D9A66B]/40 dark:focus:ring-gray-500 placeholder:text-[#B4AC9C] disabled:opacity-70"
                onChange={(e) => setValue(e.target.value)}
                value={value}
                disabled={loading}
                onKeyDown={(e) => {
                    if (e.key === "Enter") callGetBooks();
                }}
            />
        </div>
    );
};

export default SearchBar;
