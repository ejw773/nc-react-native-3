import { createSlice } from '@reduxjs/toolkit';
import { baseUrl } from '../shared/baseUrl';

const initialState = {
    status: 'loading',
    errMess: null,
    partners: []
};

export const partnersSlice = createSlice({
    name: 'partners',
    initialState,
    reducers: {
        addPartners: (state, action) => {
            state.status = 'idle'
            state.errMess = null
            state.partners = action.payload
        },
        partnersLoading: (state) => {
            state.status = 'loading'
            state.errMess = null
            state.partners = []
        },
        partnersFailed: (state, action) => {
            state.isLoading = 'failed'
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
        dispatch(partnersFailed(error.message))
      }
    }
  }