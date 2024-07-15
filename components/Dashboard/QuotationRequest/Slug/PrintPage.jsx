import { formatTimestamp } from "@/utils/utils";
import Image from "next/image";
import React from "react";

const marginTop = "20mm";
const marginRight = "15mm";
const marginBottom = "10mm";
const marginLeft = "15mm";

const getPageMargins = () => {
  return `@page { margin: ${marginTop} ${marginRight} ${marginBottom} ${marginLeft} !important; }`;
};

const PrintPage = React.forwardRef(({ data }, ref) => {
  return (
    <div ref={ref} className="w-full border border-slate-300 rounded-2xl mb-20">
      <style>{getPageMargins()}</style>
      <div className="h-[204px] flex border-b border-slate-200 border-dashed">
        <div className="w-1/2 border-r border-slate-300 pl-[60px] pt-10">
          <h1 className="text-xl font-bold text-black">Summary</h1>
          <div className="mt-3 space-y-3">
            <p>Order number: {data?.id}</p>
            <p>Order time: {formatTimestamp(data?.created)}</p>
          </div>
        </div>
        <div className="w-1/2  pl-[60px] pt-10">
          <h1 className="text-xl font-bold text-black">Customer</h1>
          <div className="mt-3 space-y-3">
            <p>Name: {data?.visitor_name}</p>
            <p>Mobile: {data?.visitor_phone}</p>
            <p>Email: {data?.visitor_email}</p>
          </div>
        </div>
      </div>
      <div className="pl-[60px] pr-[30px] py-8 border-b border-slate-300 border-dashed">
        <div className="bg-primary-50 p-4 rounded-2xl flex items-center justify-between text-black font-bold">
          <p>ITEM</p>
          <p>OTY</p>
        </div>
        <div className="flex justify-between px-4 py-6">
          <div className="flex gap-3">
            <div className="rounded-xl border border-slate-300 shadow-custom-shadow h-16 w-16 relative">
              <Image
                fill
                src={"/item-pic.png"}
                alt="reviewed_product_img"
                className="rounded-xl"
              />
            </div>
            <h1 className="text-lg font-bold text-black">
              {data?.product_name}
            </h1>
          </div>
          <div>
            <p className="text-lg font-bold text-black">
              {data?.product_quantity} Pieces
            </p>
          </div>
        </div>
      </div>
      <div className="pl-[60px] pr-[30px] border-b border-slate-300 border-dashed">
        <div className="mt-10">
          <h1 className="text-lg text-black font-bold">Customer Review</h1>
          <h1 className="mt-10 text-[22px] text-primary-900">
            Hey {data?.supplier_shop},
          </h1>
          <p className=" mt-6 text-lg text-black mb-2">{data?.request_note}</p>
        </div>
        <div className="mt-10 mb-10">
          <h1 className="text-lg text-black font-bold">Seller Response</h1>

          <p className="mt-6 text-lg text-black mb-2">{data?.reply_text}</p>
        </div>
      </div>
    </div>
  );
});

PrintPage.displayName = "PrintPage";

export default PrintPage;
