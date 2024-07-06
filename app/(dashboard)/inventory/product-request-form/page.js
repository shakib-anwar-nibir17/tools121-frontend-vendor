'use client'
import GeneralInfo from "@/components/Dashboard/ProductRequest/GeneralInfo";
import MediaInfo from "@/components/Dashboard/ProductRequest/MediaInfo";
import MoreInfo from "@/components/Dashboard/ProductRequest/MoreInfo";
import { Button } from "@/components/ui/button";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm, Controller } from 'react-hook-form';
import { useAddProductRequestMutation } from "@/app/redux/features/inventoryProduct";

const ProductRequestForm = () => {
  const token = localStorage.getItem('vendorToken')
  const [addProductRequst, {}] = useAddProductRequestMutation();
  const schema = yup
  .object({
    category: yup
      .string()
      .required("Category is required"),

    sub_category: yup
    .string()
    .required("Sub Category is required"),

    product_name: yup
    .string()
    .required("Product name is required"),

    product_description: yup
    .string()
    .required("Production Description is required"),
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

  const productRequestSubmit = async () => {
    
    console.log('form data ==>', data)
  }

  const onSubmit = (data) => {
    productRequestSubmit(data)
    
   }

  return (
    <div className="max-w-[676px] mb-[102px]">
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* General Information */}
        <GeneralInfo control={control} errors={errors} register={register}/>
        {/* Media Information */}
        <MediaInfo />
        {/* More Information */}
        <MoreInfo control={control} errors={errors} register={register}/>
        <div className="mt-12 mb-[50px]">
          <div className="flex justify-end gap-4">
            <Button className="text-xl px-6 bg-white text-primary-900 border border-primary-900">
              Cancel
            </Button>
            <Button type="submit" className="text-xl px-6">Save Products</Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ProductRequestForm;
