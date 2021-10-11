import { createSlice } from '@reduxjs/toolkit';
import { baseUrl } from '../shared/baseUrl';

const initialState = {
    isLoading: true,
    errMess: null,
    promotions: []
}

export const promotionsSlice = createSlice({
    name: 'promotions',
    initialState,
    reducers: {
        addPromotions: (state, action) => {
            state.isLoading = null;
            state.errMess = null;
            state.promotions = action.payload;
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

export function fetchPromotions() {
    return async dispatch => {
      dispatch(promotionsLoading())
      try {
        const response = await fetch(`${baseUrl}promotions`)
        const data = await response.json()
        dispatch(addPromotions(data))
      } catch (error) {
        dispatch(promotionsFailed())
      }
    }
  }