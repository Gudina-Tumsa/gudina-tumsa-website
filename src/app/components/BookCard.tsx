import { MoreHorizontal } from "lucide-react";

interface BookCardProps {
    title: string;
    year: string;
    coverImage: string;
    isCurrentlyReading?: boolean;
}

const BookCard = ({ title, year, coverImage, isCurrentlyReading }: BookCardProps) => {
    return (
        <div className="relative group">
            <div className="aspect-[3/4] bg-gray-200 rounded-lg overflow-hidden shadow-sm">
                <img
                    src={coverImage}
                    alt={title}
                    className="w-full h-full object-cover"
                />
                {isCurrentlyReading && (
                    <div className="absolute top-3 right-3">
                        <button className="p-1 bg-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity">
                            <MoreHorizontal className="h-4 w-4 text-gray-600" />
                        </button>
                    </div>
                )}
            </div>
            <div className="mt-3">
                <h3 className="text-sm font-medium text-gray-900 line-clamp-2">{title}</h3>
                <p className="text-xs text-gray-500 mt-1">{year}</p>
            </div>
        </div>
    );
};

export default BookCard;