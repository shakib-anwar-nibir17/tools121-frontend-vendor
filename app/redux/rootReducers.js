import {combineReducers} from '@reduxjs/toolkit';
import { api } from './api/api';
import { commonSliceReducer } from './slices/commonSlice';

// add the necessary reducers here //
export const rootReducer = combineReducers({
  commonstore: commonSliceReducer,
  [api.reducerPath]: api.reducer,
});
