/* eslint-disable  */
// @ts-nocheck

"use client"
import SearchBar from "@/app/components/SearchBar";
import BookGrid from "@/app/components/BookGrid";
import SidebarLayout from "@/components/layout/sidebar/sidebar-layout";
import { useSelector } from 'react-redux';
import {RootState} from "@/app/store/store";
import {useAppDispatch} from "@/lib/hooks";
import {useEffect, useState} from "react";
import {getBooks, GetBooksRequest, getBookSuggestions, getReadingBooks, getTodaysSelection} from "@/lib/api/book";
import {BookListResponse} from "@/types/book"
import {getBooksSuccess} from "@/app/store/features/bookSlice";
import {useRouter} from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import {EventData} from "@/types/events";
import {getEvents} from "@/lib/api/events";
import {createUserBookInteraction} from "@/lib/api/userbookinteraction";
import {useDispatch} from "react-redux";

const TodaysSelectionCard = ({ todaysSelectionResonse }: BookListResponse) => {
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
    const user = useSelector((state: RootState) => state.user);
    const router = useRouter();

    if (!todaysSelectionResonse?.data?.books?.length) {
        return null;
    }

    useEffect(() => {
        setIsUserLoggedIn(Boolean(user?.user));
    }, [user]);

    const book = todaysSelectionResonse.data.books[0];

    const handleReadClick = () => {
        if (!isUserLoggedIn) {
            router.push('/login');
        } else {
            router.push(`/bookdetail/${book._id}`);
        }
    };

    const handleSaveClick = async () => {
        if (!isUserLoggedIn) {
            router.push('/login');
            return;
        }
        await createUserBookInteraction({
            userId: user?.user._id,
            bookId: book._id,
            interactionType: 'save',
        });
        toast.success('Book saved successfully!');
    };

    return (
        <div className="bg-yellow-50 rounded-lg shadow-md w-full max-w-4xl mx-auto p-4 md:p-6">
            <Toaster position="top-right" />
            <div className="flex flex-col md:flex-row gap-6">
                {/* Text Section */}
                <div className="md:w-1/2 flex flex-col justify-center">
                    <h3 className="text-xl font-semibold text-gray-800">{book.title}</h3>
                    <p className="text-gray-600 mt-1">by {book.author}</p>
                    <hr className="my-4 border-gray-300 md:hidden" />
                </div>

                {/* Divider on desktop */}
                <div className="hidden md:block border-l border-gray-300"></div>

                {/* Image & Actions */}
                <div className="md:w-1/2 flex flex-col lg:flex-row gap-6 items-center min-w-0">
                    <div className="w-full lg:w-1/2 bg-gray-200 overflow-hidden rounded-md">
                        <div className="aspect-[3/4] w-full">
                            <img
                                className="w-full h-full object-cover"
                                src={`${process.env.NEXT_PUBLIC_BASE_URL}${book.coverImageUrl}`}
                                alt={`Cover of ${book.title}`}
                                loading="lazy"
                            />
                        </div>
                    </div>

                    {/* Buttons */}
                    <div className="flex flex-col w-full sm:w-auto gap-3">
                        <button
                            onClick={handleReadClick}
                            className="w-full sm:w-auto rounded-md px-4 py-2 bg-black text-white hover:bg-gray-800 transition-colors"
                        >
                            {isUserLoggedIn ? 'Read' : 'Login to Read'}
                        </button>
                        <button
                            onClick={handleSaveClick}
                            className="w-full sm:w-auto rounded-md px-4 py-2  border border-gray-300 text-gray-800 hover:bg-gray-100 transition-colors"
                        >
                            {isUserLoggedIn ? 'Save' : 'Login to Save'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const EventCard = () => {

    const [events, setEvents] = useState<EventData[]>([]);
    useEffect(() => {
        getEvents({page : 1 , limit : 3}).then((data)=>{
            setEvents(data?.data?.events ?? [])
        }).catch((err)=>{
            console.log(err);
        })
    }, []);
    return (

        <></>
    );
};

export default function Page() {

  const user = useSelector((state: RootState) => state.user);
  const books = useSelector((state: RootState) => state.book)
  const dispatch = useDispatch();
  const [currentlyReading, setCurrentlyReading] = useState(null);
  const [todaysSelection , setTodaysSelection] = useState(null);
  const [recommendations, setRecommendations] = useState(null);

  const applyTheme = (selectedTheme: string) => {
        const root = window.document.documentElement;

        if (selectedTheme === 'dark') {
            root.classList.add('dark');
        } else if (selectedTheme === 'light') {
            root.classList.remove('dark');
        } else {
            // Apply system preference
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            if (prefersDark) {
                root.classList.add('dark');
            } else {
                root.classList.remove('dark');
            }
        }
    };

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme') || 'system';
        const savedLanguage = localStorage.getItem('language') || 'en';
        applyTheme(savedTheme);
    }, []);

    useEffect(()=> {
        const fetchTodaysSelection = async() => {
            try {
                const token = user?.user?.token
                const response = await getTodaysSelection(token)
                setTodaysSelection(response)
            } catch(err : unknown) {
                console.log("failed to fetch todaysSelection", err);
            }
        }
        fetchTodaysSelection();
    },[])

    useEffect(()=> {
        const  fetchRecommendation= async() => {
            try {
                const token = user?.user?.token
                const response = await getBookSuggestions(token)
                setRecommendations(response)
            } catch(err : unknown) {
                console.log("failed to fetch todaysSelection", err);
            }
        }
        fetchRecommendation();
    },[])
    useEffect(() => {
       console.log({"todayssleection" : todaysSelection});
       console.log(todaysSelection);
    }, [todaysSelection]);
    useEffect(() => {
           const fetchReadingBooks = async () => {
                try {
                    const  token = user?.user?.token
                    const response = await getReadingBooks(token ?? "")
                    setCurrentlyReading(response)
                } catch (err: unknown) {
                    console.error("failed to fetch books:", err)
                }
            }
            fetchReadingBooks()

    }, []);

  useEffect(() => {

    const fetchBooks = async () => {
      try {
          let bookRequest:GetBooksRequest =  {
              page : 1,
              limit: 20
          }
        const response = await getBooks(bookRequest)
        dispatch(getBooksSuccess(response))
      } catch (err: unknown) {
        console.error("failed to fetch books:", err)
      }
    }

    fetchBooks()
  }, []);
  return (
      <SidebarLayout >
             <div className={"w-full dark:bg-gray-800"}>
                 <SearchBar />
                 <div className="flex flex-row justify-between">
                     <div className="mb-8  w-full">
                         <h1 className="dark:text-white text-2xl font-semibold text-gray-900 mb-2">
                             Hi {user?.user?.firstName || " user "} 👋
                         </h1>
                         {todaysSelection != null ? (
                             <div className="mb-8">
                                 <p className="dark:text-white text-gray-600 mb-4">Today's selection!</p>
                                 <div className="flex flex-col md:flex-row gap-4 w-full">
                                     <div className="w-full md:w-[65%]">
                                         <TodaysSelectionCard todaysSelectionResonse={todaysSelection} />
                                     </div>
                                     <div className="w-full md:w-[35%]">
                                         <EventCard />
                                     </div>
                                 </div>
                             </div>
                         ) : null}


                     </div>

                 </div>

                 {
                     currentlyReading ?<BookGrid
                         title="Reading"
                         userId={user?.user?._id ?? ""}
                         books={currentlyReading}
                         showCurrentlyReading={true}
                     /> : ""
                 }


                 <BookGrid
                     userId={user?.user?._id ?? ""}
                     title="Top Picks for you"
                     books={recommendations}
                 />
             </div>


      </SidebarLayout>
  )
}


