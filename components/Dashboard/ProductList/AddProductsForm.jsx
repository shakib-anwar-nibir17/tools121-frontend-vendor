"use client"
import { useAddProductMutation, useLazyProductSubCategoryQuery, useLazySelectProductListQuery, useProductBrandQuery, useProductCategoryQuery, useProductEngineQuery, useProductModelQuery } from "@/app/redux/features/inventoryProduct";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { BsExclamationCircle } from "react-icons/bs";
import { useForm, Controller } from 'react-hook-form';
import SingleSelect from "@/components/common/SingleSelect";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import toast from "react-hot-toast";

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
  const [addProduct, {}] = useAddProductMutation();
  const [loading, setLoading] = useState(false)

  const schema = yup
  .object({
    category: yup
      .string()
      .required("Category is required"),

    sub_category: yup
    .string()
    .required("Sub Category is required"),

    product_id: yup
    .string()
    .required("Product name is required"),

    brand_id: yup
    .string()
    .required("Brand is required"),

    product_model_id: yup
    .string()
    .required("Model is required"),

    engine_id: yup
    .string()
    .required("Engine is required"),

    delivery_note: yup
    .string()
    .required("Delivery note is required"),

    product_specification: yup
    .string()
    .required("Production Specification is required"),
  })
  .required();

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    reset,
    
  } = useForm({
    resolver: yupResolver(schema),
  });

  const addProductHandler = async (data) => {
    setLoading(true)
    const requst_body = {
      ...data,
      product_model_id: parseInt(data?.product_model_id),
      engine_id: parseInt(data?.engine_id),
      brand_id: parseInt(data?.brand_id),
      stock_color: "",
      product_description: "",
    }
    console.log('requst_body ===>', requst_body)
    const product_add_res = await addProduct({requst_body, token})

    if(product_add_res?.data?.message == "Request success"){
      setLoading(false)
        toast.success("Product added Successfully", {
          position: "top-right",
          duration: 2000,
        });
        reset()
    }
    else{
      setLoading(false)
        toast.error("Product Adding failed", {
          position: "top-right",
          duration: 2000,
        });
    }
    console.log('product_add_res ===>', product_add_res)
  }
  const onSubmit = (data) => {
   addProductHandler(data)
  }
 
  // console.log('selectProductList ==>', productCategories?.data?.categories)

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
            placeHolderName="Category"
            triggerFunction={triggerSubCategory}
            data={productCategories?.data?.categories}
            errorMessage={errors.category ? errors.category?.message : ''}
          />
        </div>

        <div className="w-full">
          <label className=" text-primary-950 font-bold">
            Product Subcategory*
          </label>
          <SingleSelect
            control={control}
            name='sub_category'
            placeHolderName='Sub Category'
            defaultVal=''
            triggerFunction={triggerSelectProduct}
            data={subCategories?.data?.sub_categories}
            errorMessage={errors.sub_category ? errors.sub_category?.message : ''}
          />
        </div>
      </div>

      <div className="gap-5 flex mb-6">
        <div className="w-full">
          <label className=" text-primary-950 font-bold">Product Name*</label>
          <SingleSelect
            control={control}
            name='product_id'
            placeHolderName='Product Name'
            defaultVal=''
            data={selectProductList?.data?.products}
            errorMessage={errors.product_id ? errors.product_id?.message : ''}
          />
        </div>
        
        <div className="w-full">
          <label className=" text-primary-950 font-bold">Product Brand*</label>
          <SingleSelect
            control={control}
            name='brand_id'
            placeHolderName='Brand'
            defaultVal=''
            data={productBrand?.data?.brands}
            errorMessage={errors.brand_id ? errors.brand_id?.message : ''}
          />
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
          <Link href="/inventory/product-request-form" className="text-primary-900 underline text-[14px]">
            Click Here
          </Link>
        </div>
      </div>

      <div className="gap-5 flex mb-6">
        <div className="w-full">
          <label className=" text-primary-950 font-bold">Model*</label>
          <SingleSelect
            control={control}
            name='product_model_id'
            placeHolderName='Model'
            defaultVal=''
            data={productModel?.data?.models}
            errorMessage={errors.product_model_id ? errors.product_model_id?.message : ''}
          />
        </div>

        <div className="w-full">
          <label className=" text-primary-950 font-bold">Engine*</label>
          <SingleSelect
            control={control}
            name='engine_id'
            placeHolderName='Engine'
            defaultVal=''
            data={productEngine?.data?.engines}
            errorMessage={errors.engine_id ? errors.engine_id?.message : ''}
          />
        </div>
      </div>

      <div className="gap-5 flex mb-6">
        <div className="w-full">
          <label className="font-bold">Regular Price</label>
          <input
          {...register("previous_price")}
            className="rounded-lg border border-slate-200 bg-transparent px-4 py-2 text-primary-950 focus:outline-none w-full mt-2 h-12"
            type="text"
            placeholder="Regular Price"
          />
          
        </div>
        <div className="w-full">
          <label className="font-bold">New Price</label>
          <input
          {...register("new_price")}
            className="rounded-lg border border-slate-200 bg-transparent px-4 py-2 text-primary-950 focus:outline-none w-full mt-2 h-12"
            type="text"
            placeholder="....."
          />
        </div>
        <div className="w-full">
          <label className="font-bold">Stock</label>
          <input
            {...register("stock")}
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
           {...register("delivery_note")}
            className="rounded-lg border border-slate-200 bg-primary-50 px-4 py-2 text-primary-950 focus:outline-none w-full mt-2 h-32"
            type="text"
            placeholder="Delivery Note"
          />
           {errors.delivery_note && (
            <div className="text-red-500">{errors.delivery_note.message}</div>
          )}
        </div>
        <div className="w-full mt-6">
          <label className=" text-primary-950 font-bold">
            Production Specification*
          </label>
          <textarea
           {...register("product_specification")}
            className="rounded-lg border border-slate-200 bg-primary-50 px-4 py-2 text-primary-950 focus:outline-none w-full mt-2 h-32"
            type="text"
            placeholder="Production Specification"
          />
           {errors.product_specification && (
            <div className="text-red-500">{errors.product_specification.message}</div>
          )}
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
          {
            loading ? <Button className="text-xl px-6">Loading...</Button>
            : <Button  type="submit" className="text-xl px-6">Add Products</Button>
          }
        </div>
      </div>
    </form>
  );
};

export default AddProductsForm;
