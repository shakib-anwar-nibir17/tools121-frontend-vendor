/* eslint-disable no-unused-vars */
"use client";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";

export default function ShopApplyForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  return (
    <form className="w-[512px]">
      <div className="mb-6">
        <label
          htmlFor="shop_name"
          className="text-black inline-block mb-1.5 font-normal"
        >
          Shop Name*
        </label>
        <div
          className={`relative flex items-center rounded-xl border ${
            errors.shop_name?.message ? "border-red-400" : ""
          } overflow-hidden`}
        >
          <input
            {...register("full_name")}
            className="py-2.5 px-4 w-full focus:outline-none"
            id="shop_name"
            type="text"
            placeholder="Enter Shop Name"
          />
        </div>
        {errors.shop_name && (
          <div className="text-red-500">{errors.shop_name.message}</div>
        )}
      </div>

      <div className="mb-6">
        <label
          htmlFor="shop_category"
          className="text-black inline-block mb-1.5 font-normal"
        >
          Shop Category*
        </label>

        <select
          {...register("shop_category")}
          className="rounded-lg border border-slate-200 bg-transparent px-4 py-3 text-primary-950 focus:outline-none w-full h-full mt-2"
          type="text"
          placeholder="Shop name"
        >
          <option className="text-black">Select Category</option>
        </select>

        {errors.shop_category && (
          <div className="text-red-500">{errors.shop_category.message}</div>
        )}
      </div>

      <div className="mb-6">
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
            className="py-2.5 px-4 w-full focus:outline-none"
            id="mobile_number"
            type="text"
            placeholder="Enter mobile number"
          />
        </div>
        {errors.phone && (
          <div className="text-red-500">{errors.phone.message}</div>
        )}
      </div>

      <div className="mb-6">
        <label
          htmlFor="email"
          className="text-black inline-block mb-1.5 font-normal"
        >
          Email Address*
        </label>
        <div
          className={`relative flex items-center rounded-xl border ${
            errors.email?.message ? "border-red-400" : ""
          } overflow-hidden`}
        >
          <input
            {...register("email")}
            className="py-2.5 px-4 w-full focus:outline-none"
            id="email"
            type="email"
            placeholder="Enter Email"
          />
        </div>
        {errors.email && (
          <div className="text-red-500">{errors.email.message}</div>
        )}
      </div>
      <div className="mb-6">
        <label
          htmlFor="address"
          className="text-black inline-block mb-1.5 font-normal"
        >
          Shop Address*
        </label>
        <div
          className={`relative flex items-center rounded-xl border ${
            errors.address?.message ? "border-red-400" : ""
          } overflow-hidden`}
        >
          <textarea
            {...register("address")}
            className="py-2.5 px-4 w-full focus:outline-none h-[102px]"
            id="address"
            type="text"
            placeholder="Enter Shop Address"
          />
        </div>
        {errors.address && (
          <div className="text-red-500">{errors.address.message}</div>
        )}
      </div>

      <Button type="submit" className="py-3 w-full  rounded-lg mb-3">
        Apply for eshop
      </Button>
    </form>
  );
}
