import { CartResponse } from '@/types/cart';

interface ApiErrorBody {
    status: string;
    message: string;
}

export class CartApiError extends Error {
    statusCode: number;

    constructor(message: string, statusCode: number) {
        super(message);
        this.name = 'CartApiError';
        this.statusCode = statusCode;
    }
}

const parseErrorAndThrow = async (response: Response): Promise<never> => {
    let message = 'Request failed';
    try {
        const errorData: ApiErrorBody = await response.json();
        message = errorData.message || message;
    } catch {
        // response body wasn't JSON, fall back to the default message
    }
    throw new CartApiError(message, response.status);
};

const authHeaders = (token: string) => ({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
});

export const getCart = async (token: string): Promise<CartResponse> => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/cart`, {
        method: 'GET',
        headers: authHeaders(token),
    });

    if (!response.ok) {
        return parseErrorAndThrow(response);
    }

    return response.json();
};

export const addCartItem = async (
    token: string,
    productId: string,
    quantity: number
): Promise<CartResponse> => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/cart/items`, {
        method: 'POST',
        headers: authHeaders(token),
        body: JSON.stringify({ productId, quantity }),
    });

    if (!response.ok) {
        return parseErrorAndThrow(response);
    }

    return response.json();
};

export const updateCartItem = async (
    token: string,
    productId: string,
    quantity: number
): Promise<CartResponse> => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/cart/items/${productId}`, {
        method: 'PATCH',
        headers: authHeaders(token),
        body: JSON.stringify({ quantity }),
    });

    if (!response.ok) {
        return parseErrorAndThrow(response);
    }

    return response.json();
};

export const removeCartItem = async (token: string, productId: string): Promise<CartResponse> => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/cart/items/${productId}`, {
        method: 'DELETE',
        headers: authHeaders(token),
    });

    if (!response.ok) {
        return parseErrorAndThrow(response);
    }

    return response.json();
};

export const clearCart = async (token: string): Promise<CartResponse> => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/cart`, {
        method: 'DELETE',
        headers: authHeaders(token),
    });

    if (!response.ok) {
        return parseErrorAndThrow(response);
    }

    return response.json();
};
