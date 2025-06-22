"use client"
import SearchBar from "@/app/components/SearchBar";
import BookGrid from "@/app/components/BookGrid";
import SidebarLayout from "@/components/layout/sidebar/sidebar-layout";
import { useSelector } from 'react-redux';
import {RootState} from "@/app/store/store";

export default function Page() {

  const user = useSelector((state: RootState) => state.user);

  const currentlyReadingBooks = [
    {
      id: "1",
      title: "National Parks of Europe",
      writer : "Mr writer",
      year: "2017",
      coverImage: "https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=400&h=600&fit=crop"
    }
  ];

  const topPicksBooks = [
    {
      id: "2",
      title: "The Art of War",
      writer : "Mr writer",
      year: "2020",
      coverImage: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=600&fit=crop"
    },
    {
      id: "3",
      title: "Digital Marketing",
      writer : "Mr writer",
      year: "2021",
      coverImage: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=400&h=600&fit=crop"
    },
    {
      id: "4",
      title: "Psychology Today",
      writer : "Mr writer",
      year: "2019",
      coverImage: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=400&h=600&fit=crop"
    },
    {
      id: "5",
      title: "Modern Architecture",
      writer : "Mr writer",
      year: "2022",
      coverImage: "https://images.unsplash.com/photo-1527576539890-dfa815648363?w=400&h=600&fit=crop"
    },
    {
      id: "6",
      title: "Climate Change",
      writer : "Mr writer",
      year: "2021",
      coverImage: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=600&fit=crop"
    },
    {
      id: "7",
      title: "Data Science",
      writer : "Mr writer",
      year: "2023",
      coverImage: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=600&fit=crop"
    }
  ];
  console.log("the user is " ,user)
  return (
      <SidebarLayout>

              <SearchBar />
              <div className="flex flex-row justify-between">
                <div className="mb-8">
                  <h1 className="text-2xl font-semibold text-gray-900 mb-2">
                    Good evening {user?.user?.firstName || " user "} 👋
                  </h1>
                  <p className="text-gray-600">Welcome back!</p>
                </div>

              </div>

              <BookGrid
                  title="Reading"
                  books={currentlyReadingBooks}
                  showCurrentlyReading={true}
              />

              <BookGrid
                  title="Top Picks for you"
                  books={topPicksBooks}
              />

      </SidebarLayout>
  )
}


