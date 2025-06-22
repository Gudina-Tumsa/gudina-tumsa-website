
import SearchBar from "@/app/components/SearchBar";

import SidebarLayout from "@/app/components/sidebar-layout";
import {CategoryCard} from "@/app/components/browse/CategoryCard";
import BookGrid from "@/app/components/BookGrid";

export default function Page() {


    const categories = [
        {
            id: "2",
            title: "The Art of War",
            year: "2020",
            writer : "Mr writer",
            coverImage: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=600&fit=crop"
        }

    ];

    return (
        <SidebarLayout>

            <SearchBar />
            <div className="flex flex-row justify-between">
                <div className="mb-8 mt-[5%]">
                    <h1 className="text-4xl font-[500px] text-gray-900 mb-2">
                        Completed
                    </h1>

                </div>

            </div>

            <BookGrid
                title=""
                books={categories}
            />

        </SidebarLayout>
    )
}


