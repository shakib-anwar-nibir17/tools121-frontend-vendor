"use client";
import { Button } from "@/components/ui/button";

import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
export default function RegistrationForm() {
  const {
    register,
    formState: { errors },
  } = useForm();
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="max-w-[400px] text-black">
      <div className="text-center lg:text-left my-10">
        <h1 className=" text-2xl sm:text-3xl lg:text-4xl text-main-950 font-bold pb-3 pt-3">
          Create Account
        </h1>
        <p>Create your Seller account form here.</p>
      </div>
      <form className="w-full">
        <div className="mb-2">
          <label
            htmlFor="full_name"
            className="text-black inline-block mb-1.5 font-normal"
          >
            Your Full Name*
          </label>
          <div
            className={`relative flex items-center rounded-xl border ${
              errors.full_name?.message ? "border-red-400" : ""
            } overflow-hidden`}
          >
            <input
              {...register("full_name")}
              className="h-[51px] p-4 w-full focus:outline-none"
              id="full_name"
              type="text"
              placeholder="Enter Your Name"
            />
          </div>
          {errors.full_name && (
            <div className="text-red-500">{errors.full_name.message}</div>
          )}
        </div>

        <div className="mb-2">
          <label
            htmlFor="login_name"
            className="text-black inline-block mb-1.5 font-normal"
          >
            Login Name*
          </label>
          <div
            className={`relative flex items-center rounded-xl border ${
              errors.login_name?.message ? "border-red-400" : ""
            } overflow-hidden`}
          >
            <input
              {...register("login_name")}
              className="h-[51px] p-4 w-full focus:outline-none"
              id="login_name"
              type="text"
              placeholder="Enter Login Name"
            />
          </div>
          {errors.login_name && (
            <div className="text-red-500">{errors.login_name.message}</div>
          )}
        </div>

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
          {errors.phone && (
            <div className="text-red-500">{errors.phone.message}</div>
          )}
        </div>

        <div className="mb-2">
          <label
            htmlFor="email"
            className="text-black inline-block mb-1.5 font-normal"
          >
            Email*
          </label>
          <div
            className={`relative flex items-center rounded-xl border ${
              errors.email?.message ? "border-red-400" : ""
            } overflow-hidden`}
          >
            <input
              {...register("email")}
              className="h-[51px] p-4 w-full focus:outline-none"
              id="email"
              type="email"
              placeholder="Enter Email"
            />
          </div>
          {errors.email && (
            <div className="text-red-500">{errors.email.message}</div>
          )}
        </div>

        <div className="mb-5">
          <label
            htmlFor="password"
            className="text-black inline-block mb-1.5 font-normal"
          >
            Password*
          </label>
          <div
            className={`relative flex items-center rounded-xl border overflow-hidden ${
              errors.password ? "border-red-400" : ""
            }`}
          >
            <input
              {...register("password")}
              className="h-[51px] p-4 w-full focus:outline-none"
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Create a password"
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
              <div className="bg-red-500 w-full h-full rounded-l-xl"></div>
              <div className="bg-orange-500  w-full h-full"></div>
              <div className="bg-green-500  w-full h-full rounded-r-xl"></div>
            </div>
          </div>
          {errors.password && (
            <div className="text-red-500">{errors.password.message}</div>
          )}
        </div>

        <div className="mb-10">
          <label
            htmlFor="confirmPassword"
            className="text-black inline-block mb-1.5 font-normal"
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
              className="h-[51px] p-4 w-full focus:outline-none"
              id="confirmPassword"
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
          {errors.confirmPassword && (
            <div className="text-red-500">{errors.confirmPassword.message}</div>
          )}
        </div>

        <Button type="submit" className="h-16 w-full text-xl  rounded-xl mb-3">
          Create Account
        </Button>
      </form>
      <p className=" flex justify-center text-black mt-4">
        Already have an account?{" "}
        <Link href={"/signin"}>
          <strong className="ml-1"> Log In</strong>
        </Link>
      </p>
    </div>
  );
}
