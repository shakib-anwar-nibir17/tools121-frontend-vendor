/* eslint-disable no-empty-pattern */
"use client";
import { useResetPasswordMutation } from "@/app/redux/features/authApi";
import { Button } from "@/components/ui/button";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import * as yup from "yup";
import PasswordMeter from "./PasswordMeter";

export default function ResetPasswordForm() {
  const schema = yup
    .object({
      new_password: yup
        .string()
        .min(8, "Password must be at least 8 characters long")
        .matches(
          /^(?=.*[a-zA-Z])(?=.*\d).{8,}$/,
          "Password must contain both letters and digits"
        )
        .required("Password is required"),

      confirm_password: yup
        .string()
        .oneOf([yup.ref("new_password"), null], "Passwords must match")
        .required("Confirm Password is required"),
    })
    .required();
  const [showPassword, setShowPassword] = useState(false);
  const userNameData = useSelector((state) => state.authStore.userNameData);
  const otpCode = useSelector((state) => state.authStore.otpCode);
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [resetPassword, {}] = useResetPasswordMutation();
  const [loading, setLoading] = useState(false);
  const [pass, setPass] = useState();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const resetPassHandler = async (data) => {
    const token = await executeRecaptcha("register");
    const request_Obj = {
      username: userNameData?.username,
      otp: otpCode.otp,
      recaptcha_token: token,
      new_password: data?.new_password,
    };

    const response = await resetPassword(request_Obj);
    console.log("Reset Pass Response =====>", response?.data);

    if (response?.data?.message == "Password reset success") {
      setLoading(false);
      toast.success("Password reset Successfully", {
        position: "top-right",
        duration: 3000,
      });
      router.push("/signin");
    } else {
      setLoading(false);
      toast.error("Password reset failed", {
        position: "top-right",
        duration: 3000,
      });
    }
  };

  const onSubmit = async (data) => {
    console.log(data);
    setLoading(true);
    resetPassHandler(data);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full">
      <div className="grid grid-cols-1 gap-x-8 w-full">
        <div className="mb-5">
          <label
            htmlFor="new_password"
            className="text-primary-950 inline-block mb-1.5 font-normal"
          >
            New Password*
          </label>
          <div
            className={`relative flex items-center rounded-xl border overflow-hidden ${
              errors.new_password ? "border-red-400" : ""
            }`}
          >
            <input
              {...register("new_password")}
              className="py-2.5 px-4 w-full focus:outline-none"
              id="new_password"
              type={showPassword ? "text" : "password"}
              onChange={(e) => setPass(e.target.value)}
              placeholder="Create a new password"
            />
            <span
              className="absolute right-4 top-2.5 cursor-pointer"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? (
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
                    d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              ) : (
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
                    d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                  />
                </svg>
              )}
            </span>
          </div>
          <div className="mt-2.5 font-bold flex items-center gap-3 justify-end">
            <p>Password Strength</p>
            <div className="w-[120px] h-3 rounded-xl flex">
              <PasswordMeter password={pass} />
            </div>
          </div>
          {errors.new_password && (
            <div className="text-red-500">{errors.new_password.message}</div>
          )}
        </div>

        <div className="mb-8">
          <label
            htmlFor="confirm_password"
            className="text-primary-950 inline-block mb-1.5 font-normal"
          >
            Confirm Password*
          </label>
          <div
            className={`relative flex items-center rounded-xl border overflow-hidden ${
              errors.confirm_password ? "border-red-400" : ""
            }`}
          >
            <input
              {...register("confirm_password")}
              className="py-2.5 px-4 w-full focus:outline-none"
              id="confirm_password"
              type={showPassword ? "text" : "password"}
              placeholder="Retype password"
            />
            <span
              className="absolute right-4 top-2.5 cursor-pointer"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? (
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
                    d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              ) : (
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
                    d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                  />
                </svg>
              )}
            </span>
          </div>
          {errors.confirm_password && (
            <div className="text-red-500">
              {errors.confirm_password.message}
            </div>
          )}
        </div>
      </div>

      {loading ? (
        <Button type="submit" className="h-14 text-xl w-full rounded-xl mb-6">
          Loading...
        </Button>
      ) : (
        <Button type="submit" className="h-14 text-xl w-full rounded-xl mb-6">
          Reset Password
        </Button>
      )}
    </form>
  );
}
