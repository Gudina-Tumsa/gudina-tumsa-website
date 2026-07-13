import { BankAccountsResponse } from '@/types/bankAccount';

// Public endpoint — lists only active accounts, for the Bank Transfer checkout dropdown.
export const getBankAccounts = async (): Promise<BankAccountsResponse> => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/bank-accounts`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        cache: 'no-store',
    });

    if (!response.ok) {
        throw new Error('Failed to load bank accounts');
    }

    return response.json();
};
