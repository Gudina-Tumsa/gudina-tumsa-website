import { ArrowUpRight } from "lucide-react";

interface CategoryCardProps {
    title: string;
}

export const CategoryCard = ({ title }: CategoryCardProps) => {
    return (
        <div className="group flex items-center justify-between rounded-2xl bg-white dark:bg-gray-700 shadow-sm border border-[#EDE6D8] dark:border-gray-600 px-6 py-5 transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 cursor-pointer">
            <h3 className="font-semibold text-[#1C1B19] dark:text-white">
                {title}
            </h3>
            <ArrowUpRight className="h-5 w-5 text-[#B4AC9C] transition-colors group-hover:text-[#1C1B19] dark:group-hover:text-white" />
        </div>
    );
};
