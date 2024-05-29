"use client";
import { Button } from "@/components/ui/button";
import { useForgotPasswordMutation } from "@/features/api/auth";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const schema = yup
  .object({
    login_name: yup
      .string()
      .required("Login Name is required")
      .matches(
        /^[A-Za-z0-9]+(?:[_-][A-Za-z0-9]+)*$/,
        "Login name can only contain Aa-Zz,0-9,-_ . _ or - cannot be at the start or end and should be used only once in a row."
      )
      .min(6, "Login name must be at least 6 characters long"),
  })
  .required();

export default function ForgotPasswordForm() {
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [showPassword, setShowPassword] = useState(false);
  const [recaptchaValue, setRecaptchaValue] = useState(null);
  const router = useRouter();
  const [forgotPassword, { isLoading, isSuccess, error, isError }] =
    useForgotPasswordMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  //   const onSubmit = (data) => console.log(data)

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  async function onSubmit(data) {
    // console.log("called submit", recaptchaValue);
    const token = await executeRecaptcha("register");
    const updated_data = {
      ...data,
      recaptcha_token: token,
    };

    console.log("token----", updated_data);

    try {
      const res = await forgotPassword(updated_data);
      console.log("res----", res);

      if (res?.data) {
        console.log("Successfully Logged In!");
        router.push(`/verify?_u=${updated_data?.login_name}`);
      }
      if (res?.error) {
        console.log("Failed to create user account");
      }
    } catch (error) {
      console.log("Account creation failed");
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-5">
          <label
            htmlFor="login_name"
            className="text-primary-950 inline-block mb-1.5 font-normal"
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
              className="py-2.5 px-4 w-full focus:outline-none"
              id="login_name"
              type="text"
              placeholder="Enter Login Name"
            />
          </div>
          {errors.login_name && (
            <div className="text-red-500">{errors.login_name.message}</div>
          )}
        </div>
        <Button type="submit" className="py-3 w-full  rounded-xl mb-6">
          Send Verification Code
        </Button>
      </form>
    </>
  );
}
