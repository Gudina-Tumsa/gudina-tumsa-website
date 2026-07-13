import { PaymentMethod } from "./sale";

export interface PaymentMethodOption {
    method: PaymentMethod;
    label: string;
    toggleable: boolean;
    status: "LIVE" | "PAUSED";
}

export interface PaymentMethodsResponse {
    success: boolean;
    data: {
        methods: PaymentMethodOption[];
    };
}
