"use client"
import React from "react";
import { ArrowLeftIcon, CalendarIcon, UserIcon, ClockIcon } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

// Mock data - replace with your actual data fetching logic
const newsData = [
    {
        id: 1,
        title: "New Research Breakthrough in Renewable Energy",
        category: "Research",
        date: "2023-05-15",
        author: "Lorem ipsum",
        readTime: "4 min read",
        excerpt: "Scientists have discovered a new method to improve solar panel efficiency by up to 40% using novel nanomaterials.",
        content: `
            <p class="mb-4">In a groundbreaking study published today in Nature Energy, researchers from the National Renewable Energy Laboratory have demonstrated a new approach to solar cell design that could significantly improve photovoltaic efficiency while reducing manufacturing costs.</p>
            
            <h2 class="text-xl font-bold mt-6 mb-3">The Breakthrough</h2>
            <p class="mb-4">The team developed a new class of perovskite materials that can be layered onto traditional silicon solar cells, capturing more of the sun's energy spectrum. This tandem approach has previously been limited by stability issues, but the new formulation appears to solve these problems.</p>
            
            <blockquote class="border-l-4 border-blue-500 pl-4 italic my-6 text-gray-600">
                "This is the most promising development we've seen in photovoltaics in the last decade," said lead researcher Dr. Johnson.
            </blockquote>
            
            <h2 class="text-xl font-bold mt-6 mb-3">Commercial Potential</h2>
            <p class="mb-4">Early estimates suggest the new technology could reduce the levelized cost of solar electricity by 15-20% once scaled to production. Several major solar manufacturers have already expressed interest in licensing the technology.</p>
            
            <p class="mb-4">The research team is now working with industry partners to develop pilot manufacturing lines, with hopes of having commercial products available within 3-5 years.</p>
            
            <h2 class="text-xl font-bold mt-6 mb-3">Environmental Impact</h2>
            <p class="mb-4">If widely adopted, this technology could accelerate the transition to renewable energy by making solar power more cost-competitive with fossil fuels. Analysts project it could prevent millions of tons of CO2 emissions annually by 2030.</p>
        `,
        image: "/images/news-1.jpg",
        related: [
            { id: 2, title: "Global Solar Capacity Reaches New Milestone", category: "Industry" },
            { id: 3, title: "Government Announces New Clean Energy Grants", category: "Policy" }
        ]
    },
];

const NewsPage = () => {
    const params = useParams();
    const router = useRouter();
    const id = params?.id as string;

    const newsItem = newsData.find(item => item.id === parseInt(id));

    if (!newsItem) {
        return (
            <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-5xl mx-auto">
                    <p className="text-center text-xl">News article not found</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-6">
                    <button
                        onClick={() => router.push('/newsandevents')}
                        className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
                    >
                        <ArrowLeftIcon className="h-5 w-5 mr-2" />
                        <span className="font-medium">Back to News</span>
                    </button>
                </div>

                <article className="bg-white rounded-xl shadow-lg overflow-hidden">
                    {/* Featured Image */}
                    {newsItem.image && (
                        <div className="h-96 w-full overflow-hidden">
                            <img
                                src={newsItem.image}
                                alt={newsItem.title}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    )}

                    <div className="p-8">
                        {/* Category and Metadata */}
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                            <div>
                                <span className="inline-block px-3 py-1 text-sm font-semibold text-blue-600 bg-blue-50 rounded-full">
                                    {newsItem.category}
                                </span>
                            </div>
                            <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                                <div className="flex items-center">
                                    <UserIcon className="h-4 w-4 mr-1" />
                                    {newsItem.author}
                                </div>
                                <div className="flex items-center">
                                    <CalendarIcon className="h-4 w-4 mr-1" />
                                    {new Date(newsItem.date).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })}
                                </div>
                                <div className="flex items-center">
                                    <ClockIcon className="h-4 w-4 mr-1" />
                                    {newsItem.readTime}
                                </div>
                            </div>
                        </div>

                        {/* Title */}
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
                            {newsItem.title}
                        </h1>

                        {/* Excerpt */}
                        <p className="text-lg text-gray-600 mb-8 font-medium">
                            {newsItem.excerpt}
                        </p>

                        {/* Content */}
                        <div
                            className="prose max-w-none text-gray-700"
                            dangerouslySetInnerHTML={{ __html: newsItem.content }}
                        />

                        {/* Related Articles */}
                        {newsItem.related && newsItem.related.length > 0 && (
                            <div className="mt-12 pt-8 border-t border-gray-200">
                                <h3 className="text-xl font-bold text-gray-900 mb-6">Related News</h3>
                                <div className="grid gap-4">
                                    {newsItem.related.map(item => (
                                        <div
                                            key={item.id}
                                            className="p-4 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors"
                                            onClick={() => router.push(`/news/${item.id}`)}
                                        >
                                            <span className="text-sm font-medium text-blue-600">{item.category}</span>
                                            <p className="font-medium text-gray-900">{item.title}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </article>
            </div>
        </div>
    );
};

export default NewsPage;