/* eslint-disable  */
// @ts-nocheck

"use client";

import { BookData } from "@/types/book";
import { useRouter } from "next/navigation";
import { createUserBookInteraction } from "@/lib/api/userbookinteraction";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";


const BookActions = ({ bookData }: { bookData: BookData }) => {
    const router = useRouter();
    const user = useSelector((state: RootState) => state.user);
    const dispatch = useDispatch();

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

            toast.success("Book saved successfully!");
        } catch (err: unknown) {
            console.error(err);
            toast.error("Failed to save the book.");
        }
    }

    const handleReadClick = () => {
        if (!user?.user) {
            router.push("/login");
        } else {


            router.push(`/book/${bookData._id}`);
        }
    };

    const handleShare = async () => {
        const shareUrl = `${window.location.origin}/book/${bookData._id}`;
        const shareData = {
            title: bookData.title,
            text: `Check out this book: ${bookData.title}`,
            url: shareUrl,
        };

        if (navigator.share) {
            try {
                await navigator.share(shareData);
                console.log("Shared successfully!");
            } catch (error) {
                console.error("Error sharing", error);
            }
        } else {
            try {
                await navigator.clipboard.writeText(shareUrl);
                alert("Link copied to clipboard!");
            } catch (err) {
                console.error("Could not copy text: ", err);
            }
        }
    };

    return (
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <Toaster position="top-right" />

            <button
                className="bg-[#C084FC] text-white dark:bg-[#C084FC] dark:bg-[#C084FC] px-4 py-2 rounded-md font-medium text-sm sm:text-base transition-colors"
                onClick={handleReadClick}
            >
                {user?.user == null ? "Login to Read" : "Read"}
            </button>

            <button
                className="border border-gray-300 text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700 px-3 py-2 rounded-md font-medium text-sm sm:text-base transition-colors"
                onClick={() => saveBook(bookData._id, user?.user?._id ?? "")}
            >
                {user?.user == null ? "Login to Save" : "Add to Library"}
            </button>

            <button
                onClick={handleShare}
                className="rounded-md px-4 py-2 transition-colors bg-white hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200"
            >
                Share
            </button>
        </div>
    );
};

export default BookActions;
