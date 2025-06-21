
import SearchBar from "@/app/components/SearchBar";
import BookGrid from "@/app/components/BookGrid";
import SidebarLayout from "@/app/components/sidebar-layout";

export default function Page() {


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
        <SidebarLayout>

            <SearchBar />
            <div className="flex flex-row justify-between">
                <div className="mb-8 mt-[5%]">
                    <h1 className="text-4xl font-[500px] text-gray-900 mb-2">
                        Reading
                    </h1>

                </div>

            </div>



            <BookGrid
                title=""
                books={topPicksBooks}
            />

        </SidebarLayout>
    )
}

