import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import { BusinessBagSVG, EmailSVG, PhoneSVG, StarSVG } from "../icons/icons";

const profileOptions = [
  {
    key: "Profile",
    value: "profile",
  },
  {
    key: "Verify Shops",
    value: "verify_shops",
  },
  {
    key: "Reviews",
    value: "reviews",
  },
];

const ShopInfo = () => {
  return (
    <div className="mb-8">
      <div className="px-8 py-10 bg-primary-50 rounded-xl flex gap-8">
        <div className="h-44 w-44 rounded-lg">
          <Image
            src="/toyota.png"
            width={176}
            height={176}
            alt="toyota"
            className="h-full w-full rounded-xl bg-slate-50"
          />
        </div>
        <div>
          <div className="flex justify-center gap-3 mb-4">
            <p className="text-primary-900 text-[22] font-medium">
              Toyota Car Technology Ltd.
            </p>
            <RiVerifiedBadgeFill color="#49ADF4" size={20} />
          </div>
          <div className="text-black flex items-center gap-3">
            <BusinessBagSVG />
            <p>Accessories Seller</p>
          </div>
          <div className="flex mt-6 gap-2.5">
            <div className="px-7 py-4 rounded-lg bg-white">
              <p className="flex flex-row-reverse items-center gap-2 mb-2 text-primary-950 font-bold">
                01603250609 <PhoneSVG />
              </p>
              <p>Phone Number</p>
            </div>
            <div className="px-7 py-4 rounded-lg bg-white">
              <p className="flex flex-row-reverse items-center gap-2 mb-2 text-primary-950 font-bold">
                seller1234@gmail.com <EmailSVG />
              </p>
              <p>Email Address</p>
            </div>
            <div className="px-7 py-4 rounded-lg bg-white">
              <p className="flex flex-row-reverse items-center gap-2 mb-2 text-primary-950 font-bold">
                4/5 (300 Reviews ) <StarSVG />
              </p>
              <p>Ratings & Reviews</p>
            </div>
          </div>
        </div>
      </div>
      <Tabs defaultValue="profile">
        <TabsList className="gap-12 mt-[60px] font-bold text-primary-950 p-0">
          {profileOptions.map((option) => (
            <TabsTrigger
              key={option.value}
              className="text-lg pb-0 data-[state=active]:bg-white data-[state=active]:text-primary-950 data-[state=active]:border-b-4 data-[state=active]:border-primary-900 hover:border-b-4 hover:border-primary-900 w-[132px]"
              value={option.value}
            >
              <span className="py-4">{option.key}</span>
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </div>
  );
};

export default ShopInfo;
