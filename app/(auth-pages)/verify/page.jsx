"use client";
import { Button } from "@/components/ui/button";
import {
  useFp_verifyOTPMutation,
  useResendOTPMutation,
} from "@/features/api/auth";
import { yupResolver } from "@hookform/resolvers/yup";
import Cookies from "js-cookie";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const schema = yup
  .object({
    login_name: yup.string().required("Login name is required"),
    otp: yup.string().required("Login name is required"),
  })
  .required();

export default function Verify() {
  const [secondsLeft, setSecondsLeft] = useState(300);
  const [timerActive, setTimerActive] = useState(false);
  const params = useSearchParams();
  const { executeRecaptcha } = useGoogleReCaptcha();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      login_name: params.get("_u"),
    },
  });
  const [fp_verifyOTP, {}] = useFp_verifyOTPMutation();
  const [
    resendOTP,
    {
      isLoading: re_isLoading,
      isSuccess: re_isSuccess,
      error: re_error,
      isError: re_isError,
    },
  ] = useResendOTPMutation();

  useEffect(() => {
    let timer;
    if (timerActive && secondsLeft > 0) {
      timer = setTimeout(() => {
        setSecondsLeft((prevSeconds) => prevSeconds - 1);
      }, 1000);
    } else if (secondsLeft === 0) {
      setTimerActive(false);
    }

    return () => clearTimeout(timer);
  }, [timerActive, secondsLeft]);

  function convertSecondsToMinSec(totalSeconds) {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes > 0 ? minutes : 0} : ${seconds} left`;
  }

  const handleResendClick = async () => {
    const token = await executeRecaptcha("resend_otp");
    const updated_data = {
      login_name: params.get("_u"),
      recaptcha_token: token,
    };

    console.log("token----", updated_data);

    try {
      const res = await resendOTP(updated_data);

      if (res?.data) {
        setTimerActive(true);
        setSecondsLeft(300);
        console.log("Resend OTP");
      }
      if (res?.error) {
        router.push(`/verify?_u=${params.get("_u")}`);
        console.log("Successfully Token");
      }
    } catch (error) {
      console.log("Login failed");
    }
  };

  async function onSubmit(data) {
    const token = await executeRecaptcha("verify_otp");
    const updated_data = {
      ...data,
      recaptcha_token: token,
    };

    try {
      const token = Cookies.get("authToken");
      if (token) {
      } else {
        const res2 = await fp_verifyOTP(updated_data);
        if (res2?.data) {
          console.log("Successfully Token!");
          router.push(`/reset-password?_u=${params.get("_u")}`);
        }
        if (res2?.error) {
          router.push(`/verify?_u=${params.get("_u")}`);
          console.log("Failed Token");
        }
      }
    } catch (error) {
      console.log("Login failed");
    }
  }
  return (
    <>
      <div className="pb-11 text-center lg:text-left">
        <h1 className=" text-2xl sm:text-3xl lg:text-4xl text-[#01060D] font-bold pb-3">
          Verify Account
        </h1>
        {/* <p className="text-[#808386] text-xs sm:text-sm md:text-base font-normal">
              Start your 30 day free trial, cancel anytime
            </p> */}
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="bg-red-500 relative divide-x border rounded-xl overflow-hidden flex items-center mb-1.5">
          <input
            className={`${
              errors.otp ? "border rounded-xl border-red-500" : ""
            } w-full py-3 text-center placeholder:text-center focus:outline-none px-2`}
            type="text"
            placeholder="- - - -"
            {...register("otp")}
            id="otp"
          />
          {/* <input
              className="w-full py-3 text-center placeholder:text-center focus:outline-none px-2"
              type="text"
              placeholder="----"
            />
            <input
              className="w-full py-3 text-center placeholder:text-center focus:outline-none px-2"
              type="text"
              placeholder="----"
            />
            <input
              className="w-full py-3 text-center placeholder:text-center focus:outline-none px-2"
              type="text"
              placeholder="----"
            /> */}
        </div>
        <p className="font-normal text-primary-950 mb-8">
          Enter the code sent to your mobile.
        </p>

        <Button type="submit" className="py-3 w-full  rounded-xl mb-6">
          Verify
        </Button>
      </form>

      {timerActive ? (
        <p
          className="font-normal text-primary-950  text-center mb-8"
          disabled
        >{`Resend OTP (${convertSecondsToMinSec(secondsLeft)})`}</p>
      ) : (
        <p className="font-normal text-primary-950  text-center mb-8">
          Haven’t received it?{" "}
          <strong
            onClick={handleResendClick}
            className=" transition duration-300 hover:underline hover:text-blue-600 cursor-pointer"
          >
            Resend Code
          </strong>
        </p>
      )}
    </>
  );
}
