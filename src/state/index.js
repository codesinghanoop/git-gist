import { useDispatch, useSelector } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import GistReducer from './gist';

const reducers = combineReducers({
  gist: GistReducer
});

const persistConfig = {
  key: 'appStateV1',
  storage: storage,
  blacklist: [], //Items put here will not go to the localstorage.
  whitelist: ['gist'],
}

const persistedReducers = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ['fetch/publicGist'],
        ignoredPaths: ['gist'],
      },
    }),
});

let rehydrationComplete;

export const rehydration = new Promise((resolve) => {
  rehydrationComplete = resolve;
});

export const persistor = persistStore(store, null, () => {
  rehydrationComplete();
});


export const useAppState = (selector) => useSelector(selector);

export const useAppDispatch = () => useDispatch();

export function getState() {
  return store.getState();
}
