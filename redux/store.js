import { configureStore } from '@reduxjs/toolkit';

import campsitesReducer from './campsitesSlice';
import commentsReducer from './commentsSlice';
import partnersReducer from './partnersSlice'
import promotionsReducer from './promotionsSlice'

export const store = configureStore({
    reducer: {
        campsites: campsitesReducer,
        comments: commentsReducer,
        partners: partnersReducer,
        promotions: promotionsReducer
    }
})
