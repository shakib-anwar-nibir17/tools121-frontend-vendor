/* eslint-disable no-empty-pattern */
/* eslint-disable no-unused-vars */
"use client";
import {
  useDeleteUserDocsMutation,
  useRequestDocVerificationMutation,
  useResetUserDocsMutation,
  useUploadDocMutation,
  useUserDocListQuery,
} from "@/app/redux/features/userInfo";
import DocumentUploadBox from "@/components/Dashboard/VerifyShops/DocumentUploadBox";
import { UploadLogoSVG } from "@/components/icons/Icons";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";

const VerifyShops = () => {
  const token = localStorage.getItem("vendorToken");
  const [deleteId, setDeleteId] = useState("");
  const { data: userDocList, refetch } = useUserDocListQuery(token, {
    refetchOnMountOrArgChange: true,
  });
  const [uploadDoc, {}] = useUploadDocMutation();
  const [requestDocVerification, {}] = useRequestDocVerificationMutation();
  const [deleteUserDocs, {}] = useDeleteUserDocsMutation();
  const [resetUserDocs, {}] = useResetUserDocsMutation();

  // document upload function
  const docUploadHandler = async (docData, item) => {
    console.log("params ==>", docData, item);

    const forms = new FormData();

    forms.append("doc_type_id", item?.document_type_id);
    forms.append("file", docData);

    const docRes = await uploadDoc({ forms: forms, token: token });

    if (docRes?.data?.message == "Supplier document upload successful") {
      refetch();
      toast.success("Document uploaded Successfully", {
        position: "top-right",
        duration: 2000,
      });
    } else {
      toast.error("Document uploaded Failed", {
        position: "top-right",
        duration: 2000,
      });
    }
    console.log("docRes ==>", docRes);
  };
  
  console.log("userdoc list ==>", userDocList?.data?.documents);

  // document delete function
  const docDeleteHandler = async (document_id) => {
    setDeleteId(document_id);
    const delete_res = await deleteUserDocs({ document_id, token });

    if (delete_res?.data?.message == "Request success") {
      setDeleteId("");
      refetch();
      toast.success("Your Document Deleted Successfully", {
        position: "top-right",
        duration: 2000,
      });
    } else {
      setDeleteId("");
      toast.error("Your Document Deleted Failed", {
        position: "top-right",
        duration: 2000,
      });
    }

    console.log("User doc delete response ===>", delete_res);
  };
  // document reset function

  const docsResetHandler = async () => {
    const reset_res = await resetUserDocs({ token });

    if (reset_res?.data?.message == "Request success") {
      setDeleteId("");
      refetch();
      toast.success("Your Documents Reset Successfully", {
        position: "top-right",
        duration: 2000,
      });
    } else {
      setDeleteId("");
      toast.error("Your Documents Reset Failed", {
        position: "top-right",
        duration: 2000,
      });
    }
    console.log("User doc reset response ===>", reset_res);
  };

  // request verification function
  const requestVerification = async () => {
    const verify_res = await requestDocVerification(token);

    console.log("Verify res ==>", verify_res);
    if (verify_res?.data?.message == "Request success") {
      toast.success("Verify Request Sent Successfully", {
        position: "top-right",
        duration: 2000,
      });
    } else {
      toast.error("Verify Request Sent Failed Try-Again", {
        position: "top-right",
        duration: 2000,
      });
    }
  };

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
        {userDocList?.data?.documents?.map((item) => (
          <DocumentUploadBox
            key={item?.document_type_id}
            docUploadHandler={docUploadHandler}
            docDeleteHandler={docDeleteHandler}
            item={item}
          />
        ))}
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
        {/* <Button
          onClick={() => docsResetHandler()}
          className="text-xl px-6 bg-white text-primary-900 border border-primary-900"
        >
          Reset
        </Button> */}
        <Button onClick={() => requestVerification()} className="text-xl px-6">
          Request For Verification
        </Button>
      </div>
    </div>
  );
};

export default VerifyShops;
