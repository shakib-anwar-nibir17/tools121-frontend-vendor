"use client";
import { useLazyGetUsernameListByPhoneQuery, useUserNameOtpSendMutation } from "@/app/redux/features/authApi";
import { setUserNameData } from "@/app/redux/slices/authSlice";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

const UserNamesPages = () => {
  const dispatch = useDispatch();
  const [userNameOtpSend] = useUserNameOtpSendMutation();
  const { executeRecaptcha } = useGoogleReCaptcha();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [selectedUserName, setSelectedUserName] = useState("");

  const [triggerUserNameList, { data: userNames, error, isLoading }] =
  useLazyGetUsernameListByPhoneQuery();
  const userPhoneData = useSelector((state) => state.authStore.userPhone);

  
  const userNameListHandler = async () => {
    const token = await executeRecaptcha("usernames");
    const queryObj = {
      phone: userPhoneData,
      token: token,
    };
    triggerUserNameList(queryObj)
  }
  useEffect(() => {
    if(userNames?.data?.usernames == 0 || !userNames){
      userNameListHandler()
    }
  },[userPhoneData, !userNames])

  const proceedHandler = async (name) => {
    setLoading(true);
    setSelectedUserName(name);

    const token = await executeRecaptcha("user_verify");
    const request_Obj = {
      username: name,
      recaptcha_token: token,
    };

    dispatch(setUserNameData(request_Obj));
    setSelectedUserName("");
    setLoading(false);
    router.push("/reset-password");
      
  };
console.log('userNames ===>', userNames)
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
        {userNames?.data?.usernames?.map((item, index) => (
          <div key={index} className="flex items-center gap-3">
            <span className="font-bold text-black text-xl">{index + 1}</span>
            <div className="border border-slate-300 w-full h-12 rounded-lg flex justify-start items-center px-8">
              <p>{item}</p>
            </div>
            {loading && selectedUserName == item ? (
              <button className="h-12 bg-primary-900 text-white hover:bg-primary/90 rounded-md text-sm px-2">
                Loading...
              </button>
            ) : (
              <button
                onClick={() => proceedHandler(item)}
                className="h-12 bg-primary-900 text-white hover:bg-primary/90 rounded-md text-sm px-2"
              >
                Proceed
              </button>
            )}
          </div>
        ))}
        {/* component */}
      </div>
    </div>
  );
};

export default UserNamesPages;
