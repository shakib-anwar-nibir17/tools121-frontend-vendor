"use client";

import { persistor, store } from "@/app/redux/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/lib/integration/react";
import ReCaptchaProvider from "./reCaptchaProvider/ReCaptchaProvider";
import { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';

export default function RootLayout({ children }) {
  const [loading, setLoading] = useState(true)
  const router = useRouter();

  // useEffect(() => {
  //   const isToken = localStorage.getItem("vendorToken")
  //   if(isToken){
  //     setLoading(false)
  //   }
  //   else{
  //     setLoading(false)
  //     router.push('/signin'); 
  //   }
  // },[])

  return (
    <>
      {
         !loading ? <h1 className="text-3xl font-bold">Loading...</h1> : <ReCaptchaProvider>
         <Provider store={store}>
         <PersistGate loading={null} persistor={persistor}>
           {children}
         </PersistGate>
       </Provider>
       <Toaster position="bottom-right" reverseOrder={false} />
       </ReCaptchaProvider>
      }
    </>
    
    
  );
}
