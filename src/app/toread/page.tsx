
import SearchBar from "@/app/components/SearchBar";
import SidebarLayout from "@/components/layout/sidebar/sidebar-layout";
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

    return (
        <SidebarLayout>

            <SearchBar />
            <div className="flex flex-row justify-between mt-[5%]">
                <div className="mb-2">
                    <h1 className="text-4xl font-[500px] text-gray-900 mb-2">
                        To read
                    </h1>

                </div>

            </div>

            <BookGrid
                title=""
                books={currentlyReadingBooks}
                showCurrentlyReading={true}
            />



        </SidebarLayout>
    )
}


