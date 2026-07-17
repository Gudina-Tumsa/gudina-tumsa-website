import {
    CreateOrderRequest,
    CreateBankTransferOrderRequest,
    CreateOrderResponse,
    GetOrderResponse,
    MyOrdersResponse,
} from '@/types/order';

interface ApiErrorBody {
    status: string;
    message: string;
}

export class OrdersApiError extends Error {
    statusCode: number;

    constructor(message: string, statusCode: number) {
        super(message);
        this.name = 'OrdersApiError';
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
    throw new OrdersApiError(message, response.status);
};

export const createOrder = async (
    token: string,
    request: CreateOrderRequest
): Promise<CreateOrderResponse> => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/order`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(request),
    });

    if (!response.ok) {
        return parseErrorAndThrow(response);
    }

    return response.json();
};

// Bank Transfer only — multipart, since it carries the receipt photo. shippingAddress is sent
// as a JSON string field (the backend parses it either way — see order/controller.ts).
export const createBankTransferOrder = async (
    token: string,
    request: CreateBankTransferOrderRequest
): Promise<CreateOrderResponse> => {
    const formData = new FormData();
    if (request.shippingAddress) formData.append('shippingAddress', JSON.stringify(request.shippingAddress));
    formData.append('method', 'BANK_TRANSFER');
    formData.append('bankAccountId', request.bankAccountId);
    formData.append('receiptImage', request.receiptImage);
    if (request.returnUrl) formData.append('returnUrl', request.returnUrl);

    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/order`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
    });

    if (!response.ok) {
        return parseErrorAndThrow(response);
    }

    return response.json();
};

export const getMyOrders = async (token: string): Promise<MyOrdersResponse> => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/order/my`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        return parseErrorAndThrow(response);
    }

    return response.json();
};

// Fetches a digital product's file as a Blob (auth required, so a plain <a href> can't be used
// directly) — caller wires it up to a temporary <a download> element to trigger a real save,
// same authenticated-blob pattern as getSaleReceiptImageUrl.
export const downloadOrderFile = async (
    token: string,
    orderId: string,
    productId: string
): Promise<Blob> => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/order/${orderId}/download/${productId}`, {
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) {
        return parseErrorAndThrow(response);
    }

    return response.blob();
};

export const getOrder = async (token: string, orderId: string): Promise<GetOrderResponse> => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/order/${orderId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        return parseErrorAndThrow(response);
    }

    return response.json();
};
