"use client";
import { useUserNameOtpSendMutation } from "@/app/redux/features/authApi";
import { useDispatch, useSelector } from "react-redux";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { setUserNameData } from "@/app/redux/slices/authSlice";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useState } from "react";

const UserNamesPages = () => {
  const dispatch = useDispatch();
  const [userNameOtpSend, {}] = useUserNameOtpSendMutation();
  const userNames = useSelector((state) => state.authStore.userNames)
  const { executeRecaptcha } = useGoogleReCaptcha();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [selectedUserName, setSelectedUserName] = useState('')

  const proceedHandler = async (name) => {
    setLoading(true)
    setSelectedUserName(name)

    const token = await executeRecaptcha("user_verify");
    const request_Obj = {
      username: name,
      recaptcha_token: token,
    };

    const response = await userNameOtpSend(request_Obj);

    if (response?.data?.message == "OTP sent for verification") {
      toast.success("OTP has been successfully", {
        position: "top-right",
        duration: 3000,
      });
      
      dispatch(setUserNameData(request_Obj));
      setSelectedUserName('')
      setLoading(false);
      router.push("/username-verify");
    } else {
      setLoading(false);
      setSelectedUserName('')
      toast.error("Signed-up failed try again", {
        position: "top-right",
        duration: 2000,
      });
    }

    
  }
  
  return (
    <div className="text-black">
      <div className="text-center lg:text-left my-10">
        <h1 className=" text-2xl sm:text-3xl lg:text-4xl text-main-950 font-bold pb-3 pt-3">
          List of users for this number
        </h1>
        <p>Select a UserName to Proceed</p>
      </div>
      <div className="space-y-3">
        {/* component */}
        {
          userNames?.data?.usernames?.map((item, index) => (
            <div className="flex items-center gap-3">
              <span className="font-bold text-black text-xl">{index + 1}</span>
              <div className="border border-slate-300 w-full h-12 rounded-lg flex justify-start items-center px-8">
                <p>{item}</p>
              </div>
              {
                loading && selectedUserName == item ? <button   className="h-12 bg-primary-900 text-white hover:bg-primary/90 rounded-md text-sm px-2">Loading...</button>  :<button onClick={() => proceedHandler(item)}  className="h-12 bg-primary-900 text-white hover:bg-primary/90 rounded-md text-sm px-2">Proceed</button>
              }
            </div>
          ))
        }
        {/* component */}
      </div>
    </div>
  );
};

export default UserNamesPages;
