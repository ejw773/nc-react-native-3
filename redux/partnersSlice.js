import { createSlice } from '@reduxjs/toolkit';
import { baseUrl } from '../shared/baseUrl';

const initialState = {
    isLoading: true,
    errMess: null,
    partners: []
};

export const partnersSlice = createSlice({
    name: 'partners',
    initialState,
    reducers: {
        addPartners: (state, action) => {
            state.isLoading = null
            state.errMess = null
            state.partners = action.payload
        },
        partnersLoading: (state) => {
            state.isLoading = true
            state.errMess = null
            state.partners = []
        },
        partnersFailed: (state, action) => {
            state.isLoading = false
            state.errMess = action.payload
        }
    }
})

export const { addPartners, partnersLoading, partnersFailed } = partnersSlice.actions
export default partnersSlice.reducer

export function fetchPartners() {
    return async dispatch => {
      dispatch(partnersLoading())
  
      try {
        const response = await fetch(`${baseUrl}partners`)
        const data = await response.json()
  
        dispatch(addPartners(data))
      } catch (error) {
        dispatch(partnersFailed())
      }
    }
  }