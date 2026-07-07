"use client";

import { useState } from "react";
import { X } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { BookData } from "@/types/book";
import { PaymentMethod } from "@/types/sale";
import { createSale, SalesApiError } from "@/lib/api/sales";

const METHOD_LABELS: Record<PaymentMethod, string> = {
    CHAPA: "Chapa",
    TELEBIRR: "Telebirr",
    STARPAY: "StarPay",
    CASH: "Cash (pay in person)",
    BANK_TRANSFER: "Bank Transfer",
};

const ONLINE_METHODS: PaymentMethod[] = ["CHAPA", "TELEBIRR", "STARPAY"];
const OFFLINE_METHODS: PaymentMethod[] = ["CASH", "BANK_TRANSFER"];

interface PurchaseModalProps {
    book: BookData;
    token: string;
    onClose: () => void;
    onPurchased?: () => void;
}

const PurchaseModal = ({ book, token, onClose, onPurchased }: PurchaseModalProps) => {
    const [method, setMethod] = useState<PaymentMethod>("CHAPA");
    const [submitting, setSubmitting] = useState(false);

    const handleConfirm = async () => {
        setSubmitting(true);
        try {
            const returnUrl = `${window.location.origin}/marketplace/purchase/complete?bookId=${book._id}`;
            const response = await createSale(token, { bookId: book._id, method, returnUrl });

            if (response.data.checkoutUrl) {
                window.location.href = response.data.checkoutUrl;
                return;
            }

            toast.success("Purchase started! We'll unlock the book once your payment is confirmed.");
            onClose();
        } catch (err) {
            if (err instanceof SalesApiError && err.statusCode === 409) {
                toast.success("You already own this book.");
                onPurchased?.();
                onClose();
                return;
            }

            if (err instanceof SalesApiError && err.statusCode === 502) {
                toast.error("The payment gateway is unavailable right now. Please try again or pick another method.");
            } else {
                toast.error(err instanceof Error ? err.message : "Failed to start purchase.");
            }
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <Toaster position="top-right" />
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-md p-6 relative">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 dark:hover:text-white"
                    aria-label="Close"
                >
                    <X className="w-5 h-5" />
                </button>

                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">Buy this book</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">{book.title}</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mb-6">{book.price} ETB</p>

                <div className="space-y-2 mb-6">
                    {[...ONLINE_METHODS, ...OFFLINE_METHODS].map((m) => (
                        <label
                            key={m}
                            className={`flex items-center gap-3 px-4 py-3 rounded-lg border cursor-pointer transition-colors ${
                                method === m
                                    ? "border-[#C084FC] bg-[#C084FC]/10"
                                    : "border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
                            }`}
                        >
                            <input
                                type="radio"
                                name="payment-method"
                                value={m}
                                checked={method === m}
                                onChange={() => setMethod(m)}
                                className="accent-[#C084FC]"
                            />
                            <span className="text-gray-900 dark:text-white">{METHOD_LABELS[m]}</span>
                        </label>
                    ))}
                </div>

                <div className="flex gap-3">
                    <button
                        onClick={handleConfirm}
                        disabled={submitting}
                        className="flex-1 bg-[#C084FC] text-white rounded-lg px-4 py-3 font-medium hover:bg-[#C084FC]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {submitting ? "Processing…" : "Confirm purchase"}
                    </button>
                    <button
                        onClick={onClose}
                        disabled={submitting}
                        className="px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors disabled:opacity-50"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PurchaseModal;