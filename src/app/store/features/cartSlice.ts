import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartData } from '@/types/cart';

interface CartState {
    cart: CartData | null;
}

const initialState: CartState = {
    cart: null,
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        setCart: (state, action: PayloadAction<CartData>) => {
            state.cart = action.payload;
        },
        clearCartState: (state) => {
            state.cart = null;
        },
    },
});

export const { setCart, clearCartState } = cartSlice.actions;
export default cartSlice.reducer;
