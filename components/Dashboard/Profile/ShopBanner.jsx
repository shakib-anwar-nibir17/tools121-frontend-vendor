import RatingComponent from "@/components/common/RatingComponent";
import { BusinessBagSVG, EmailSVG, PhoneSVG } from "@/components/icons/Icons";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { FaLocationDot } from "react-icons/fa6";
import { MdOutlineModeEditOutline, MdVerified } from "react-icons/md";
import profile from "../../../public/profile_pic.png";
import banner from "../../../public/shopbanner.png";

const ShopBanner = () => {
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
            Tesla Car Technology Ltd.
          </h1>
          <MdVerified color="#49ADF4" size={20} />
        </div>
        <div className="text-lg flex items-center gap-3 mt-3">
          <RatingComponent rating={4} size={20} />
          <span>|</span>
          <p>15,308 Total Ratings</p>
          <span>|</span>
          <p>105 Reviews</p>
        </div>
        <div className="flex items-center gap-3 mt-3">
          <BusinessBagSVG />
          <p>
            Maintenance and Repair; Packaging and Shipping; Plumbing and Pipe
            Fittings; Instrumentation and Control
          </p>
        </div>
        <div className="mt-3 flex items-center gap-4">
          <div className="flex items-center gap-3">
            <PhoneSVG />
            <p className="text-black font-medium">01603250609</p>
          </div>
          <div className="flex items-center gap-3">
            <EmailSVG />
            <p className="text-black font-medium">seller1234@gmail.com</p>
          </div>
          <div className="flex items-center gap-3">
            <FaLocationDot color="#0D6EFD" size={22} />
            <p className="text-black font-medium">01603250609</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopBanner;
