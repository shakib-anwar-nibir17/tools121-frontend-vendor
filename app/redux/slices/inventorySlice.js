"use client";

import { createSlice } from "@reduxjs/toolkit";
// import {persistReducer} from 'redux-persist';

export const inventorySlice = createSlice({
  name: "inventorySlice",
  initialState: {
    singleProductRequest: {},
  },
  reducers: {
    setSingleProductRequst: (state, action) => {
      state.singleProductRequest = action.payload;
    },
  },
});

export const {
    setSingleProductRequst
} = inventorySlice.actions;

export const inventoryReducer = inventorySlice.reducer;
