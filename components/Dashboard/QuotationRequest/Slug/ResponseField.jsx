/* eslint-disable no-empty-pattern */
/* eslint-disable no-unused-vars */
"use client";

import { useSingleQuotationReplyMutation } from "@/app/redux/features/supplierQuotation";
import Loader from "@/components/common/Loader";
import { OnlineOrderSVG } from "@/components/icons/Icons";
import { Button } from "@/components/ui/button";
import { formatTimestamp } from "@/utils/utils";
import Image from "next/image";
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { FaEdit } from "react-icons/fa";
import { FiDownload } from "react-icons/fi";
import { GrEmoji } from "react-icons/gr";
import { SlPaperClip } from "react-icons/sl";
import { useReactToPrint } from "react-to-print";
import PrintPage from "./PrintPage";

const ResponseField = ({ data, token, params, triggerSingleQuotation , quotationActionSubmit}) => {
  const [singleQuotationReply, {}] = useSingleQuotationReplyMutation();
  console.log(data);
  const [loading, setLoading] = useState(false);
  const [response1, setResponse1] = useState("");

  const handleChange = (event) => {
    setResponse1(event.target.value);
  };

  const componentRef = useRef();
  const handleSubmit = async (e) => {
    setLoading(true);

    const textareaValue = response1;
    const request_Obj = {
      quotation_id: data?.id,
      reply_txt: textareaValue,
    };

    const response = await singleQuotationReply(request_Obj);
    console.log("quotation reply response =====>", response);
    if (response?.data?.message == "Request success") {
      setLoading(false);
      triggerSingleQuotation({ id: params?.id, token: token });
      quotationActionSubmit(0)
      toast.success("Reply sent Successfully", {
        position: "top-right",
        duration: 3000,
      });
    } else {
      setLoading(false);
      toast.error("Reply sent failed", {
        position: "top-right",
        duration: 3000,
      });
    }
  };

  const handlePrint = useReactToPrint({
    documentTitle: "Print The Document",
    content: () => componentRef.current,
  });
  return (
    <>
      <div className="w-full border border-slate-300 rounded-2xl mb-20">
        <div className="flex px-7 py-6 justify-between items-center text-black border-b border-slate-300">
          <div className="flex items-center gap-3">
            <OnlineOrderSVG />
            <h1 className="text-lg">Quotation Request</h1>
          </div>
          <div className="cursor-pointer" onClick={handlePrint}>
            <FiDownload size={20} />
          </div>
        </div>
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
                  src={data?.product_img_ref}
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
            <p className=" mt-6 text-lg text-black mb-2">
              {data?.request_note}
            </p>
          </div>
          {data?.is_replied && (
            <div className="mt-10 mb-10">
              <h1 className="text-lg text-black font-bold">Seller Response</h1>

              <p className="mt-6 text-lg text-black mb-2">{data?.reply_text}</p>
            </div>
          )}
        </div>
        {!data?.is_replied ? (
          <div className="px-[60px] py-8">
            <div className="mt-[72px]">
              <div className="bg-primary-50 h-[146px] rounded-2xl w-full">
                <textarea
                  className="h-[70%] bg-transparent focus:outline-none w-full p-4 relative"
                  placeholder="Type your response here..."
                  name="response"
                  value={response1}
                  onChange={handleChange}
                />
                <div className="flex items-center justify-end gap-2 px-4">
                  <GrEmoji />
                  <span>|</span>
                  <SlPaperClip />
                  <span>|</span>
                  <FaEdit />
                </div>
              </div>
              {response1.length < 20 && (
                <p className="text-red-500 px-2 mt-2">
                  You reply must have at least 20 characters{" "}
                </p>
              )}
              <div className="flex gap-4 mt-6 mb-5 justify-end">
                <Button className="text-xl px-8 py-2.5 bg-white text-primary-900 border border-primary-900">
                  Cancel
                </Button>
                <Button
                  disabled={response1.length < 20}
                  onClick={handleSubmit}
                  className="text-xl px-8 py-2.5"
                >
                  {loading ? (
                    <Loader height="20" width="20" />
                  ) : (
                    "Quick Response"
                  )}
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="my-10 flex justify-end px-6">
            <Button>Contact Seller</Button>
          </div>
        )}
      </div>
      <div className="hidden">
        <PrintPage data={data} ref={componentRef} />
      </div>
    </>
  );
};

export default ResponseField;
