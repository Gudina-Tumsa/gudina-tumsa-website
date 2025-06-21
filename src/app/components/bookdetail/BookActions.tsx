import { ChevronDown, Share } from "lucide-react";

const BookActions = () => {
    return (
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <button
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium flex-1 sm:flex-initial text-lg"
            >
                Subscribe to read
            </button>

            <button
                className="border border-gray-300 text-gray-700 hover:bg-gray-50 px-6 py-3 rounded-lg font-medium flex items-center gap-2 text-lg"
            >
                📖 Want to read
                <ChevronDown className="w-4 h-4" />
            </button>


        </div>
    );
};

export default BookActions;
