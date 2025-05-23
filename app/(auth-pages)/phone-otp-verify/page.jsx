/* eslint-disable no-empty-pattern */
"use client";

import {
    useResendOtpByPhoneMutation,
  useVerifyOtpByPhoneMutation,
} from "@/app/redux/features/authApi";
import { setOtpCode } from "@/app/redux/slices/authSlice";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

export default function PhoneOtpVerify() {
  const [otpValue, setOtpValue] = useState(null);
  const [error, setError] = useState();
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [loading, setLoading] = useState(false);
  const [resendOtpByPhone, {}] = useResendOtpByPhoneMutation();
  const [verifyOtpByPhone, {}] = useVerifyOtpByPhoneMutation();

  const userPhoneData = useSelector((state) => state.authStore.userPhone);

  const router = useRouter();
  const dispatch = useDispatch();

  const [countDown, setCountDown] = useState(59);

  const resendOTPHandler = async () => {
    setLoading(false);
    const token = await executeRecaptcha("resend_otp");
    const request_Obj = {
      phone: userPhoneData,
      recaptcha_token: token,
    };

    const resendOtp_res = await resendOtpByPhone(request_Obj);

    console.log("resendOtp res ===>", resendOtp_res);

    if(resendOtp_res?.error?.data?.message == "Request failed"){
      toast.error("OTP send failed", {
        position: "top-right",
        duration: 2000,
      });
    }
    else{
      setCountDown(59);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (countDown > 0) {
        setCountDown(countDown - 1);
      }
      if (countDown === 0) {
        clearInterval(interval);
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [countDown]);

  // handle r function for OTP verification

  const handlerVerification = async () => {
    if (userPhoneData) {
      const token = await executeRecaptcha("verify_otp");
      const request_Obj = {
        phone: userPhoneData,
        recaptcha_token: token,
        otp: otpValue,
      };
      
      const verifyRes = await verifyOtpByPhone(request_Obj);
      console.log('verifyRes ===> ', verifyRes);
      setLoading(false)

      if (verifyRes?.data?.message == "OTP verify success") {
        setLoading(false);

        dispatch(setOtpCode(request_Obj));

        toast.success("OTP Verification Successful", {
          position: "top-right",
          duration: 2000,
        });
      
        router.push("/user-names/auth"); 
      }
      else{
        setLoading(false);

        toast.error("OTP Verification Failed", {
          position: "top-right",
          duration: 2000,
        });
      }
    } else {
      setError("Please try Resend OTP option first");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (otpValue === null) {
      setError(
        "Please Provide your 6 digit OTP number! Do not share this with anyone"
      );
    } else {
      if (otpValue.length < 6) {
        setError("OTP must have 6 digits");
      } else {
        console.log(otpValue);
        setLoading(true);
        handlerVerification();
        setError(null);
      }
    }
  };

  return (
    <div className="mt-10">
      <div className="xl:w-[448px] md:w-[350px] w-full">
        <div className="pb-11 text-center lg:text-left">
          <h1 className=" text-2xl sm:text-3xl lg:text-4xl text-[#01060D] font-bold pb-3">
            Enter your OTP
          </h1>
          <p className="mt-3 text-xl">
            Enter OTP to confirm your verification.
          </p>
        </div>
        <form id="otpForm" onSubmit={handleSubmit}>
          <InputOTP onChange={(value) => setOtpValue(value)} maxLength={6}>
            <InputOTPGroup className="h-16 xl:w-[448px] md:w-[350px] w-full]">
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
          <p className="pt-2 text-black text-lg">
            Enter the code sent to your mobile.
          </p>
          <p className="pt-2 text-red-500 text-lg">{error}</p>

          {loading ? (
            <Button
              // type="submit"
              className="h-16 mt-10 rounded-2xl text-xl w-[448px]"
            >
              Loading...
            </Button>
          ) : (
            <Button
              type="submit"
              className="h-16 mt-10 rounded-2xl text-xl w-[448px]"
            >
              Verify
            </Button>
          )}
        </form>
        <p className="pt-4 text-black text-lg text-center">
          Haven’t received it? Resend it after -{" "}
          <span className="font-bold">{countDown}s</span>
          {countDown === 0 && (
            <button onClick={resendOTPHandler} className="text-primary-900 ml-3">
              Resend OTP
            </button>
          )}
        </p>
      </div>
    </div>
  );
}
