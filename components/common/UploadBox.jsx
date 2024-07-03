"use client";

import { useRef } from "react";
import { UploadIconSVG } from "../icons/Icons";

const UploadBox = ({ text, docUploadHandler , item}) => {
  const fileRef = useRef();

  return (
    <div className="w-[232px] h-[112px] box-border border border-[#CCE4F0] flex flex-col justify-center items-center rounded-lg">
      <button onClick={(e) => {
        e.preventDefault()
        fileRef.current.click()
      }}>
        <UploadIconSVG />
      </button>
      <input onChange={(e) =>{
        e.preventDefault()
         docUploadHandler(e.target.files[0], item)
      }} ref={fileRef} type="file" hidden accept="image/*" />
      <p className="mt-1 text-primary-700">{text}</p>
    </div>
  );
};

export default UploadBox;
