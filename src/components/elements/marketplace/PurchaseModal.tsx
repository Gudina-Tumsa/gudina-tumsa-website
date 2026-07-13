"use client";

import { useEffect, useRef, useState } from "react";
import { X, Upload } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { BookData } from "@/types/book";
import { PaymentMethod } from "@/types/sale";
import { PaymentMethodOption } from "@/types/paymentMethod";
import { BankAccount } from "@/types/bankAccount";
import { createSale, createBankTransferSale, SalesApiError } from "@/lib/api/sales";
import { getPaymentMethods } from "@/lib/api/paymentMethods";
import { getBankAccounts } from "@/lib/api/bankAccounts";

interface PurchaseModalProps {
    book: BookData;
    token: string;
    onClose: () => void;
    onPurchased?: () => void;
}

interface BankTransferSelection {
    bankAccountId: string;
    receiptFile: File;
}

function BankTransferPayment({
    amount,
    selection,
    onSelectionChange,
}: {
    amount: number;
    selection: BankTransferSelection | null;
    onSelectionChange: (selection: BankTransferSelection | null) => void;
}) {
    const [accounts, setAccounts] = useState<BankAccount[]>([]);
    const [accountsLoading, setAccountsLoading] = useState(true);
    const [bankAccountId, setBankAccountId] = useState("");
    const [receiptFile, setReceiptFile] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        let cancelled = false;
        getBankAccounts()
            .then((res) => {
                if (!cancelled) setAccounts(res.data.accounts);
            })
            .catch(() => {
                if (!cancelled) toast.error("Couldn't load bank accounts.");
            })
            .finally(() => {
                if (!cancelled) setAccountsLoading(false);
            });
        return () => {
            cancelled = true;
        };
    }, []);

    useEffect(() => {
        onSelectionChange(bankAccountId && receiptFile ? { bankAccountId, receiptFile } : null);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [bankAccountId, receiptFile]);

    const selectedAccount = accounts.find((a) => a._id === bankAccountId) ?? null;

    return (
        <div className="mb-6 rounded-lg border border-gray-200 dark:border-gray-600 p-4 space-y-3">
            <p className="text-sm text-gray-600 dark:text-gray-300">
                Choose the bank you&apos;ll send the transfer through, send the amount shown to
                that account, then upload a photo of your receipt. An admin will review it and
                approve your purchase.
            </p>

            {accountsLoading ? (
                <p className="text-sm text-gray-500 dark:text-gray-400">Loading banks…</p>
            ) : accounts.length === 0 ? (
                <p className="text-sm text-red-600 dark:text-red-400">
                    No bank accounts are configured yet. Please choose another payment method.
                </p>
            ) : (
                <select
                    value={bankAccountId}
                    onChange={(e) => {
                        setBankAccountId(e.target.value);
                        setReceiptFile(null);
                    }}
                    className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm text-gray-900 dark:text-white"
                >
                    <option value="">Select a bank…</option>
                    {accounts.map((a) => (
                        <option key={a._id} value={a._id}>
                            {a.bankName}
                        </option>
                    ))}
                </select>
            )}

            {selectedAccount && (
                <div className="rounded-lg bg-gray-50 dark:bg-gray-700 p-3 text-sm text-gray-800 dark:text-gray-200 space-y-1">
                    <p>
                        Send <span className="font-semibold">{amount} ETB</span> to:
                    </p>
                    <p className="font-medium">{selectedAccount.bankName}</p>
                    <p>
                        Account: <span className="font-mono">{selectedAccount.accountNumber}</span>
                    </p>
                    <p>Account name: {selectedAccount.accountHolderName}</p>
                </div>
            )}

            {selectedAccount && (
                <>
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/jpeg,image/png,image/webp"
                        className="hidden"
                        onChange={(e) => setReceiptFile(e.target.files?.[0] ?? null)}
                    />
                    <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="w-full flex items-center justify-center gap-2 px-3 py-3 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600 text-sm text-gray-700 dark:text-gray-300"
                    >
                        <Upload className="w-4 h-4" />
                        {receiptFile ? `Change photo (${receiptFile.name})` : "Upload receipt photo (required)"}
                    </button>
                </>
            )}
        </div>
    );
}

