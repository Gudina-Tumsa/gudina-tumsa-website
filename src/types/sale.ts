export type PaymentMethod = "CHAPA" | "TELEBIRR" | "STARPAY" | "CASH" | "BANK_TRANSFER";

export interface CreateSaleRequest {
    bookId: string;
    method: PaymentMethod;
    returnUrl?: string;
    // TELEBIRR only — set when window.consumerapp is detected (page is running inside
    // Telebirr's own app). See src/lib/telebirrBridge.ts.
    inAppBridge?: boolean;
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
        // TELEBIRR + inAppBridge only — signed preOrder request string to hand to Telebirr's
        // native JS bridge (startTelebirrBridgePayment). Absent for every other case.
        telebirrRawRequest?: string;
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
    refunded: boolean;
    amountDue: number;
    createdAt: string;
    book: {
        _id: string;
        title: string;
        author: string;
        coverImageUrl: string;
        price: number;
    };
    // The Sale document itself has no top-level `method` — it lives on the populated
    // `payment` sub-document (a bank-transfer sale that failed before a Payment was ever
    // created is the one case where this can still be absent).
    payment?: {
        method: PaymentMethod;
        status?: string;
        transactionRef?: string;
        amount?: number;
    };
}

export interface MySalesResponse {
    success: boolean;
    data: {
        sales: MySaleEntry[];
    };
}