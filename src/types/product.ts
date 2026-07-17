export type ProductType = 'book' | 'merchandise' | 'educational' | 'commemorative' | 'other';

export interface ProductCategorySummary {
    _id: string;
    name: string;
}

export interface ProductData {
    _id: string;
    name: string;
    description: string;
    category: ProductCategorySummary | string;
    sku: string;
    price: number;
    currency: string;
    images: string[];
    stock: number;
    lowStockThreshold: number;
    type: ProductType;
    tags: string[];
    isActive: boolean;
    isFeatured: boolean;
    isDigital: boolean;
    fileUrl?: string;
}

export interface ProductListResponse {
    success: boolean;
    data: {
        products: ProductData[];
        total: number;
        page?: number;
        limit?: number;
    };
}

export interface ProductResponse {
    success: boolean;
    data: { product: ProductData };
}
