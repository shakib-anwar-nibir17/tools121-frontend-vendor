"use client";

import { persistor, store } from "@/app/redux/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/lib/integration/react";


export default function RootLayout({ children }) {
  return (
    <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      {children}
    </PersistGate>
  </Provider>
  );
}
