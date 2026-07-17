"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import SidebarLayout from "@/components/layout/sidebar/sidebar-layout";
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

    if (loading) {
        return (
            <SidebarLayout>
                <div className="py-20 text-center text-sm text-gray-500 dark:text-gray-400">Loading…</div>
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

    return (
        <SidebarLayout>
            <div className="mx-auto max-w-4xl grid gap-8 sm:grid-cols-2">
                <div className="aspect-square rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800">
                    {product.images[0] && (
                        <img
                            src={`${process.env.NEXT_PUBLIC_BASE_URL}${product.images[0]}`}
                            alt={product.name}
                            className="h-full w-full object-cover"
                        />
                    )}
                </div>
                <div>
                    {product.isDigital && (
                        <span className="mb-2 inline-block rounded-full bg-[#C084FC]/10 px-2.5 py-0.5 text-xs font-medium text-[#C084FC]">
                            Digital download
                        </span>
                    )}
                    <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">{product.name}</h1>
                    <p className="mt-2 text-xl font-bold text-gray-900 dark:text-white">{product.price} ETB</p>
                    <p className="mt-4 text-sm text-gray-600 dark:text-gray-300 whitespace-pre-line">{product.description}</p>
                    {!product.isDigital && (
                        <p className="mt-4 text-xs text-gray-500 dark:text-gray-400">
                            {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
                        </p>
                    )}

                    <div className="mt-6 flex items-center gap-3">
                        <input
                            type="number"
                            min={1}
                            max={product.isDigital ? undefined : product.stock}
                            value={quantity}
                            onChange={(e) =>
                                setQuantity(
                                    product.isDigital
                                        ? Math.max(1, Number(e.target.value) || 1)
                                        : Math.max(1, Math.min(product.stock, Number(e.target.value) || 1))
                                )
                            }
                            className="w-20 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-sm text-gray-900 dark:text-white"
                        />
                        <button
                            onClick={handleAddToCart}
                            disabled={adding || (!product.isDigital && product.stock === 0)}
                            className="flex-1 rounded-lg bg-[#C084FC] text-white font-medium py-3 hover:bg-[#C084FC]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {adding ? "Adding…" : !product.isDigital && product.stock === 0 ? "Out of stock" : "Add to cart"}
                        </button>
                    </div>
                </div>
            </div>
        </SidebarLayout>
    );
}
