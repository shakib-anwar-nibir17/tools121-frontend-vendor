"use client";

import { createSlice } from "@reduxjs/toolkit";
// import {persistReducer} from 'redux-persist';

export const authSlice = createSlice({
  name: "authslice",
  initialState: {
    registerdata: {},
    userNameData: {},
  },
  reducers: {
    setRegisterData: (state, action) => {
      state.registerdata = action.payload;
    },
    // set userName for otp verify
    setUserNameData: (state, action) => {
      // Add setUserData reducer
      state.userNameData = action.payload;
    },
  },
});

export const { setRegisterData, setUserNameData } = authSlice.actions;

export const authSliceReducer = authSlice.reducer;
