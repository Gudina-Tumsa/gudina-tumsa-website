"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { ArrowRight, Loader2, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import SidebarLayout from "@/components/layout/sidebar/sidebar-layout";
import { Skeleton } from "@/components/ui/skeleton";
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
    const [pendingId, setPendingId] = useState<string | null>(null);

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
        setPendingId(productId);
        try {
            const res = quantity < 1 ? await removeCartItem(token, productId) : await updateCartItem(token, productId, quantity);
            dispatch(setCart(res.data));
        } catch (err) {
            toast.error(err instanceof Error ? err.message : "Failed to update cart");
        } finally {
            setPendingId(null);
        }
    };

    const handleRemove = async (productId: string) => {
        if (!token) return;
        setPendingId(productId);
        try {
            const res = await removeCartItem(token, productId);
            dispatch(setCart(res.data));
        } catch (err) {
            toast.error(err instanceof Error ? err.message : "Failed to update cart");
        } finally {
            setPendingId(null);
        }
    };

    if (!token) {
        return (
            <SidebarLayout>
                <div className="mx-auto max-w-md py-20 text-center">
                    <ShoppingBag className="mx-auto h-10 w-10 text-gray-300 dark:text-gray-600" />
                    <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">Please log in to view your cart.</p>
                    <Link
                        href="/login"
                        className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#9407F2] px-6 py-3 text-sm font-semibold text-white hover:bg-[#7d06cc] transition-colors"
                    >
                        Log in
                    </Link>
                </div>
            </SidebarLayout>
        );
    }

    if (loading) {
        return (
            <SidebarLayout>
                <div className="mx-auto max-w-4xl">
                    <Skeleton className="mb-8 h-10 w-48 rounded-full" />
                    <div className="grid gap-8 lg:grid-cols-3">
                        <div className="space-y-4 lg:col-span-2">
                            {Array.from({ length: 3 }).map((_, i) => (
                                <Skeleton key={i} className="h-28 w-full rounded-2xl" />
                            ))}
                        </div>
                        <Skeleton className="h-56 w-full rounded-2xl" />
                    </div>
                </div>
            </SidebarLayout>
        );
    }

    const items = cart?.items ?? [];
    const itemCount = items.reduce((sum, i) => sum + i.quantity, 0);

    return (
        <SidebarLayout>
            <div className="mx-auto max-w-4xl">
                <div className="mb-8">
                    <h1 className="font-extrabold tracking-tight text-4xl sm:text-5xl text-gray-900 dark:text-white mb-1">
                        Your cart
                    </h1>
                    <p className="text-gray-500 dark:text-gray-300">
                        {itemCount > 0 ? `${itemCount} item${itemCount === 1 ? "" : "s"}` : "No items yet"}
                    </p>
                </div>

                {items.length === 0 ? (
                    <div className="rounded-2xl border border-gray-200 dark:border-gray-800 py-20 text-center">
                        <ShoppingBag className="mx-auto h-10 w-10 text-gray-300 dark:text-gray-600" />
                        <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">Your cart is empty.</p>
                        <Link
                            href="/shop"
                            className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#9407F2] px-6 py-3 text-sm font-semibold text-white hover:bg-[#7d06cc] transition-colors"
                        >
                            Browse the shop
                        </Link>
                    </div>
                ) : (
                    <div className="grid gap-8 lg:grid-cols-3 lg:items-start">
                        <div className="space-y-3 lg:col-span-2">
                            {items.map(
                                (item) =>
                                    item.product && (
                                        <div
                                            key={item.product._id}
                                            className="flex items-center gap-4 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-4 shadow-sm"
                                        >
                                            <Link
                                                href={`/shop/${item.product._id}`}
                                                className="h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-800"
                                            >
                                                {item.product.images[0] && (
                                                    <img
                                                        src={`${process.env.NEXT_PUBLIC_BASE_URL}${item.product.images[0]}`}
                                                        alt={item.product.name}
                                                        className="h-full w-full object-cover"
                                                    />
                                                )}
                                            </Link>
                                            <div className="min-w-0 flex-1">
                                                <Link
                                                    href={`/shop/${item.product._id}`}
                                                    className="line-clamp-1 text-sm font-semibold text-gray-900 hover:underline dark:text-white"
                                                >
                                                    {item.product.name}
                                                </Link>
                                                <p className="text-xs text-gray-500 dark:text-gray-400">{item.product.price} ETB each</p>
                                                <div className="mt-2 flex items-center gap-3">
                                                    <div className="flex items-center rounded-full border border-gray-300 dark:border-gray-600">
                                                        <button
                                                            onClick={() => handleQuantityChange(item.product!._id, item.quantity - 1)}
                                                            disabled={pendingId === item.product._id}
                                                            className="flex h-8 w-8 items-center justify-center text-gray-500 hover:text-gray-900 disabled:opacity-40 dark:text-gray-400 dark:hover:text-white"
                                                            aria-label="Decrease quantity"
                                                        >
                                                            <Minus className="h-3.5 w-3.5" />
                                                        </button>
                                                        <span className="w-6 text-center text-sm font-semibold text-gray-900 dark:text-white">
                                                            {item.quantity}
                                                        </span>
                                                        <button
                                                            onClick={() => handleQuantityChange(item.product!._id, item.quantity + 1)}
                                                            disabled={
                                                                pendingId === item.product._id ||
                                                                (!item.product.isDigital && item.quantity >= item.product.stock)
                                                            }
                                                            className="flex h-8 w-8 items-center justify-center text-gray-500 hover:text-gray-900 disabled:opacity-40 dark:text-gray-400 dark:hover:text-white"
                                                            aria-label="Increase quantity"
                                                        >
                                                            <Plus className="h-3.5 w-3.5" />
                                                        </button>
                                                    </div>
                                                    <button
                                                        onClick={() => handleRemove(item.product!._id)}
                                                        disabled={pendingId === item.product._id}
                                                        className="text-gray-400 hover:text-red-600 disabled:opacity-40 dark:hover:text-red-400"
                                                        aria-label="Remove item"
                                                    >
                                                        {pendingId === item.product._id ? (
                                                            <Loader2 className="h-4 w-4 animate-spin" />
                                                        ) : (
                                                            <Trash2 className="h-4 w-4" />
                                                        )}
                                                    </button>
                                                </div>
                                            </div>
                                            <p className="shrink-0 text-sm font-semibold text-gray-900 dark:text-white">{item.lineTotal} ETB</p>
                                        </div>
                                    )
                            )}
                        </div>

                        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 shadow-sm lg:sticky lg:top-6">
                            <h2 className="text-base font-semibold text-gray-900 dark:text-white mb-4">Order summary</h2>
                            <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-300 mb-1">
                                <span>Subtotal</span>
                                <span>{cart?.subtotal ?? 0} ETB</span>
                            </div>
                            <p className="text-xs text-gray-400 dark:text-gray-500 mb-4">Shipping calculated at checkout</p>
                            <div className="h-px bg-gray-100 dark:bg-gray-800 mb-4" />
                            <div className="flex items-center justify-between mb-6">
                                <span className="font-semibold text-gray-900 dark:text-white">Total</span>
                                <span className="text-lg font-bold text-gray-900 dark:text-white">{cart?.subtotal ?? 0} ETB</span>
                            </div>
                            <button
                                onClick={() => router.push("/shop/checkout")}
                                className="flex w-full items-center justify-center gap-2 rounded-full bg-[#9407F2] py-3 font-semibold text-white hover:bg-[#7d06cc] transition-colors"
                            >
                                Checkout <ArrowRight className="h-4 w-4" />
                            </button>
                            <Link
                                href="/shop"
                                className="mt-3 block text-center text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                            >
                                Continue shopping
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </SidebarLayout>
    );
}
