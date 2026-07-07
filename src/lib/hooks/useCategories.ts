import { useEffect, useState } from "react";
import { getCategories } from "@/lib/api/category";
import { CategoryData } from "@/types/category";

export const useCategories = () => {
    const [categories, setCategories] = useState<CategoryData[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let cancelled = false;

        getCategories({ page: 1, limit: 50 })
            .then((response) => {
                if (!cancelled) setCategories(response?.data?.categories ?? []);
            })
            .catch((err) => console.error("Failed to load categories:", err))
            .finally(() => {
                if (!cancelled) setLoading(false);
            });

        return () => {
            cancelled = true;
        };
    }, []);

    return { categories, loading };
};