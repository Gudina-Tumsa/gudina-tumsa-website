import {
    CreateBankTransferSaleRequest,
    CreateSaleRequest,
    CreateSaleResponse,
    GetSaleResponse,
    HasPurchasedResponse,
    MySalesResponse,
} from '@/types/sale';

interface ApiErrorBody {
    status: string;
    message: string;
}

export class SalesApiError extends Error {
    statusCode: number;

    constructor(message: string, statusCode: number) {
        super(message);
        this.name = 'SalesApiError';
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
    throw new SalesApiError(message, response.status);
};

export const createSale = async (
    token: string,
    request: CreateSaleRequest
): Promise<CreateSaleResponse> => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/sales`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(request),
    });

    if (!response.ok) {
        return parseErrorAndThrow(response);
    }

    return response.json();
};

// Bank Transfer only — multipart, since it carries the receipt photo. No Content-Type header:
// the browser sets the multipart boundary itself when the body is a FormData instance.
export const createBankTransferSale = async (
    token: string,
    request: CreateBankTransferSaleRequest
): Promise<CreateSaleResponse> => {
    const formData = new FormData();
    formData.append('bookId', request.bookId);
    formData.append('method', 'BANK_TRANSFER');
    formData.append('bankAccountId', request.bankAccountId);
    formData.append('receiptImage', request.receiptImage);
    if (request.returnUrl) formData.append('returnUrl', request.returnUrl);

    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/sales`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
        },
        body: formData,
    });

    if (!response.ok) {
        return parseErrorAndThrow(response);
    }

    return response.json();
};

export const hasPurchased = async (token: string, bookId: string): Promise<HasPurchasedResponse> => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/sales/has/${bookId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        return parseErrorAndThrow(response);
    }

    return response.json();
};

export const getSale = async (token: string, saleId: string): Promise<GetSaleResponse> => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/sales/${saleId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        return parseErrorAndThrow(response);
    }

    return response.json();
};

export const getMySales = async (token: string): Promise<MySalesResponse> => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/sales/my`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        return parseErrorAndThrow(response);
    }

    return response.json();
};