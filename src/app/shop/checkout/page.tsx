"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import SidebarLayout from "@/components/layout/sidebar/sidebar-layout";
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
                <div className="py-20 text-center text-sm text-gray-500 dark:text-gray-400">Loading…</div>
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
            <div className="mx-auto max-w-2xl">
                <h1 className="mb-6 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">Checkout</h1>

                {!allDigital && (
                <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 mb-6">
                    <h2 className="text-base font-semibold text-gray-900 dark:text-white mb-4">Shipping address</h2>
                    <div className="grid grid-cols-2 gap-3">
                        <input
                            placeholder="Full name"
                            value={address.fullName}
                            onChange={(e) => handleAddressChange("fullName", e.target.value)}
                            className="col-span-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-sm text-gray-900 dark:text-white"
                        />
                        <input
                            placeholder="Phone"
                            value={address.phone}
                            onChange={(e) => handleAddressChange("phone", e.target.value)}
                            className="col-span-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-sm text-gray-900 dark:text-white"
                        />
                        <input
                            placeholder="Region"
                            value={address.region}
                            onChange={(e) => handleAddressChange("region", e.target.value)}
                            className="rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-sm text-gray-900 dark:text-white"
                        />
                        <input
                            placeholder="City"
                            value={address.city}
                            onChange={(e) => handleAddressChange("city", e.target.value)}
                            className="rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-sm text-gray-900 dark:text-white"
                        />
                        <input
                            placeholder="Sub-city (optional)"
                            value={address.subCity}
                            onChange={(e) => handleAddressChange("subCity", e.target.value)}
                            className="rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-sm text-gray-900 dark:text-white"
                        />
                        <input
                            placeholder="Postal code (optional)"
                            value={address.postalCode}
                            onChange={(e) => handleAddressChange("postalCode", e.target.value)}
                            className="rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-sm text-gray-900 dark:text-white"
                        />
                        <input
                            placeholder="Street address"
                            value={address.streetAddress}
                            onChange={(e) => handleAddressChange("streetAddress", e.target.value)}
                            className="col-span-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-sm text-gray-900 dark:text-white"
                        />
                    </div>
                </div>
                )}

                <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 mb-6">
                    <h2 className="text-base font-semibold text-gray-900 dark:text-white mb-4">Payment method</h2>
                    <CheckoutPaymentMethod
                        amount={subtotal}
                        method={method}
                        onMethodChange={setMethod}
                        bankTransferSelection={bankTransferSelection}
                        onBankTransferSelectionChange={setBankTransferSelection}
                    />
                </div>

                <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 flex items-center justify-between">
                    <p className="text-lg font-semibold text-gray-900 dark:text-white">Total: {subtotal} ETB</p>
                    <button
                        onClick={handleSubmit}
                        disabled={submitting}
                        className="rounded-lg bg-[#C084FC] text-white px-6 py-3 font-medium hover:bg-[#C084FC]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {submitting ? "Placing order…" : "Place order"}
                    </button>
                </div>
            </div>
        </SidebarLayout>
    );
}
