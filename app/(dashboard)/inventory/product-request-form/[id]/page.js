/* eslint-disable no-empty-pattern */
/* eslint-disable no-unused-vars */
"use client";
import {
  useLazyGetSingleProductRequestQuery,
  useUpdateReqProductMutation,
} from "@/app/redux/features/inventoryProduct";
import Loader from "@/components/common/Loader";
import GeneralInfo from "@/components/Dashboard/ProductRequest/GeneralInfo";
import MediaInfo from "@/components/Dashboard/ProductRequest/MediaInfo";
import MoreInfo from "@/components/Dashboard/ProductRequest/MoreInfo";
import { Button } from "@/components/ui/button";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as yup from "yup";

const ProductRequestForm = ({ params }) => {
  const token = localStorage.getItem("vendorToken");
  const [updateProductRequst, {}] = useUpdateReqProductMutation();
  const [prodImg, setProdImg] = useState(null);
  const [imgErr, setImgErr] = useState("");
  const [loader, setLoader] = useState(false);
  const [preview, setPreview] = useState("");
  const router = useRouter();
  const [tags, setTags] = useState([]);

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
    watch,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      product_name: "",
      product_description: "",
      product_rate: "",
      sku: "",
      barcode: "",
      quantity: "",
      weight: "",
      height: "",
      length: "",
      width: "",
    },
  });

  const productRequestSubmit = async (data) => {
    if (prodImg || preview) {
      setLoader(true);
      const formdata = new FormData();

      formdata.append("product_id", data?.id);
      formdata.append("product_name", data?.product_name);
      formdata.append("sub_cat_id", parseInt(data?.sub_category?.value));
      formdata.append("product_description", data?.product_description);
      formdata.append("purchase_quantity", 0);
      formdata.append("product_rate", parseInt(data?.product_rate));
      formdata.append("product_specification", data?.product_description);

      if (prodImg) {
        formdata.append("file", prodImg);
      }
      if (tags?.length > 0) {
        const fortamtedTags = tags?.map((item) => {
          const formatObj = {
            id: item?.id,
            tag_values: item?.tag_values,
          };
          return formatObj;
        });
        formdata.append("request_tags", JSON.stringify(fortamtedTags));
      }

      console.log("data ==>", data);

      const prod_reqest_res = await updateProductRequst({
        requst_body: formdata,
        token: token,
      });
      console.log("prod_reqest_res ==>", prod_reqest_res);

      if (prod_reqest_res?.data?.message == "Request success") {
        setLoader(false);
        toast.success("Product request Successfully", {
          position: "top-right",
          duration: 2000,
        });
        setPreview("");
        setProdImg(null);
        reset();
        router.push("/inventory/product-request-list");
      } else {
        setLoader(false);
        toast.error("Product request Failed", {
          position: "top-right",
          duration: 2000,
        });
      }
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

  // ----------Editing Functionality -----------//
  const [
    triggerSingleProductReq,
    { data: singleProductRequestData, error, isLoading, isFetching },
  ] = useLazyGetSingleProductRequestQuery();

  useEffect(() => {
    if (params?.id) {
      triggerSingleProductReq({ id: params?.id, token: token });
    }
  }, [params?.id, triggerSingleProductReq, token]);

  useEffect(() => {
    if (singleProductRequestData?.data?.requested_product_img?.img_url) {
      setPreview(
        singleProductRequestData?.data?.requested_product_img?.img_url
      );

      if (singleProductRequestData?.data?.requested_product_tags?.length > 0) {
        const formattag =
          singleProductRequestData?.data?.requested_product_tags?.map(
            (item) => {
              const formatObj = {
                tag_name: item?.tag_name,
                id: item?.product_request_tag_id,
                tag_values: item?.tag_values,
              };
              return formatObj;
            }
          );
        setTags(formattag);
      }
    }
  }, [
    singleProductRequestData?.data?.requested_product_img?.img_url,
    singleProductRequestData?.data?.requested_product_tags,
  ]);

  console.log(
    "singleProductRequestData ===>",
    singleProductRequestData?.data?.requested_product_tags
  );

  const tagChangeHandler = (tagObj) => {
    console.log("tagObj --->", tagObj);
    if (tagObj?.tag_values) {
      const isExistTag = tags?.find((item) => item?.id == tagObj?.id);

      if (isExistTag?.id) {
        const filterTag = tags?.filter((item) => item?.id !== tagObj?.id);

        setTags([...filterTag, tagObj]);
      } else {
        console.log("not exists");

        setTags((prev) => [...prev, tagObj]);
      }
    }
  };

  console.log("productTags -------->", tags);

  return (
    <div className="max-w-[676px] mb-[102px]">
      {isFetching ? (
        <Loader />
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* General Information */}
          <GeneralInfo
            paramsId={params?.id}
            setValue={setValue}
            singleProductRequestData={singleProductRequestData?.data}
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
            productTags={singleProductRequestData?.data?.requested_product_tags}
            singleProductRequestData={
              singleProductRequestData?.data?.requested_product
            }
            control={control}
            errors={errors}
            register={register}
          />
          <div className="mt-12 mb-[50px]">
            <div className="flex justify-end gap-4">
              <div className="text-xl px-6 bg-white text-primary-900 border border-primary-900 rounded-md cursor-pointer w-[100px] flex justify-center items-center h-[40px]">
                <p
                  onClick={() => {
                    router.push("/inventory/product-request-list");
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
      )}
    </div>
  );
};

export default ProductRequestForm;
