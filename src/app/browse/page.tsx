
import SearchBar from "@/app/components/SearchBar";

import SidebarLayout from "@/components/layout/sidebar/sidebar-layout";
import {CategoryCard} from "@/components/elements/index/browse/CategoryCard";

export default function Page() {


    const categories = [
        {
            id: "architecture",
            title: "Architecture",
            bookCount: "11,350 books",
            icon: "🏛️",
            iconColor: "bg-yellow-100 text-yellow-600",
        },
        {
            id: "art",
            title: "Art",
            bookCount: "21,238 books",
            icon: "🎨",
            iconColor: "bg-red-100 text-red-600",
        },
        {
            id: "biological-sciences",
            title: "Biological Sciences",
            bookCount: "42,390 books",
            icon: "🧬",
            iconColor: "bg-blue-100 text-blue-600",
        },
        {
            id: "business",
            title: "Business",
            bookCount: "94,482 books",
            icon: "🏢",
            iconColor: "bg-red-100 text-red-600",
        },
        {
            id: "computer-science",
            title: "Computer Science",
            bookCount: "29,724 books",
            icon: "💻",
            iconColor: "bg-blue-100 text-blue-600",
        },
        {
            id: "design",
            title: "Design",
            bookCount: "3,264 books",
            icon: "✏️",
            iconColor: "bg-orange-100 text-orange-600",
        },
        {
            id: "economics",
            title: "Economics",
            bookCount: "22,407 books",
            icon: "📊",
            iconColor: "bg-pink-100 text-pink-600",
        },
        {
            id: "education",
            title: "Education",
            bookCount: "59,065 books",
            icon: "🎓",
            iconColor: "bg-red-100 text-red-600",
        },
        {
            id: "history",
            title: "History",
            bookCount: "134,159 books",
            icon: "📚",
            iconColor: "bg-purple-100 text-purple-600",
        },
        {
            id: "languages-linguistics",
            title: "Languages & Linguistics",
            bookCount: "38,914 books",
            icon: "🗣️",
            iconColor: "bg-purple-100 text-purple-600",
        },
        {
            id: "law",
            title: "Law",
            bookCount: "38,652 books",
            icon: "⚖️",
            iconColor: "bg-purple-100 text-purple-600",
        },
        {
            id: "literature",
            title: "Literature",
            bookCount: "172,327 books",
            icon: "📖",
            iconColor: "bg-yellow-100 text-yellow-600",
        },
        {
            id: "mathematics",
            title: "Mathematics",
            bookCount: "13,961 books",
            icon: "🔢",
            iconColor: "bg-blue-100 text-blue-600",
        },
        {
            id: "media-performing-arts",
            title: "Media & Performing Arts",
            bookCount: "31,066 books",
            icon: "🎭",
            iconColor: "bg-orange-100 text-orange-600",
        },
        {
            id: "medicine",
            title: "Medicine",
            bookCount: "51,913 books",
            icon: "🏥",
            iconColor: "bg-blue-100 text-blue-600",
        },
        {
            id: "personal-development",
            title: "Personal Development",
            bookCount: "25,587 books",
            icon: "🌱",
            iconColor: "bg-green-100 text-green-600",
        },
        {
            id: "philosophy",
            title: "Philosophy",
            bookCount: "41,268 books",
            icon: "🤔",
            iconColor: "bg-purple-100 text-purple-600",
        },
        {
            id: "physical-sciences",
            title: "Physical Sciences",
            bookCount: "33,836 books",
            icon: "🔬",
            iconColor: "bg-blue-100 text-blue-600",
        },
    ];

    return (
        <SidebarLayout>

            <SearchBar />
            <div className="">
                <div className="mb-8">
                    <h1 className="text-2xl font-[500px]  mt-[5%] text-gray-900 mb-2">Browse by topic</h1>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-[5%]">
                    {categories.map((category) => (
                        <CategoryCard
                            key={category.id}
                            title={category.title}
                            bookCount={category.bookCount}
                            icon={category.icon}
                            iconColor={category.iconColor}
                        />
                    ))}
                </div>


            </div>



        </SidebarLayout>
    )
}


