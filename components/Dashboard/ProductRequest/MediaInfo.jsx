"use client";
import { NewUploadSVGIcon } from "@/components/icons/Icons";
import { useRef } from "react";
const MediaInfo = () => {
  const fileRef = useRef();
  return (
    <div className="p-6 border border-slate-300 rounded-lg mt-6">
      <h1 className="text-lg text-black">Media</h1>
      <div className="mt-[14px]">
        <label>Photo</label>
        <div className="box-border border border-slate-300 border-dashed flex flex-col justify-center items-center rounded-lg p-6 mt-3">
          <input ref={fileRef} type="file" hidden accept="image/*" />
          <NewUploadSVGIcon />
          <p className="mt-4">Drag and drop image here, or click add image</p>
          <button
            className="mt-4 bg-primary-200 text-black px-3.5 py-2.5 rounded-lg"
            onClick={() => fileRef.current.click()}
          >
            Add Image
          </button>
        </div>
      </div>
    </div>
  );
};

export default MediaInfo;
