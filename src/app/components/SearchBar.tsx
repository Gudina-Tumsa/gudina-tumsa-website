/* eslint-disable  */
// @ts-nocheck

"use client"
import {useState} from "react";
import { Search } from "lucide-react";
import { Button } from "./../../components/ui/button";
import {getBooks} from "@/lib/api/book";
import {getBooksSuccess} from "@/app/store/features/bookSlice";
import {useAppDispatch} from "@/lib/hooks";
import {useRouter} from "next/navigation";
import Spinner from "@/components/ui/spinnter";



const SearchBar = () => {
    let [values , setValues] = useState("");
    let [loading , setLoading] = useState(false);
    const dispatch = useAppDispatch();
    const router = useRouter();
    const wait3sec = () => {
        return new Promise(resolve => setTimeout(resolve, 3000));
    };
    const callGetBooks = async () => {
        setLoading(true);
        try {
            const result = await getBooks({search: values});
            dispatch(getBooksSuccess(result));
            await wait3sec();
            router.push(`/search`);
        } catch (error) {
            console.error("Error fetching books:", error);
        } finally {
            setLoading(false);
        }
    }
    return (
        <>
            {

                    <div className="flex items-center space-x-4 mb-10 mt-4 w-full max-w-4xl mx-auto">
                        <div className="flex-1 relative">
                            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-6 w-6 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search by book title, author, publisher & ISBN"
                                className="w-full pl-14 pr-6 py-4 text-xl border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                onChange={(e) => setValues(e.target.value)}
                            />
                        </div>
                        <Button
                            onClick={callGetBooks}
                            className={`py-4 px-8 text-xl bg-blue-600 hover:bg-blue-700 transition-colors ${loading ? "disabled" : ""}`}>
                            { loading ? "Loading..." : "Search"}
                        </Button>
                    </div>

            }
        </>
    );
};


export default SearchBar;
