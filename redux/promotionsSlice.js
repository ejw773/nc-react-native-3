import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isLoading: true,
    errMess: null,
    promotions: []
}

export const promotionsSlice = createSlice({
    name: 'promotions',
    initialState,
    reducers: {
        addPromotions: (state) => {
            state.isLoading = false;
            state.errMess = null;
            state.promotions = [];
        },
        promotionsLoading: (state) => {
            state.isLoading = true
            state.errMess = null
            state.promotions = []
        },
        promotionsFailed: (state, action) => {
            state.isLoading = false
            state.errMess = action.payload
        }
    }
})

export const { addPromotions, promotionsLoading, promotionsFailed } = promotionsSlice.actions

export default promotionsSlice.reducer