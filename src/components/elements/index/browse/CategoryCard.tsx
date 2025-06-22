interface CategoryCardProps {
    title: string;
    bookCount: string;
    icon: string;
    iconColor: string;
}

export const CategoryCard = ({ title, bookCount, icon, iconColor }: CategoryCardProps) => {
    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all duration-200 hover:scale-105 hover:-translate-y-1 cursor-pointer group">
            <div className="flex items-start space-x-4">
                <div className={`w-12 h-12 rounded-lg ${iconColor} flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-200`}>
                    {icon}
                </div>
                <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-[500px] text-gray-900 mb-1 group-hover:text-blue-600 transition-colors duration-200">
                        {title}
                    </h3>
                    <p className="text-sm text-gray-500">
                        {bookCount}
                    </p>
                </div>
            </div>
        </div>
    );
};
