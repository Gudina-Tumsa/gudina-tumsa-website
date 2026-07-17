import { PaymentMethod } from './sale';

export type OrderStatus =
    | 'pending_payment'
    | 'paid'
    | 'processing'
    | 'shipped'
    | 'delivered'
    | 'cancelled'
    | 'refunded';

export interface OrderItem {
    product: string;
    name: string;
    quantity: number;
    unitPrice: number;
    isDigital: boolean;
}

export interface ShippingAddress {
    fullName: string;
    phone: string;
    region: string;
    city: string;
    subCity?: string;
    streetAddress: string;
    postalCode?: string;
}

export interface OrderPaymentSummary {
    _id: string;
    method: PaymentMethod;
    amount: number;
    transactionRef?: string;
    status: 'PENDING' | 'COMPLETED' | 'FAILED';
}

export interface OrderData {
    _id: string;
    orderNumber: string;
    items: OrderItem[];
    subtotal: number;
    shippingCost: number;
    totalAmount: number;
    shippingAddress?: ShippingAddress;
    status: OrderStatus;
    payment?: OrderPaymentSummary;
    trackingNumber?: string;
    createdAt: string;
}

export interface CreateOrderRequest {
    // Optional — only required when the order contains at least one physical item.
    shippingAddress?: ShippingAddress;
    method: PaymentMethod;
    returnUrl?: string;
}

export interface CreateBankTransferOrderRequest {
    shippingAddress?: ShippingAddress;
    bankAccountId: string;
    receiptImage: File;
    returnUrl?: string;
}

export interface CreateOrderResponse {
    success: boolean;
    message: string;
    data: {
        orderId: string;
        orderNumber: string;
        paymentId: string;
        transactionRef: string;
        totalAmount: number;
        checkoutUrl?: string;
    };
}

export interface GetOrderResponse {
    success: boolean;
    data: { order: OrderData };
}

export interface MyOrdersResponse {
    success: boolean;
    data: { orders: OrderData[] };
}
