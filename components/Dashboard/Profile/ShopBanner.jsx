/* eslint-disable no-empty-pattern */
/* eslint-disable no-unused-vars */
import {
  useUploadImgMutation,
  useUserDataQuery,
} from "@/app/redux/features/userInfo";
import Loader from "@/components/common/Loader";
import RatingComponent from "@/components/common/RatingComponent";
import { BusinessBagSVG, EmailSVG, PhoneSVG } from "@/components/icons/Icons";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { FaLocationDot } from "react-icons/fa6";
import { MdOutlineModeEditOutline, MdVerified } from "react-icons/md";
import banner from "../../../public/e-shop-banner.png";
import profile from "../../../public/profile_pic.png";
import { BASE_URL } from "@/constant/urls";
import { generateFile } from "@/utils/GenerateFile";

const ShopBanner = () => {
  const token = localStorage.getItem("vendorToken");
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const { data: profileInfo, refetch } = useUserDataQuery({
    refetchOnMountOrArgChange: true,
  });
  const fileRef = useRef();
  const bannerRef = useRef();

  const [addImage, {}] = useUploadImgMutation();

  const imgUploadHandler = async (data) => {
    setLoading2(true);
    const formdata = new FormData();

    formdata.append("img_type", "0");
    formdata.append("file", data);

    const imgUpRes = await addImage({ formdata: formdata, token: token });
    setLoading2(false);
    if (imgUpRes.data?.message === "Request success") {
      toast.success("Your Picture uploaded successfully", {
        position: "top-right",
        duration: 3000,
      });
    } else if (
      imgUpRes?.error?.data?.message === "File extension is not supported"
    ) {
      toast.error("File extension is not supported", {
        position: "top-right",
        duration: 3000,
      });
    } else {
      toast.error("File upload error Please Try again", {
        position: "top-right",
        duration: 3000,
      });
    }
    refetch();
    console.log("imgUpRes ===>", imgUpRes);
  };

  const bnrUploadHandler = async (data) => {
    setLoading(true);
    const formdata = new FormData();

    formdata.append("img_type", "1");
    formdata.append("file", data);

    const imgUpRes = await addImage({ formdata: formdata, token: token });
    setLoading(false);
    if (imgUpRes.data?.message === "Request success") {
      toast.success("Your banner uploaded successfully", {
        position: "top-right",
        duration: 3000,
      });
    } else if (
      imgUpRes?.error?.data?.message === "File extension is not supported"
    ) {
      toast.error("File extension is not supported", {
        position: "top-right",
        duration: 3000,
      });
    } else {
      toast.error("File upload error Please Try again", {
        position: "top-right",
        duration: 3000,
      });
    }
    refetch();
    console.log("imgUpRes ===>", imgUpRes);
  };

  console.log("Profile info ==>", profileInfo?.data);

  return (
    <div className="pb-6 border-b-2 border-slate-300">
      <div className="h-[300px] rounded-2xl w-full relative">
        <div className="2xl:w-[1504px] h-[300px] relative">
          {
            profileInfo?.data?.banner_url ? <Image
            fill
            alt="vendor_shop"
            src={`${BASE_URL}/generate-file/?file_path=${profileInfo?.data?.banner_url}`}
            // src={generateFile(profileInfo?.data?.banner_url)}
            className="rounded-xl object-cover"
          /> : <Image
          fill
          alt="vendor_shop"
          src={banner}
          className="rounded-xl object-cover"
        />
          }
          
          <input
            onChange={(e) => {
              e.preventDefault();
              bnrUploadHandler(e.target.files[0]);
            }}
            ref={bannerRef}
            type="file"
            hidden
            accept="image/*"
          />
        </div>

        <div className="absolute bottom-6 right-8">
          {loading ? (
            <div className="bg-white w-[97px] h-[30px] border border-slate-100 flex justify-center items-center">
              <Loader height="20" width="20" />
            </div>
          ) : (
            <Button
              onClick={(e) => {
                e.preventDefault();
                bannerRef.current.click();
              }}
              className="bg-white text-black gap-2 px-4 py-3 border border-slate-100"
            >
              <MdOutlineModeEditOutline /> Edit Banner
            </Button>
          )}
        </div>
        <div className="w-[168px] h-[168px] rounded-full absolute left-10 -bottom-[78px]">
          {
          
            profileInfo?.data?.logo_url ? <Image
            fill
            alt="profile_pic"
            src={`${BASE_URL}/generate-file/?file_path=${profileInfo?.data?.logo_url}`}
            className="rounded-full relative object-cover"
          /> : <Image
          fill
          alt="profile_pic"
          src={profile}
          className="rounded-full relative object-cover"
        /> 
          }
          
          {loading2 ? (
            <div className="w-11 h-11 rounded-full bg-primary-200 cursor-pointer border-2 border-white absolute bottom-0 right-3 flex items-center justify-center">
              <Loader height="20" width="20" />{" "}
            </div>
          ) : (
            <div className="w-11 h-11 rounded-full bg-primary-200 cursor-pointer border-2 border-white absolute bottom-0 right-3 flex items-center justify-center">
              <MdOutlineModeEditOutline
                onClick={(e) => {
                  e.preventDefault();
                  fileRef.current.click();
                }}
                size={20}
                className="text-black"
              />
            </div>
          )}

          <input
            onChange={(e) => {
              e.preventDefault();
              imgUploadHandler(e.target.files[0]);
            }}
            ref={fileRef}
            type="file"
            hidden
            accept="image/*"
          />
        </div>
      </div>
      {/* shop name and other information */}
      <div className="ml-[240px] mt-4">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl text-black font-bold">
            {profileInfo?.data?.name ? profileInfo?.data?.name : "-"}
          </h1>
          {profileInfo?.data?.verify_status == 0 ? (
            ""
          ) : (
            <MdVerified color="#49ADF4" size={20} />
          )}
        </div>
        <div className="text-lg flex items-center gap-3 mt-3">
          <RatingComponent
            rating={
              profileInfo?.data?.ratings
                ? parseInt(profileInfo?.data?.ratings)
                : 0
            }
            size={20}
          />
          <span>|</span>
          <p>
            {" "}
            {profileInfo?.data?.total_ratings
              ? profileInfo?.data?.total_ratings
              : "-"}{" "}
            Total Ratings
          </p>
          <span>|</span>
          <p>
            {" "}
            {profileInfo?.data?.total_reviews
              ? profileInfo?.data?.total_reviews
              : "-"}{" "}
            Reviews
          </p>
        </div>
        <div className="flex items-center gap-3 mt-3">
          <BusinessBagSVG />
          <p>
            {profileInfo?.data?.about_us ? profileInfo?.data?.about_us : "-"}
          </p>
        </div>
        <div className="mt-3 flex items-center gap-4">
          <div className="flex items-center gap-3">
            <PhoneSVG />
            <p className="text-black font-medium">
              {profileInfo?.data?.business_number
                ? profileInfo?.data?.business_number
                : "-"}{" "}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <EmailSVG />
            <p className="text-black font-medium">
              {profileInfo?.data?.business_email
                ? profileInfo?.data?.business_email
                : "-"}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <FaLocationDot color="#0D6EFD" size={22} />
            <p className="text-black font-medium">
              {profileInfo?.data?.address ? profileInfo?.data?.address : "-"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopBanner;
