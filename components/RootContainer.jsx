"use client";

import { persistor, store } from "@/app/redux/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/lib/integration/react";
import ReCaptchaProvider from "./reCaptchaProvider/ReCaptchaProvider";
import { Toaster } from "react-hot-toast";

export default function RootLayout({ children }) {
  return (
    <ReCaptchaProvider>
      <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
    <Toaster position="bottom-right" reverseOrder={false} />
    </ReCaptchaProvider>
    
  );
}
