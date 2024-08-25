"use client";

import Loader from "@/components/common/Loader";
import { useRouter } from "next/navigation";
import { useEffect} from "react";

const RootPage = () => {
  const router = useRouter();
  // const [loading, setLoading] = useState(true)

  useEffect(() => {
    const isToken = localStorage.getItem("vendorToken")
    console.log(isToken)
    if(isToken){
      // setLoading(false)
      router.push('/dashboard'); 
    }
    else{
      // setLoading(false)
      router.push('/signin'); 
    }
  },[])
  
  return (
    <div className="flex w-full h-screen justify-center items-center">
      <Loader />
    </div>
  );
};

export default RootPage;
