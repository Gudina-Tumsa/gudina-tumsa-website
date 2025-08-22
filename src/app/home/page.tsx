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
import {getBooks, GetBooksRequest, getReadingBooks,getTodaysSelection} from "@/lib/api/book";
import {BookListResponse} from "@/types/book"
import {getBooksSuccess} from "@/app/store/features/bookSlice";
import {useRouter} from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import {EventData} from "@/types/events";
import {getEvents} from "@/lib/api/events";
import {createUserBookInteraction} from "@/lib/api/userbookinteraction";

const BookCard = ({todaysSelectionResonse} : BookListResponse) => {
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
    const user = useSelector((state: RootState) => state.user);
   const router = useRouter();

    if (todaysSelectionResonse?.data?.books.length == 0) {
        return ("")
    }
    useEffect(() => {
        setIsUserLoggedIn(user?.user != null);
    }, [user]);

    const handleReadClick = () => {
        if (!isUserLoggedIn) {
            router.push('/login');
            return;
        }else{
            router.push(`/bookdetail/${todaysSelectionResonse.data.books[0]._id}`);
        }

    };

    const handleSaveClick = async () => {
        if (!isUserLoggedIn) {
            router.push('/login');
            return;
        }else{
            // make constant for the page
            await createUserBookInteraction({
                userId: user?.user._id,
                bookId: todaysSelectionResonse.data.books[0]._id,
                interactionType: 'save'
            });
        }
        //
        // Handle save action for logged-in users
        console.log("Save book");
        toast.success("Book saved successfully!");
    };

    return (
        <div className="bg-yellow-50 rounded-lg shadow-md w-full h-full p-6">
            <Toaster position="top-right" />
            <div className="flex flex-col md:flex-row gap-6 h-full">
                <div className="md:w-1/2">
                    <h3 className="text-xl font-semibold text-gray-800">
                        {todaysSelectionResonse.data.books[0].title}
                    </h3>
                    {/*<p className="text-gray-600 mt-2">Gudina Tumsa Foundation</p>*/}
                    <hr className="my-4 border-gray-200 md:hidden" />
                </div>

                <div className="hidden md:block border-l border-gray-200"></div>

                <div className="md:w-1/2 h-full">
                    <div className="flex flex-col sm:flex-row gap-6 items-center h-full">
                        <div className="w-full sm:w-[50%] h-[100%] bg-gray-200 rounded-lg flex items-center justify-center text-gray-500 overflow-hidden">
                            <img
                                className="w-full h-full object-cover"
                                src= {todaysSelectionResonse.data.books[0].coverImageUrl}
                                alt="Book cover"
                            />
                        </div>

                        <div className="flex flex-col gap-3 w-full sm:w-auto">
                            <button
                                onClick={handleReadClick}
                                className={`rounded-md px-4 py-2 transition-colors ${
                                    isUserLoggedIn
                                        ? "bg-black hover:bg-gray-800 text-white"
                                        : "bg-black hover:bg-gray-800 text-white"
                                }`}
                            >
                                {isUserLoggedIn ? "Read" : "Login to Read"}
                            </button>
                            <button
                                onClick={handleSaveClick}
                                className={`rounded-md px-4 py-2 transition-colors ${
                                    isUserLoggedIn
                                        ? "bg-white hover:bg-gray-100 border border-gray-300 text-gray-800"
                                        : "bg-white hover:bg-gray-100 border border-gray-300 text-gray-800"
                                }`}
                            >
                                {isUserLoggedIn ? "Save" : "Login to Save"}
                            </button>


                        </div>
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
        // <div className="bg-yellow-50 p-4 rounded shadow-md w-full h-full">
        //     <h3 className="text-base font-medium text-gray-800 mb-2">
        //         Upcoming Events
        //     </h3>
        //     <ul className="list-disc pl-4 text-sm text-gray-600">
        //         {
        //             events.map((item)=>{
        //                 <li>Event 1: Workshop on Productivity</li>
        //             })
        //         }
        //
        //     </ul>
        // </div>
        <></>
    );
};

export default function Page() {

  const user = useSelector((state: RootState) => state.user);
  const books = useSelector((state: RootState) => state.book)
  const [currentlyReading, setCurrentlyReading] = useState(null);
    const [todaysSelection , setTodaysSelection] = useState(null);

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

  const dispatch = useAppDispatch();
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
  }, [dispatch]);
  return (
      <SidebarLayout>

              <SearchBar />
              <div className="flex flex-row justify-between">
                <div className="mb-8  w-full">
                  <h1 className="text-2xl font-semibold text-gray-900 mb-2">
                    Hi {user?.user?.firstName || " user "} 👋
                  </h1>
                    {todaysSelection != null ? (
                        <>
                            <p className="text-gray-600 mb-[5%]">Today's selection!</p>
                            <div className="flex flex-col md:flex-row gap-4 h-auto sm:h-40">
                                <div className="w-full md:w-[60%] h-full">
                                    <BookCard todaysSelectionResonse={todaysSelection} />
                                </div>
                                <div className="w-full md:w-[35%] h-full">
                                    <EventCard />
                                </div>
                            </div>
                        </>
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
              books={books?.books}
          />

      </SidebarLayout>
  )
}


