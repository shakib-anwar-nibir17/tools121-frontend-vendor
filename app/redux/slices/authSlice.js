"use client";

import { createSlice } from "@reduxjs/toolkit";
// import {persistReducer} from 'redux-persist';

export const authSlice = createSlice({
  name: "authslice",
  initialState: {
    registerdata: {},
    userNameData: {},
    otpCode: {},
    userNames: [],
    loginName: {},
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
    setOtpCode: (state, action) => {
      state.otpCode = action.payload;
    },
    setUsernames: (state, action) => {
      state.userNames = action.payload;
    },
    setLoginName: (state, action) => {
      state.loginName = action.payload;
    },
  },
});

export const {
  setRegisterData,
  setUserNameData,
  setOtpCode,
  setUsernames,
  setLoginName,
} = authSlice.actions;

export const authSliceReducer = authSlice.reducer;
