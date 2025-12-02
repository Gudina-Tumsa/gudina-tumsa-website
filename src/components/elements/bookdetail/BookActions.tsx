/* eslint-disable  */
// @ts-nocheck

"use client";

import { BookData } from "@/types/book";
import { useRouter } from "next/navigation";
import { createUserBookInteraction } from "@/lib/api/userbookinteraction";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import toast, { Toaster } from "react-hot-toast";
import { useState, useRef, useEffect, useCallback } from "react";
// Import simple icons for better aesthetics
import {
    Heart,
    Share2,
    BookOpen,
    Play,
    Pause,
    SkipBack,
    SkipForward,
    Volume2,
    VolumeX,
    X,
} from "lucide-react";

// --- Utility function for time formatting ---
const formatTime = (seconds: number) => {
    if (isNaN(seconds) || seconds < 0) return "0:00";
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
};
// ---------------------------------------------

const BookActions = ({ bookData }: { bookData: BookData }) => {
    const router = useRouter();
    const user = useSelector((state: RootState) => state.user);
    const [isAudioModalOpen, setAudioModalOpen] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [isMuted, setIsMuted] = useState(false);

    const audioRef = useRef<HTMLAudioElement>(null);
    const progressBarRef = useRef<HTMLDivElement>(null);

    // Determines if the book is an audio or text
    const isAudioBook = bookData.contentType === "audio";

    // --- Interaction Handlers ---

    async function saveBook(id: string, userId: string) {
        try {
            if (!userId) {
                router.push("/login");
                return;
            }
            // Assuming interactionType 'save' is appropriate for adding to library
            await createUserBookInteraction({
                userId,
                bookId: id,
                interactionType: 'save'
            });

            toast.success("Book added to Library!");
        } catch (err: unknown) {
            console.error(err);
            toast.error("Failed to save the book.");
        }
    }

    const handleReadClick = () => {
        if (!user?.user) {
            router.push("/login");
            return;
        }

        if (isAudioBook) {
            setAudioModalOpen(true);
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
                toast.success("Book shared successfully!");
            } catch (error) {
                console.error("Error sharing", error);
            }
        } else {
            try {
                await navigator.clipboard.writeText(shareUrl);
                toast.success("Share link copied to clipboard!");
            } catch (err) {
                console.error("Could not copy text: ", err);
                toast.error("Failed to copy link.");
            }
        }
    };

    // --- Audio Player Logic ---

    // Toggle Play/Pause
    const togglePlay = useCallback(() => {
        if (!audioRef.current) return;
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
    }, [isPlaying]);

    // Skip Forward/Backward
    const skipTime = (seconds: number) => {
        if (!audioRef.current) return;
        audioRef.current.currentTime += seconds;
    };

    // Toggle Mute
    const toggleMute = () => {
        if (!audioRef.current) return;
        audioRef.current.muted = !isMuted;
        setIsMuted(!isMuted);
    };

    // Handle Seek Bar Click
    const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!audioRef.current || !progressBarRef.current || duration === 0) return;

        const rect = progressBarRef.current.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const width = rect.width;
        const clickRatio = clickX / width;
        const newTime = duration * clickRatio;

        audioRef.current.currentTime = newTime;
    };


    // Audio Effect Setup
    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const handleLoadedMetadata = () => {
            setDuration(audio.duration);
        };
        const handleTimeUpdate = () => {
            setCurrentTime(audio.currentTime);
            setProgress((audio.currentTime / audio.duration) * 100);
        };
        const handlePlay = () => setIsPlaying(true);
        const handlePause = () => setIsPlaying(false);
        const handleEnded = () => {
            setIsPlaying(false);
            setCurrentTime(0);
            setProgress(0);
        };

        audio.addEventListener('loadedmetadata', handleLoadedMetadata);
        audio.addEventListener('timeupdate', handleTimeUpdate);
        audio.addEventListener('play', handlePlay);
        audio.addEventListener('pause', handlePause);
        audio.addEventListener('ended', handleEnded);

        // Clean up: Reset state when modal closes
        return () => {
            audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
            audio.removeEventListener('timeupdate', handleTimeUpdate);
            audio.removeEventListener('play', handlePlay);
            audio.removeEventListener('pause', handlePause);
            audio.removeEventListener('ended', handleEnded);
            // Ensure audio is paused and reset when component unmounts or modal closes
            if(audio) {
                audio.pause();
                audio.currentTime = 0;
            }
        };
    }, [isAudioModalOpen]); // Re-run when modal state changes to ensure cleanup

    const audioUrl = bookData?.audioSummarizationUrl ? `https://api.gudinatumsa.com${bookData.audioSummarizationUrl}` : null;

    // --- JSX Rendering ---
    return (
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <Toaster position="top-right" />

            {/* Primary Action Button (Read/Listen) */}
            <button
                className="bg-purple-600 text-white dark:bg-purple-700 px-6 py-3 rounded-xl font-semibold text-base flex items-center justify-center gap-2 shadow-lg hover:bg-purple-700 dark:hover:bg-purple-800 transition-all transform hover:scale-[1.02]"
                onClick={handleReadClick}
            >
                {isAudioBook ? <Play className="w-5 h-5" /> : <BookOpen className="w-5 h-5" />}
                {user?.user == null
                    ? "Login to Access"
                    : (isAudioBook ? "Start Listening" : "Start Reading")}
            </button>
            <div className="flex gap-3">
                {/* Secondary Action: Add to Library */}
                <button
                    className="flex items-center justify-center gap-2 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 px-4 py-3 rounded-xl font-medium text-sm transition-colors"
                    onClick={() => saveBook(bookData._id, user?.user?._id ?? "")}
                    aria-label={user?.user == null ? "Login to Save" : "Add to Library"}
                >
                    <Heart className="w-5 h-5" />
                    {user?.user == null ? "Login to Save" : "Library"}
                </button>

                {/* Secondary Action: Share */}
                <button
                    onClick={handleShare}
                    className="flex items-center justify-center gap-2 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 px-4 py-3 rounded-xl font-medium text-sm transition-colors"
                    aria-label="Share this book"
                >
                    <Share2 className="w-5 h-5" />
                    Share
                </button>
            </div>


            {/* Full-screen Spotify-style Audio Modal */}
            {isAudioModalOpen && audioUrl && (
                <div className="fixed inset-0 bg-black bg-opacity-95 flex flex-col items-center justify-center z-50 p-4 backdrop-blur-sm">
                    {/* Close Button */}
                    <button
                        className="absolute top-6 right-6 text-white text-3xl opacity-80 hover:opacity-100 transition-opacity"
                        onClick={() => setAudioModalOpen(false)}
                        aria-label="Close Audio Player"
                    >
                        <X className="w-8 h-8" />
                    </button>

                    <div className="flex flex-col items-center max-w-lg w-full text-center gap-6">
                        {/* Cover Image */}
                        {bookData.coverUrl && (
                            <img
                                src={bookData.coverUrl}
                                alt={bookData.title}
                                className="w-64 h-64 sm:w-80 sm:h-80 object-cover rounded-2xl mb-4 shadow-2xl transition-shadow"
                            />
                        )}

                        {/* Metadata */}
                        <div className="text-center">
                            <h2 className="text-3xl font-extrabold text-white mb-1 leading-tight">{bookData.title}</h2>
                            {bookData.author && (
                                <p className="text-lg text-gray-400 font-medium">{bookData.author}</p>
                            )}
                        </div>

                        {/* Progress Bar and Time */}
                        <div className="w-full">
                            <div
                                ref={progressBarRef}
                                onClick={handleSeek}
                                className="h-2 w-full bg-gray-700 rounded-full cursor-pointer group mb-1"
                            >
                                <div
                                    className="h-2 bg-green-500 rounded-full transition-all duration-100"
                                    style={{ width: `${progress}%` }}
                                ></div>
                            </div>
                            <div className="flex justify-between text-sm text-gray-400">
                                <span>{formatTime(currentTime)}</span>
                                <span>{formatTime(duration)}</span>
                            </div>
                        </div>

                        {/* Controls Section */}
                        <div className="flex items-center justify-center gap-8 w-full mt-4">
                            {/* Mute Button */}
                            <button
                                onClick={toggleMute}
                                className="text-gray-400 hover:text-white transition-colors p-2"
                                aria-label={isMuted ? "Unmute" : "Mute"}
                            >
                                {isMuted ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
                            </button>

                            {/* Skip Backward (e.g., 10s) */}
                            <button
                                onClick={() => skipTime(-10)}
                                className="text-white hover:scale-110 transition-transform p-2"
                                aria-label="Skip backward 10 seconds"
                            >
                                <SkipBack className="w-8 h-8" fill="currentColor" />
                            </button>

                            {/* Play/Pause Button - Prominent */}
                            <button
                                onClick={togglePlay}
                                className="text-black bg-green-500 hover:bg-green-400 p-5 rounded-full flex items-center justify-center shadow-2xl transform hover:scale-105 transition-all"
                                aria-label={isPlaying ? "Pause" : "Play"}
                            >
                                {isPlaying ? (
                                    <Pause className="w-8 h-8" fill="currentColor" />
                                ) : (
                                    <Play className="w-8 h-8 ml-1" fill="currentColor" /> // ml-1 to center the triangle visually
                                )}
                            </button>

                            {/* Skip Forward (e.g., 30s) */}
                            <button
                                onClick={() => skipTime(30)}
                                className="text-white hover:scale-110 transition-transform p-2"
                                aria-label="Skip forward 30 seconds"
                            >
                                <SkipForward className="w-8 h-8" fill="currentColor" />
                            </button>

                            {/* Placeholder/Extra Action */}
                            <div className="w-10 h-10"></div> {/* Balanced layout */}
                        </div>

                        {/* Hidden Audio Element */}
                        <audio ref={audioRef} src={audioUrl} preload="metadata" className="hidden" />
                    </div>
                </div>
            )}
        </div>
    );
};

export default BookActions;
