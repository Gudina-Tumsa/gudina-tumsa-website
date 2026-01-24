/* eslint-disable  */
// @ts-nocheck

"use client";
import { useState } from "react";
import { Search } from "lucide-react";
import { Button } from "./../../components/ui/button";
import { getBooks } from "@/lib/api/book";
import { getBooksSuccess } from "@/app/store/features/bookSlice";
import { useAppDispatch } from "@/lib/hooks";
import { useRouter } from "next/navigation";
import Spinner from "@/components/ui/spinnter";

const SearchBar = () => {
    let [values, setValues] = useState("");
    let [loading, setLoading] = useState(false);
    const dispatch = useAppDispatch();
    const router = useRouter();

    const wait3sec = () => {
        return new Promise((resolve) => setTimeout(resolve, 3000));
    };

    const callGetBooks = async () => {
        setLoading(true);
        try {
            const result = await getBooks({ search: values });
            dispatch(getBooksSuccess(result));
            await wait3sec();
            router.push(`/search`);
        } catch (error) {
            console.error("Error fetching books:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full mx-auto mt-6 mb-12">
            <div className="flex h-12 items-center bg-white border border-gray-300 rounded-lg shadow-sm overflow-hidden focus-within:ring-2 focus-within:ring-blue-500">
                <Search className="ml-4 h-5 w-5 text-gray-400" />

                <input
                    type="text"
                    placeholder="Search for a book, author"
                    className="flex-1 px-4 text-black outline-none placeholder-gray-400"
                    onChange={(e) => setValues(e.target.value)}
                    value={values}
                    onKeyDown={(e) => {
                        if (e.key === "Enter" && values.trim() && !loading) {
                            callGetBooks();
                        }
                    }}
                />

                <Button
                    onClick={callGetBooks}
                    disabled={loading || !values.trim()}
                    className="h-full px-6 rounded-none bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors disabled:opacity-50 flex items-center justify-center"
                    aria-label="Search"
                >
                    {loading ? (
                        <div className="flex items-center space-x-2">
                            <Spinner className="h-4 w-4" />
                            <span>Searching...</span>
                        </div>
                    ) : (
                        <Search className="h-5 w-5" />
                    )}
                </Button>
            </div>
        </div>
    );
};

export default SearchBar;
