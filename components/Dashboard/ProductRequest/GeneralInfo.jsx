import { useLazyProductSubCategoryQuery, useProductCategoryQuery } from "@/app/redux/features/inventoryProduct";
import SingleSelect from "@/components/common/SingleSelect";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const GeneralInfo = ({control, errors, register,  resetField, singleProductRequestData,setValue, paramsId}) => {
  const token = localStorage.getItem('vendorToken')
  const { data: productCategories, refetch: refetchCategory } = useProductCategoryQuery(token, {
    refetchOnMountOrArgChange: true,
  });
  const [triggerSubCategory, { data: subCategories, error, isLoading }] = useLazyProductSubCategoryQuery();
  const [formatedCategory, setFormatedCategory] = useState([])
  const [formatedSubCategory, setFormatedSubCategory] = useState([])

  // ----------------Editing State------------//
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);

  useEffect(() => {
    refetchCategory()
  },[paramsId])

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
  },[productCategories?.data?.categories, productCategories?.data?.categories?.length])

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

  // -----------Editing Functionality----------//
  const singleProductRequest = useSelector((state) => state.inventoryStore.singleProductRequest)

  useEffect(() => {
    console.log('entering 1 category...', paramsId, formatedCategory?.length, singleProductRequestData?.requested_product?.id)

    if(paramsId && singleProductRequestData?.requested_product?.id){
     
      const findCate = {
        label: singleProductRequestData?.requested_product?.cat_name,
        value: singleProductRequestData?.requested_product?.cat_id,
      }

      setSelectedCategory(findCate)

      triggerSubCategory({cat_id: findCate?.value, token})

      Object.keys(singleProductRequestData?.requested_product).forEach(key => {
        setValue(key, singleProductRequestData?.requested_product[key]);
      });
      setValue('category', findCate)
    }
  },[paramsId, formatedCategory?.length, singleProductRequestData?.requested_product?.id])
  
  useEffect(() => {
    console.log('entering 2 sub cat...', paramsId, formatedSubCategory?.length, singleProductRequestData?.requested_product?.sub_cat_name)

    if(paramsId && singleProductRequestData?.requested_product?.sub_cat_name){

      const findSubCate = {
        label: singleProductRequestData?.requested_product?.sub_cat_name,
        value: singleProductRequestData?.requested_product?.sub_cat_id,
      }
      
      setSelectedSubCategory(findSubCate)
      setValue('sub_category', findSubCate)
    }
  },[paramsId, singleProductRequestData?.requested_product?.sub_cat_name])

console.log("singleProductRequestData ==>", singleProductRequestData?.requested_product)

  return (
    <div className="p-6 border border-slate-300 rounded-lg mt-6">
      <h1 className="text-lg text-black">General Information</h1>
      <div className="mt-5 border border-slate-300 p-6 rounded-lg">
        <h1 className="text-lg text-black">Category</h1>
        <div className="w-full mt-5 mb-5">
          <label className=" text-primary-950 font-bold">
            Product Category
          </label>
          <SingleSelect
            control={control}
            name='category'
            placeHolderName="Category"
            triggerFunction={triggerSubCategory}
            data={formatedCategory}
            errorMessage={errors.category ? errors.category?.message : ''}
            bgPrimary={false}
            resetField={resetField}
            defaultVal={selectedCategory}
            setSelectedData={setSelectedCategory}
            setSelectedSubCategory={setSelectedSubCategory}
          />
        </div>
        <div className="w-full mt-5">
          <label className=" text-primary-950 font-bold">
            Product Sub-Category
          </label>
          <SingleSelect
            control={control}
            name='sub_category'
            placeHolderName="Sub Category"
            triggerFunction={triggerSubCategory}
            data={formatedSubCategory}
            errorMessage={errors.sub_category ? errors.sub_category?.message : ''}
            bgPrimary={false}
            resetField={resetField}
            defaultVal={selectedSubCategory}
            setSelectedSubCategory={setSelectedSubCategory}
            
          />
        </div>
      </div>

      <div className="w-full mt-5 mb-5">
        <label className="font-bold text-black">Product Name</label>
        <input
          {...register("product_name")}
          defaultValue={singleProductRequestData?.requested_product?.product_name ? singleProductRequestData?.requested_product?.product_name : ''}
          className="rounded-lg border border-slate-300 bg-transparent px-4 py-2 text-primary-950 focus:outline-none w-full mt-2 h-12"
          type="text"
          placeholder="Type product name"
        />
        {errors.product_name?.message && (
            <div className="text-red-500">{errors.product_name?.message}</div>
          )}
      </div>
      <div className="w-full">
        <label className=" text-primary-950 font-bold">
          Product Description
        </label>
        <textarea
        {...register("product_description")}
        defaultValue={singleProductRequestData?.requested_product?.product_description ? singleProductRequestData?.requested_product?.product_description : ''}
          className="rounded-lg border border-slate-300 bg-transparent px-4 py-2 text-primary-950 focus:outline-none w-full mt-2 h-32"
          type="text"
          placeholder=" Product Description"
        />
         {errors.product_description?.message && (
            <div className="text-red-500">{errors.product_description?.message}</div>
          )}
      </div>
    </div>
  );
};

export default GeneralInfo;
