"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import SidebarLayout from "@/components/layout/sidebar/sidebar-layout";
import { Skeleton } from "@/components/ui/skeleton";
import { getOrder } from "@/lib/api/orders";
import { OrderData } from "@/types/order";
import { CheckCircle2, Clock, PackageSearch, XCircle } from "lucide-react";

const MAX_ATTEMPTS = 5;
const POLL_INTERVAL_MS = 3000;

type Status = "checking" | "paid" | "pending" | "error" | "missing";

export default function OrderCompletePage() {
    return (
        <Suspense
            fallback={
                <SidebarLayout>
                    <div className="mx-auto max-w-md py-24">
                        <Skeleton className="h-72 w-full rounded-2xl" />
                    </div>
                </SidebarLayout>
            }
        >
            <OrderCompleteContent />
        </Suspense>
    );
}

function OrderCompleteContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const user = useSelector((state: RootState) => state.user);
    const token = user?.session?.token;

    const orderId = searchParams.get("orderId");
    const [status, setStatus] = useState<Status>(orderId ? "checking" : "missing");
    const [order, setOrder] = useState<OrderData | null>(null);
    const attemptsRef = useRef(0);

    const checkOnce = async () => {
        if (!token || !orderId) return false;
        try {
            const response = await getOrder(token, orderId);
            if (response.data.order.status !== "pending_payment") {
                setOrder(response.data.order);
                setStatus("paid");
                return true;
            }
        } catch (err) {
            console.error("Failed to check order status:", err);
            setStatus("error");
            return true;
        }
        return false;
    };

    useEffect(() => {
        if (!token || !orderId) return;

        let cancelled = false;
        setStatus("checking");
        attemptsRef.current = 0;

        const poll = async () => {
            const done = await checkOnce();
            if (cancelled || done) return;

            attemptsRef.current += 1;
            if (attemptsRef.current >= MAX_ATTEMPTS) {
                setStatus("pending");
                return;
            }

            setTimeout(poll, POLL_INTERVAL_MS);
        };

        poll();
        return () => {
            cancelled = true;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token, orderId]);

    const handleCheckAgain = async () => {
        setStatus("checking");
        const done = await checkOnce();
        if (!done) setStatus("pending");
    };

    const iconWrapClass = (tone: "gray" | "green" | "yellow" | "red") =>
        `flex h-16 w-16 items-center justify-center rounded-full ${
            {
                gray: "bg-gray-100 dark:bg-gray-800",
                green: "bg-green-50 dark:bg-green-500/10",
                yellow: "bg-yellow-50 dark:bg-yellow-500/10",
                red: "bg-red-50 dark:bg-red-500/10",
            }[tone]
        }`;

    const primaryButtonClass =
        "mt-2 rounded-full bg-[#9407F2] text-white px-6 py-3 font-semibold hover:bg-[#7d06cc] transition-colors";
    const secondaryButtonClass =
        "mt-2 rounded-full border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-6 py-3 font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors";

    return (
        <SidebarLayout>
            <div className="mx-auto max-w-md py-16">
                <div className="flex flex-col items-center gap-4 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-10 text-center shadow-sm">
                    {status === "checking" && (
                        <>
                            <div className={iconWrapClass("gray")}>
                                <Clock className="h-7 w-7 text-gray-400 animate-pulse" />
                            </div>
                            <h1 className="text-xl font-semibold text-gray-900 dark:text-white">Confirming your payment…</h1>
                            <p className="text-sm text-gray-500 dark:text-gray-400">This usually only takes a few seconds.</p>
                        </>
                    )}

                    {status === "paid" && (
                        <>
                            <div className={iconWrapClass("green")}>
                                <CheckCircle2 className="h-7 w-7 text-green-500" />
                            </div>
                            <h1 className="text-xl font-semibold text-gray-900 dark:text-white">Order confirmed!</h1>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                Thanks for your purchase{order ? ` — order #${order.orderNumber}` : ""}.
                            </p>

                            {order && (
                                <div className="mt-2 w-full rounded-xl bg-gray-50 dark:bg-gray-800 p-4 text-left">
                                    <div className="space-y-1.5">
                                        {order.items.map((item) => (
                                            <div key={item.product} className="flex items-center justify-between text-sm">
                                                <span className="text-gray-600 dark:text-gray-300">
                                                    {item.name} <span className="text-gray-400 dark:text-gray-500">×{item.quantity}</span>
                                                </span>
                                                <span className="font-medium text-gray-900 dark:text-white">
                                                    {item.unitPrice * item.quantity} ETB
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="mt-3 flex items-center justify-between border-t border-gray-200 dark:border-gray-700 pt-3">
                                        <span className="text-sm font-semibold text-gray-900 dark:text-white">Total</span>
                                        <span className="text-sm font-bold text-gray-900 dark:text-white">{order.totalAmount} ETB</span>
                                    </div>
                                </div>
                            )}

                            <button onClick={() => router.push("/settings")} className={primaryButtonClass}>
                                View my orders
                            </button>
                        </>
                    )}

                    {status === "pending" && (
                        <>
                            <div className={iconWrapClass("yellow")}>
                                <Clock className="h-7 w-7 text-yellow-500" />
                            </div>
                            <h1 className="text-xl font-semibold text-gray-900 dark:text-white">Payment still pending</h1>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                We haven&apos;t received confirmation yet. If you paid with Cash or Bank Transfer, this can
                                take longer since it&apos;s confirmed manually by staff.
                            </p>
                            <button onClick={handleCheckAgain} className={secondaryButtonClass}>
                                Check again
                            </button>
                        </>
                    )}

                    {status === "error" && (
                        <>
                            <div className={iconWrapClass("red")}>
                                <XCircle className="h-7 w-7 text-red-500" />
                            </div>
                            <h1 className="text-xl font-semibold text-gray-900 dark:text-white">Couldn&apos;t check your order</h1>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                Something went wrong while looking up your order status.
                            </p>
                            <button onClick={handleCheckAgain} className={secondaryButtonClass}>
                                Try again
                            </button>
                        </>
                    )}

                    {status === "missing" && (
                        <>
                            <div className={iconWrapClass("gray")}>
                                <PackageSearch className="h-7 w-7 text-gray-400" />
                            </div>
                            <h1 className="text-xl font-semibold text-gray-900 dark:text-white">No order to show</h1>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                We couldn&apos;t find an order to check. Head back to your orders or keep shopping.
                            </p>
                            <button onClick={() => router.push("/settings")} className={primaryButtonClass}>
                                View my orders
                            </button>
                        </>
                    )}
                </div>
            </div>
        </SidebarLayout>
    );
}