const PurchaseModal = ({ book, token, onClose, onPurchased }: PurchaseModalProps) => {
    const [methods, setMethods] = useState<PaymentMethodOption[]>([]);
    const [methodsLoading, setMethodsLoading] = useState(true);
    const [method, setMethod] = useState<PaymentMethod | null>(null);
    const [submitting, setSubmitting] = useState(false);
    const [bankTransferSelection, setBankTransferSelection] = useState<BankTransferSelection | null>(null);

    useEffect(() => {
        let cancelled = false;

        getPaymentMethods()
            .then((response) => {
                if (cancelled) return;
                const live = response.data.methods.filter((m) => m.status === "LIVE");
                setMethods(live);
                setMethod((current) => current ?? live[0]?.method ?? null);
            })
            .catch(() => {
                if (!cancelled) toast.error("Couldn't load payment options. Please try again.");
            })
            .finally(() => {
                if (!cancelled) setMethodsLoading(false);
            });

        return () => {
            cancelled = true;
        };
    }, []);

    const handleSelectMethod = (m: PaymentMethod) => {
        setMethod(m);
        setBankTransferSelection(null);
    };

    const handleConfirm = async () => {
        if (!method) return;
        if (method === "BANK_TRANSFER" && !bankTransferSelection) return;

        setSubmitting(true);
        try {
            const returnUrl = `${window.location.origin}/marketplace/purchase/complete?bookId=${book._id}`;
            const response =
                method === "BANK_TRANSFER" && bankTransferSelection
                    ? await createBankTransferSale(token, {
                          bookId: book._id,
                          bankAccountId: bankTransferSelection.bankAccountId,
                          receiptImage: bankTransferSelection.receiptFile,
                          returnUrl,
                      })
                    : await createSale(token, { bookId: book._id, method, returnUrl });

            if (response.data.checkoutUrl) {
                window.location.href = response.data.checkoutUrl;
                return;
            }

            const successMessages: Record<PaymentMethod, string> = {
                BANK_TRANSFER: "Purchase submitted! Your receipt is in, and we'll unlock the book once an admin reviews it.",
                CASH: "Purchase started! Please pay in person — an admin will confirm your payment and unlock the book.",
                CHAPA: "Purchase started! We'll unlock the book once your payment is confirmed.",
                TELEBIRR: "Purchase started! We'll unlock the book once your payment is confirmed.",
                STARPAY: "Purchase started! We'll unlock the book once your payment is confirmed.",
            };
            toast.success(successMessages[method]);
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

    const confirmDisabled = submitting || !method || (method === "BANK_TRANSFER" && !bankTransferSelection);

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <Toaster position="top-right" />
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-md p-6 relative max-h-[90vh] overflow-y-auto">
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
                    {methodsLoading && (
                        <p className="text-sm text-gray-500 dark:text-gray-400">Loading payment options…</p>
                    )}
                    {!methodsLoading && methods.length === 0 && (
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            No payment methods are available right now. Please try again later.
                        </p>
                    )}
                    {methods.map((m) => (
                        <label
                            key={m.method}
                            className={`flex items-center gap-3 px-4 py-3 rounded-lg border cursor-pointer transition-colors ${
                                method === m.method
                                    ? "border-[#C084FC] bg-[#C084FC]/10"
                                    : "border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
                            }`}
                        >
                            <input
                                type="radio"
                                name="payment-method"
                                value={m.method}
                                checked={method === m.method}
                                onChange={() => handleSelectMethod(m.method)}
                                className="accent-[#C084FC]"
                            />
                            <span className="text-gray-900 dark:text-white">{m.label}</span>
                        </label>
                    ))}
                </div>

                {method === "BANK_TRANSFER" && (
                    <BankTransferPayment
                        amount={book.price}
                        selection={bankTransferSelection}
                        onSelectionChange={setBankTransferSelection}
                    />
                )}

                <div className="flex gap-3">
                    <button
                        onClick={handleConfirm}
                        disabled={confirmDisabled}
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
