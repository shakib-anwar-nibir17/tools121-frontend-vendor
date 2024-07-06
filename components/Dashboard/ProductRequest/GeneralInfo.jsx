import { useLazyProductSubCategoryQuery, useProductCategoryQuery } from "@/app/redux/features/inventoryProduct";
import SingleSelect from "@/components/common/SingleSelect";

const GeneralInfo = ({control, errors, register}) => {
  const token = localStorage.getItem('vendorToken')
  const { data: productCategories, refetch: refetchCategory } = useProductCategoryQuery(token, {
    refetchOnMountOrArgChange: true,
  });
  const [triggerSubCategory, { data: subCategories, error, isLoading }] = useLazyProductSubCategoryQuery();

  // console.log('category ===>', productCategories)
  
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
            defaultVal=''
            placeHolderName="Category"
            triggerFunction={triggerSubCategory}
            data={productCategories?.data?.categories}
            errorMessage={errors.category ? errors.category?.message : ''}
            bgPrimary={false}
          />
        </div>
        <div className="w-full mt-5">
          <label className=" text-primary-950 font-bold">
            Product Sub-Category
          </label>
          <SingleSelect
            control={control}
            name='sub_category'
            defaultVal=''
            placeHolderName="Sub Category"
            triggerFunction={triggerSubCategory}
            data={subCategories?.data?.sub_categories}
            errorMessage={errors.sub_category ? errors.sub_category?.message : ''}
            bgPrimary={false}
          />
        </div>
      </div>

      <div className="w-full mt-5 mb-5">
        <label className="font-bold text-black">Product Name</label>
        <input
          {...register("product_name")}
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
