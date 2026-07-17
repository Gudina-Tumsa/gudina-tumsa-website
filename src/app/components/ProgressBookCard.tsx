"use client";

import { useRouter } from "next/navigation";
import { Check } from "lucide-react";
import { BookData } from "@/types/book";

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
    return hash % BACKDROP_PALETTE.length;
}

// pageReached can be a PDF page number, an EPUB CFI string, or "end" —
// only a numeric value paired with a known pageCount yields a percentage.
export const getReadingProgress = (book: BookData): number | null => {
    if (book.pageReached === "end") return 100;
    const page = parseInt(book.pageReached ?? "", 10);
    if (!Number.isFinite(page) || !book.pageCount) return null;
    return Math.max(0, Math.min(100, Math.round((page / book.pageCount) * 100)));
};

interface ProgressBookCardProps {
    book: BookData;
    completed?: boolean;
}

const ProgressBookCard = ({ book, completed }: ProgressBookCardProps) => {
    const router = useRouter();
    const progress = completed ? 100 : getReadingProgress(book);
    const idx = paletteIndex(book.category || book.title || "book");

    return (
        <div
            className="group flex flex-col cursor-pointer"
            onClick={() => router.push(`/bookdetail/${book._id}`)}
        >
            <div
                className={`relative aspect-[3/4] rounded-2xl overflow-hidden ${BACKDROP_PALETTE[idx]} ring-1 ring-black/5 dark:ring-white/10 shadow-sm transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-1`}
            >
                <img
                    src={`${process.env.NEXT_PUBLIC_BASE_URL}${book.coverImageUrl}`}
                    alt={book.title}
                    className="absolute inset-0 h-full w-full scale-[0.92] rounded-xl object-cover shadow-md transition-transform duration-300 group-hover:scale-[0.97]"
                    loading="lazy"
                />
                {completed && (
                    <span className="absolute top-2 right-2 flex items-center gap-1 rounded-full bg-white/90 dark:bg-gray-900/85 px-2 py-1 text-xs font-medium text-emerald-700 dark:text-emerald-400 shadow-sm">
                        <Check className="h-3 w-3" />
                        Finished
                    </span>
                )}
            </div>

            <div className="mt-3">
                <h3 className="font-semibold text-[#1C1B19] dark:text-white line-clamp-2 leading-snug">
                    {book.title}
                </h3>
                <p className="text-sm text-[#8A8374] dark:text-gray-400 truncate mt-0.5">{book.author}</p>

                {completed ? (
                    <span className="text-sm font-medium text-[#9407F2] dark:text-[#C084FC] mt-1.5 inline-block group-hover:underline">
                        Read again
                    </span>
                ) : (
                    <div className="mt-2">
                        <div className="h-1 w-full rounded-full bg-[#E8E1D3] dark:bg-gray-600 overflow-hidden">
                            <div
                                className="h-full rounded-full bg-[#9407F2] transition-[width]"
                                style={{ width: `${progress ?? 5}%` }}
                            />
                        </div>
                        <div className="flex items-center justify-between mt-1.5">
                            <span className="text-xs font-medium text-[#9407F2] dark:text-[#C084FC] group-hover:underline">
                                Continue reading
                            </span>
                            {progress != null && (
                                <span className="text-xs text-[#8A8374] dark:text-gray-400">{progress}%</span>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProgressBookCard;
