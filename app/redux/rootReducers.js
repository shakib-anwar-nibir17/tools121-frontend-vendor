import {combineReducers} from '@reduxjs/toolkit';
import { api } from './api/api';
import { commonSliceReducer } from './slices/commonSlice';
import {authSliceReducer } from './slices/authSlice';

// add the necessary reducers here //
export const rootReducer = combineReducers({
  commonstore: commonSliceReducer,
  authStore: authSliceReducer,
  [api.reducerPath]: api.reducer,
});
