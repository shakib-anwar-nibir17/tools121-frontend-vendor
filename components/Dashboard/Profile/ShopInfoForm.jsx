/* eslint-disable no-empty-pattern */
/* eslint-disable no-unused-vars */
"use client";
import {
  useUpdateProfileInfoMutation,
  useUserDataQuery,
} from "@/app/redux/features/userInfo";
import { Button } from "@/components/ui/button";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as yup from "yup";
import MultiSelect from "./MultiSelect";

const ShopInfoForm = () => {
  const [selectedOptions, setSelectedOptions] = useState([]);

  // schema for validation
  const schema = yup
    .object({
      shop_name: yup
        .string()
        .required("Shop name is required")
        .min(5, "Shop name must be at least 5 characters long"),
      business_email: yup
        .string()
        .email("Invalid email address")
        .required("Email is required")
        .matches(/\S+@\S+\.\S+/, "Invalid email .!"),
      business_number: yup
        .string()
        .required("Phone number is required")
        .matches(
          /^01\d{9}$/,
          'Invalid phone number (must start with "01" and be 11 digits)'
        ),
      address: yup
        .string()
        .required("Shop Location is required")
        .min(5, "Shop location must be at least 5 characters long"),
      about_us: yup.string().required("Shop description is required"),
    })
    .required();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const token = localStorage.getItem("vendorToken");
  const { data: profileInfo, refetch } = useUserDataQuery(token, {
    refetchOnMountOrArgChange: true,
  });
  const [optionsData, setOptionsData] = useState([]);
  const [updateProfileInfo, {}] = useUpdateProfileInfoMutation();
  const [catErr, setCatErr] = useState("");
  const [loading, setLoading] = useState(false);

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

      const selectedData = profileInfo?.data?.categories?.filter(
        (item) => item?.is_assigned == true
      );

      if (selectedData?.length > 0) {
        const selectedOptionFormat = selectedData?.map((item) => {
          const formatObj = {
            label: item?.category_name,
            value: item?.category_id,
          };
          return formatObj;
        });
        setSelectedOptions(selectedOptionFormat);
      }
    }
  }, [profileInfo?.data?.categories, profileInfo?.data?.categories?.length]);

  const profileInfoUpdateHandler = async (data) => {
    if (selectedOptions?.length > 0) {
      setLoading(true);
      setCatErr("");
      const categories_ids = selectedOptions?.map((item) => item?.value);

      const profileInfoData = {
        name: data?.shop_name,
        address: data?.address,
        phone: "01845702501",
        email: "aa@gmail.com",
        shop_name: data?.shop_name,
        website: "",
        description: "",
        about_us: data?.about_us,
        business_number: data?.business_number,
        business_email: data?.business_email,
        verify_status: 0,
        verify_request_time: "",
        is_active: true,
        categories_id: categories_ids,
        ratings: 4.5,
        total_ratings: 400,
        total_reviews: 12345,
        logo_url: "https://picsum.photos/200/300",
        banner_url: "https://picsum.photos/200/300",
      };
      const request_Obj = { requst_body: profileInfoData, token };

      const update_res = await updateProfileInfo(request_Obj);

      console.log("Update req body ==>", request_Obj);
      console.log("update_res ==>", update_res);
      setLoading(false);
      if (update_res?.data?.message == "Request success") {
        setLoading(false);
        toast.success("Profile updated Successfully", {
          position: "top-right",
          duration: 2000,
        });
      }
    } else {
      setCatErr("Please Select Shop Category");
    }
  };

  const onSubmit = (data) => {
    profileInfoUpdateHandler(data);
  };

  const resetHandler = () => {
    reset();
    const selectedData = profileInfo?.data?.categories?.filter(
      (item) => item?.is_assigned == true
    );

    if (selectedData?.length > 0) {
      const selectedOptionFormat = selectedData?.map((item) => {
        const formatObj = {
          label: item?.category_name,
          value: item?.category_id,
        };
        return formatObj;
      });
      setSelectedOptions(selectedOptionFormat);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-4 mb-20">
      <div className="flex flex-col xl:flex-row  justify-between gap-6">
        <div className="w-full mt-6">
          <label className=" text-primary-950 font-bold">Shop Name*</label>
          <input
            defaultValue={profileInfo?.data?.name}
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
          {catErr && <div className="text-red-500">{catErr}</div>}
        </div>
      </div>
      <div className="flex flex-col xl:flex-row justify-between gap-6">
        <div className="w-full mt-6">
          <label className=" text-primary-950 font-bold">
            Business Contact Number*
          </label>
          <input
            defaultValue={profileInfo?.data?.phone}
            {...register("business_number")}
            className="rounded-lg border border-slate-200 bg-transparent px-4 py-2 text-primary-950 focus:outline-none w-full mt-2 h-12 "
            type="text"
            placeholder="Enter mobile number"
          />
          {errors.business_number && (
            <div className="text-red-500">{errors.business_number.message}</div>
          )}
        </div>
        <div className="w-full mt-6">
          <label className=" text-primary-950 font-bold">Email Address*</label>
          <input
            defaultValue={profileInfo?.data?.business_email}
            {...register("business_email")}
            className="rounded-lg border border-slate-200 bg-transparent px-4 py-2 text-primary-950 focus:outline-none w-full mt-2 h-12"
            type="email"
            placeholder="Type Email Address"
          />
          {errors.business_email && (
            <div className="text-red-500">{errors.business_email.message}</div>
          )}
        </div>
      </div>
      <div className="flex justify-between gap-6">
        <div className="w-full mt-6">
          <label className=" text-primary-950 font-bold">Shop Address*</label>
          <textarea
            defaultValue={profileInfo?.data?.address}
            {...register("address")}
            className="rounded-lg border border-slate-200 bg-transparent px-4 py-2 text-primary-950 focus:outline-none w-full mt-2 h-32"
            type="text"
            placeholder="Enter location details (e.g. Shop no, house no, road no etc.)"
          />
          {errors.address && (
            <div className="text-red-500">{errors.address.message}</div>
          )}
        </div>
      </div>
      <div className="flex justify-between gap-6">
        <div className="w-full mt-6">
          <label className=" text-primary-950 font-bold">About Us*</label>
          <textarea
            defaultValue={
              profileInfo?.data?.about_us ? profileInfo?.data?.about_us : ""
            }
            {...register("about_us")}
            className="rounded-lg border border-slate-200 bg-transparent px-4 py-2 text-primary-950 focus:outline-none w-full mt-2 h-32"
            type="text"
            placeholder="Write something about your shop within 100 words... "
          />
          {errors.about_us && (
            <div className="text-red-500">{errors.about_us.message}</div>
          )}
        </div>
      </div>

      <div className="mt-6 flex justify-end gap-4">
        <div className="text-xl px-6 bg-white text-primary-900 border border-primary-900 rounded-md cursor-pointer w-[100px] flex justify-center items-center h-[40px]">
          <p
            onClick={() => {
              resetHandler();
            }}
          >
            Reset
          </p>
        </div>

        {loading ? (
          <Button className="text-xl px-6">Loading...</Button>
        ) : (
          <Button type="submit" className="text-xl px-6">
            Save
          </Button>
        )}
      </div>
    </form>
  );
};

export default ShopInfoForm;
