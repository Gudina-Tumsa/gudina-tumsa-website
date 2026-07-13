import { PaymentMethodsResponse } from '@/types/paymentMethod';

// Public endpoint — no auth required, so the checkout method list can load before login.
export const getPaymentMethods = async (): Promise<PaymentMethodsResponse> => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/payment-methods`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        cache: 'no-store',
    });

    if (!response.ok) {
        throw new Error('Failed to load payment methods');
    }

    return response.json();
};
