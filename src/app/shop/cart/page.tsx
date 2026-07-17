"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { Loader2, Trash2 } from "lucide-react";
import SidebarLayout from "@/components/layout/sidebar/sidebar-layout";
import { getCart, updateCartItem, removeCartItem } from "@/lib/api/cart";
import { RootState } from "@/app/store/store";
import { useAppDispatch } from "@/lib/hooks";
import { setCart } from "@/app/store/features/cartSlice";

export default function CartPage() {
    const user = useSelector((state: RootState) => state.user);
    const cart = useSelector((state: RootState) => state.cart.cart);
    const token = user?.session?.token;
    const dispatch = useAppDispatch();
    const router = useRouter();

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!token) {
            setLoading(false);
            return;
        }
        getCart(token)
            .then((res) => dispatch(setCart(res.data)))
            .catch((err) => {
                console.error(err);
                toast.error("Failed to load cart");
            })
            .finally(() => setLoading(false));
    }, [token, dispatch]);

    const handleQuantityChange = async (productId: string, quantity: number) => {
        if (!token) return;
        try {
            const res = quantity < 1 ? await removeCartItem(token, productId) : await updateCartItem(token, productId, quantity);
            dispatch(setCart(res.data));
        } catch (err) {
            toast.error(err instanceof Error ? err.message : "Failed to update cart");
        }
    };

    const handleRemove = async (productId: string) => {
        if (!token) return;
        try {
            const res = await removeCartItem(token, productId);
            dispatch(setCart(res.data));
        } catch (err) {
            toast.error(err instanceof Error ? err.message : "Failed to update cart");
        }
    };

    if (!token) {
        return (
            <SidebarLayout>
                <div className="py-20 text-center text-sm text-gray-500 dark:text-gray-400">
                    <p>Please log in to view your cart.</p>
                    <Link href="/login" className="mt-4 inline-block rounded-lg bg-[#C084FC] text-white px-6 py-3 font-medium">
                        Log in
                    </Link>
                </div>
            </SidebarLayout>
        );
    }

    if (loading) {
        return (
            <SidebarLayout>
                <div className="flex items-center justify-center gap-2 py-20 text-sm text-gray-500 dark:text-gray-400">
                    <Loader2 className="h-4 w-4 animate-spin" /> Loading cart…
                </div>
            </SidebarLayout>
        );
    }

    const items = cart?.items ?? [];

    return (
        <SidebarLayout>
            <div className="mx-auto max-w-3xl">
                <h1 className="mb-6 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">Your cart</h1>

                {items.length === 0 ? (
                    <div className="rounded-2xl border border-gray-200 dark:border-gray-800 p-10 text-center text-sm text-gray-500 dark:text-gray-400">
                        Your cart is empty.{" "}
                        <Link href="/shop" className="text-[#C084FC] hover:underline">
                            Browse the shop
                        </Link>
                    </div>
                ) : (
                    <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 divide-y divide-gray-100 dark:divide-gray-800">
                        {items.map(
                            (item) =>
                                item.product && (
                                    <div key={item.product._id} className="flex items-center gap-4 p-5">
                                        <div className="h-16 w-16 shrink-0 overflow-hidden rounded-md bg-gray-100 dark:bg-gray-800">
                                            {item.product.images[0] && (
                                                <img
                                                    src={`${process.env.NEXT_PUBLIC_BASE_URL}${item.product.images[0]}`}
                                                    alt={item.product.name}
                                                    className="h-full w-full object-cover"
                                                />
                                            )}
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                                                {item.product.name}
                                            </p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">{item.product.price} ETB each</p>
                                            <div className="mt-2 flex items-center gap-2">
                                                <input
                                                    type="number"
                                                    min={1}
                                                    max={item.product.isDigital ? undefined : item.product.stock}
                                                    value={item.quantity}
                                                    onChange={(e) =>
                                                        handleQuantityChange(
                                                            item.product!._id,
                                                            Math.max(1, Number(e.target.value) || 1)
                                                        )
                                                    }
                                                    className="w-16 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-2 py-1 text-sm text-gray-900 dark:text-white"
                                                />
                                                <button
                                                    onClick={() => handleRemove(item.product!._id)}
                                                    className="text-gray-400 hover:text-red-600 dark:hover:text-red-400"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </button>
                                            </div>
                                        </div>
                                        <p className="shrink-0 text-sm font-semibold text-gray-900 dark:text-white">{item.lineTotal} ETB</p>
                                    </div>
                                )
                        )}
                    </div>
                )}

                {items.length > 0 && (
                    <div className="mt-6 flex items-center justify-between rounded-2xl border border-gray-200 dark:border-gray-800 p-5">
                        <p className="text-lg font-semibold text-gray-900 dark:text-white">Subtotal: {cart?.subtotal ?? 0} ETB</p>
                        <button
                            onClick={() => router.push("/shop/checkout")}
                            className="rounded-lg bg-[#C084FC] text-white px-6 py-3 font-medium hover:bg-[#C084FC]/90 transition-colors"
                        >
                            Checkout
                        </button>
                    </div>
                )}
            </div>
        </SidebarLayout>
    );
}
