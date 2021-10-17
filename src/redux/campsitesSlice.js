import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { baseUrl } from '../shared/baseUrl';

const initialState = {
    status: 'loading',
    errMess: null,
    campsites: []
};

export const campsitesSlice = createSlice({
    name: 'campsites',
    initialState,
    reducers: {
        addCampsites: (state, action) => {
            state.status = 'idle',
            state.errMess = null,
            state.campsites = action.payload
        },
        campsitesLoading: (state) => {
            state.status = 'loading',
            state.errMess = null,
            state.campsites = []
        },
        campsitesFailed: (state, action) => {
            console.log(action);
            state.status = 'failed', 
            state.errMess = action.payload
        }
    },
    // extraReducers: (builder) => {
    //     builder.addCase(fetchCampsites.fulfilled, (state, action) => {
    //         state.campsites.push(action.payload);
    //     })
    // }
})

export const { addCampsites, campsitesLoading, campsitesFailed } = campsitesSlice.actions

export default campsitesSlice.reducer

export function fetchCampsites() {
    return async dispatch => {
      dispatch(campsitesLoading())
      try {
        const response = await fetch(`${baseUrl}campsites`)
        const data = await response.json()
          dispatch(addCampsites(data))
      } catch (error) {
        dispatch(campsitesFailed(error.message))
      }
    }
  }