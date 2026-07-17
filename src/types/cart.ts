import { ProductData } from './product';

export interface CartItem {
    product: ProductData | null;
    quantity: number;
    lineTotal: number;
}

export interface CartData {
    cartId: string;
    items: CartItem[];
    subtotal: number;
}

export interface CartResponse {
    success: boolean;
    data: CartData;
}
