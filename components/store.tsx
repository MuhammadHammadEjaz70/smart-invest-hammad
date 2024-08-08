import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import { combineReducers } from 'redux';
import imageReducer from './imageSlice'; // Path to your image slice
import coinsReducer from './coinsSlice'; // Path to your coins slice

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['image', 'coins'], // Only persist the image and coins slices
};

const rootReducer = combineReducers({
  image: imageReducer,
  coins: coinsReducer,
  // other reducers can go here
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;