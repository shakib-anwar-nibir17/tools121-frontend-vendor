"use client";
import { Button } from "@/components/ui/button";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import { useForm } from "react-hook-form";
import * as yup from "yup";

export default function ForgotPasswordForm() {
  // schema for validation
  const schema = yup
    .object({
      login_name: yup.string().required("User Name is required"),
      // .matches(
      //   /^[A-Za-z0-9]+(?:[_-][A-Za-z0-9]+)*$/,
      //   "User name can only contain Aa-Zz,0-9,-_ . _ or - cannot be at the start or end and should be used only once in a row."
      // )
      // .min(6, "Login name must be at least 6 characters long"),
    })
    .required();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-5">
          <label
            htmlFor="login_name"
            className="text-primary-950 inline-block mb-1.5 font-bold"
          >
            User Name*
          </label>
          <div
            className={`relative flex items-center rounded-xl border ${
              errors.login_name?.message ? "border-red-400" : ""
            } overflow-hidden`}
          >
            <input
              {...register("login_name")}
              className="p-4 w-full focus:outline-none"
              id="login_name"
              type="text"
              placeholder="Enter user Name"
            />
          </div>
          <div className="mt-2.5 font-bold flex items-center gap-3 justify-end">
            <Link href={"/forgot-username"}>
              <p className="text-black font-bold">Forgot username?</p>
            </Link>
          </div>
          {errors.login_name && (
            <div className="text-red-500">{errors.login_name.message}</div>
          )}
        </div>
        <Button type="submit" className="h-16 w-full  rounded-xl mb-6 text-xl">
          Send Verification Code
        </Button>
      </form>
    </>
  );
}
