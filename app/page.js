"use client";

import Loader from "@/components/common/Loader";
import { useRouter } from "next/navigation";
import { useEffect} from "react";

const RootPage = () => {
  const router = useRouter();
  // const [loading, setLoading] = useState(true)
  const isToken = localStorage.getItem("vendorToken")

  useEffect(() => {
    
    console.log("isToken Page ===>>", isToken)

    if(isToken){
      // setLoading(false)
      console.log('entered dashboard condition')
      router.push('/dashboard'); 
    }
    else{
      // setLoading(false)
      router.push('/signin'); 
    }
  },[isToken])
  
  return (
    <div className="flex w-full h-screen justify-center items-center">
      <Loader />
    </div>
  );
};

export default RootPage;
