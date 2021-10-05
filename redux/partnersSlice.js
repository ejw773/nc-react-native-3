import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isLoading: true,
    errMess: null,
    partners: []
};

export const partnersSlice = createSlice({
    name: 'partners',
    initialState,
    reducers: {
        addPartners: (state) => {
            state.isLoading = false
            state.errMess = null
            state.partners = action.payload
        },
        partnersLoading: (state) => {
            state.isLoading = true
            state.errMess = null
            state.partners = []
        },
        partnersFailed: (state) => {
            state.isLoading = false
            state.errMess = action.payload
        }
    }
})

export const { addPartners, partnersLoading, partnersFailed } = partnersSlice.actions
export default partnersSlice.reducer