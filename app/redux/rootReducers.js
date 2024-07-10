import {combineReducers} from '@reduxjs/toolkit';
import { api } from './api/api';
import { commonSliceReducer } from './slices/commonSlice';
import {authSliceReducer } from './slices/authSlice';
import { inventoryReducer } from './slices/inventorySlice';

// add the necessary reducers here //
export const rootReducer = combineReducers({
  commonstore: commonSliceReducer,
  authStore: authSliceReducer,
  inventoryStore: inventoryReducer,
  [api.reducerPath]: api.reducer,
});
