"use client";

import { useEffect, useRef, useState } from "react";
import { Upload } from "lucide-react";
import toast from "react-hot-toast";
import { PaymentMethod } from "@/types/sale";
import { PaymentMethodOption } from "@/types/paymentMethod";
import { BankAccount } from "@/types/bankAccount";
import { getPaymentMethods } from "@/lib/api/paymentMethods";
import { getBankAccounts } from "@/lib/api/bankAccounts";

export interface BankTransferSelection {
    bankAccountId: string;
    receiptFile: File;
}

// Generalized from components/elements/marketplace/PurchaseModal.tsx's BankTransferPayment —
// same bank-select + receipt-upload flow, just decoupled from the book-purchase modal so the
// shop checkout page can reuse it.
function BankTransferPicker({
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
                approve your order.
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

interface CheckoutPaymentMethodProps {
    amount: number;
    method: PaymentMethod | null;
    onMethodChange: (method: PaymentMethod) => void;
    bankTransferSelection: BankTransferSelection | null;
    onBankTransferSelectionChange: (selection: BankTransferSelection | null) => void;
}

export default function CheckoutPaymentMethod({
    amount,
    method,
    onMethodChange,
    bankTransferSelection,
    onBankTransferSelectionChange,
}: CheckoutPaymentMethodProps) {
    const [methods, setMethods] = useState<PaymentMethodOption[]>([]);
    const [methodsLoading, setMethodsLoading] = useState(true);

    useEffect(() => {
        let cancelled = false;

        getPaymentMethods()
            .then((response) => {
                if (cancelled) return;
                const live = response.data.methods.filter((m) => m.status === "LIVE");
                setMethods(live);
                if (!method && live[0]) onMethodChange(live[0].method);
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleSelect = (m: PaymentMethod) => {
        onMethodChange(m);
        onBankTransferSelectionChange(null);
    };

    return (
        <div>
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
                            name="checkout-payment-method"
                            value={m.method}
                            checked={method === m.method}
                            onChange={() => handleSelect(m.method)}
                            className="accent-[#C084FC]"
                        />
                        <span className="text-gray-900 dark:text-white">{m.label}</span>
                    </label>
                ))}
            </div>

            {method === "BANK_TRANSFER" && (
                <BankTransferPicker
                    amount={amount}
                    selection={bankTransferSelection}
                    onSelectionChange={onBankTransferSelectionChange}
                />
            )}
        </div>
    );
}
