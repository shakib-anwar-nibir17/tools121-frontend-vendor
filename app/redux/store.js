"use client"

import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import {api} from './api/api';
import {persistReducer, persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import localforage from 'localforage';
import { rootReducer } from './rootReducers';

const persistConfig={
  key: 'persist-store', 
  storage: localforage
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  // middleware: (getDefaultMiddleware) =>
  // getDefaultMiddleware().concat(api.middleware),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(api.middleware),
})

setupListeners(store.dispatch)

export const persistor = persistStore(store);


// store.js (or your store configuration file)

// store.js (or your store configuration file)
// import { configureStore } from '@reduxjs/toolkit';
// import { setupListeners } from '@reduxjs/toolkit/query';
// import { persistReducer, persistStore, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
// import localforage from 'localforage';
// import createNoopStorage from './createNoopStorage';
// import { rootReducer } from './rootReducers';
// import { api } from './api/api';

// const storage = typeof window !== 'undefined' ? localforage : createNoopStorage();

// const persistConfig = {
//   key: 'persist-store',
//   storage,
// };

// const persistedReducer = persistReducer(persistConfig, rootReducer);

// export const store = configureStore({
//   reducer: persistedReducer,
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: {
//         ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
//       },
//     }).concat(api.middleware),
// });

// setupListeners(store.dispatch);

// export const persistor = persistStore(store);
