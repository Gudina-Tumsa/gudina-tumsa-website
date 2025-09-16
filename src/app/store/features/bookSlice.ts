import {createSlice, PayloadAction} from "@reduxjs/toolkit"
import { BookListResponse , BookData} from "@/types/book"

interface BooksState {
    books: BookListResponse | null;
    currentBook: BookData | null;
    error: string | null;
}
const initialState : BooksState = {
    books: null,
    currentBook:   null,
    error : null
}

const bookSlice = createSlice({
    name : 'books',
    initialState,
    reducers : {
        getBooksSuccess : (state , action :  PayloadAction<BookListResponse>) => {
            if (state.books === null) {
                state.books = {
                    data: {
                        books: [],
                        total: 0,
                        page: 1,
                        limit: 10,
                    },
                };
            }
            state.books.data.books = action.payload.data.books
            state.books.data.page = action.payload.data.page
            state.books.data.limit = action.payload.data.limit
            state.books.data.total = action.payload.data.total
        },
        setCurrentBook: (state, action: PayloadAction<BookData>) => {
            state.currentBook = action.payload;
        },
        clearCurrentBook: (state) => {
            state.currentBook = null;
        },
    }
})

export const {
    getBooksSuccess,
    setCurrentBook,
    clearCurrentBook,
} = bookSlice.actions

export default bookSlice.reducer;
