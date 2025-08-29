/* eslint-disable  */
// @ts-nocheck

import { MoreHorizontal } from "lucide-react";
import {createUserBookInteraction} from "@/lib/api/userbookinteraction";

import {useRouter} from "next/navigation";

interface BookCardProps {
    id: string;
    userId: string;
    title: string;
    year: number;
    coverImage: string;
    writer: string;
    isCurrentlyReading?: boolean;
}

const BookCard = ({ id, userId, title, year, coverImage, writer, isCurrentlyReading }: BookCardProps) => {
    const router = useRouter();

    function readBookNavigate(id: string) {
        router.push(`/bookdetail/${id}`);
    }

    return (
        <div
            className="dark:text-white relative group transition-all duration-300 hover:bg-gray-100 dark:hover:bg-gray-500 rounded-lg overflow-hidden cursor-pointer
                       w-64 p-4"
            onClick={() => readBookNavigate(id)}
        >
            <div className="rounded-lg overflow-hidden relative aspect-[3/4] bg-gray-100">
                <img
                    src={coverImage}
                    alt={title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />

                {isCurrentlyReading && (
                    <div className="absolute top-3 right-3 z-20">
                        <button className="p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                            <MoreHorizontal className="h-4 w-4 text-gray-600" />
                        </button>
                    </div>
                )}
            </div>

            <div className="mt-4 px-1">
                <h3 className="dark:text-white text-sm font-semibold text-gray-900 line-clamp-2">{title}</h3>
                <p className="dark:text-white text-xs text-gray-600 mt-1 truncate">{writer}</p>
                <p className="dark:text-white text-[10px] sm:text-xs text-gray-400 mt-0.5">{year}</p>
            </div>
        </div>
    );
};

export default BookCard;
