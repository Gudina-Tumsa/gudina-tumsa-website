interface CategoryCardProps {
    title: string;

}

export const CategoryCard = ({ title }: CategoryCardProps) => {
    return (
        <div className=" rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200 hover:scale-105 hover:-translate-y-1 cursor-pointer group p-4">
            <div className="flex items-start space-x-4 ">
                <div className="flex-1  p-5 ">
                    <h3 className="text-lg font-[500px] text-gray-900 mb-1 group-hover:text-blue-600 transition-colors duration-200">
                        {title}
                    </h3>
                </div>
            </div>
        </div>
    );
};
