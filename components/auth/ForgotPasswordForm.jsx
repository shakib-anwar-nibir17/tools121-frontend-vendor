"use client";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";

export default function ForgotPasswordForm() {
  const {
    register,

    formState: { errors },
  } = useForm();

  return (
    <>
      <form>
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
              id="user_name"
              type="text"
              placeholder="Enter user Name"
            />
          </div>
          <div className="mt-2.5 font-bold flex items-center gap-3 justify-end">
            <p className="text-black font-bold">Password Username</p>
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
