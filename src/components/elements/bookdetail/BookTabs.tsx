"use client"

import {useState, useEffect, useRef} from "react";
import {BookData} from "@/types/book";
import {crateComment, getComments} from "@/lib/api/comment";
import {useSelector} from "react-redux";
import {RootState} from "@/app/store/store";
import {CommentData} from "@/types/comments";



const AudioPlayer = ({ audioUrl, audioRef }) => {
    return (
        <audio ref={audioRef} controls className="mt-2 w-full">
            <source src={audioUrl} type="audio/mp3" />
            Your browser does not support the audio element.
        </audio>
    );
};

const BookDetail = ({bookData } : {bookData : BookData | null}) => {
    const [showFullDescription, setShowFullDescription] = useState(false);
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
    const handleListenClick = async () => {
        setShowAudio(true);
        setTimeout(() => {
            audioRef.current?.play();
        }, 100);
    };
    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">About This Book</h3>
                <div className="prose prose-gray max-w-none">
                    <p className="text-gray-700 leading-relaxed mb-4">
                        {bookData?.description}
                    </p>

                    {!showFullDescription ? (
                        <button
                            onClick={() => setShowFullDescription(true)}
                            className="text-blue-600 hover:text-blue-800 p-0 h-auto font-normal underline"
                        >
                            Read More
                        </button>
                    ) : (
                        <button
                            onClick={() => setShowFullDescription(false)}
                            className="text-blue-600 hover:text-blue-800 p-0 h-auto font-normal underline"
                        >
                            Read Less
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
                                        audioUrl={`http://localhost:3000${bookData.audioSummarizationUrl}`}
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


function BookComment({ bookData}  :{bookData : BookData | null}) {

    const [comments, setComments] = useState<{id: string, author: string, text: string, date: string}[]>([ ]);
    const [newComment, setNewComment] = useState("");
    const user = useSelector((state: RootState) => state.user)

    useEffect(() => {

        getComments({page : 1 , limit : 20 , bookId : bookData?._id}).then((data)=>{
            console.log("the data is ")
            data?.data?.comments.map((n:CommentData )=>{
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

            crateComment(bookData?._id ?? "" ,  user?.user?._id ?? "", newComment)
        }
    };
    return (
        <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
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

const BookTabs = ({bookData } : {bookData : BookData | null}) => {
    const [activeTab, setActiveTab] = useState("details");

    const tabs = [
        { id: "details", label: "Book details" },
        { id: "comments", label: "Comments" },
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
               <BookDetail bookData={bookData} />
            )}

            {activeTab === "comments" && (
               <BookComment bookData ={bookData}/>
            )}


        </div>
    );
};

export default BookTabs;