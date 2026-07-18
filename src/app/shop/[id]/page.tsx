"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { Minus, Plus, ShoppingCart } from "lucide-react";
import SidebarLayout from "@/components/layout/sidebar/sidebar-layout";
import { Skeleton } from "@/components/ui/skeleton";
import { getProduct } from "@/lib/api/products";
import { addCartItem } from "@/lib/api/cart";
import { ProductData } from "@/types/product";
import { RootState } from "@/app/store/store";
import { useAppDispatch } from "@/lib/hooks";
import { setCart } from "@/app/store/features/cartSlice";

export default function ProductDetailPage() {
    const params = useParams<{ id: string }>();
    const router = useRouter();
    const user = useSelector((state: RootState) => state.user);
    const token = user?.session?.token;
    const dispatch = useAppDispatch();

    const [product, setProduct] = useState<ProductData | null>(null);
    const [quantity, setQuantity] = useState(1);
    const [loading, setLoading] = useState(true);
    const [adding, setAdding] = useState(false);

    useEffect(() => {
        if (!params?.id) return;
        getProduct(params.id)
            .then((res) => setProduct(res.data.product))
            .catch((err) => {
                console.error(err);
                toast.error("Product not found");
            })
            .finally(() => setLoading(false));
    }, [params?.id]);

    const handleAddToCart = async () => {
        if (!product) return;
        if (!token) {
            toast.error("Please log in to add items to your cart.");
            router.push("/login");
            return;
        }
        setAdding(true);
        try {
            const res = await addCartItem(token, product._id, quantity);
            dispatch(setCart(res.data));
            toast.success("Added to cart");
        } catch (err) {
            toast.error(err instanceof Error ? err.message : "Failed to add to cart");
        } finally {
            setAdding(false);
        }
    };

    const clampQuantity = (value: number) =>
        product?.isDigital ? Math.max(1, value) : Math.max(1, Math.min(product?.stock ?? 1, value));

    if (loading) {
        return (
            <SidebarLayout>
                <div className="mx-auto max-w-4xl grid gap-8 sm:grid-cols-2">
                    <Skeleton className="aspect-square w-full rounded-2xl" />
                    <div className="space-y-4">
                        <Skeleton className="h-5 w-24 rounded-full" />
                        <Skeleton className="h-8 w-3/4 rounded-full" />
                        <Skeleton className="h-6 w-24 rounded-full" />
                        <Skeleton className="h-20 w-full rounded-xl" />
                        <Skeleton className="h-12 w-full rounded-full" />
                    </div>
                </div>
            </SidebarLayout>
        );
    }

    if (!product) {
        return (
            <SidebarLayout>
                <div className="py-20 text-center text-sm text-gray-500 dark:text-gray-400">Product not found.</div>
            </SidebarLayout>
        );
    }

    const outOfStock = !product.isDigital && product.stock === 0;
    const categoryName = typeof product.category === "string" ? undefined : product.category?.name;

    return (
        <SidebarLayout>
            <div className="mx-auto max-w-4xl grid gap-8 sm:grid-cols-2">
                <div className="relative aspect-square overflow-hidden rounded-2xl bg-gray-100 shadow-sm dark:bg-gray-800">
                    {product.images[0] ? (
                        <img
                            src={`${process.env.NEXT_PUBLIC_BASE_URL}${product.images[0]}`}
                            alt={product.name}
                            className="h-full w-full object-cover"
                        />
                    ) : (
                        <div className="flex h-full w-full items-center justify-center text-sm text-gray-400 dark:text-gray-500">
                            No image
                        </div>
                    )}
                </div>

                <div>
                    <div className="flex flex-wrap items-center gap-2">
                        {categoryName && (
                            <span className="rounded-full bg-gray-100 dark:bg-gray-800 px-2.5 py-0.5 text-xs font-medium text-gray-600 dark:text-gray-300">
                                {categoryName}
                            </span>
                        )}
                        {product.isDigital && (
                            <span className="rounded-full bg-[#9407F2]/10 px-2.5 py-0.5 text-xs font-semibold text-[#9407F2] dark:bg-[#C084FC]/10 dark:text-[#C084FC]">
                                Digital download
                            </span>
                        )}
                    </div>

                    <h1 className="mt-3 font-extrabold tracking-tight text-3xl text-gray-900 dark:text-white">
                        {product.name}
                    </h1>
                    <p className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">
                        {product.price} <span className="text-sm font-normal text-gray-500 dark:text-gray-400">{product.currency}</span>
                    </p>
                    <p className="mt-4 text-sm leading-relaxed text-gray-600 dark:text-gray-300 whitespace-pre-line">
                        {product.description}
                    </p>

                    {!product.isDigital && (
                        <p className={`mt-4 text-xs font-medium ${outOfStock ? "text-red-600 dark:text-red-400" : "text-gray-500 dark:text-gray-400"}`}>
                            {outOfStock ? "Out of stock" : `${product.stock} in stock`}
                        </p>
                    )}

                    <div className="mt-6 flex items-center gap-3">
                        <div className="flex items-center rounded-full border border-gray-300 dark:border-gray-600">
                            <button
                                type="button"
                                onClick={() => setQuantity((q) => clampQuantity(q - 1))}
                                disabled={outOfStock}
                                className="flex h-11 w-11 items-center justify-center text-gray-500 hover:text-gray-900 disabled:opacity-40 dark:text-gray-400 dark:hover:text-white"
                                aria-label="Decrease quantity"
                            >
                                <Minus className="h-4 w-4" />
                            </button>
                            <span className="w-8 text-center text-sm font-semibold text-gray-900 dark:text-white">
                                {quantity}
                            </span>
                            <button
                                type="button"
                                onClick={() => setQuantity((q) => clampQuantity(q + 1))}
                                disabled={outOfStock}
                                className="flex h-11 w-11 items-center justify-center text-gray-500 hover:text-gray-900 disabled:opacity-40 dark:text-gray-400 dark:hover:text-white"
                                aria-label="Increase quantity"
                            >
                                <Plus className="h-4 w-4" />
                            </button>
                        </div>
                        <button
                            onClick={handleAddToCart}
                            disabled={adding || outOfStock}
                            className="flex flex-1 items-center justify-center gap-2 rounded-full bg-[#9407F2] py-3 font-semibold text-white transition-colors hover:bg-[#7d06cc] disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            <ShoppingCart className="h-4 w-4" />
                            {adding ? "Adding…" : outOfStock ? "Out of stock" : "Add to cart"}
                        </button>
                    </div>
                </div>
            </div>
        </SidebarLayout>
    );
}
