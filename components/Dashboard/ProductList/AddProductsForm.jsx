"use client"
import { useLazyProductSubCategoryQuery, useLazySelectProductListQuery, useProductBrandQuery, useProductCategoryQuery, useProductEngineQuery, useProductModelQuery } from "@/app/redux/features/inventoryProduct";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { BsExclamationCircle } from "react-icons/bs";
import { useForm, Controller } from 'react-hook-form';
import SingleSelect from "@/components/common/SingleSelect";

const AddProductsForm = ({ setShowForm }) => {
  const token = localStorage.getItem("vendorToken");

  const { data: productCategories, refetch: refetchCategory } = useProductCategoryQuery(token, {
    refetchOnMountOrArgChange: true,
  });
  const [triggerSubCategory, { data: subCategories, error, isLoading }] = useLazyProductSubCategoryQuery();
  const [triggerSelectProduct, { data: selectProductList }] = useLazySelectProductListQuery();

  const { data: productBrand, refetch: refetchBrand } = useProductBrandQuery(token, {
    refetchOnMountOrArgChange: true,
  });
  const { data: productModel, refetch: refetchModel } = useProductModelQuery(token, {
    refetchOnMountOrArgChange: true,
  });
  const { data: productEngine, refetch: refetchEngine } = useProductEngineQuery(token, {
    refetchOnMountOrArgChange: true,
  });


  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    reset,
    
  } = useForm({
    // resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log('Data ==>', data)
  }
  console.log('selectProductList ==>', selectProductList)

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-[996px]">
      <div className="gap-5 flex mb-6">

        <div className="w-full">
          <label className=" text-primary-950 font-bold">
            Product Category*
          </label>
          <SingleSelect
            control={control}
            name='category'
            defaultVal=''
            triggerFunction={triggerSubCategory}
            data={productCategories?.data?.categories}
          />
        </div>

        <div className="w-full">
          <label className=" text-primary-950 font-bold">
            Product Subcategory*
          </label>
          <SingleSelect
            control={control}
            name='sub_category'
            defaultVal=''
            triggerFunction={triggerSelectProduct}
            data={subCategories?.data?.sub_categories}
          />
          
        </div>
      </div>

      <div className="gap-5 flex mb-6">
        <div className="w-full">
          <label className=" text-primary-950 font-bold">Product Name*</label>
          <select
            className="rounded-lg border border-slate-200 bg-primary-50 px-4  py-2 text-primary-950 focus:outline-none w-full mt-2 h-12"
            type="text"
            placeholder="Shop name"
          >
            <option className="text-primary-950">Select Product Name</option>
            {
              selectProductList?.data?.products?.map((item) => (
                <option value={item?.id} className="text-primary-950">{item?.product_name}</option>
              ))
            }
          </select>
        </div>
        
        <div className="w-full">
          <label className=" text-primary-950 font-bold">Product Brand*</label>
          <select
            className="rounded-lg border border-slate-200 bg-primary-50 px-4 py-2 text-primary-950 focus:outline-none w-full mt-2 h-12 "
            type="text"
            placeholder="Shop name"
          >
            <option className="text-primary-950">Select Brand</option>
            {
              productBrand?.data?.brands?.map((item) => (
                <option value={item?.id} className="text-primary-950">{item?.brand_name}</option>
              ))
            }
          </select>
        </div>
      </div>

      <div className="flex mb-6">
        <div className="h-[71px] border border-slate-200 py-3 px-4 w-1/2 rounded-lg flex justify-between items-start">
          <div className="flex items-center gap-3">
            <Image
              src={"/not-found-product.png"}
              width={21}
              height={21}
              alt="not-found-product"
            />
            <p className="text-[14px]">Product not found?</p>
            <BsExclamationCircle color="#FF1E7C" />
          </div>
          <Link href="#" className="text-primary-900 underline text-[14px]">
            Click Here
          </Link>
        </div>
      </div>

      <div className="gap-5 flex mb-6">
        <div className="w-full">
          <label className=" text-primary-950 font-bold">Model*</label>
          <select
            className="rounded-lg border border-slate-200 bg-primary-50 px-4  py-2 text-primary-950 focus:outline-none w-full mt-2 h-12"
            type="text"
            placeholder="Shop name"
          >
            <option className="text-primary-950">Select model</option>
            {
              productModel?.data?.models?.map((item) => (
                <option value={item?.id} className="text-primary-950">{item?.model_name}</option>
              ))
            }
          </select>
        </div>

        <div className="w-full">
          <label className=" text-primary-950 font-bold">Engine*</label>
          <select
            className="rounded-lg border border-slate-200 bg-primary-50 px-4 py-2 text-primary-950 focus:outline-none w-full mt-2 h-12 "
            type="text"
            placeholder="Shop name"
          >
            <option className="text-primary-950">Select Category</option>
            {
              productEngine?.data?.engines?.map((item) => (
                <option value={item?.id} className="text-primary-950">{item?.engine_name}</option>
              ))
            }

          </select>
        </div>
      </div>

      <div className="gap-5 flex mb-6">
        <div className="w-full">
          <label className="font-bold">Regular Price</label>
          <input
            className="rounded-lg border border-slate-200 bg-transparent px-4 py-2 text-primary-950 focus:outline-none w-full mt-2 h-12"
            type="text"
            placeholder="Regular Price"
          />
        </div>
        <div className="w-full">
          <label className="font-bold">New Price</label>
          <input
            className="rounded-lg border border-slate-200 bg-transparent px-4 py-2 text-primary-950 focus:outline-none w-full mt-2 h-12"
            type="text"
            placeholder="....."
          />
        </div>
        <div className="w-full">
          <label className="font-bold">Stock</label>
          <input
            className="rounded-lg border border-slate-200 bg-transparent px-4 py-2 text-primary-950 focus:outline-none w-full mt-2 h-12"
            type="number"
            placeholder="...."
          />
        </div>
      </div>

      <div className="flex gap-5">
        <div className="w-full mt-6">
          <label className=" text-primary-950 font-bold">Delivery Note*</label>
          <textarea
            className="rounded-lg border border-slate-200 bg-primary-50 px-4 py-2 text-primary-950 focus:outline-none w-full mt-2 h-32"
            type="text"
            placeholder="Delivery Note"
          />
        </div>
        <div className="w-full mt-6">
          <label className=" text-primary-950 font-bold">
            Production Specification*
          </label>
          <textarea
            className="rounded-lg border border-slate-200 bg-primary-50 px-4 py-2 text-primary-950 focus:outline-none w-full mt-2 h-32"
            type="text"
            placeholder="Production Specification"
          />
        </div>
      </div>
      <div className="mt-10 mb-[60px]">
        <div className="flex justify-end gap-4">
          <Button
            onClick={() => setShowForm(false)}
            className="text-xl px-6 bg-white text-primary-900 border border-primary-900"
          >
            Cancel
          </Button>
          <Button  type="submit" className="text-xl px-6">Add Products</Button>
        </div>
      </div>
    </form>
  );
};

export default AddProductsForm;
