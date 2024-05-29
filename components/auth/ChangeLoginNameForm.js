"use client";
import { Button } from "@/components/ui/button";
import { useUpdateUserMutation } from "@/features/api/auth";
import { COOKIE_EXPIRE_MIN } from "@/lib/constants";
import { yupResolver } from "@hookform/resolvers/yup";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const schema = yup
  .object({
    login_name: yup
      .string()
      .required("Login Name is required")
      // .matches(
      //   /^[A-Za-z0-9]+(?:[_-][A-Za-z0-9]+)*$/,
      //   "Login name can only contain Aa-Zz,0-9,-_ . _ or - cannot be at the start or end and should be used only once in a row."
      // )
      .min(6, "Login name must be at least 6 characters long"),
  })
  .required();

export default function ChangeLoginNameForm() {
  const router = useRouter();
  const [updateUser, { isLoading, isSuccess, error, isError }] =
    useUpdateUserMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  async function onSubmit(data) {
    try {
      const res = await updateUser(data);
      console.log(res);

      if (res?.data) {
        localStorage.setItem(
          "user_info",
          JSON.stringify({ login_name: data?.login_name })
        );
        const inExpireMin = new Date(
          new Date().getTime() + COOKIE_EXPIRE_MIN * 60 * 1000
        );
        Cookies.set("authToken", res.data.token, {
          expires: inExpireMin,
        });
        reset();
        console.log("Successfully updated user info!");
        router.refresh();
      }
      if (res?.error) {
        console.log("Failed to updated user info");
      }
    } catch (error) {
      console.log("Account updated failed");
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-2 gap-x-8 max-w-2xl">
        <div className="mb-5 w-full">
          <label
            htmlFor="name"
            className="text-primary-950 inline-block mb-1.5 font-normal"
          >
            Login Name
          </label>
          <div
            className={`relative w-full overflow-hidden flex items-center rounded-xl border ${
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
        </div>
        {/* <div className="mb-5 w-full">
          <label
            htmlFor="name"
            className="text-primary-950 inline-block mb-1.5 font-normal"
          >
            Last Name
          </label>
          <div
            className={`relative w-full overflow-hidden flex items-center rounded-xl border`}
          >
            <input
              className="py-2.5 px-4 w-full focus:outline-none"
              id="name"
              type="text"
              placeholder="Last Name"
            />
          </div>
        </div> */}
      </div>
      <Button
        type="submit"
        className="py-3 px-12 hover:text-white bg-[#ECF3FF] rounded-lg text-gray-800 mb-6"
      >
        Save
      </Button>
    </form>
  );
}
