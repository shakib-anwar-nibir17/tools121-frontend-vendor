// "use client";

import Header from "@/components/common/Header";
import Sidebar from "@/components/common/Sidebar";
// import { useRouter } from 'next/navigation';
// import { useEffect, useState } from "react";

export default function MainDashboardLayout({ children }) {
  // const router = useRouter();
  // const [loading, setLoading] = useState(true)

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
      <Header />
      <main className="flex">
        <Sidebar />
        <div className="w-full relative">
          {/* {
            !loading ? <h1 className="text-3xl font-bold">Loading...</h1> : <div className="mt-10 mx-6">{children}</div>
          } */}
           <div className="mt-10 mx-6">{children}</div>
        </div>
      </main>
    </>
  );
}
