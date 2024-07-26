/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
"use client";

import { persistor, store } from "@/app/redux/store";
import { ContextProvider } from "@/utils/contexProvider";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/lib/integration/react";
import ReCaptchaProvider from "./reCaptchaProvider/ReCaptchaProvider";

export default function RootLayout({ children }) {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const isToken = localStorage.getItem("vendorToken");
    if (isToken) {
      setLoading(false);
    } else {
      setLoading(false);
      router.push("/signin");
    }
  }, []);

  return (
    // <>
    //   {
    //      loading ? <div className="w-full h-screen flex flex-row justify-center items-center">
    //       <Loader/>
    //      </div> :

    //   }
    // </>
    <ReCaptchaProvider>
      <Provider store={store}>
        <ContextProvider>
          <PersistGate loading={null} persistor={persistor}>
            {children}
          </PersistGate>
        </ContextProvider>
      </Provider>
      <Toaster position="bottom-right" reverseOrder={false} />
    </ReCaptchaProvider>
  );
}
