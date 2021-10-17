import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
  } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

import campsitesReducer from './campsitesSlice';
import commentsReducer from './commentsSlice';
import partnersReducer from './partnersSlice';
import promotionsReducer from './promotionsSlice';
import favoritesReducer from './favoritesSlice'

const rootReducer = combineReducers({
    campsites: campsitesReducer,
    comments: commentsReducer,
    partners: partnersReducer,
    promotions: promotionsReducer,
    favorites: favoritesReducer
})

const persistConfig = {
    key: 'root',
    version: 1,
    storage: AsyncStorage
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})
