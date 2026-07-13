import { BookData } from "@/types/book";

const BookDetails = ({ bookData }: { bookData: BookData | null }) => {
    if (!bookData) return null;

    return (
        <div>
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-3">
                {bookData.title}
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-4">
                {bookData.category}
            </p>

            {bookData.payable && (
                <p className="inline-block bg-[#C084FC]/10 text-[#C084FC] font-semibold px-3 py-1 rounded-full text-sm mb-4">
                    {bookData.price} ETB
                </p>
            )}

            <div className="flex flex-wrap gap-2 mb-6">
                <span className="text-[#C084FC] font-medium">
                    {bookData.author}
                </span>
            </div>
        </div>
    );
};

export default BookDetails;
