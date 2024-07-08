"use client"
import { useRequestDocVerificationMutation, useUploadDocMutation, useUserDocListQuery } from "@/app/redux/features/userInfo";
import DocumentUploadBox from "@/components/Dashboard/VerifyShops/DocumentUploadBox";
import { UploadLogoSVG } from "@/components/icons/Icons";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import toast from "react-hot-toast";

const VerifyShops = () => {
  const token = localStorage.getItem("vendorToken");
  const { data: userDocList, refetch } = useUserDocListQuery(token, {
    refetchOnMountOrArgChange: true,
  });
  const [uploadDoc, {}] = useUploadDocMutation();
  const [requestDocVerification, {}] = useRequestDocVerificationMutation();

  const docUploadHandler = async (docData, item) => {
  console.log("params ==>", docData, item)

    const forms = new FormData()
    
    forms.append("doc_type_id", item?.document_type_id)
    forms.append("file", docData)

    const docRes = await uploadDoc({forms: forms,token: token})

    if(docRes?.data?.message == "Supplier document upload successful"){
      toast.success("Document uploaded Successfully", {
        position: "top-right",
        duration: 2000,
      });
    }
    else{
      toast.error("Document uploaded Failed", {
        position: "top-right",
        duration: 2000,
      });
    }
    console.log("docRes ==>", docRes)
  }
  console.log("userdoc list ==>", userDocList?.data?.documents)

  const requestVerification = async() => {
    const verify_res = await requestDocVerification(token)

    console.log('Verify res ==>', verify_res)
    if(verify_res?.data?.message == "Request success"){
      toast.success("Verify Request Sent Successfully", {
        position: "top-right",
        duration: 2000,
      });
    }
    else{
      toast.error("Verify Request Sent Failed Try-Again", {
        position: "top-right",
        duration: 2000,
      });
    }
   
  }
  return (
    <div className="mb-20 max-w-[732px]">
      <div className=" min-h-screen rounded-2xl border border-slate-200">
        <div className="flex items-center gap-3 p-6">
          <UploadLogoSVG />
          <h1 className="text-lg font-bold text-black">
            Upload & Verify Documents
          </h1>
        </div>
        <hr className="border border-slate-200" />
          {
            userDocList?.data?.documents?.map((item) => (
              <DocumentUploadBox docUploadHandler={docUploadHandler} item={item} />
            ))
          }
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
        <Button onClick={() => requestVerification()} className="text-xl px-6">Request For Verification</Button>
      </div>
    </div>
  );
};

export default VerifyShops;
