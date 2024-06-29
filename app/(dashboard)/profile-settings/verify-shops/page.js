import DocumentUploadBox from "@/components/Dashboard/VerifyShops/DocumentUploadBox";
import { UploadLogoSVG } from "@/components/icons/Icons";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";

const VerifyShops = () => {
  return (
    <form className="mb-20 max-w-[732px]">
      <div className=" min-h-screen rounded-2xl border border-slate-200">
        <div className="flex items-center gap-3 p-6">
          <UploadLogoSVG />
          <h1 className="text-lg font-bold text-black">
            Upload & Verify Documents
          </h1>
        </div>
        <hr className="border border-slate-200" />
        <DocumentUploadBox />
        <DocumentUploadBox />
        <DocumentUploadBox />
        <DocumentUploadBox />
        <DocumentUploadBox />
        <DocumentUploadBox />
        <div className="p-6 mt-10 flex gap-2 items-center">
          <Checkbox className="border border-black" />
          <p>
            I agree to the{" "}
            <Link href={"#"} className="text-primary-900 underline mr-2">
              Terms & Conditions
            </Link>
            and{" "}
            <Link href={"#"} className="text-[#219F0C] underline ml-2">
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Button className="text-xl px-6 bg-white text-primary-900 border border-primary-900">
          Reset
        </Button>
        <Button className="text-xl px-6">Request For Verification</Button>
      </div>
    </form>
  );
};

export default VerifyShops;
