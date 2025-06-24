import { configureStore } from '@reduxjs/toolkit';
import categoryReducer from "./features/categorySlice"
import userReducer from './features/userSlice'
import bookReducer from "./features/bookSlice"
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,

} from 'redux-persist'
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    user: userReducer,
    category: categoryReducer,
    book: bookReducer,
});

const persistConfig = {
    key: 'root',
    storage,
};

const persistedReducer = persistReducer(persistConfig , rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;