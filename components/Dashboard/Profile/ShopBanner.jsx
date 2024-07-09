/* eslint-disable no-unused-vars */
import {
  useUploadImgMutation,
  useUserDataQuery,
} from "@/app/redux/features/userInfo";
import RatingComponent from "@/components/common/RatingComponent";
import { BusinessBagSVG, EmailSVG, PhoneSVG } from "@/components/icons/Icons";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRef } from "react";
import { FaLocationDot } from "react-icons/fa6";
import { MdOutlineModeEditOutline, MdVerified } from "react-icons/md";
import banner from "../../../public/e-shop-banner.png";
import profile from "../../../public/profile_pic.png";

const ShopBanner = () => {
  const token = localStorage.getItem("vendorToken");
  const { data: profileInfo, refetch } = useUserDataQuery(token, {
    refetchOnMountOrArgChange: true,
  });
  const fileRef = useRef();
  const [addImage, {}] = useUploadImgMutation();

  const imgUploadHandler = async (data) => {
    const formdata = new FormData();

    formdata.append("img_type", "0");
    formdata.append("file", data);

    const imgUpRes = await addImage({ formdata: formdata, token: token });
    console.log("imgUpRes ===>", imgUpRes);
  };

  const bnrUploadHandler = async (data) => {
    const formdata = new FormData();

    formdata.append("img_type", "1");
    formdata.append("file", data);

    const imgUpRes = await addImage({ formdata: formdata, token: token });
    console.log("imgUpRes ===>", imgUpRes);
  };

  console.log("Profile info ==>", profileInfo);
  return (
    <div className="pb-6 border-b-2 border-slate-300">
      <div className="h-[300px] rounded-2xl w-full relative">
        <div className="2xl:w-[1504px] h-[300px] relative">
          <Image
            fill
            alt="vendor_shop"
            src={banner}
            className="rounded-xl object-cover"
          />
        </div>

        <div className="absolute bottom-6 right-8">
          <Button className="bg-white text-black gap-2 px-3 py-2 border border-slate-100">
            <MdOutlineModeEditOutline /> Edit Banner
          </Button>
        </div>
        <div className="w-[168px] h-[168px] rounded-full absolute left-10 -bottom-[78px]">
          <Image
            fill
            alt="profile_pic"
            src={profile}
            className="rounded-full relative object-cover"
          />

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
