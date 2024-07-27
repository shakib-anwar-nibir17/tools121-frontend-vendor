/* eslint-disable no-empty-pattern */
/* eslint-disable no-unused-vars */
"use client";
import {
  useAddProductRequestMutation,
  useGetProductTagsQuery,
} from "@/app/redux/features/inventoryProduct";
import GeneralInfo from "@/components/Dashboard/ProductRequest/GeneralInfo";
import MediaInfo from "@/components/Dashboard/ProductRequest/MediaInfo";
import MoreInfo from "@/components/Dashboard/ProductRequest/MoreInfo";
import { Button } from "@/components/ui/button";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as yup from "yup";

const ProductRequestForm = () => {
  const token = localStorage.getItem("vendorToken");
  const [addProductRequst, {}] = useAddProductRequestMutation();
  const [prodImg, setProdImg] = useState(null);
  const [imgErr, setImgErr] = useState("");
  const [loader, setLoader] = useState(false);
  const [preview, setPreview] = useState("");
  const [tags, setTags] = useState([]);

  const { data: productTags, refetch: refetchtags } = useGetProductTagsQuery(
    token,
    {
      refetchOnMountOrArgChange: true,
    }
  );

  const schema = yup
    .object({
      category: yup
        .object()
        .shape({
          value: yup.string().required("Category value is required"),
          label: yup.string().required("Category label is required"),
        })
        .typeError("Category is required")
        .required("Category is required"),

      sub_category: yup
        .object()
        .shape({
          value: yup.string().required("Sub Category value is required"),
          label: yup.string().required("Sub Category label is required"),
        })
        .typeError("Sub Category is required")
        .required("Sub Category is required"),

      product_name: yup.string().required("Product name is required"),

      product_description: yup
        .string()
        .required("Production Description is required"),

      product_rate: yup.string().required("Product rate is required"),
    })
    .required();

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    reset,
    resetField,
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const productRequestSubmit = async (data) => {
    if (prodImg) {
      setLoader(true);
      const formdata = new FormData();

      formdata.append("product_name", data?.product_name);
      formdata.append("sub_cat_id", parseInt(data?.sub_category?.value));
      formdata.append("product_description", data?.product_description);
      formdata.append("purchase_quantity", 0);
      formdata.append("product_rate", parseInt(data?.product_rate));
      formdata.append("file", prodImg);
      formdata.append("product_specification", data?.product_description);
      formdata.append("tags", JSON.stringify(tags));

      console.log("data ==>", data);

      const prod_reqest_res = await addProductRequst({
        requst_body: formdata,
        token: token,
      });

      if (prod_reqest_res?.data?.message == "Request success") {
        setLoader(false);
        toast.success("Product request Successfully", {
          position: "top-right",
          duration: 2000,
        });
        setPreview("");
        setProdImg(null);
        reset();
      } else {
        setLoader(false);
        toast.error("Product request Failed", {
          position: "top-right",
          duration: 2000,
        });
      }

      console.log("Prod Request res ==>", prod_reqest_res);
    } else {
      setImgErr("Image is Required");
    }
  };

  const onSubmit = (data) => {
    productRequestSubmit(data);
  };

  useEffect(() => {
    if (prodImg) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(prodImg);
    }
  }, [prodImg]);

  const fileDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    setProdImg(file);
  };

  const tagChangeHandler = (tagObj) => {
    if (tagObj?.tag_values) {
      const isExistTag = tags?.find((item) => item?.id == tagObj?.id);
      if (isExistTag?.id) {
        const index = tags.findIndex((item) => item?.id === tagObj?.id);
        // Create a new array by copying the existing array
        const newArrayForm = [...tags];
        // Replace the existing element at the specific index with the new tag object
        newArrayForm.splice(index, 1, tagObj);

        console.log(newArrayForm, index);
        setTags(newArrayForm);
      } else {
        setTags((prev) => [...prev, tagObj]);
      }
    }
  };
  console.log("productTags -------->", tags);
  return (
    <div className="max-w-[676px] mb-[102px]">
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* General Information */}
        <GeneralInfo
          resetField={resetField}
          control={control}
          errors={errors}
          register={register}
        />
        {/* Media Information */}
        <MediaInfo
          fileDrop={fileDrop}
          preview={preview}
          imgErr={imgErr}
          setProdImg={setProdImg}
          prodImg={prodImg}
        />
        {/* More Information */}
        <MoreInfo
          tagChangeHandler={tagChangeHandler}
          productTags={productTags?.data?.tags}
          control={control}
          errors={errors}
          register={register}
        />
        <div className="mt-12 mb-[50px]">
          <div className="flex justify-end gap-4">
            <div className="text-xl px-6 bg-white text-primary-900 border border-primary-900 rounded-md cursor-pointer w-[100px] flex justify-center items-center h-[40px]">
              <p
                onClick={() => {
                  setProdImg(null);
                  reset();
                }}
              >
                Cancel
              </p>
            </div>
            {loader ? (
              <Button className="text-xl px-6">Loading...</Button>
            ) : (
              <Button type="submit" className="text-xl px-6">
                Save Products
              </Button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default ProductRequestForm;
