/* eslint-disable  */
// @ts-nocheck

import {useRouter} from "next/navigation";
import {Star, Clock, Headphones} from "lucide-react";

interface BookCardProps {
    id: string;
    userId: string;
    title: string;
    year: number;
    coverImage: string;
    writer: string;
    isCurrentlyReading?: boolean;
    category?: string;
    rating?: number;
    pageCount?: number;
    hasAudio?: boolean;
}

const CATEGORY_PALETTE = [
    "bg-teal-100 text-teal-700 dark:bg-teal-900/40 dark:text-teal-300",
    "bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300",
    "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",
    "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300",
    "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300",
    "bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-300",
    "bg-fuchsia-100 text-fuchsia-700 dark:bg-fuchsia-900/40 dark:text-fuchsia-300",
    "bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300",
];

const BACKDROP_PALETTE = [
    "bg-teal-50 dark:bg-teal-950/30",
    "bg-rose-50 dark:bg-rose-950/30",
    "bg-amber-50 dark:bg-amber-950/30",
    "bg-indigo-50 dark:bg-indigo-950/30",
    "bg-emerald-50 dark:bg-emerald-950/30",
    "bg-sky-50 dark:bg-sky-950/30",
    "bg-fuchsia-50 dark:bg-fuchsia-950/30",
    "bg-orange-50 dark:bg-orange-950/30",
];

function paletteIndex(key: string) {
    let hash = 0;
    for (let i = 0; i < key.length; i++) hash = (hash * 31 + key.charCodeAt(i)) >>> 0;
    return hash % CATEGORY_PALETTE.length;
}

const BookCard = ({
    id,
    userId,
    title,
    year,
    coverImage,
    writer,
    isCurrentlyReading,
    category,
    rating,
    pageCount,
    hasAudio,
}: BookCardProps) => {
    const router = useRouter();

    function readBookNavigate(id: string) {
        router.push(`/bookdetail/${id}`);
    }

    const idx = paletteIndex(category || title || "book");
    const readMinutes = pageCount ? Math.max(5, Math.round(pageCount * 1.2)) : null;

    return (
        <div
            className="group flex flex-col cursor-pointer"
            onClick={() => readBookNavigate(id)}
        >
            <div
                className={`relative aspect-[3/4] rounded-2xl overflow-hidden ${BACKDROP_PALETTE[idx]} ring-1 ring-black/5 dark:ring-white/10 shadow-sm transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-1`}
            >
                <img
                    src={coverImage}
                    alt={title}
                    className="absolute inset-0 h-full w-full scale-[0.92] rounded-xl object-cover shadow-md transition-transform duration-300 group-hover:scale-[0.97]"
                />

                {category && (
                    <span
                        className={`absolute top-2.5 left-2.5 rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide shadow-sm ${CATEGORY_PALETTE[idx]}`}
                    >
                        {category}
                    </span>
                )}

                {hasAudio && (
                    <span className="absolute top-2.5 right-2.5 flex h-6 w-6 items-center justify-center rounded-full bg-white/90 text-[#1C1B19] shadow-sm dark:bg-gray-900/85 dark:text-white">
                        <Headphones className="h-3.5 w-3.5" />
                    </span>
                )}
            </div>

            <div className="mt-3">
                <h3 className="font-semibold text-[#1C1B19] dark:text-white line-clamp-2 leading-snug">{title}</h3>
                <p className="text-sm text-[#8A8374] dark:text-gray-400 truncate mt-0.5">{writer}</p>

                {isCurrentlyReading ? (
                    <span className="text-sm font-medium text-[#9407F2] dark:text-[#C084FC] underline mt-1.5 inline-block">
                        Continue reading
                    </span>
                ) : (
                    <div className="flex items-center gap-3 mt-1.5 text-xs text-[#B4AC9C] dark:text-gray-500">
                        {!!rating && (
                            <span className="flex items-center gap-1 text-[#8A8374] dark:text-gray-400">
                                <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                                {rating.toFixed(1)}
                            </span>
                        )}
                        {readMinutes ? (
                            <span className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {readMinutes} min
                            </span>
                        ) : (
                            <span>{year}</span>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default BookCard;
