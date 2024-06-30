"use client";
import { useUserDataQuery } from "@/app/redux/features/userInfo";
import { Button } from "@/components/ui/button";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import MultiSelect from "./MultiSelect";

const ShopInfoForm = () => {
  // schema for validation
  const schema = yup
    .object({
      shop_name: yup
        .string()
        .required("Shop name is required")
        .min(5, "Shop name must be at least 5 characters long"),
      email: yup
        .string()
        .email("Invalid email address")
        .required("Email is required")
        .matches(/\S+@\S+\.\S+/, "Invalid email .!"),
      phone: yup
        .string()
        .required("Phone number is required")
        .matches(
          /^01\d{9}$/,
          'Invalid phone number (must start with "01" and be 11 digits)'
        ),
      shop_location: yup
        .string()
        .required("Shop Location is required")
        .min(5, "Shop location must be at least 5 characters long"),
      shop_description: yup.string().required("Shop description is required"),
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
  const [selectedOptions, setSelectedOptions] = useState([]);

  console.log("selected Options ==>", selectedOptions);

  const token = localStorage.getItem("vendorToken");
  const { data: profileInfo, refetch } = useUserDataQuery(token, {
    refetchOnMountOrArgChange: true,
  });
  const [optionsData, setOptionsData] = useState([]);

  useEffect(() => {
    if (profileInfo?.data?.categories?.length > 0) {
      const optionFormat = profileInfo?.data?.categories?.map((item) => {
        const formatObj = {
          label: item?.category_name,
          value: item?.category_id,
        };
        return formatObj;
      });
      setOptionsData(optionFormat);
    }
  }, [profileInfo?.data?.categories, profileInfo?.data?.categories?.length]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-4 mb-20">
      <div className="flex justify-between gap-6">
        <div className="w-full mt-6">
          <label className=" text-primary-950 font-bold">Shop Name*</label>
          <input
            {...register("shop_name")}
            className="rounded-lg border border-slate-200 bg-transparent px-4 py-2 text-primary-950 focus:outline-none w-full mt-2 h-12 "
            type="text"
            placeholder="Shop name"
          />
          {errors.shop_name && (
            <div className="text-red-500">{errors.shop_name.message}</div>
          )}
        </div>
        <div className="w-full mt-6">
          <label className=" text-primary-950 font-bold">Shop Category*</label>
          <MultiSelect
            selectedOptions={selectedOptions}
            setSelectedOptions={setSelectedOptions}
            optionsData={optionsData}
            register={register}
            errors={errors}
          />
        </div>
      </div>
      <div className="flex justify-between gap-6">
        <div className="w-full mt-6">
          <label className=" text-primary-950 font-bold">Contact Number*</label>
          <input
            {...register("phone")}
            className="rounded-lg border border-slate-200 bg-transparent px-4 py-2 text-primary-950 focus:outline-none w-full mt-2 h-12 "
            type="text"
            placeholder="Enter mobile number"
          />
          {errors.phone && (
            <div className="text-red-500">{errors.phone.message}</div>
          )}
        </div>
        <div className="w-full mt-6">
          <label className=" text-primary-950 font-bold">Email Address*</label>
          <input
            {...register("email")}
            className="rounded-lg border border-slate-200 bg-transparent px-4 py-2 text-primary-950 focus:outline-none w-full mt-2 h-12"
            type="email"
            placeholder="Type Email Address"
          />
          {errors.email && (
            <div className="text-red-500">{errors.email.message}</div>
          )}
        </div>
      </div>
      <div className="flex justify-between gap-6">
        <div className="w-full mt-6">
          <label className=" text-primary-950 font-bold">Shop Address*</label>
          <textarea
            {...register("shop_location")}
            className="rounded-lg border border-slate-200 bg-transparent px-4 py-2 text-primary-950 focus:outline-none w-full mt-2 h-32"
            type="text"
            placeholder="Enter location details (e.g. Shop no, house no, road no etc.)"
          />
          {errors.shop_location && (
            <div className="text-red-500">{errors.shop_location.message}</div>
          )}
        </div>
      </div>
      <div className="flex justify-between gap-6">
        <div className="w-full mt-6">
          <label className=" text-primary-950 font-bold">About Us*</label>
          <textarea
            {...register("shop_description")}
            className="rounded-lg border border-slate-200 bg-transparent px-4 py-2 text-primary-950 focus:outline-none w-full mt-2 h-32"
            type="text"
            placeholder="Write something about your shop within 100 words... "
          />
          {errors.shop_description && (
            <div className="text-red-500">
              {errors.shop_description.message}
            </div>
          )}
        </div>
      </div>

      <div className="mt-6 flex justify-end gap-4">
        <Button className="text-xl px-6 bg-white text-primary-900 border border-primary-900">
          Reset
        </Button>
        <Button type="submit" className="text-xl px-6">
          Save
        </Button>
      </div>
    </form>
  );
};

export default ShopInfoForm;
