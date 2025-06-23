import {createSlice, PayloadAction} from "@reduxjs/toolkit"
import { CategoryListResponse} from "@/types/category"

interface CategoryState {
     categories: CategoryListResponse | null;
     error: string | null;
}
const initialState : CategoryState = {
    categories: null,
    error : null
}

const categorySlice = createSlice({
    name : 'category',
    initialState,
    reducers : {
       getCategoriesSuccess : (state , action :  PayloadAction<CategoryListResponse>) => {
           if (state.categories === null) {
               state.categories = {
                   data: {
                       categories: [],
                       total: 0,
                       page: 1,
                       limit: 10,
                   },
               };
           }
           state.categories.data.categories = action.payload.data.categories
           state.categories.data.page = action.payload.data.page
           state.categories.data.limit = action.payload.data.limit
           state.categories.data.total = action.payload.data.total
       }
    }
})

export const {
    getCategoriesSuccess
} = categorySlice.actions

export default categorySlice.reducer;
