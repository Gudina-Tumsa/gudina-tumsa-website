"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { Search, ShoppingCart } from "lucide-react";
import SidebarLayout from "@/components/layout/sidebar/sidebar-layout";
import { Skeleton } from "@/components/ui/skeleton";
import ProductCard from "@/components/elements/shop/ProductCard";
import { getProducts } from "@/lib/api/products";
import { getCategories } from "@/lib/api/category";
import { addCartItem } from "@/lib/api/cart";
import { ProductData } from "@/types/product";
import { CategoryData } from "@/types/category";
import { RootState } from "@/app/store/store";
import { useAppDispatch } from "@/lib/hooks";
import { setCart } from "@/app/store/features/cartSlice";

const pillClass = (active: boolean) =>
    `px-4 py-2 rounded-full text-sm font-medium transition-colors cursor-pointer whitespace-nowrap ${
        active
            ? "bg-[#9407F2] text-white"
            : "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-200 hover:border-[#C084FC]"
    }`;

const ProductCardSkeleton = () => (
    <div className="flex flex-col">
        <Skeleton className="aspect-square w-full rounded-2xl" />
        <Skeleton className="mt-3 h-3 w-16 rounded-full" />
        <Skeleton className="mt-2 h-4 w-3/4 rounded-full" />
        <Skeleton className="mt-3 h-9 w-full rounded-full" />
    </div>
);

export default function ShopPage() {
    const user = useSelector((state: RootState) => state.user);
    const cartCount = useSelector(
        (state: RootState) => state.cart.cart?.items?.reduce((sum, i) => sum + i.quantity, 0) ?? 0
    );
    const token = user?.session?.token;
    const dispatch = useAppDispatch();

    const [products, setProducts] = useState<ProductData[]>([]);
    const [categories, setCategories] = useState<CategoryData[]>([]);
    const [categoryFilter, setCategoryFilter] = useState("");
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);
    const [addingId, setAddingId] = useState<string | null>(null);

    useEffect(() => {
        getCategories({ page: 1, limit: 100, appliesTo: "product" })
            .then((res) => setCategories(res.data.categories))
            .catch(() => setCategories([]));
    }, []);

    useEffect(() => {
        setLoading(true);
        getProducts({ category: categoryFilter || undefined, search: search || undefined, limit: 40 })
            .then((res) => setProducts(res.data.products))
            .catch((err) => {
                console.error(err);
                toast.error("Failed to load products");
            })
            .finally(() => setLoading(false));
    }, [categoryFilter, search]);

    const handleAddToCart = async (product: ProductData) => {
        if (!token) {
            toast.error("Please log in to add items to your cart.");
            return;
        }
        setAddingId(product._id);
        try {
            const res = await addCartItem(token, product._id, 1);
            dispatch(setCart(res.data));
            toast.success("Added to cart");
        } catch (err) {
            toast.error(err instanceof Error ? err.message : "Failed to add to cart");
        } finally {
            setAddingId(null);
        }
    };

    return (
        <SidebarLayout>
            <div className="w-full">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6 mb-8">
                    <div>
                        <h1 className="font-extrabold tracking-tight text-4xl sm:text-5xl text-gray-900 dark:text-white mb-1">
                            Shop
                        </h1>
                        <p className="text-gray-500 dark:text-gray-300">Merchandise, resources and keepsakes to support the library</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="relative w-full sm:w-64">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search products..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full h-11 pl-11 pr-4 rounded-full border border-gray-200 bg-white dark:bg-gray-800 dark:border-gray-600 text-sm text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-[#C084FC]/50 focus:border-[#C084FC] placeholder:text-gray-400"
                            />
                        </div>
                        <Link
                            href="/shop/cart"
                            className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:border-[#C084FC] transition-colors"
                            aria-label="Cart"
                        >
                            <ShoppingCart className="h-5 w-5" />
                            {cartCount > 0 && (
                                <span className="absolute -top-1 -right-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#9407F2] px-1 text-[10px] font-semibold text-white">
                                    {cartCount}
                                </span>
                            )}
                        </Link>
                    </div>
                </div>

                <div className="h-px bg-gray-200 dark:bg-gray-700 mb-8" />

                <div className="flex flex-wrap items-center gap-2 mb-8">
                    <button className={pillClass(categoryFilter === "")} onClick={() => setCategoryFilter("")}>
                        All
                    </button>
                    {categories.map((c) => (
                        <button
                            key={c._id}
                            className={pillClass(categoryFilter === c._id)}
                            onClick={() => setCategoryFilter(categoryFilter === c._id ? "" : c._id)}
                        >
                            {c.name}
                        </button>
                    ))}
                </div>

                {loading ? (
                    <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
                        {Array.from({ length: 8 }).map((_, i) => (
                            <ProductCardSkeleton key={i} />
                        ))}
                    </div>
                ) : products.length === 0 ? (
                    <div className="rounded-2xl border border-gray-200 dark:border-gray-800 py-20 text-center text-sm text-gray-500 dark:text-gray-400">
                        No products found.
                    </div>
                ) : (
                    <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
                        {products.map((product) => (
                            <ProductCard
                                key={product._id}
                                product={product}
                                onAddToCart={handleAddToCart}
                                adding={addingId === product._id}
                            />
                        ))}
                    </div>
                )}
            </div>
        </SidebarLayout>
    );
}
