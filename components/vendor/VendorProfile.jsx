import { EarningSVG } from "@/components/icons/icons";
import Image from "next/image";
import { HiBadgeCheck } from "react-icons/hi";
import { IoIosStar } from "react-icons/io";
import { MdOutlineBusinessCenter, MdOutlineShoppingBag } from "react-icons/md";

const VendorProfile = () => {
  return (
    <>
      <div className="flex w-full gap-8">
        <div className="h-44 w-44">
          <Image
            src="/toyota.png"
            width={176}
            height={176}
            alt="toyota"
            className="h-full w-full rounded-xl bg-slate-50"
          />
        </div>
        <div className="w-full h-44">
          <h2 className="flex items-center text-[22px] font-medium text-primary-950">
            Lingdu Car Technology Ltd.{" "}
            <span className="text-primary-900">
              <HiBadgeCheck />
            </span>
          </h2>
          <p className="flex items-center my-4 gap-3">
            <span>
              <MdOutlineBusinessCenter className="text-2xl" />
            </span>
            Accessories Seller
          </p>
          <div className="flex gap-3">
            <div className="w-36 h-20 border border-slate-200 rounded-lg py-3 px-4">
              <p className="flex items-center gap-3">
                <EarningSVG />
                <span className="text-xl font-medium text-primary-950">
                  $4500
                </span>
              </p>
              <p>Earnings</p>
            </div>
            <div className="w-36 h-20 border border-slate-200 rounded-lg py-3 px-4">
              <p className="flex items-center gap-3">
                <MdOutlineShoppingBag className="text-red-500 text-2xl" />
                <span className="text-xl font-medium text-primary-950">
                  720
                </span>
              </p>
              <p>Orders served</p>
            </div>
            <div className="w-36 h-20 border border-slate-200 rounded-lg py-3 px-6">
              <p className="flex items-center gap-3">
                <IoIosStar className="text-primary-100 text-2xl" />
                <span className="text-xl font-medium text-primary-950">
                  4.5/5
                </span>
              </p>
              <p>Earnings</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default VendorProfile;
