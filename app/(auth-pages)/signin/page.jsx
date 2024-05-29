"use client";
import { FacebookSVG, GoogleSVG } from "@/components/icons/icons";
import { Spinner } from "@/components/ui/Spinner";
import { Button } from "@/components/ui/button";
import {
  useLoginUserMutation,
  useVerifyFTokenQuery,
  useVerifyGTokenQuery,
} from "@/features/api/auth";
import { COOKIE_EXPIRE_MIN } from "@/lib/constants";
import { yupResolver } from "@hookform/resolvers/yup";
import Cookies from "js-cookie";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as yup from "yup";

const secret = process.env.NEXTAUTH_SECRET;
const schema = yup
  .object({
    login_name: yup
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

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const [recaptchaValue, setRecaptchaValue] = useState(null);
  const { executeRecaptcha } = useGoogleReCaptcha();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [isAuthChecking, setIsAuthChecking] = useState(false);
  const [gAuthData, setGAuthData] = useState("");
  const [fAuthData, setFAuthData] = useState({
    access_token: "",
    user_email: "",
  });
  const [isCall, setIsCall] = useState(true);
  const [isFCall, setIsFCall] = useState(true);

  const {
    data,
    isLoading: isLoading_g,
    isSuccess: isSuccess_g,
    isFetching,
    isError: isError_g,
  } = useVerifyGTokenQuery({ access_token: gAuthData }, { skip: isCall });
  const {
    data: data_f,
    isLoading: isLoading_f,
    isSuccess: isSuccess_f,
    isFetching: isFetching_f,
    isError: isError_f,
  } = useVerifyFTokenQuery({ ...fAuthData }, { skip: isFCall });
  const [loginUser, { isLoading, isSuccess }] = useLoginUserMutation();
  const { data: session, loading, status } = useSession();

  useEffect(() => {
    // console.log("session", session);
    if (session) {
      let activeProvider = localStorage.getItem("active_provider");
      let auth_token = session.user?.accessToken;
      let user_email = session.user?.email;
      if (activeProvider == "google") {
        setGAuthData(auth_token);
        setIsCall(false);
      }
      if (activeProvider == "facebook") {
        setFAuthData({
          access_token: auth_token,
          user_email: user_email,
        });
        setIsFCall(false);
      }
    }
  }, [session]);

  useEffect(() => {
    if (isSuccess_g) {
      // console.log('data for token', data);
      if (data?.status_code === 200) {
        localStorage.setItem(
          "user_info",
          JSON.stringify({ login_name: data?.name })
        );
        const inExpireMin = new Date(
          new Date().getTime() + COOKIE_EXPIRE_MIN * 60 * 1000
        );
        Cookies.set("authToken", data.access_token, {
          expires: inExpireMin,
        });

        Cookies.set("tokenType", data.token_type, {
          expires: inExpireMin,
        });

        setIsAuthChecking(false);
        return router.push(`/profile`);
      } else {
        setIsAuthChecking(false);
        signOut("google");
      }
    }
  }, [isSuccess_g]);

  useEffect(() => {
    if (isSuccess_f) {
      // console.log('data for token', data);
      if (data?.status_code === 200) {
        localStorage.setItem(
          "user_info",
          JSON.stringify({ login_name: data?.name })
        );
        const inExpireMin = new Date(
          new Date().getTime() + COOKIE_EXPIRE_MIN * 60 * 1000
        );
        Cookies.set("authToken", data.access_token, {
          expires: inExpireMin,
        });

        Cookies.set("tokenType", data.token_type, {
          expires: inExpireMin,
        });

        setIsAuthChecking(false);
        return router.push(`/profile`);
      } else {
        setIsAuthChecking(false);
        signOut("facebook");
      }
    }
  }, [isSuccess_f]);

  useEffect(() => {
    if (isError_g) {
      toast.error("Something went wrong. Please try again!");
    }
  }, [isError_g]);

  useEffect(() => {
    if (isError_f) {
      toast.error("Something went wrong. Please try again!");
    }
  }, [isError_f]);

  // function backendapi(auth_token, providerName) {
  //   try {
  //     fetch(`https://testapireal.tools121.com/auth/${providerName}?token=${auth_token}`, {
  //       method: "get",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     }).then((data) => data.json())
  //       .then((res) => {
  //         if(res?.status_code === 200){
  //           localStorage.setItem(
  //             "user_info",
  //             JSON.stringify({ login_name: res?.name })
  //           );
  //           const inExpireMin = new Date(
  //             new Date().getTime() + COOKIE_EXPIRE_MIN * 60 * 1000
  //           );
  //           Cookies.set("authToken", res.access_token, {
  //             expires: inExpireMin,
  //           });
  //           Cookies.set("tokenType", res.token_type, {
  //             expires: inExpireMin,
  //           });
  //           return router.push(`/profile`);
  //         }else{
  //           signOut(providerName);
  //         }
  //       })
  //   } catch (error) {
  //     signOut(providerName);
  //   }
  // }
  // function backendapi2(auth_token, providerName, user_email) {
  //   try {
  //     fetch(`https://testapireal.tools121.com/auth/${providerName}?token=${auth_token}&email=${user_email}`, {
  //       method: "get",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     }).then((data) => data.json())
  //       .then((res) => {
  //         // console.log('response', res);
  //         if(res?.status_code === 200){
  //           localStorage.setItem(
  //             "user_info",
  //             JSON.stringify({ login_name: res?.name })
  //           );
  //           const inExpireMin = new Date(
  //             new Date().getTime() + COOKIE_EXPIRE_MIN * 60 * 1000
  //           );
  //           Cookies.set("authToken", res.access_token, {
  //             expires: inExpireMin,
  //           });
  //           Cookies.set("tokenType", res.token_type, {
  //             expires: inExpireMin,
  //           });
  //           return router.push(`/profile`);
  //         }else{
  //           signOut(providerName);
  //         }
  //       })
  //   } catch (error) {
  //     signOut(providerName);
  //   }
  // }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const hangleSocialLogin = (provider) => {
    setIsAuthChecking(true);
    localStorage.setItem("active_provider", provider);
    signIn(provider, { callbackUrl: "/profile" });
  };

  async function onSubmit(data) {
    // console.log("called submit", recaptchaValue);
    const token = await executeRecaptcha("login");
    const updated_data = {
      ...data,
      recaptcha_token: token,
    };

    try {
      const res = await loginUser(updated_data);

      if (res?.data) {
        localStorage.setItem(
          "user_info",
          JSON.stringify({ login_name: data?.login_name })
        );
        const inExpireMin = new Date(
          new Date().getTime() + COOKIE_EXPIRE_MIN * 60 * 1000
        );
        Cookies.set("authToken", res.data.access_token, {
          expires: inExpireMin,
        });
        Cookies.set("tokenType", res.data.token_type, {
          expires: inExpireMin,
        });
        console.log("Successfully Logged In!");
        router.push(`/profile`);
      }
      if (res?.error) {
        console.log("Failed to logged in the user");
      }
    } catch (error) {
      console.log("Login failed");
    }
  }
  return (
    <>
      {isAuthChecking && (
        <div className="">
          <Spinner />
        </div>
      )}

      <div className="text-center lg:text-left mt-16 md:mt-10 mb-6">
        <h1 className=" text-2xl sm:text-3xl lg:text-4xl text-main-950 font-bold pb-3 pt-3">
          Sign In
        </h1>
        {/* <p>Start your 30 day free trial, cancel anytime</p> */}
      </div>

      <div className="text-center lg:text-left space-y-4 mb-5">
        {/* <Link
              href={"https://testapireal.tools121.com/glogin"}
              target="_blank"
            >
            </Link> */}
        <button
          onClick={() => hangleSocialLogin("google")}
          className="border border-[#E6E6E7] mx-auto lg:ml-0 transition duration-500 bg-white hover:bg-slate-50 hover:border-blue-600 hover:text-blue-600 text-[#01060D] flex items-center justify-center space-x-4 rounded-xl w-full py-2.5 px-4"
        >
          <span>
            <GoogleSVG />
          </span>
          <span>Continue with Google</span>
        </button>

        <button
          onClick={() => hangleSocialLogin("facebook")}
          className="border border-[#E6E6E7] mx-auto lg:ml-0 transition duration-500 bg-white hover:bg-slate-50 hover:border-blue-600 hover:text-blue-600 text-[#01060D] flex items-center justify-center space-x-4 rounded-xl w-full py-2.5 px-4"
        >
          <span>
            <FacebookSVG />
          </span>
          <span>Continue with Facebook</span>
        </button>
      </div>

      <div className="relative mb-4 hidden lg:block">
        <div className="absolute inset-0 flex items-center" aria-hidden="true">
          <div className="w-full border-t border-gray-200"></div>
        </div>
        <div className="relative flex justify-center text-sm font-medium leading-6">
          <span className="bg-white px-6 text-gray-900">Or</span>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-5">
          <label
            htmlFor="login_name"
            className="text-primary-950 inline-block mb-1.5 font-normal"
          >
            Login Name*
          </label>
          <div className="relative flex items-center border h-12 rounded-xl overflow-hidden">
            <input
              {...register("login_name")}
              className="py-2.5 px-4 w-full focus:outline-none"
              id="login_name"
              type="text"
              placeholder="Enter login name"
            />
          </div>
          {errors.login_name && (
            <div className="text-red-500">{errors.login_name.message}</div>
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
          <div className="text-right">
            <Link href={"/forgot-password"} className=" text-primary-950">
              Forgot Password?
            </Link>
          </div>
          {/* <div className="my-5">
                <ReCAPTCHA
                  sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY_V2}
                  onChange={(value) => setRecaptchaValue(value)}
                />
              </div> */}
        </div>

        <Button type="submit" className="py-3 w-full  rounded-xl mb-6">
          {" "}
          Sign In
        </Button>
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
