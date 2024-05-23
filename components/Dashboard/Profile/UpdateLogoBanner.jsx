import UploadBox from "@/components/common/UploadBox";
import { CrossSVG, UploadLogoSVG } from "@/components/icons/icons";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const UpdateLogoBanner = () => {
  return (
    <form>
      <div className="border border-slate-200 rounded-2xl h-[418px]">
        <div className="p-4 border-b">
          <p className="flex items-center gap-2 text-lg text-primary-950 font-bold">
            <UploadLogoSVG /> Update Logo & Banner
          </p>
        </div>
        {/* upload logo and banner */}
        <div className="px-6 py-9">
          <div className="flex gap-6">
            <UploadBox text="Upload Logo" />
            <div className="relative">
              <Image
                width={99}
                height={112}
                src={"/shop-logo.png"}
                alt="shop-logo"
              />
              <CrossSVG className="absolute -right-3 -top-2" />
            </div>
          </div>
          <div className="flex gap-6 mt-11">
            <UploadBox text="Upload Banner" />
            <div className="relative">
              <Image
                width={324}
                height={112}
                src={"/shop-banner.png"}
                alt="shop-banner"
              />
              <CrossSVG className="absolute -right-3 -top-2" />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Button className="text-xl px-6 bg-white text-primary-900 border border-primary-900">
          Reset
        </Button>
        <Button className="text-xl px-6">Save</Button>
      </div>
    </form>
  );
};

export default UpdateLogoBanner;
