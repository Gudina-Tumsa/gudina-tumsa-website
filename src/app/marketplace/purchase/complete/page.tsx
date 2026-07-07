"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import SidebarLayout from "@/components/layout/sidebar/sidebar-layout";
import { hasPurchased } from "@/lib/api/sales";
import { CheckCircle2, Clock, XCircle } from "lucide-react";

const MAX_ATTEMPTS = 5;
const POLL_INTERVAL_MS = 3000;

type Status = "checking" | "purchased" | "pending" | "error";

export default function PurchaseCompletePage() {
    return (
        <Suspense fallback={null}>
            <PurchaseCompleteContent />
        </Suspense>
    );
}

function PurchaseCompleteContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const user = useSelector((state: RootState) => state.user);
    const token = user?.user?.token;

    const bookId = searchParams.get("bookId");
    const [status, setStatus] = useState<Status>("checking");
    const attemptsRef = useRef(0);

    const checkOnce = async () => {
        if (!token || !bookId) return;
        try {
            const response = await hasPurchased(token, bookId);
            if (response.data.purchased) {
                setStatus("purchased");
                return true;
            }
        } catch (err) {
            console.error("Failed to check purchase status:", err);
            setStatus("error");
            return true;
        }
        return false;
    };

    useEffect(() => {
        if (!token || !bookId) return;

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
    }, [token, bookId]);

    const handleCheckAgain = async () => {
        setStatus("checking");
        const done = await checkOnce();
        if (!done) setStatus("pending");
    };

    return (
        <SidebarLayout>
            <div className="min-h-screen flex flex-col items-center justify-center text-center py-24 gap-4">
                {status === "checking" && (
                    <>
                        <Clock className="w-12 h-12 text-gray-400 animate-pulse" />
                        <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
                            Confirming your payment…
                        </h1>
                        <p className="text-gray-600 dark:text-gray-300 max-w-md">
                            This usually only takes a few seconds.
                        </p>
                    </>
                )}

                {status === "purchased" && (
                    <>
                        <CheckCircle2 className="w-12 h-12 text-green-500" />
                        <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
                            Purchase complete!
                        </h1>
                        <button
                            onClick={() => router.push(`/bookdetail/${bookId}`)}
                            className="mt-2 bg-[#C084FC] text-white rounded-lg px-6 py-3 font-medium hover:bg-[#C084FC]/90 transition-colors"
                        >
                            Go to book
                        </button>
                    </>
                )}

                {status === "pending" && (
                    <>
                        <Clock className="w-12 h-12 text-yellow-500" />
                        <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
                            Payment still pending
                        </h1>
                        <p className="text-gray-600 dark:text-gray-300 max-w-md">
                            We haven't received confirmation yet. If you paid with Cash or Bank
                            Transfer, this can take longer since it's confirmed manually by staff.
                        </p>
                        <button
                            onClick={handleCheckAgain}
                            className="mt-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg px-6 py-3 font-medium hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                        >
                            Check again
                        </button>
                    </>
                )}

                {status === "error" && (
                    <>
                        <XCircle className="w-12 h-12 text-red-500" />
                        <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
                            Couldn't check your purchase
                        </h1>
                        <button
                            onClick={handleCheckAgain}
                            className="mt-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg px-6 py-3 font-medium hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                        >
                            Try again
                        </button>
                    </>
                )}
            </div>
        </SidebarLayout>
    );
}