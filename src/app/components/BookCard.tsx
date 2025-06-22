import { MoreHorizontal } from "lucide-react";

interface BookCardProps {
    title: string;
    year: string;
    coverImage: string;
    writer: string;
    isCurrentlyReading?: boolean;
}

const BookCard = ({ title, year, coverImage, writer, isCurrentlyReading }: BookCardProps) => {
    return (
        // shadow-sm
        <div className="relative group w-52 p-3 transition-all duration-300   hover:bg-gray-100 rounded-lg overflow-hidden  cursor-pointer ">
            <div className="aspect-[3/4] bg-gray-200 rounded-lg overflow-hidden relative">
                <img
                    src={coverImage}
                    alt={title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />

                {isCurrentlyReading && (
                    <div className="absolute top-3 right-3 z-20">
                        {/*shadow-md*/}
                        <button className="p-1  rounded-full  opacity-0 group-hover:opacity-100 transition-opacity">
                            <MoreHorizontal className="h-4 w-4 text-gray-600" />
                        </button>
                    </div>
                )}

                <div className="absolute inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity z-10">
                    {/*shadow-sm*/}
                    <button className="border border-white text-white text-sm font-medium px-4 py-1 rounded-md backdrop-blur-md bg-transparent hover:bg-white hover:text-black transition-all ">
                        Read
                    </button>
                </div>
            </div>

            {/* Book Info (below image) */}
            <div className="mt-4 px-1">
                <h3 className="text-sm font-semibold text-gray-900 line-clamp-2">{title}</h3>
                <p className="text-xs text-gray-600 mt-1">{writer}</p>
                <p className="text-[11px] text-gray-400 mt-0.5">{year}</p>
            </div>
        </div>
    );
};

export default BookCard;
