"use client";

import { BookData } from "@/types/book";
import { useRouter } from "next/navigation";
import { createUserBookInteraction } from "@/lib/api/userbookinteraction";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import { useRef, useState, useEffect } from "react";

const AudioPlayer = ({ audioUrl, audioRef }) => {
    return (
        <audio ref={audioRef} controls className="mt-2 w-full">
            <source src={audioUrl} type="audio/mp3" />
            Your browser does not support the audio element.
        </audio>
    );
};

const BookActions = ({ bookData }: { bookData: BookData }) => {
    const router = useRouter();
    const user = useSelector((state: RootState) => state.user);
    const [showAudio, setShowAudio] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef<HTMLAudioElement>(null);

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const handlePlay = () => setIsPlaying(true);
        const handlePause = () => setIsPlaying(false);
        const handleEnded = () => setIsPlaying(false);

        audio.addEventListener('play', handlePlay);
        audio.addEventListener('pause', handlePause);
        audio.addEventListener('ended', handleEnded);

        return () => {
            audio.removeEventListener('play', handlePlay);
            audio.removeEventListener('pause', handlePause);
            audio.removeEventListener('ended', handleEnded);
        };
    }, [showAudio]);

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

    const handleListenClick = async () => {
        setShowAudio(true);
        setTimeout(() => {
            audioRef.current?.play();
        }, 100);
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

            <button
                onClick={handleListenClick}
                className={`px-3 py-2 rounded-md font-medium text-sm sm:text-base flex items-center justify-center gap-1 ${
                    isPlaying
                        ? 'bg-green-700 text-white'
                        : 'bg-green-600 hover:bg-green-700 text-white'
                }`}
                disabled={isPlaying}
            >
                {isPlaying ? (
                    "Playing..."
                ) : (
                    <>
                        <span className="hidden sm:inline">Listen</span>
                        <span className="sm:hidden">Play</span>
                    </>
                )}
            </button>

            {showAudio && (
                <div className="w-full sm:col-span-3">
                    <AudioPlayer
                        audioUrl={`http://localhost:3000${bookData.audioSummarizationUrl}`}
                        audioRef={audioRef}
                    />
                </div>
            )}
        </div>
    );
};

export default BookActions;