import { createSlice } from '@reduxjs/toolkit';
import { ActionSheetIOS } from 'react-native';

const initialState = {
    isLoading: true,
    errMess: null,
    campsites: []
};

export const campsitesSlice = createSlice({
    name: 'campsites',
    initialState,
    reducers: {
        addCampsites: (state, action) => {
            state.isLoading = false,
            state.errMess = null,
            state.campsites = action.payload
        },
        campsitesLoading: (state) => {
            state.isLoading = true,
            errMess = null,
            campsites = []
        },
        campsitesFailed: (state, action) => {
            state.isLoading = false, 
            state.errMess = action.payload
        }
    }
})

export const { addCampsites, campsitesLoading, campsitesFailed } = campsitesSlice.actions

export default campsitesSlice.reducer
