import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { baseUrl } from '../shared/baseUrl';

const initialState = {
    status: 'loading',
    errMess: null,
    favorites: [1]
}

export const favoritesSlice = createSlice({
    name: 'favorite',
    initialState,
    reducers: {
        postFavorite: (state, action) => {
            if (state.favorites.includes(action.payload)) {
                state.favorites = (state.favorites.filter(item => item !== action.payload))
            } else {
                state.favorites = [...state.favorites, action.payload]
            }
        },
        deleteFavorite: (state, action) => {
            state.favorites = state.favorites.filter(favorite => favorite !== action.payload);
        }
    }
})

export const { postFavorite, deleteFavorite } = favoritesSlice.actions
export default favoritesSlice.reducer