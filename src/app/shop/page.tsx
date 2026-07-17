"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { ShoppingCart } from "lucide-react";
import SidebarLayout from "@/components/layout/sidebar/sidebar-layout";
import { getProducts } from "@/lib/api/products";
import { getCategories } from "@/lib/api/category";
import { addCartItem } from "@/lib/api/cart";
import { ProductData } from "@/types/product";
import { CategoryData } from "@/types/category";
import { RootState } from "@/app/store/store";
import { useAppDispatch } from "@/lib/hooks";
import { setCart } from "@/app/store/features/cartSlice";

export default function ShopPage() {
    const user = useSelector((state: RootState) => state.user);
    const token = user?.session?.token;
    const dispatch = useAppDispatch();

    const [products, setProducts] = useState<ProductData[]>([]);
    const [categories, setCategories] = useState<CategoryData[]>([]);
    const [categoryFilter, setCategoryFilter] = useState("");
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);

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
        try {
            const res = await addCartItem(token, product._id, 1);
            dispatch(setCart(res.data));
            toast.success("Added to cart");
        } catch (err) {
            toast.error(err instanceof Error ? err.message : "Failed to add to cart");
        }
    };

    return (
        <SidebarLayout>
            <div className="mx-auto max-w-6xl">
                <div className="mb-6 flex items-center justify-between">
                    <h1 className="text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">Shop</h1>
                    <Link
                        href="/shop/cart"
                        className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                    >
                        <ShoppingCart className="h-5 w-5" />
                        Cart
                    </Link>
                </div>

                <div className="mb-6 flex flex-wrap gap-3">
                    <input
                        type="text"
                        placeholder="Search products..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-sm text-gray-900 dark:text-white"
                    />
                    <select
                        value={categoryFilter}
                        onChange={(e) => setCategoryFilter(e.target.value)}
                        className="rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-sm text-gray-900 dark:text-white"
                    >
                        <option value="">All categories</option>
                        {categories.map((c) => (
                            <option key={c._id} value={c._id}>
                                {c.name}
                            </option>
                        ))}
                    </select>
                </div>

                {loading ? (
                    <div className="py-20 text-center text-sm text-gray-500 dark:text-gray-400">Loading products…</div>
                ) : products.length === 0 ? (
                    <div className="py-20 text-center text-sm text-gray-500 dark:text-gray-400">No products found.</div>
                ) : (
                    <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
                        {products.map((product) => (
                            <div
                                key={product._id}
                                className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 overflow-hidden"
                            >
                                <Link href={`/shop/${product._id}`}>
                                    <div className="aspect-square bg-gray-100 dark:bg-gray-800">
                                        {product.images[0] && (
                                            <img
                                                src={`${process.env.NEXT_PUBLIC_BASE_URL}${product.images[0]}`}
                                                alt={product.name}
                                                className="h-full w-full object-cover"
                                            />
                                        )}
                                    </div>
                                </Link>
                                <div className="p-3">
                                    <Link
                                        href={`/shop/${product._id}`}
                                        className="line-clamp-1 text-sm font-medium text-gray-900 dark:text-white hover:underline"
                                    >
                                        {product.name}
                                    </Link>
                                    <p className="mt-1 text-sm font-semibold text-gray-900 dark:text-white">{product.price} ETB</p>
                                    <button
                                        onClick={() => handleAddToCart(product)}
                                        disabled={!product.isDigital && product.stock === 0}
                                        className="mt-2 w-full rounded-lg bg-[#C084FC] text-white text-xs font-medium py-2 hover:bg-[#C084FC]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {!product.isDigital && product.stock === 0 ? "Out of stock" : "Add to cart"}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </SidebarLayout>
    );
}
