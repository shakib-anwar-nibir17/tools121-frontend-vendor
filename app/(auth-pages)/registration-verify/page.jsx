"use client";
import { useRegisterOtpVerifyMutation } from "@/app/redux/features/authApi";
import OTPTimer from "@/components/common/OTPTimer";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

export default function Verify() {
  const { executeRecaptcha } = useGoogleReCaptcha();
  const registerdata = useSelector((state) => state.authStore.registerdata)
  const [verifyRegOtp, { }] = useRegisterOtpVerifyMutation();
  
  const variFicationHandler = async () => {
    const token = await executeRecaptcha("verify_otp");
    const request_Obj = {
      login_name: registerdata?.login_name,
      recaptcha_token: token,
      otp: "571877"
    }
    const verifyRes = await verifyRegOtp(request_Obj)

    console.log("VerifyRes ===>", verifyRes)
  }
  return (
    <>
      <div className="pb-11 text-center lg:text-left">
        <h1 className=" text-2xl sm:text-3xl lg:text-4xl text-[#01060D] font-bold pb-3">
          Verify Account
        </h1>
        <p className="mt-3 text-xl">Verify OTP to confirm your registration.</p>
      </div>
      <InputOTP maxLength={4}>
        <InputOTPGroup className="h-16 w-[448px]">
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
          <InputOTPSlot index={3} />
        </InputOTPGroup>
      </InputOTP>
      <p className="pt-2 text-black text-lg">
        Enter the code sent to your mobile.
      </p>
      <button onClick={variFicationHandler}  className="text-white h-16 w-full mt-10 rounded-2xl text-xl bg-primary-900">Verify</button>

      {/* <Button  className="h-16 w-full mt-10 rounded-2xl text-xl">Verify</Button> */}

      <p className="pt-4 text-black text-lg text-center">
        Haven’t received it? Resend it after - <OTPTimer  />
      </p>
    </>
  );
}
