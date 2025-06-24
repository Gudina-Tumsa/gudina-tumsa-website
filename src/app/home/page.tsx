"use client"
import SearchBar from "@/app/components/SearchBar";
import BookGrid from "@/app/components/BookGrid";
import SidebarLayout from "@/components/layout/sidebar/sidebar-layout";
import { useSelector } from 'react-redux';
import {RootState} from "@/app/store/store";
import {useAppDispatch} from "@/lib/hooks";
import {useEffect} from "react";
import {getBooks} from "@/lib/api/book";
import {getBooksSuccess} from "@/app/store/features/bookSlice";

const BookCard = () => {
    return (
        <div className="bg-yellow-50  rounded-lg shadow-md w-full h-full  p-6 ">
            <div className="flex flex-col md:flex-row gap-6 h-full">

                <div className="md:w-1/2">
                    <h3 className="text-xl font-semibold text-gray-800">The New Psychology of Success</h3>
                    <p className="text-gray-600 mt-2">Carol Dweck</p>


                    <hr className="my-4 border-gray-200 md:hidden" />
                </div>


                <div className="hidden md:block border-l border-gray-200"></div>


                <div className="md:w-1/2 h-full">
                    <div className="flex flex-col sm:flex-row gap-6 items-center h-full">

                        <div className="w-full sm:w-[50%] h-[100%] bg-gray-200 rounded-lg flex items-center justify-center text-gray-500 overflow-hidden">
                            <img
                                className="w-full h-full object-cover"
                                src="https://images.unsplash.com/photo-1511108690759-009324a90311?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Ym9vayUyMGNvdmVyfGVufDB8fDB8fHww"
                                alt="Book cover"
                            />
                        </div>

                        <div className="flex flex-col gap-3 w-full sm:w-auto">
                            <button className="bg-black hover:bg-gray-800 text-white rounded-md px-4 py-2 transition-colors">
                                Read
                            </button>
                            <button className="bg-white hover:bg-gray-100 border border-gray-300 text-gray-800 rounded-md px-4 py-2 transition-colors">
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};



const EventCard = () => {
    return (
        <div className="bg-yellow-50 p-4 rounded shadow-md w-full h-full">
            <h3 className="text-base font-medium text-gray-800 mb-2">
                Upcoming Events
            </h3>
            <ul className="list-disc pl-4 text-sm text-gray-600">
                <li>Event 1: Workshop on Productivity</li>
                <li>Event 2: Webinar on AI Trends</li>
                <li>Event 3: Meetup for Designers</li>
            </ul>
        </div>
    );
};

export default function Page() {

  const user = useSelector((state: RootState) => state.user);
  const books = useSelector((state: RootState) => state.book)

  const dispatch = useAppDispatch();
  useEffect(() => {

    const fetchBooks = async () => {
      try {
        const response = await getBooks({page: 1, limit: 20})
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
                  <p className="text-gray-600 mb-[5%]">Todays selection!</p>
                    <div className="flex flex-col md:flex-row gap-4 h-auto sm:h-40">
                        <div className="w-full md:w-[60%] h-full">
                            <BookCard />
                        </div>
                        <div className="w-full md:w-[35%] h-full">
                            <EventCard />
                        </div>
                    </div>
                </div>

              </div>

          <BookGrid
              title="Reading"
              userId={user?.user?._id ?? ""}
              books={books?.books}
              showCurrentlyReading={true}
          />

          <BookGrid
              userId={user?.user?._id ?? ""}
              title="Top Picks for you"
              books={books?.books}
          />

      </SidebarLayout>
  )
}


