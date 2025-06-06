/* eslint-disable no-empty-pattern */
"use client";
import {
  useResendOtpMutation,
  useVerifyOtpMutation,
} from "@/app/redux/features/authApi";
import { setRegisterData } from "@/app/redux/slices/authSlice";
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

export default function Verify() {
  const { executeRecaptcha } = useGoogleReCaptcha();
  const registerdata = useSelector((state) => state.authStore.registerdata);
  const [verifyRegOtp, {}] = useVerifyOtpMutation();
  const [resendOtp, {}] = useResendOtpMutation();
  const [otpValue, setOtpValue] = useState(null);
  const [error, setError] = useState();
  const dispatch = useDispatch();
  const [countDown, setCountDown] = useState(59);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

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

  const variFicationHandler = async () => {
    if (registerdata?.phone) {
      const token = await executeRecaptcha("verify_otp");
      const request_Obj = {
        username: registerdata?.username,
        recaptcha_token: token,
        otp: otpValue,
      };
      console.log(request_Obj);
      const verifyRes = await verifyRegOtp(request_Obj);

      if (verifyRes?.data?.message == "OTP verify success") {
        setLoading(false);
        toast.success("Registration Successfull", {
          position: "top-right",
          duration: 2000,
        });

        localStorage.setItem("vendorToken", verifyRes?.data?.access_token);
        router.push("/signin");
        dispatch(setRegisterData({}));
      }
      else if(verifyRes?.error?.data?.message == "Invalid OTP"){
        setError("Invalid OTP")
        setLoading(false)
      }
      else{
        setLoading(false)
      }
      console.log("VerifyRes ===>", verifyRes);
    } else {
      setError("Please complete registration first");
    }
  };

  const resendOTP = async () => {
    const token = await executeRecaptcha("resend_otp");
    const request_Obj = {
      username: registerdata?.username,
      recaptcha_token: token,
    };

    const resendOtp_res = await resendOtp(request_Obj);

    console.log("resendOtp res ===>", resendOtp_res);
    document.getElementById("otpForm").reset();
    setCountDown(59);
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
        variFicationHandler();
        setError(null);
      }
    }
  };

  return (
    <div className="mt-20">
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
            <InputOTPGroup className="h-16 xl:w-[448px] md:w-[350px] w-full">
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
              className="h-16 mt-10 rounded-2xl text-xl w-full"
            >
              Loading...
            </Button>
          ) : (
            <Button
              type="submit"
              className="h-16 mt-10 rounded-2xl text-xl w-full"
            >
              Verify
            </Button>
          )}
        </form>
        <p className="pt-4 text-black text-lg text-center">
          Haven’t received it? Resend it after -{" "}
          <span className="font-bold">{countDown}s</span>
          {countDown === 0 && (
            <button onClick={resendOTP} className="text-primary-900 ml-3">
              Resend OTP
            </button>
          )}
        </p>
      </div>
    </div>
  );
}
