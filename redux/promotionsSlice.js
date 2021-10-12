import { createSlice } from '@reduxjs/toolkit';
import { baseUrl } from '../shared/baseUrl';

const initialState = {
    status: 'loading',
    errMess: null,
    promotions: []
}

export const promotionsSlice = createSlice({
    name: 'promotions',
    initialState,
    reducers: {
        addPromotions: (state, action) => {
            state.status = 'idle'
            state.errMess = null
            state.promotions = action.payload
        },
        promotionsLoading: (state) => {
            state.status = 'loading'
            state.errMess = null
            state.promotions = []
        },
        promotionsFailed: (state, action) => {
            state.status = 'failed'
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
        dispatch(promotionsFailed(error.message))
      }
    }
  }