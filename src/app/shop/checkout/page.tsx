"use client";

import { InputHTMLAttributes, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";
import SidebarLayout from "@/components/layout/sidebar/sidebar-layout";
import { Skeleton } from "@/components/ui/skeleton";
import { getCart } from "@/lib/api/cart";
import { createOrder, createBankTransferOrder, OrdersApiError } from "@/lib/api/orders";
import { RootState } from "@/app/store/store";
import { useAppDispatch } from "@/lib/hooks";
import { setCart } from "@/app/store/features/cartSlice";
import { PaymentMethod } from "@/types/sale";
import { ShippingAddress } from "@/types/order";
import CheckoutPaymentMethod, { BankTransferSelection } from "@/components/elements/shop/CheckoutPaymentMethod";

const EMPTY_ADDRESS: ShippingAddress = {
    fullName: "",
    phone: "",
    region: "",
    city: "",
    subCity: "",
    streetAddress: "",
    postalCode: "",
};

const inputClass =
    "w-full rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3.5 py-2.5 text-sm text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-[#C084FC]/50 focus:border-[#C084FC] placeholder:text-gray-400";

const Field = ({
    label,
    className,
    ...props
}: InputHTMLAttributes<HTMLInputElement> & { label: string; className?: string }) => (
    <label className={`block ${className ?? ""}`}>
        <span className="mb-1 block text-xs font-medium text-gray-500 dark:text-gray-400">{label}</span>
        <input {...props} className={inputClass} />
    </label>
);

export default function CheckoutPage() {
    const user = useSelector((state: RootState) => state.user);
    const cart = useSelector((state: RootState) => state.cart.cart);
    const token = user?.session?.token;
    const dispatch = useAppDispatch();
    const router = useRouter();

    const [address, setAddress] = useState<ShippingAddress>(EMPTY_ADDRESS);
    const [method, setMethod] = useState<PaymentMethod | null>(null);
    const [bankTransferSelection, setBankTransferSelection] = useState<BankTransferSelection | null>(null);
    const [submitting, setSubmitting] = useState(false);
    const [loadingCart, setLoadingCart] = useState(true);

    useEffect(() => {
        if (!token) {
            setLoadingCart(false);
            return;
        }
        getCart(token)
            .then((res) => dispatch(setCart(res.data)))
            .catch(() => toast.error("Failed to load cart"))
            .finally(() => setLoadingCart(false));
    }, [token, dispatch]);

    const handleAddressChange = (field: keyof ShippingAddress, value: string) => {
        setAddress((prev) => ({ ...prev, [field]: value }));
    };

    const items = cart?.items ?? [];
    const subtotal = cart?.subtotal ?? 0;
    const allDigital = items.length > 0 && items.every((i) => i.product?.isDigital);

    const handleSubmit = async () => {
        if (!token) {
            router.push("/login");
            return;
        }
        if (!method) {
            toast.error("Select a payment method");
            return;
        }
        if (!allDigital && (!address.fullName || !address.phone || !address.region || !address.city || !address.streetAddress)) {
            toast.error("Please fill in the full shipping address");
            return;
        }
        if (method === "BANK_TRANSFER" && !bankTransferSelection) {
            toast.error("Select a bank and upload your receipt");
            return;
        }

        setSubmitting(true);
        try {
            const returnUrl = `${window.location.origin}/shop/orders/complete`;
            const response =
                method === "BANK_TRANSFER" && bankTransferSelection
                    ? await createBankTransferOrder(token, {
                          shippingAddress: allDigital ? undefined : address,
                          bankAccountId: bankTransferSelection.bankAccountId,
                          receiptImage: bankTransferSelection.receiptFile,
                          returnUrl,
                      })
                    : await createOrder(token, { shippingAddress: allDigital ? undefined : address, method, returnUrl });

            if (response.data.checkoutUrl) {
                window.location.href = response.data.checkoutUrl;
                return;
            }

            dispatch(setCart({ cartId: cart?.cartId ?? "", items: [], subtotal: 0 }));

            const successMessages: Record<PaymentMethod, string> = {
                BANK_TRANSFER: "Order placed! We'll confirm it once an admin reviews your receipt.",
                CASH: "Order placed! Please pay on delivery/pickup — an admin will confirm your payment.",
                CHAPA: "Order placed! We'll process it once your payment is confirmed.",
                TELEBIRR: "Order placed! We'll process it once your payment is confirmed.",
                STARPAY: "Order placed! We'll process it once your payment is confirmed.",
            };
            toast.success(successMessages[method]);
            router.push(`/shop/orders/complete?orderId=${response.data.orderId}`);
        } catch (err) {
            if (err instanceof OrdersApiError && err.statusCode === 502) {
                toast.error("The payment gateway is unavailable right now. Please try again or pick another method.");
            } else {
                toast.error(err instanceof Error ? err.message : "Failed to place order.");
            }
        } finally {
            setSubmitting(false);
        }
    };

    if (!token) {
        return (
            <SidebarLayout>
                <div className="py-20 text-center text-sm text-gray-500 dark:text-gray-400">Please log in to check out.</div>
            </SidebarLayout>
        );
    }

    if (loadingCart) {
        return (
            <SidebarLayout>
                <div className="mx-auto max-w-4xl">
                    <Skeleton className="mb-8 h-10 w-48 rounded-full" />
                    <div className="grid gap-8 lg:grid-cols-3">
                        <div className="space-y-6 lg:col-span-2">
                            <Skeleton className="h-64 w-full rounded-2xl" />
                            <Skeleton className="h-40 w-full rounded-2xl" />
                        </div>
                        <Skeleton className="h-56 w-full rounded-2xl" />
                    </div>
                </div>
            </SidebarLayout>
        );
    }

    if (items.length === 0) {
        return (
            <SidebarLayout>
                <div className="py-20 text-center text-sm text-gray-500 dark:text-gray-400">Your cart is empty.</div>
            </SidebarLayout>
        );
    }

    return (
        <SidebarLayout>
            <div className="mx-auto max-w-4xl">
                <div className="mb-8">
                    <h1 className="font-extrabold tracking-tight text-4xl sm:text-5xl text-gray-900 dark:text-white mb-1">
                        Checkout
                    </h1>
                    <p className="text-gray-500 dark:text-gray-300">Review your order and choose how you&apos;d like to pay</p>
                </div>

                <div className="grid gap-8 lg:grid-cols-3 lg:items-start">
                    <div className="space-y-6 lg:col-span-2">
                        {!allDigital && (
                            <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 shadow-sm">
                                <h2 className="text-base font-semibold text-gray-900 dark:text-white mb-4">Shipping address</h2>
                                <div className="grid grid-cols-2 gap-3">
                                    <Field
                                        className="col-span-2"
                                        label="Full name"
                                        value={address.fullName}
                                        onChange={(e) => handleAddressChange("fullName", e.target.value)}
                                    />
                                    <Field
                                        className="col-span-2"
                                        label="Phone"
                                        value={address.phone}
                                        onChange={(e) => handleAddressChange("phone", e.target.value)}
                                    />
                                    <Field
                                        label="Region"
                                        value={address.region}
                                        onChange={(e) => handleAddressChange("region", e.target.value)}
                                    />
                                    <Field
                                        label="City"
                                        value={address.city}
                                        onChange={(e) => handleAddressChange("city", e.target.value)}
                                    />
                                    <Field
                                        label="Sub-city (optional)"
                                        value={address.subCity}
                                        onChange={(e) => handleAddressChange("subCity", e.target.value)}
                                    />
                                    <Field
                                        label="Postal code (optional)"
                                        value={address.postalCode}
                                        onChange={(e) => handleAddressChange("postalCode", e.target.value)}
                                    />
                                    <Field
                                        className="col-span-2"
                                        label="Street address"
                                        value={address.streetAddress}
                                        onChange={(e) => handleAddressChange("streetAddress", e.target.value)}
                                    />
                                </div>
                            </div>
                        )}

                        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 shadow-sm">
                            <h2 className="text-base font-semibold text-gray-900 dark:text-white mb-4">Payment method</h2>
                            <CheckoutPaymentMethod
                                amount={subtotal}
                                method={method}
                                onMethodChange={setMethod}
                                bankTransferSelection={bankTransferSelection}
                                onBankTransferSelectionChange={setBankTransferSelection}
                            />
                        </div>
                    </div>

                    <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 shadow-sm lg:sticky lg:top-6">
                        <h2 className="text-base font-semibold text-gray-900 dark:text-white mb-4">Order summary</h2>
                        <div className="space-y-3 mb-4 max-h-64 overflow-y-auto pr-1">
                            {items.map(
                                (item) =>
                                    item.product && (
                                        <div key={item.product._id} className="flex items-center gap-3">
                                            <div className="h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800">
                                                {item.product.images[0] && (
                                                    <img
                                                        src={`${process.env.NEXT_PUBLIC_BASE_URL}${item.product.images[0]}`}
                                                        alt={item.product.name}
                                                        className="h-full w-full object-cover"
                                                    />
                                                )}
                                            </div>
                                            <div className="min-w-0 flex-1">
                                                <p className="line-clamp-1 text-sm font-medium text-gray-900 dark:text-white">
                                                    {item.product.name}
                                                </p>
                                                <p className="text-xs text-gray-500 dark:text-gray-400">Qty {item.quantity}</p>
                                            </div>
                                            <p className="shrink-0 text-sm font-semibold text-gray-900 dark:text-white">
                                                {item.lineTotal} ETB
                                            </p>
                                        </div>
                                    )
                            )}
                        </div>
                        <div className="h-px bg-gray-100 dark:bg-gray-800 mb-4" />
                        <div className="flex items-center justify-between mb-6">
                            <span className="font-semibold text-gray-900 dark:text-white">Total</span>
                            <span className="text-lg font-bold text-gray-900 dark:text-white">{subtotal} ETB</span>
                        </div>
                        <button
                            onClick={handleSubmit}
                            disabled={submitting}
                            className="flex w-full items-center justify-center gap-2 rounded-full bg-[#9407F2] py-3 font-semibold text-white hover:bg-[#7d06cc] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
                            {submitting ? "Placing order…" : "Place order"}
                        </button>
                    </div>
                </div>
            </div>
        </SidebarLayout>
    );
}
