"use client"

import {useState, useEffect, useRef} from "react";
import {BookData} from "@/types/book";
import {createComment, dislikeAComment, getComments, likeAComment} from "@/lib/api/comment";
import {useSelector} from "react-redux";
import {RootState} from "@/app/store/store";
import {CommentData} from "@/types/comments";
import {UserResponse} from "@/types/auth";
import {ThumbsUp , ThumbsDown } from "lucide-react";

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

function BookComment({ bookData }: { bookData: BookData | null }) {
    const [comments, setComments] = useState<CommentData[]>([]);
    const [newComment, setNewComment] = useState("");
    const [replyingTo, setReplyingTo] = useState<string | null>(null);
    const [replyContent, setReplyContent] = useState("");
    const [expandedReplies, setExpandedReplies] = useState<Record<string, boolean>>({});
    const user = useSelector((state: RootState) => state.user);

    useEffect(() => {
        fetchComments();
    }, [bookData?._id]);

    const fetchComments = async () => {
        try {
            const data = await getComments({ page: 1, limit: 20, bookId: bookData?._id });
            if (data?.data?.comments) {
                setComments(data?.data.comments);
                // Initialize all replies as collapsed by default
                const initialExpandedState: Record<string, boolean> = {};
                data?.data.comments.forEach(comment => {
                    initialExpandedState[comment._id] = false;
                });
                setExpandedReplies(initialExpandedState);
            }
        } catch (error) {
            console.error("Failed to fetch comments:", error);
        }
    };

    const toggleReplies = (commentId: string) => {
        setExpandedReplies(prev => ({
            ...prev,
            [commentId]: !prev[commentId]
        }));
    };

    const handleAddComment = async () => {
        if (!newComment.trim() || !user?.user?._id || !bookData?._id) return;

        try {
            await createComment(
                bookData._id,
                user.user._id,
                newComment,
                replyingTo || undefined
            );
            setNewComment("");
            setReplyingTo(null);
            fetchComments();
        } catch (error) {
            console.error("Failed to add comment:", error);
        }
    };

    const handleAddReply = async (parentId: string) => {
        if (!replyContent.trim() || !user?.user?._id || !bookData?._id) return;

        try {
            await createComment(
                bookData._id,
                user.user._id,
                replyContent,
                parentId
            );
            setReplyContent("");
            setReplyingTo(null);
            fetchComments();
            // Expand the parent comment's replies when adding a new reply
            setExpandedReplies(prev => ({
                ...prev,
                [parentId]: true
            }));
        } catch (error) {
            console.error("Failed to add reply:", error);
        }
    };

    const renderComments = (commentList: CommentData[], level = 0 , userId : string) => {

        return commentList.map((comment) => {
            const hasReplies = comment?.repliesCount || 0 > 0;
            const isExpanded = expandedReplies[comment._id];
            const replies = comments.filter(c => c.parentCommentId === comment._id);

            return (
                <div key={comment._id} className={`bg-gray-50 rounded-lg p-4 ${level > 0 ? 'mt-2' : 'mb-4'}`}>
                    <div className="flex justify-between items-start mb-2">
                        <span className="font-medium text-gray-900">
                            {comment.userId.username}
                        </span>
                        <span className="text-sm text-gray-500">
                            {new Date(comment.createdAt).toLocaleString()}
                            {comment.isEdited && " (edited)"}
                        </span>
                    </div>
                    <p className="text-gray-700 mb-2">{comment.content}</p>

                    <div className="flex space-x-4 text-sm">
                        <button
                            onClick={() => setReplyingTo(replyingTo === comment._id ? null : comment._id)}
                            className="text-blue-600 hover:text-blue-800"
                        >
                            Reply
                        </button>
                        {hasReplies && (
                            <button
                                onClick={() => toggleReplies(comment._id)}
                                className="text-blue-600 hover:text-blue-800"
                            >
                                {isExpanded ? 'Hide replies' : `Show replies (${comment.repliesCount})`}
                            </button>
                        )}
                        <div className="flex items-center space-x-4 text-gray-500 text-sm">
                            <div className="flex items-center space-x-1"
                                onClick={() => likeAComment(user?.user?._id ?? "" , comment._id).finally(() => fetchComments())}
                            >
                                <ThumbsUp/>
                                <span>{comment.likes.length || 0}</span>
                            </div>

                            <div className="flex items-center space-x-1"
                                onClick={() => dislikeAComment(user?.user?._id ?? "" , comment._id).finally(() => fetchComments())}
                            >
                                <ThumbsDown/>
                                <span>{comment.dislikes.length || 0}</span>
                            </div>
                        </div>

                    </div>

                    {/* Reply form */}
                    {replyingTo === comment._id && (
                        <div className="mt-3 ml-4">
                            <textarea
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                rows={2}
                                placeholder="Write your reply..."
                                value={replyContent}
                                onChange={(e) => setReplyContent(e.target.value)}
                            />
                            <div className="flex space-x-2 mt-2">
                                <button
                                    onClick={() => handleAddReply(comment._id)}
                                    className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm"
                                >
                                    Post Reply
                                </button>
                                <button
                                    onClick={() => setReplyingTo(null)}
                                    className="px-3 py-1 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors text-sm"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Render replies if expanded */}
                    {hasReplies && isExpanded && (
                        <div className="mt-3 border-l-2 border-gray-200 pl-4">
                            {renderComments(replies, level + 1 , userId)}
                        </div>
                    )}
                </div>
            );
        });
    };

    return (
        <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
                {user?.user ? (
                    <>
                        <h3 className="text-xl font-semibold text-gray-900 mb-4">
                            {replyingTo ? "Leave a Reply" : "Leave a Comment"}
                        </h3>
                        <div className="mb-4">
                            <textarea
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                rows={4}
                                placeholder={
                                    replyingTo
                                        ? "Write your reply..."
                                        : "Share your thoughts about this book..."
                                }
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                            />
                        </div>
                        <div className="flex space-x-2">
                            <button
                                onClick={handleAddComment}
                                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                            >
                                {replyingTo ? "Post Reply" : "Post Comment"}
                            </button>
                            {replyingTo && (
                                <button
                                    onClick={() => setReplyingTo(null)}
                                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
                                >
                                    Cancel
                                </button>
                            )}
                        </div>
                    </>
                ) : (
                    <p className="text-gray-600">
                        Please log in to leave comments.
                    </p>
                )}
            </div>

            <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-900">
                    Comments ({comments.filter(c => !c.parentCommentId).length})
                </h3>
                {comments.length > 0 ? (
                    renderComments(comments.filter(c => !c.parentCommentId) ,0,user?.user?._id ?? "")
                ) : (
                    <p className="text-gray-500">No comments yet. Be the first to comment!</p>
                )}
            </div>
        </div>
    );
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