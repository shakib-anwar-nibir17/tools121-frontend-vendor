"use client";
import { useLazySingleQuotationListQuery, useQuotationActionMutation } from "@/app/redux/features/supplierQuotation";
import ResponseField from "@/components/Dashboard/QuotationRequest/Slug/ResponseField";
import HeaderLinkWrapper2 from "@/components/common/HeaderLinkWrapper2";
import Loader from "@/components/common/Loader";
import Link from "next/link";
import { useEffect } from "react";

const QuotationResponsePage = ({ params }) => {
  const token = localStorage.getItem("vendorToken");
  const [triggerSingleQuotation, { data: singleQuotationList, isFetching }] =
    useLazySingleQuotationListQuery();
    const [quotationActionHandler, {}] = useQuotationActionMutation();

    const quotationActionSubmit = async() => {
      const request_obj ={
        actions: [
          {
            "action_type": 100,
            "quotation_id": params?.id
          }
        ]
      }
      
      const actionRes = await quotationActionHandler(request_obj)
      
    }
  useEffect(() => {
    if (params?.id) {
      triggerSingleQuotation({ id: params?.id, token: token });
      quotationActionSubmit()
    }
  }, [params?.id, token, triggerSingleQuotation]);
  
  return (
    <main>
      <HeaderLinkWrapper2 />
      <div className="max-w-[877px]">
        <div className="flex justify-end mb-6 ">
          <Link
            href={"/quotation-request/all-request"}
            className="text-primary-900"
          >
            Back
          </Link>
        </div>
        {isFetching ? (
          <div className="flex justify-center items-center w-full h-screen">
            <Loader />
          </div>
        ) : (
          <ResponseField
            data={singleQuotationList?.data?.quotation}
            params={params}
            triggerSingleQuotation={triggerSingleQuotation}
            token={token}
          />
        )}
      </div>
    </main>
  );
};

export default QuotationResponsePage;
