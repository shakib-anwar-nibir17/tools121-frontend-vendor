"use client"

import {createSlice} from '@reduxjs/toolkit';
// import {persistReducer} from 'redux-persist';

export const authSlice = createSlice({
  name: 'authslice',
  initialState: {
    registerdata: {},
  },
  reducers: {
    setRegisterData: (state, action) => {
      state.registerdata = action.payload ;
    },
  },
});

export const {setRegisterData} =
  authSlice.actions;

export const authSliceReducer = authSlice.reducer;
