/* eslint-disable no-empty-pattern */
"use client";

import { useLogInMutation } from "@/app/redux/features/authApi";
import { setLoginName } from "@/app/redux/slices/authSlice";
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

export default function SignIn() {
  const [loginHandler, {}] = useLogInMutation();
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [loginErr, setLoginErr] = useState("");
  const dispatch = useDispatch();

  const schema = yup
    .object({
      username: yup
        .string()
        .required("Login name is required")
        .matches(
          /^[A-Za-z0-9]+(?:[_-][A-Za-z0-9]+)*$/,
          "Login name can only contain Aa-Zz,0-9,-_ . _ or - cannot be at the start or end and should be used only once in a row."
        )
        .min(6, "Login name must be at least 6 characters long"),
      password: yup
        .string()
        .required("Password is required")
        .min(6, "Password must be at least 6 characters long"),
    })
    .required();

  const [showPassword, setShowPassword] = useState(false);

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

  async function onSubmit(data) {
    setLoginErr("");
    setLoading(true);
    const token = await executeRecaptcha("login");

    const request_Obj = {
      username: data?.username,
      password: data?.password,
      recaptcha_token: token,
    };
    const loginRes = await loginHandler(request_Obj);
    console.log("login Response =====>", loginRes);

    if (loginRes?.data?.data?.token) {
      setLoading(false);
      dispatch(setLoginName({ loginName: data?.username }));
      localStorage.setItem("vendorToken", loginRes?.data?.data?.token);
      const token = loginRes?.data?.data?.token;
      document.cookie = `vendorToken=${token}; path=/; max-age=86400; ${
        window.location.protocol === "https:" ? "secure;" : ""
      }`;
      router.push("/dashboard");
    } else if (
      loginRes?.error?.data?.message ==
      "Supplier with this username or phone not exist"
    ) {
      setLoading(false);
      setLoginErr("Supplier with this username or phone not exist");
    } else if (
      loginRes?.error?.data?.message == "Username and password does not match"
    ) {
      setLoginErr("Username and password does not match");
      setLoading(false);
    } else {
      setLoading(false);
      toast.error("Login failed try again", {
        position: "top-right",
        duration: 2000,
      });
    }
  }

  return (
    <>
      <div className="text-center lg:text-left mt-16 md:mt-10 mb-6">
        <h1 className=" text-2xl sm:text-3xl lg:text-4xl text-black font-bold pb-3 pt-3">
          Sign In
        </h1>
        <p>Log in to your account form here.</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-5">
          <label
            htmlFor="username"
            className="text-primary-950 inline-block mb-1.5 font-normal"
          >
            Login Name*
          </label>
          <div className="relative flex items-center border h-12 rounded-xl overflow-hidden">
            <input
              {...register("username")}
              className="py-2.5 px-4 w-full focus:outline-none"
              id="username"
              type="text"
              placeholder="Enter login name"
            />
          </div>
          {errors.username && (
            <div className="text-red-500">{errors.username.message}</div>
          )}
        </div>

        <div className="mb-5">
          <label
            htmlFor="password"
            className="text-primary-950 inline-block mb-1.5 font-normal"
          >
            Password*
          </label>
          <div className="relative flex items-center rounded-xl border mb-1.5 overflow-hidden">
            <input
              {...register("password")}
              className="py-2.5 px-4 w-full focus:outline-none"
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
          {errors.password && (
            <div className="text-red-500">{errors.password.message}</div>
          )}
          <p className="text-red-500 font-medium ">{loginErr}</p>

          <div className="text-right">
            <Link href={"/forgot-password"} className=" text-primary-950">
              Forgot Password?
            </Link>
          </div>
        </div>

        {loading ? (
          <Button className="h-16 w-full text-xl  rounded-xl mb-6">
            Loading...
          </Button>
        ) : (
          <Button
            type="submit"
            className="h-16 w-full text-xl  rounded-xl mb-6"
          >
            Sign In
          </Button>
        )}
      </form>

      <p className="flex justify-center text-primary-950">
        Don’t have an account?
        <Link href={"/register"}>
          <strong className="ml-1"> Sign Up</strong>
        </Link>
      </p>
    </>
  );
}
