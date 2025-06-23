import { configureStore } from '@reduxjs/toolkit';
import categoryReducer from "./features/categorySlice"
import userReducer from './features/userSlice'
import bookReducer from "./features/bookSlice"

export const store = configureStore({
    reducer: {
        user: userReducer,
        category : categoryReducer,
        book : bookReducer
    },
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;