import {createSlice, PayloadAction} from "@reduxjs/toolkit"
import { BookListResponse} from "@/types/book"

interface BooksState {
    books: BookListResponse | null;
    error: string | null;
}
const initialState : BooksState = {
    books: null,
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
        }
    }
})

export const {
    getBooksSuccess
} = bookSlice.actions

export default bookSlice.reducer;
