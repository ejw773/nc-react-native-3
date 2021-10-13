import { configureStore } from '@reduxjs/toolkit';

import campsitesReducer from './campsitesSlice';
import commentsReducer from './commentsSlice';
import partnersReducer from './partnersSlice';
import promotionsReducer from './promotionsSlice';
import favoritesReducer from './favoritesSlice'

export const store = configureStore({
    reducer: {
        campsites: campsitesReducer,
        comments: commentsReducer,
        partners: partnersReducer,
        promotions: promotionsReducer,
        favorites: favoritesReducer
    }
})
