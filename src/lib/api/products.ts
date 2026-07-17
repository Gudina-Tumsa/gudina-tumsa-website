import { ProductListResponse, ProductResponse } from '@/types/product';

interface ApiErrorBody {
    status: string;
    message: string;
}

export class ProductsApiError extends Error {
    statusCode: number;

    constructor(message: string, statusCode: number) {
        super(message);
        this.name = 'ProductsApiError';
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
    throw new ProductsApiError(message, response.status);
};

export interface GetProductsRequest {
    category?: string;
    search?: string;
    type?: string;
    page?: number;
    limit?: number;
}

export const getProducts = async (request: GetProductsRequest = {}): Promise<ProductListResponse> => {
    const params = new URLSearchParams();
    if (request.category) params.append('category', request.category);
    if (request.search) params.append('search', request.search);
    if (request.type) params.append('type', request.type);
    if (request.page) params.append('page', String(request.page));
    if (request.limit) params.append('limit', String(request.limit));

    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/product?${params.toString()}`);

    if (!response.ok) {
        return parseErrorAndThrow(response);
    }

    return response.json();
};

export const getProduct = async (id: string): Promise<ProductResponse> => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/product/${id}`);

    if (!response.ok) {
        return parseErrorAndThrow(response);
    }

    return response.json();
};
