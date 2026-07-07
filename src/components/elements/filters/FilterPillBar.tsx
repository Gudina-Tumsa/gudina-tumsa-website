"use client";

import { CategoryData } from "@/types/category";
import { CatalogFilters, FORMAT_OPTIONS, SORT_OPTIONS } from "./types";

interface FilterPillBarProps {
    categories: CategoryData[];
    filters: CatalogFilters;
    onChange: (filters: CatalogFilters) => void;
}

const pillClass = (active: boolean) =>
    `px-4 py-2 rounded-full text-sm font-medium transition-colors cursor-pointer whitespace-nowrap ${
        active
            ? "bg-[#9407F2] text-white"
            : "bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-200 hover:border-[#C084FC]"
    }`;

const FilterPillBar = ({ categories, filters, onChange }: FilterPillBarProps) => {
    return (
        <div className="flex flex-wrap items-center gap-2 mb-8">
            <button className={pillClass(filters.category === "")} onClick={() => onChange({ ...filters, category: "" })}>
                All
            </button>
            {categories.map((category) => (
                <button
                    key={category._id}
                    className={pillClass(filters.category === category.name)}
                    onClick={() => onChange({ ...filters, category: category.name })}
                >
                    {category.name}
                </button>
            ))}

            <span className="w-px h-5 bg-gray-200 dark:bg-gray-600 mx-1" />

            {FORMAT_OPTIONS.filter((option) => option.value !== "").map((option) => (
                <button
                    key={option.value}
                    className={pillClass(filters.contentType === option.value)}
                    onClick={() =>
                        onChange({
                            ...filters,
                            contentType: filters.contentType === option.value ? "" : option.value,
                        })
                    }
                >
                    {option.value === "Book" ? "eBooks" : "Audiobooks"}
                </button>
            ))}

            <select
                aria-label="Sort"
                className="ml-auto bg-transparent text-sm font-medium text-gray-600 dark:text-gray-300 outline-none cursor-pointer"
                value={filters.sort}
                onChange={(e) => onChange({ ...filters, sort: e.target.value as CatalogFilters["sort"] })}
            >
                {SORT_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                        Sort: {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default FilterPillBar;
