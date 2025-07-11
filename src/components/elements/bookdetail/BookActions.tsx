"use client";

import { BookData } from "@/types/book";
import { useRouter } from "next/navigation";
import { createUserBookInteraction } from "@/lib/api/userbookinteraction";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store";


const BookActions = ({ bookData }: { bookData: BookData }) => {
    const router = useRouter();
    const user = useSelector((state: RootState) => state.user);


    async function saveBook(id: string, userId: string) {
        try {
            if (!userId) {
                router.push("/login");
                return;
            }
            await createUserBookInteraction({
                userId,
                bookId: id,
                interactionType: 'save'
            });
        } catch (err: unknown) {
            console.error(err);
        }
    }

    const handleReadClick = () => {
        if (!user?.user) {
            router.push("/login");
        } else {
            router.push(`/book/${bookData._id}`);
        }
    };



    return (
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <button
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium text-sm sm:text-base"
                onClick={handleReadClick}
            >
                {user?.user == null ? "Login to Read" : "Read"}
            </button>

            <button
                className="border border-gray-300 text-gray-700 hover:bg-gray-50 px-3 py-2 rounded-md font-medium text-sm sm:text-base"
                onClick={() => saveBook(bookData._id, user?.user?._id ?? "")}
            >
                {user?.user == null ? "Login to Save" : "Add to Library"}
            </button>


        </div>
    );
};

export default BookActions;