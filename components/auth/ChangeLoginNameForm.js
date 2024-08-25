/* eslint-disable no-unused-vars */
/* eslint-disable no-empty-pattern */
"use client";
import { useLazyGetUsernameListByPhoneQuery, usePhoneOtpSendMutation } from "@/app/redux/features/authApi";
import { setUsernames, setUserPhoneData } from "@/app/redux/slices/authSlice";
import { Button } from "@/components/ui/button";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import * as yup from "yup";

export default function ChangeLoginNameForm() {
  const schema = yup
    .object({
      phone: yup
        .string()
        .required("Phone number is required")
        .matches(
          /^01\d{9}$/,
          'Invalid phone number (must start with "01" and be 11 digits)'
        ),
    })
    .required();

  const [loading, setLoading] = useState();
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [triggerUserNameList, { data, error, isLoading }] =
    useLazyGetUsernameListByPhoneQuery();
  const dispatch = useDispatch();
  const router = useRouter();
  const [sendOtpByPhone, {}] = usePhoneOtpSendMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const formHandler = async (reqData) => {
    const token = await executeRecaptcha("otpsendbyphone");
    const queryObj = {
      phone: reqData?.phone,
      token: token,
    };
    const sendOtpObj = {
      phone: reqData?.phone,
      recaptcha_token: token,
    };

    const phoneOtpSendRes = await sendOtpByPhone(sendOtpObj)
    console.log('phoneOtpSendRes ===>', phoneOtpSendRes)

    if (phoneOtpSendRes?.data?.message == "OTP sent for verification") {
      setLoading(false);
      triggerUserNameList(queryObj)
      dispatch(setUserPhoneData(reqData?.phone))
      router.push("/phone-otp-verify");
    } 
    else if(phoneOtpSendRes?.error?.data?.message == "Supplier with this username or phone not exist") {
      setLoading(false);
      toast.error("No user exists with this phone number", {
        position: "top-right",
        duration: 2500,
      });
    }
    else{
      setLoading(false);
      toast.error("Request Failed", {
        position: "top-right",
        duration: 2500,
      });
    }
  };

  const onSubmit = (data) => {
    setLoading(true);
    formHandler(data);
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="text-black">
      <div className="mb-2">
        <label
          htmlFor="mobile_number"
          className="text-black inline-block mb-1.5 font-normal"
        >
          Mobile Number*
        </label>
        <div
          className={`relative flex items-center border h-12 rounded-tl-xl rounded-r-xl overflow-hidden ${
            errors.phone?.message ? "border-red-400" : ""
          }`}
        >
          <div className="relative bg-[#E6E6E7] rounded-br-xl  focus:outline-none h-full w-28">
            <select className="bg-[#E6E6E7] focus:outline-none h-full w-28 px-4 rounded-br-xl appearance-none">
              <option value="" selected>
                +88
              </option>
            </select>
            <span className="absolute right-2 top-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
                />
              </svg>
            </span>
          </div>
          <input
            {...register("phone")}
            className="h-[51px] p-4 w-full focus:outline-none"
            id="mobile_number"
            type="text"
            placeholder="Enter mobile number"
          />
        </div>
        <div className="mt-2.5 font-bold flex items-center gap-3 justify-start">
          <p>Require OTP Verification</p>
        </div>
        {errors.phone && (
          <div className="text-red-500">{errors.phone.message}</div>
        )}
      </div>
      {loading ? (
        <Button
          // type="submit"
          className="h-16 text-lg rounded-lg  mb-6 w-full mt-5"
        >
          Loading...
        </Button>
      ) : (
        <Button
          type="submit"
          className="h-16 text-lg rounded-lg  mb-6 w-full mt-5"
        >
          Send Verification Code
        </Button>
      )}
    </form>
  );
}
