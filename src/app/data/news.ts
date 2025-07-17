export function getNews() {
    const newsData = [
        {
            id: 1,
            title: "Dummy 1",
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
        {
            id: 2,
            title: "Dummy 2",
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
    return newsData;
}