/* eslint-disable  */
// @ts-nocheck

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
            className="group flex flex-col cursor-pointer"
            onClick={() => readBookNavigate(id)}
        >
            <div className="rounded-2xl overflow-hidden relative aspect-[3/4] bg-gray-100 dark:bg-gray-700 shadow-sm">
                <img
                    src={coverImage}
                    alt={title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
            </div>

            <div className="mt-3">
                <h3 className="font-semibold text-[#1C1B19] dark:text-white line-clamp-2">{title}</h3>
                <p className="text-sm text-[#8A8374] dark:text-gray-400 truncate mt-0.5">{writer}</p>
                {isCurrentlyReading ? (
                    <span className="text-sm font-medium text-[#C15A34] underline mt-1 inline-block">
                        Continue reading
                    </span>
                ) : (
                    <p className="text-xs text-[#B4AC9C] mt-1">{year}</p>
                )}
            </div>
        </div>
    );
};

export default BookCard;
