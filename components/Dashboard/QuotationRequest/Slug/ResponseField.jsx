"use client";

import { OnlineOrderSVG } from "@/components/icons/Icons";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRef, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { FiDownload } from "react-icons/fi";
import { GrEmoji } from "react-icons/gr";
import { SlPaperClip } from "react-icons/sl";
import { useReactToPrint } from "react-to-print";
import PrintPage from "./PrintPage";

const ResponseField = () => {
  const [value, setValue] = useState([]);
  const componentRef = useRef();
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const textareaValue = form.elements.response.value;
    setValue((prevResponses) => [...prevResponses, textareaValue]);
    form.reset();
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
              <p>Order number: t6ny-2419-cz93</p>
              <p>Order time: 05-19-2024 19:27:30</p>
            </div>
          </div>
          <div className="w-1/2  pl-[60px] pt-10">
            <h1 className="text-xl font-bold text-black">Customer</h1>
            <div className="mt-3 space-y-3">
              <p>Name: Bryane Crape</p>
              <p>Mobile: 01617380400</p>
              <p>Email: bryanecrape@gmail.com</p>
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
                RIG-BS-6025RF Research Upright Metallurgical Microscope
              </h1>
            </div>
            <div>
              <p className="text-lg font-bold text-black">500 Pieces</p>
            </div>
          </div>
        </div>
        <div className="pl-[60px] pr-[30px] border-b border-slate-300 border-dashed">
          <div className="mt-10">
            <h1 className="text-lg text-black font-bold">Customer Review</h1>
            <h1 className="mt-10 text-[22px] text-primary-900">
              Hey Tyota Car Technology Ltd,
            </h1>
            <p className=" mt-6 text-lg text-black mb-2">
              Hello, Please send these products within 15 days. We need these
              urgently. Please contact me at your preferred contact method and
              details, such as your phone number or email address. We appreciate
              your services and look forward to your continued partnership.
            </p>
          </div>
          {value.length > 0 && (
            <div className="mt-10 mb-10">
              <h1 className="text-lg text-black font-bold">Seller Response</h1>
              {value.map((response, idx) => (
                <p key={idx} className="mt-6 text-lg text-black mb-2">
                  {response}
                </p>
              ))}
            </div>
          )}
        </div>
        <div className="px-[60px] py-8">
          <form onSubmit={handleSubmit} className="mt-[72px]">
            <div className="bg-primary-50 h-[146px] rounded-2xl w-full">
              <textarea
                className="h-[70%] bg-transparent focus:outline-none w-full p-4 relative"
                placeholder="Type your response here..."
                name="response"
              />
              <div className="flex items-center justify-end gap-2 px-4">
                <GrEmoji />
                <span>|</span>
                <SlPaperClip />
                <span>|</span>
                <FaEdit />
              </div>
            </div>
            <div className="flex gap-4 mt-6 mb-5 justify-end">
              <Button className="text-xl px-8 py-2.5 bg-white text-primary-900 border border-primary-900">
                Cancel
              </Button>
              <Button type="submit" className="text-xl px-8 py-2.5">
                Response
              </Button>
            </div>
          </form>
        </div>
      </div>
      <div className="hidden">
        <PrintPage value={value} ref={componentRef} />
      </div>
    </>
  );
};

export default ResponseField;
