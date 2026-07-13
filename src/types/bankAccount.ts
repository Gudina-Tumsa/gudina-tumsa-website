export interface BankAccount {
    _id: string;
    bankName: string;
    accountNumber: string;
    accountHolderName: string;
}

export interface BankAccountsResponse {
    success: boolean;
    data: {
        accounts: BankAccount[];
    };
}
