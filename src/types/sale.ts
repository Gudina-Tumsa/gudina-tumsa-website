export type PaymentMethod = "CHAPA" | "TELEBIRR" | "STARPAY" | "CASH" | "BANK_TRANSFER";

export interface CreateSaleRequest {
    bookId: string;
    method: PaymentMethod;
    returnUrl?: string;
}

export interface CreateBankTransferSaleRequest {
    bookId: string;
    bankAccountId: string;
    receiptImage: File;
    returnUrl?: string;
}

export interface CreateSaleResponse {
    success: boolean;
    message: string;
    data: {
        saleId: string;
        paymentId: string;
        transactionRef: string;
        amountDue: number;
        checkoutUrl?: string;
    };
}

export interface SaleData {
    _id: string;
    finalized: boolean;
    bookId: string;
    userId: string;
    method: PaymentMethod;
    amountDue: number;
    status?: string;
    createdAt: string;
}

export interface GetSaleResponse {
    success: boolean;
    data: {
        sale: SaleData;
    };
}

export interface HasPurchasedResponse {
    success: boolean;
    data: {
        purchased: boolean;
    };
}

export interface MySaleEntry {
    _id: string;
    finalized: boolean;
    method: PaymentMethod;
    amountDue: number;
    createdAt: string;
    book: {
        _id: string;
        title: string;
        author: string;
        coverImageUrl: string;
        price: number;
    };
    payment?: Record<string, unknown>;
}

export interface MySalesResponse {
    success: boolean;
    data: {
        sales: MySaleEntry[];
    };
}