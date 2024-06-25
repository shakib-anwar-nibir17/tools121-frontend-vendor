"use client";

import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useEffect, useState } from "react";

export default function Verify() {
  const [otpValue, setOtpValue] = useState(null);
  const [error, setError] = useState();

  const [countDown, setCountDown] = useState(59);

  const resendOTP = () => {
    document.getElementById("otpForm").reset();
    setCountDown(59);
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (otpValue === null) {
      setError(
        "Please Provide your 4 digit OTP number! Do not share this with anyone"
      );
    } else {
      if (otpValue.length < 4) {
        setError("OTP must have 4 digits");
      } else {
        console.log(otpValue);

        setError(null);
      }
    }
  };

  return (
    <div className="w-[448px]">
      <div className="pb-11 text-center lg:text-left">
        <h1 className=" text-2xl sm:text-3xl lg:text-4xl text-[#01060D] font-bold pb-3">
          Enter your OTP
        </h1>
        <p className="mt-3 text-xl">Enter OTP to confirm your verification.</p>
      </div>
      <form id="otpForm" onSubmit={handleSubmit}>
        <InputOTP onChange={(value) => setOtpValue(value)} maxLength={4}>
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
        <p className="pt-2 text-red-500 text-lg">{error}</p>

        <Button
          type="submit"
          className="h-16 mt-10 rounded-2xl text-xl w-[448px]"
        >
          Verify
        </Button>
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
  );
}
