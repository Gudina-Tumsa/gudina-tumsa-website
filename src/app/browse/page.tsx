/* eslint-disable  */
// @ts-nocheck
"use client"
import SearchBar from "@/app/components/SearchBar";
import SidebarLayout from "@/components/layout/sidebar/sidebar-layout";
import {CategoryCard} from "@/components/elements/index/browse/CategoryCard";
import {useAppDispatch} from "@/lib/hooks";
import {useEffect} from "react";
import {getCategories} from "@/lib/api/category";
import {getCategoriesSuccess} from "@/app/store/features/categorySlice";
import {useSelector} from "react-redux";
import {RootState} from "@/app/store/store";
import {useRouter} from "next/navigation";

export default function Page() {
    const router = useRouter();
    const categories = useSelector((state: RootState) => state.category);
    const dispatch = useAppDispatch();

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await getCategories({page: 1, limit: 20});
                dispatch(getCategoriesSuccess(response));
                console.log(response);
            } catch (err: unknown) {
                console.error("Failed to fetch categories:", err);
            }
        };

        fetchCategories();
    }, [dispatch]);

    return (
        <SidebarLayout>
            <div className="w-full flex flex-col justify-between ">
                <div className="mb-8  w-full">
                    <SearchBar/>
                    <h1 className="text-2xl font-[500px] mt-[5%] text-gray-900 mb-2">Browse by topic</h1>
                </div>
                <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-[5%] ">
                    {categories?.categories?.data.categories.map((category) => (
                        <div
                            onClick={() => {
                                router.push(`/bookbycategory/${category.name}`);
                            }}>
                            <CategoryCard
                                key={category._id}
                                title={category.name}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </SidebarLayout>

    )
}
