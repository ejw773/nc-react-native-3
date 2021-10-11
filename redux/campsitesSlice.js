import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { baseUrl } from '../shared/baseUrl';

const initialState = {
    isLoading: null,
    errMess: null,
    campsites: []
};

export const campsitesSlice = createSlice({
    name: 'campsites',
    initialState,
    reducers: {
        addCampsites: (state, action) => {
            state.isLoading = null,
            state.errMess = null,
            state.campsites = action.payload
        },
        campsitesLoading: (state) => {
            state.isLoading = true,
            state.errMess = null,
            state.campsites = []
        },
        campsitesFailed: (state, action) => {
            state.isLoading = false, 
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
        dispatch(campsitesFailed())
      }
    }
  }