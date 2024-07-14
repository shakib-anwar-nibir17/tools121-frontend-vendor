"use client";
import { Checkbox } from "@/components/ui/checkbox";
import Image from "next/image";
import { useState } from "react";
import { GrEmoji } from "react-icons/gr";
import { LiaEdit } from "react-icons/lia";

const CustomerReviewBox = ({ review }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="mb-6">
      <div className="grid grid-cols-12 w-full gap-14">
        <div className=" col-span-4 flex gap-3">
          <Checkbox className="w-4 h-4 border border-black rounded-md" />
          <div className="w-12 h-12">
            <Image
              width={48}
              height={48}
              alt="user_avatar"
              src={"/item-pic2.png"}
            />
          </div>
          <p className="text-black font-bold">
            RIG-BS-6025RF Research Upright Metallurgical Microscope
          </p>
        </div>
        {/* user review and reply options */}
        <div className=" col-span-4 pl-6">
          <p className="text-justify">{review.review}</p>
          <div className="flex gap-2 mt-4">
            <button>Approve</button>
            <span>|</span>
            <button
              onClick={() => setOpen(!open)}
              className={`${open ? "text-slate-200" : "text-primary-900"}`}
            >
              Reply
            </button>
            <span>|</span>
            <button className="text-[#FF1E7C]">Spam</button>
            <span>|</span>
            <button className="text-[#FF1E7C]">Trash</button>
          </div>
          {/* reply box */}
          {open && (
            <div className="mt-6">
              <div className="h-14 border border-slate-200 rounded-lg flex justify-between px-4 py-1">
                <textarea
                  type="text"
                  className="w-full h-full border-none focus:outline-none text-sm"
                  defaultValue={"Thanks for your valuable review"}
                />
                <LiaEdit />
              </div>
              <div className="flex justify-end gap-6 mt-3">
                <div className="flex items-center gap-2">
                  <GrEmoji className="mt-1" />
                  <span>|</span>
                </div>
                <button>Cancel</button>
                <button className="bg-gray-200 rounded-2xl px-3 py-0.5">
                  Reply
                </button>
              </div>
            </div>
          )}
        </div>
        {/* user name & email */}
        <div className=" col-span-4">
          <div className="flex gap-2">
            <div className="w-10 h-10 rounded-full">
              <Image
                width={40}
                height={40}
                className="rounded-full"
                alt="user_avatar"
                src={"/avatar.png"}
              />
            </div>
            <div>
              <p className="text-black">Bryane Crape</p>
              <p className="text-[14px] text-primary-900">
                branecrape@gmail.com
              </p>
            </div>
          </div>
        </div>
      </div>
      <hr className="border-[2px] border-slate-200 px-6 mt-8" />
    </div>
  );
};

export default CustomerReviewBox;
