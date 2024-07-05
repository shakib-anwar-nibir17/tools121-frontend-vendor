import RatingComponent from "@/components/common/RatingComponent";
import { BusinessBagSVG, EmailSVG, PhoneSVG } from "@/components/icons/Icons";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { FaLocationDot } from "react-icons/fa6";
import { MdOutlineModeEditOutline, MdVerified } from "react-icons/md";
import profile from "../../../public/profile_pic.png";
import banner from "../../../public/shopbanner.png";
import { useUserDataQuery } from "@/app/redux/features/userInfo";

const ShopBanner = () => {
  const token = localStorage.getItem("vendorToken");
  const { data: profileInfo, refetch } = useUserDataQuery(token, {
    refetchOnMountOrArgChange: true,
  });

  console.log('profile info ===>', profileInfo)
  return (
    <div className="pb-6 border-b-2 border-slate-300">
      <div className="h-[300px] rounded-2xl w-full relative">
        <Image width={1504} height={300} alt="vendor_shop" src={banner} />
        <div className="absolute bottom-6 right-8">
          <Button className="bg-white text-black gap-2 px-3 py-2 border border-slate-100">
            <MdOutlineModeEditOutline /> Edit Banner
          </Button>
        </div>
        <div className="w-[168px] h-[168px] rounded-full absolute left-10 -bottom-[78px]">
          <Image
            width={168}
            height={168}
            alt="profile_pic"
            src={profile}
            className="rounded-full relative"
          />
          <div className="w-11 h-11 rounded-full bg-primary-200 cursor-pointer border-2 border-white absolute bottom-0 right-3 flex items-center justify-center">
            <MdOutlineModeEditOutline size={20} className="text-black" />
          </div>
        </div>
      </div>
      {/* shop name and other information */}
      <div className="ml-[240px] mt-4">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl text-black font-bold">
            {profileInfo?.data?.name ? profileInfo?.data?.name : '-'}
          </h1>
          {profileInfo?.data?.verify_status == 0 ? '' : <MdVerified color="#49ADF4" size={20} />}
        </div>
        <div className="text-lg flex items-center gap-3 mt-3">
          <RatingComponent rating={parseInt(profileInfo?.data?.ratings)} size={20} />
          <span>|</span>
          <p> {profileInfo?.data?.total_ratings ? profileInfo?.data?.total_ratings : '-'} Total Ratings</p>
          <span>|</span>
          <p> {profileInfo?.data?.total_reviews ? profileInfo?.data?.total_reviews : '-'}  Reviews</p>
        </div>
        <div className="flex items-center gap-3 mt-3">
          <BusinessBagSVG />
          <p>
          {profileInfo?.data?.about_us ? profileInfo?.data?.about_us : '-'}
          </p>
        </div>
        <div className="mt-3 flex items-center gap-4">
          <div className="flex items-center gap-3">
            <PhoneSVG />
            <p className="text-black font-medium">{profileInfo?.data?.business_number ? profileInfo?.data?.business_number : '-'} </p>
          </div>
          <div className="flex items-center gap-3">
            <EmailSVG />
            <p className="text-black font-medium">{profileInfo?.data?.business_email ? profileInfo?.data?.business_email : '-'}</p>
          </div>
          <div className="flex items-center gap-3">
            <FaLocationDot color="#0D6EFD" size={22} />
            <p className="text-black font-medium">{profileInfo?.data?.address ? profileInfo?.data?.address : '-'}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopBanner;
