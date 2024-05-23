"use client";
import { CrossSVG, GallerySVG, ShopSVG } from "@/components/icons/icons";

import ShopInfoForm from "@/components/vendor/ShopInfoForm";
import Image from "next/image";
import { useRef } from "react";

const ProfileContent = () => {
  const logoRef = useRef(null);
  const bannerRef = useRef(null);
  return (
    <>
      <div className="h-[418px] border border-slate-200 w-full rounded-xl shadow-md">
        <h1 className="flex items-center px-6 py-6 gap-3 border-b border-b-slate-200">
          <ShopSVG />
          <span className="text-lg text-primary-950 font-bold">
            Update Logo & Banner
          </span>
        </h1>
        {/* logo upload */}
        <div className="flex items-center">
          <div className="h-28 w-60 border border-[#CCE4F0] mx-6 mt-9 rounded-xl">
            <input ref={logoRef} type="file" hidden accept="image/*" />
            <div className="flex flex-col justify-center items-center py-4">
              <button
                onClick={() => logoRef.current.click()}
                className="p-4 rounded-full border border-slate-200"
              >
                <GallerySVG />
              </button>
              <p className="text-primary-750 font-medium py-1">Upload Logo</p>
            </div>
          </div>
          <div className="relative border border-slate-200 rounded-lg mt-8">
            <Image src="/tesla.png" width={97} height={97} alt="logo" />
            <div className="absolute -right-3 -top-4 hover:cursor-pointer">
              <CrossSVG />
            </div>
          </div>
        </div>
        {/* Banner upload */}
        <div className="flex items-center">
          <div className="h-28 w-60 border border-[#CCE4F0] mx-6 my-9 rounded-xl">
            <input ref={bannerRef} type="file" hidden accept="image/*" />
            <div className="flex flex-col justify-center items-center py-4">
              <button
                onClick={() => bannerRef.current.click()}
                className="p-4 rounded-full border border-slate-200"
              >
                <GallerySVG />
              </button>
              <p className="text-primary-750 font-medium py-1">Upload Logo</p>
            </div>
          </div>
          <div className="relative border border-slate-200 rounded-lg">
            <Image
              src="/vendor-banner.png"
              width={422}
              height={110}
              alt="logo"
            />
            <div className="absolute -right-3 -top-4 hover:cursor-pointer">
              <CrossSVG />
            </div>
          </div>
        </div>
      </div>
      <div className="border border-slate-200 w-full rounded-xl shadow-md mt-8">
        <h1 className="flex items-center px-6 py-6 gap-3 border-b border-b-slate-200">
          <ShopSVG />
          <span className="text-lg text-primary-950 font-bold">
            Shop Information
          </span>
        </h1>
        <div>
          <ShopInfoForm />
        </div>
      </div>
    </>
  );
};

export default ProfileContent;
