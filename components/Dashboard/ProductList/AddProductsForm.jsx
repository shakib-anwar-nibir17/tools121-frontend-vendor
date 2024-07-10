"use client"
import { useAddProductMutation, useLazyProductSubCategoryQuery, useLazySelectProductListQuery, useProductBrandQuery, useProductCategoryQuery, useProductEngineQuery, useProductModelQuery } from "@/app/redux/features/inventoryProduct";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BsExclamationCircle } from "react-icons/bs";
import { useForm, Controller } from 'react-hook-form';
import SingleSelect from "@/components/common/SingleSelect";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import toast from "react-hot-toast";

const AddProductsForm = ({ setShowForm, singleProductData, paramsId }) => {
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
  const [formatedCategory, setFormatedCategory] = useState([])
  const [formatedSubCategory, setFormatedSubCategory] = useState([])
  const [formatedProdName, setFormatedProdName] = useState([])
  const [formatedBrand, setFormatedBrand] = useState([])
  const [formatedModel, setFormatedModel] = useState([])
  const [formatedEngines, setFormatedEngines] = useState([])

  // ----------------Selected Options state -------------//
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedModel, setSelectedModel] = useState(null);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [selectedEngine, setSelectedEngine] = useState(null);

  // const schema = yup
  // .object({
  //   category: yup
  //   .object()
  //   .shape({
  //     value: yup.string().required("Category value is required"),
  //     label: yup.string().required("Category label is required"),
  //   })
  //   .typeError("Category is required")
  //   .required("Category is required"),

  //   sub_category: yup
  //   .object()
  //   .shape({
  //     value: yup.string().required("Sub Category value is required"),
  //     label: yup.string().required("Sub Category label is required"),
  //   })
  //   .typeError("Sub Category is required")
  //   .required("Sub Category is required"),

  //   product_id: yup
  //   .object()
  //   .shape({
  //     value: yup.string().required("Product name value is required"),
  //     label: yup.string().required("Product name label is required"),
  //   })
  //   .typeError("Product name is required")
  //   .required("Product name is required"),

  //   brand_id: yup
  //   .object()
  //   .shape({
  //     value: yup.string().required("Brand value is required"),
  //     label: yup.string().required("Brand label is required"),
  //   })
  //   .typeError("Brand is required")
  //   .required("Brand is required"),

  //   product_model_id: yup
  //   .object()
  //   .shape({
  //     value: yup.string().required("Model value is required"),
  //     label: yup.string().required("Model label is required"),
  //   })
  //   .typeError("Model is required")
  //   .required("Model is required"),

  //   engine_id: yup
  //   .object()
  //   .shape({
  //     value: yup.string().required("Engine value is required"),
  //     label: yup.string().required("Engine label is required"),
  //   })
  //   .typeError("Engine is required")
  //   .required("Engine required"),

  //   delivery_note: yup
  //   .string()
  //   .required("Delivery note is required"),

  //   product_specification: yup
  //   .string()
  //   .required("Production Specification is required"),
  // })
  // .required();

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    reset,
    resetField,
    setValue
  } = useForm({
    // resolver: yupResolver(schema),
    defaultValues: {
      category: null,
      sub_category: null,
      product_id: null,
      brand_id: null,
      engine_id: null,
      product_model_id: null,
      new_price: '',
      stock: '',
      previous_price: '',
      product_specification: '',
      delivery_note: ''
    }
  });

  const addProductHandler = async (data) => {
    console.log("data ==>", data)
    return
    setLoading(true)

    const findProduct = selectProductList?.data?.products?.filter((item) => item?.id == data?.product_id?.value)

    const requst_body = {
      ...data,
      product_id: data?.product_id?.value,
      product_model_id: parseInt(data?.product_model_id?.value),
      engine_id: parseInt(data?.engine_id?.value),
      brand_id: parseInt(data?.brand_id?.value),
      stock_color: "",
      product_description: "",
      previous_price: data?.previous_price ? data?.previous_price : findProduct?.purchase_rate
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
    else if(product_add_res?.error?.data?.message == "Supplier product already exit"){
      setLoading(false)
      toast.error("Supplier product already exit", {
        position: "top-right",
        duration: 2500,
      });
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
  
  useEffect(() => {
    if(productCategories?.data?.categories?.length > 0){
      const format = productCategories?.data?.categories?.map((item) => {
        const obj = {
          label: item?.category_name,
          value: item?.id
        }
        return obj
      })
      setFormatedCategory(format)
    }
  },[productCategories?.data?.categories])
  
  useEffect(() => {
    if(subCategories?.data?.sub_categories?.length > 0){
      const format = subCategories?.data?.sub_categories?.map((item) => {
        const obj = {
          label: item?.sub_category_name,
          value: item?.id
        }
        return obj
      })
      setFormatedSubCategory(format)
    }
  },[subCategories?.data?.sub_categories])
  
  useEffect(() => {
    if(selectProductList?.data?.products?.length > 0){
      const format = selectProductList?.data?.products?.map((item) => {
        const obj = {
          label: item?.product_name,
          value: item?.id
        }
        return obj
      })
      setFormatedProdName(format)
    }
  },[selectProductList?.data?.products])

  useEffect(() => {
    if(productBrand?.data?.brands?.length > 0){
      const format = productBrand?.data?.brands?.map((item) => {
        const obj = {
          label: item?.brand_name,
          value: item?.id
        }
        return obj
      })
      setFormatedBrand(format)
    }
  },[productBrand?.data?.brands])

  useEffect(() => {
    if(productModel?.data?.models?.length > 0){
      const format = productModel?.data?.models?.map((item) => {
        const obj = {
          label: item?.model_name,
          value: item?.id
        }
        return obj
      })
      setFormatedModel(format)
    }
  },[productModel?.data?.models])

  useEffect(() => {
    if(productEngine?.data?.engines?.length > 0){
      const format = productEngine?.data?.engines?.map((item) => {
        const obj = {
          label: item?.engine_name,
          value: item?.id
        }
        return obj
      })
      setFormatedEngines(format)
    }
  },[productEngine?.data?.engines])

// -------------------Editing Functionlity----------------//
useEffect(() => {
  console.log('entering 1 prod category...', paramsId, singleProductData?.id)

  if(paramsId && singleProductData?.id){
   
    const findCate = {
      label: singleProductData?.category,
      value: singleProductData?.category_id,
    }
    setSelectedCategory(findCate)

    triggerSubCategory({cat_id: singleProductData?.category_id, token})

    Object.keys(singleProductData).forEach(key => {
      setValue(key, singleProductData[key]);
    });

    const brandObj = {
      label: singleProductData?.brand_name,
      value: singleProductData?.brand_id,
    }
    setSelectedBrand(brandObj)

    const modelObj = {
      label: singleProductData?.model_name,
      value: singleProductData?.model_id,
    }
    setSelectedModel(modelObj)

    const engineObj = {
      label: singleProductData?.engine_name,
      value: singleProductData?.engine_id,
    }
    setSelectedEngine(engineObj)

    setValue('category', findCate)
    setValue('brand_id', brandObj)
    setValue('engine_id', engineObj)
    setValue('product_model_id', modelObj)

  }
},[paramsId, singleProductData?.id])

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
            placeHolderName="Category"
            triggerFunction={triggerSubCategory}
            data={formatedCategory}
            errorMessage={errors.category ? errors.category?.message : ''}
            resetField={resetField}
            defaultVal={selectedCategory}
            setSelectedData={setSelectedCategory}
            setSelectedSubCategory={setSelectedSubCategory}
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
            triggerFunction={triggerSelectProduct}
            data={formatedSubCategory}
            errorMessage={errors.sub_category ? errors.sub_category?.message : ''}
            resetField={resetField}
            defaultVal={selectedSubCategory}
            setSelectedSubCategory={setSelectedSubCategory}
            setSelectedProduct={setSelectedProduct}
            from={"addProd"}
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
            data={formatedProdName}
            errorMessage={errors.product_id ? errors.product_id?.message : ''}
            defaultVal={selectedProduct}
            setSelectedData={setSelectedProduct}
          />
        </div>
        
        <div className="w-full">
          <label className=" text-primary-950 font-bold">Product Brand*</label>
          <SingleSelect
            control={control}
            name='brand_id'
            placeHolderName='Brand'
            data={formatedBrand}
            errorMessage={errors.brand_id ? errors.brand_id?.message : ''}
            defaultVal={selectedBrand}
            setSelectedData={setSelectedBrand}
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
            data={formatedModel}
            errorMessage={errors.product_model_id ? errors.product_model_id?.message : ''}
            defaultVal={selectedModel}
            setSelectedData={setSelectedModel}
          />
        </div>

        <div className="w-full">
          <label className=" text-primary-950 font-bold">Engine*</label>
          <SingleSelect
            control={control}
            name='engine_id'
            placeHolderName='Engine'
            data={formatedEngines}
            errorMessage={errors.engine_id ? errors.engine_id?.message : ''}
            defaultVal={selectedEngine}
            setSelectedData={setSelectedEngine}
          />
        </div>
      </div>

      <div className="gap-5 flex mb-6">
        <div className="w-full">
          <label className="font-bold">Regular Price</label>
          <input
          {...register("previous_price")}
            defaultValue={singleProductData?.previous_price ? singleProductData?.previous_price : ''}
            className="rounded-lg border border-slate-200 bg-transparent px-4 py-2 text-primary-950 focus:outline-none w-full mt-2 h-12"
            type="text"
            placeholder="Regular Price"
          />
          
        </div>
        <div className="w-full">
          <label className="font-bold">New Price</label>
          <input
          {...register("new_price")}
          defaultValue={singleProductData?.new_price ? singleProductData?.new_price : ''}
            className="rounded-lg border border-slate-200 bg-transparent px-4 py-2 text-primary-950 focus:outline-none w-full mt-2 h-12"
            type="text"
            placeholder="....."
          />
        </div>
        <div className="w-full">
          <label className="font-bold">Stock</label>
          <input
            {...register("stock")}
            defaultValue={singleProductData?.stock ? singleProductData?.stock : ''}
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
           defaultValue={singleProductData?.delivery_note ? singleProductData?.delivery_note : ''}
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
           defaultValue={singleProductData?.product_specification ? singleProductData?.product_specification : ''}
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
