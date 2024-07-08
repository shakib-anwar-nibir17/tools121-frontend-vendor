/* eslint-disable no-unused-vars */
"use client";
import { Button } from "@/components/ui/button";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import * as yup from "yup";

const schema = yup
  .object({
    old_password: yup
      .string()
      .required("Old Password is required")
      .min(6, "Password must be at least 6 characters long"),
    // .matches(
    //   /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
    //   "Password must contain at least one letter and one number"
    // ),
    new_password: yup
      .string()
      .required("New Password is required")
      .min(6, "Password must be at least 6 characters long"),
    // .matches(
    //   /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
    //   "Password must contain at least one letter and one number"
    // ),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("new_password"), null], "Passwords must match")
      .required("Confirm Password is required"),
  })
  .required();

export default function ChangePasswordForm() {
  const router = useRouter();
  const userNameData = useSelector((state) => state.authStore.userNameData);
  console.log(userNameData);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  async function onSubmit(data) {
    // const { confirmPassword, ...filteredObject } = data;
    // const updated_data = {
    //   ...filteredObject,
    // };
    // console.log("token----", updated_data);
    // try {
    //   // const res = await changePassword(updated_data);
    //   // console.log(res);
    //   if (res?.data) {
    //     // localStorage.setItem(
    //     //   "user_info",
    //     //   JSON.stringify({ login_name: data?.login_name })
    //     // );
    //     // const inExpireMin = new Date(
    //     //   new Date().getTime() + COOKIE_EXPIRE_MIN * 60 * 1000
    //     // );
    //     // Cookies.set("authToken", res.data.token, {
    //     //   expires: inExpireMin,
    //     // });
    //     reset();
    //     console.log("Successfully updated user info!");
    //     router.refresh();
    //   }
    //   if (res?.error) {
    //     console.log("Failed to updated user info");
    //   }
    // } catch (error) {
    //   console.log("Account updated failed");
    // }
    console.log(data);
  }

  return (
    <form className="w-[338px]" onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-1 gap-x-8">
        <div className="pb-8">
          <h3 className="text-black font-bold text-2xl mb-3">Reset Password</h3>
          <p className="text-xl">Reset your password if you forget.</p>
        </div>

        <div className="mb-5 mt-10">
          <label
            htmlFor="old_password"
            className="text-primary-950 inline-block mb-1.5 font-bold"
          >
            Old Password*
          </label>
          <div
            className={`relative flex items-center rounded-xl border overflow-hidden ${
              errors.old_password ? "border-red-400" : ""
            }`}
          >
            <input
              {...register("old_password")}
              className="py-4 px-4 w-full focus:outline-none"
              id="old_password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter old password"
            />
            <span
              className="absolute right-4 top-2.5 cursor-pointer"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? (
                <AiOutlineEye size={24} />
              ) : (
                <AiOutlineEyeInvisible size={24} />
              )}
            </span>
          </div>
          {errors.old_password && (
            <div className="text-red-500">{errors.old_password.message}</div>
          )}
        </div>
        <div className="mb-5">
          <label
            htmlFor="new_password"
            className="text-primary-950 inline-block mb-1.5 font-bold"
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
              className="py-4 px-4 w-full focus:outline-none"
              id="new_password"
              type={showPassword ? "text" : "password"}
              placeholder="Create a new password"
            />
            <span
              className="absolute right-4 top-2.5 cursor-pointer"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? (
                <AiOutlineEye size={24} />
              ) : (
                <AiOutlineEyeInvisible size={24} />
              )}
            </span>
          </div>
          {errors.new_password && (
            <div className="text-red-500">{errors.new_password.message}</div>
          )}
        </div>

        <div className="mb-8">
          <label
            htmlFor="confirmPassword"
            className="text-primary-950 inline-block mb-1.5 font-bold"
          >
            Confirm Password*
          </label>
          <div
            className={`relative flex items-center rounded-xl border overflow-hidden ${
              errors.confirmPassword ? "border-red-400" : ""
            }`}
          >
            <input
              {...register("confirmPassword")}
              className="py-4 px-4 w-full focus:outline-none"
              id="confirmPassword"
              type={showPassword ? "text" : "password"}
              placeholder="Retype password"
            />
            <span
              className="absolute right-4 top-2.5 cursor-pointer"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? (
                <AiOutlineEye size={24} />
              ) : (
                <AiOutlineEyeInvisible size={24} />
              )}
            </span>
          </div>
          {errors.confirmPassword && (
            <div className="text-red-500">{errors.confirmPassword.message}</div>
          )}
        </div>
      </div>
      <Button
        type="submit"
        className="py-3 h-12 px-12 text-white bg-primary-900 rounded-lg w-full  mb-6"
      >
        Reset Password
      </Button>
    </form>
  );
}
