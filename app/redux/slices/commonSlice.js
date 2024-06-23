"use client"

import {createSlice} from '@reduxjs/toolkit';
// import {persistReducer} from 'redux-persist';

export const commonSlice = createSlice({
  name: 'commonstoreslice',
  initialState: {
    count: 0,
  },
  reducers: {
    setcounterHandler: (state, action) => {
      console.log("Actions", action?.payload)
      state.count += action.payload ;
    },
  },
});

export const {setcounterHandler} =
  commonSlice.actions;

export const commonSliceReducer = commonSlice.reducer;
