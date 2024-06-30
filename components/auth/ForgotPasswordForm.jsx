/* eslint-disable no-empty-pattern */
"use client";
import { useUserNameVerifyOtpMutation } from "@/app/redux/features/authApi";
import { setUserNameData } from "@/app/redux/slices/authSlice";
import { Button } from "@/components/ui/button";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import * as yup from "yup";

export default function ForgotPasswordForm() {
  const [userNameVerifyOtp, {}] = useUserNameVerifyOtpMutation();
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();

  // schema for validation
  const schema = yup
    .object({
      username: yup.string().required("User Name is required"),
    })
    .required();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const userNameOtpSendHandler = async (data) => {
    const token = await executeRecaptcha("user_verify");
    const request_Obj = {
      username: data?.username,
      recaptcha_token: token,
    };

    const response = await userNameVerifyOtp(request_Obj);

    console.log("Forget Pass form Response =====>", response);
    if (response?.data?.message == "OTP sent for verification") {
      toast.success("OTP has been successfully", {
        position: "top-right",
        duration: 3000,
      });
      router.push("/username-verify");
      dispatch(setUserNameData(request_Obj));
      setLoading(false);
    } else {
      setLoading(false);

      toast.error("Signed-up failed try again", {
        position: "top-right",
        duration: 2000,
      });
    }
  };

  const onSubmit = async (data) => {
    setLoading(true);
    userNameOtpSendHandler(data);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-5">
          <label
            htmlFor="username"
            className="text-primary-950 inline-block mb-1.5 font-bold"
          >
            User Name*
          </label>
          <div
            className={`relative flex items-center rounded-xl border ${
              errors.username?.message ? "border-red-400" : ""
            } overflow-hidden`}
          >
            <input
              {...register("username")}
              className="p-4 w-full focus:outline-none"
              id="username"
              type="text"
              placeholder="Enter user Name"
            />
          </div>
          <div className="mt-2.5 font-bold flex items-center gap-3 justify-end">
            <Link href={"/forgot-username"}>
              <p className="text-black font-bold">Forgot username?</p>
            </Link>
          </div>
          {errors.username && (
            <div className="text-red-500">{errors.username.message}</div>
          )}
        </div>

        {loading ? (
          <Button className="h-16 w-full text-xl rounded-xl mb-3">
            Loading...
          </Button>
        ) : (
          <Button
            type="submit"
            className="h-16 w-full  rounded-xl mb-6 text-xl"
          >
            Send Verification Code
          </Button>
        )}
      </form>
    </>
  );
}
