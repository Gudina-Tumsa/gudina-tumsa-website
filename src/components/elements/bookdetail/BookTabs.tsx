"use client"

import {useState, useEffect, useRef} from "react";
import {BookData} from "@/types/book";
import {crateComment, getComments} from "@/lib/api/comment";
import {useSelector} from "react-redux";
import {RootState} from "@/app/store/store";
import {CommentData} from "@/types/comments";
import {UserResponse} from "@/types/auth";


const AudioPlayer = ({audioUrl, audioRef}) => {
    return (
        <audio ref={audioRef} controls className="mt-2 w-full">
            <source src={audioUrl} type="audio/mp3"/>
            Your browser does not support the audio element.
        </audio>
    );
};


interface StarRatingProps {
    rating: number;
    onRate?: (rating: number) => void;
    editable?: boolean;
}

const StarRating = ({ rating, onRate, editable = false }: StarRatingProps) => {
    const [hoveredStar, setHoveredStar] = useState<number | null>(null);

    const getColor = (index: number) => {
        if (hoveredStar !== null) {
            return index <= hoveredStar ? 'text-yellow-400' : 'text-gray-300';
        }
        return index <= rating ? 'text-yellow-400' : 'text-gray-300';
    };

    const handleClick = (index: number) => {
        if (editable && onRate) {
            onRate(index);
        }
    };

    return (
        <div className="flex items-center">
            {[1, 2, 3, 4, 5].map((star) => (
                <svg
                    key={star}
                    onMouseEnter={() => editable && setHoveredStar(star)}
                    onMouseLeave={() => editable && setHoveredStar(null)}
                    onClick={() => handleClick(star)}
                    className={`w-6 h-6 cursor-pointer ${getColor(star)}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.175 3.624a1 1 0 00.95.69h3.813c.969 0 1.371 1.24.588 1.81l-3.084 2.24a1 1 0 00-.364 1.118l1.175 3.624c.3.921-.755 1.688-1.54 1.118l-3.084-2.24a1 1 0 00-1.176 0l-3.084 2.24c-.784.57-1.838-.197-1.54-1.118l1.175-3.624a1 1 0 00-.364-1.118L2.37 9.05c-.783-.57-.38-1.81.588-1.81h3.813a1 1 0 00.95-.69l1.175-3.624z" />
                </svg>
            ))}
        </div>
    );
};




const BookDetail = ({bookData , userData}: { bookData: BookData | null ,  userData : UserResponse | null }) => {
    const [showFullDescription, setShowFullDescription] = useState(false);
    const [showAudio, setShowAudio] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isTextOverflowing, setIsTextOverflowing] = useState(false);
    const [userRating, setUserRating] = useState<number | null>(null);
    const [isRating, setIsRating] = useState(false);
    const [existingRatingId, setExistingRatingId] = useState<string | null>(null);
    const [averageRating, setAverageRating] = useState(0);
    const [ratingCount, setRatingCount] = useState(0);
    const descriptionRef = useRef<HTMLParagraphElement>(null);
    const audioRef = useRef<HTMLAudioElement>(null);

    useEffect(() => {
        if (!bookData) return;

        const fetchRatings = async () => {
            try {
                // Get average rating and count
                const ratingsResponse = await fetch(`http://localhost:3000/api/book-ratings?bookId=${bookData._id}`);
                let data = await ratingsResponse.json();

                const { averageRating, total } = data.data;
                setAverageRating(averageRating || 0);
                setRatingCount(total || 0);

                if (userData) {

                    const userRatingResponse = await fetch(`http://localhost:3000/api/book-ratings?userId=${userData._id ?? ""}&bookId=${bookData._id}`);
                    const data = await userRatingResponse.json();

                    if (data.data.bookRatings.length > 0) {
                        const rating = data.data.bookRatings[0];

                        setUserRating(rating.rating);
                        setExistingRatingId(rating._id);
                    }
                }
            } catch (error) {
                console.error('Failed to fetch ratings:', error);
            }
        };

        fetchRatings();
    }, [bookData]);

    useEffect(() => {
        // Check if text is overflowing and needs "Read More"
        if (descriptionRef.current) {
            const isOverflowing = descriptionRef.current.scrollHeight > descriptionRef.current.clientHeight;
            setIsTextOverflowing(isOverflowing);
        }
    }, [bookData?.description]);

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

    const handleListenClick = async () => {
        setShowAudio(true);
        setTimeout(() => {
            audioRef.current?.play();
        }, 100);
    };

   interface CreateBookRatingRequest {
        userId: string;
        bookId: string;
        rating: number;
    }

    const handleRating = async (newRating: number) => {
        setUserRating(newRating);

        const payload: CreateBookRatingRequest = {
            userId: userData?._id ?? "",
            bookId: bookData?._id ?? "",
            rating: newRating,
        };

        try {
            const response = await fetch('http://localhost:3000/api/book-ratings', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();

        } catch (error) {
            console.error('Failed to submit rating:', error);
        }
    };


    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">About This Book</h3>
                <div className="prose prose-gray max-w-none">
                    <p
                        ref={descriptionRef}
                        className={`text-gray-700 leading-relaxed mb-4 ${
                            !showFullDescription ? 'line-clamp-4' : ''
                        }`}
                    >
                        {bookData?.description}
                    </p>

                    {isTextOverflowing && (
                        <button
                            onClick={() => setShowFullDescription(!showFullDescription)}
                            className="text-blue-600 hover:text-blue-800 p-0 h-auto font-normal underline"
                        >
                            {showFullDescription ? 'Read Less' : 'Read More'}
                        </button>
                    )}

                    <div className="mt-6">
                        <h4 className="text-lg font-semibold text-gray-900 mb-2">Audio Summary</h4>
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                            <button
                                onClick={handleListenClick}
                                className={`px-4 py-2 rounded-md font-medium text-sm sm:text-base flex items-center justify-center gap-2 ${
                                    isPlaying
                                        ? 'bg-green-700 text-white'
                                        : 'bg-green-600 hover:bg-green-700 text-white'
                                }`}
                                disabled={isPlaying}
                            >
                                {isPlaying ? (
                                    <>
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                             xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                  d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15.536a5 5 0 001.414 1.414m2.828-9.9a9 9 0 012.728-2.728"/>
                                        </svg>
                                        <span>Playing</span>
                                    </>
                                ) : (
                                    <>
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                             xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                  d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15.536a5 5 0 001.414 1.414m2.828-9.9a9 9 0 012.728-2.728"/>
                                        </svg>
                                        <span>Listen to Summary</span>
                                    </>
                                )}
                            </button>

                            {showAudio && (
                                <div className="w-full sm:w-auto flex-1">
                                    <AudioPlayer
                                        audioUrl={`http://localhost:3000${bookData?.audioSummarizationUrl}`}
                                        audioRef={audioRef}
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div>
                <div className="bg-gray-50 rounded-lg p-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Information</h4>
                    <div className={"mb-[2%]"}>
                        <h5 className="text-sm font-medium text-gray-600 mb-2">Rating</h5>
                        <div className="flex items-center gap-2">

                            <StarRating rating={bookData?.rating || 0} onRate={handleRating} editable />

                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <h5 className="text-sm font-medium text-gray-600 mb-2">Publisher</h5>
                            <p className="text-gray-900">Wiley</p>
                        </div>
                        <div>
                            <h5 className="text-sm font-medium text-gray-600 mb-2">Topic</h5>
                            <p className="text-gray-900">{bookData?.category}</p>
                        </div>
                        <div>
                            <h5 className="text-sm font-medium text-gray-600 mb-2">Year</h5>
                            <p className="text-gray-900">{bookData?.publicationYear}</p>
                        </div>
                        <div>
                            <h5 className="text-sm font-medium text-gray-600 mb-2">Edition</h5>
                            <p className="text-gray-900">7</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

function BookComment({bookData}: { bookData: BookData | null }) {

    const [comments, setComments] = useState<{ id: string, author: string, text: string, date: string }[]>([]);
    const [newComment, setNewComment] = useState("");
    const user = useSelector((state: RootState) => state.user)

    useEffect(() => {

        getComments({page: 1, limit: 20, bookId: bookData?._id}).then((data) => {
            console.log("the data is ")
            data?.data?.comments.map((n: CommentData) => {
                console.log(n)
                const comment = {
                    id: n._id,
                    author: n.userId.username,
                    text: n.content,
                    date: n.createdAt.toString(),
                };
                setComments([...comments, comment]);
            })
        })
    }, []);

    const handleAddComment = () => {

        if (newComment.trim()) {
            const comment = {
                id: Date.now().toString(),
                author: user?.user?.username ?? "you",
                text: newComment,
                date: new Date().toLocaleDateString(),
            };
            setComments([...comments, comment]);
            setNewComment("");

            crateComment(bookData?._id ?? "", user?.user?._id ?? "", newComment)
        }
    };
    return (
        <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6">


                {
                    user?.user != null ?

                        <>
                            <h3 className="text-xl font-semibold text-gray-900 mb-4">Leave a Comment</h3>
                            <div className="mb-4">
                            <textarea
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                rows={4}
                                placeholder="Share your thoughts about this book..."
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                            />
                            </div>
                            <button
                                onClick={handleAddComment}
                                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                            >
                                Post Comment
                            </button>
                        </>
                        : ""
                }
                {

                }

            </div>

            <div className="space-y-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Comments ({comments.length})</h3>

                {comments.map((comment) => (
                    <div key={comment.id} className="bg-gray-50 rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                            <span className="font-medium text-gray-900">{comment.author}</span>
                            <span className="text-sm text-gray-500">{comment.date}</span>
                        </div>
                        <p className="text-gray-700">{comment.text}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}
// userData={user}
const BookTabs = ({bookData , userData}: { bookData: BookData | null , userData : UserResponse | null }) => {
    const [activeTab, setActiveTab] = useState("details");

    const tabs = [
        {id: "details", label: "Book details"},
        {id: "comments", label: "Comments"},
    ];


    return (
        <div className={"mb-[5%]"}>

            <div className="border-b border-gray-200 mb-6">
                <div className="flex gap-8">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`pb-3 px-1 text-sm font-medium border-b-2 transition-colors ${
                                activeTab === tab.id
                                    ? "border-blue-600 text-blue-600"
                                    : "border-transparent text-gray-500 hover:text-gray-700"
                            }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>
            </div>

            {activeTab === "details" && (
                <BookDetail bookData={bookData} userData={userData} />
            )}

            {activeTab === "comments" && (
                <BookComment bookData={bookData}/>
            )}


        </div>
    );
};

export default BookTabs;