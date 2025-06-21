import { AppSidebar } from "@/app/components/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/app/components/ui/breadcrumb"
import { Separator } from "@/app/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/app/components/ui/sidebar"
import Sidebar from "@/app/components/Sidebar";
import SearchBar from "@/app/components/SearchBar";
import ProgressWidget from "@/app/components/ProgressWidget";
import BookGrid from "@/app/components/BookGrid";

export default function Page() {
  const currentlyReadingBooks = [
    {
      id: "1",
      title: "National Parks of Europe",
      year: "2017",
      coverImage: "https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=400&h=600&fit=crop"
    }
  ];

  const topPicksBooks = [
    {
      id: "2",
      title: "The Art of War",
      year: "2020",
      coverImage: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=600&fit=crop"
    },
    {
      id: "3",
      title: "Digital Marketing",
      year: "2021",
      coverImage: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=400&h=600&fit=crop"
    },
    {
      id: "4",
      title: "Psychology Today",
      year: "2019",
      coverImage: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=400&h=600&fit=crop"
    },
    {
      id: "5",
      title: "Modern Architecture",
      year: "2022",
      coverImage: "https://images.unsplash.com/photo-1527576539890-dfa815648363?w=400&h=600&fit=crop"
    },
    {
      id: "6",
      title: "Climate Change",
      year: "2021",
      coverImage: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=600&fit=crop"
    },
    {
      id: "7",
      title: "Data Science",
      year: "2023",
      coverImage: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=600&fit=crop"
    }
  ];

  return (
    <SidebarProvider>
      <AppSidebar />

      <SidebarInset>
        {/*<header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">*/}
        {/*  <div className="flex items-center gap-2 px-4">*/}
        {/*    <SidebarTrigger className="-ml-1" />*/}


        {/*  </div>*/}
        {/*</header>*/}


        <div className=" w-[70%] mx-auto">




          <main className="">
            <div className="p-8 max-w-7xl mx-auto">
              <SearchBar />
              <div className="flex flex-row justify-between">
                <div className="mb-8">
                  <h1 className="text-2xl font-semibold text-gray-900 mb-2">
                    Good evening abenezer 👋
                  </h1>
                  <p className="text-gray-600">Welcome back!</p>
                </div>
                {/*<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">*/}
                {/*  <ProgressWidget*/}
                {/*      title="Weekly reading progress"*/}
                {/*      subtitle="Complete 3 reading sessions"*/}
                {/*      value="0/3"*/}
                {/*      unit=""*/}
                {/*      linkText="Why am I seeing this?"*/}
                {/*  />*/}
                {/*  <ProgressWidget*/}
                {/*      title="Reading history"*/}
                {/*      subtitle=""*/}
                {/*      value="0"*/}
                {/*      unit="books used"*/}
                {/*  />*/}
                {/*</div>*/}
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
            </div>
          </main>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
