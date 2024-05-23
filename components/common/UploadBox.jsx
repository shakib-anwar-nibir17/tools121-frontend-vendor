"use client";

import { useRef } from "react";
import { UploadIconSVG } from "../icons/icons";

const UploadBox = ({ text }) => {
  const fileRef = useRef();
  return (
    <div className="w-[232px] h-[112px] box-border border border-[#CCE4F0] flex flex-col justify-center items-center rounded-lg">
      <button onClick={() => fileRef.current.click()}>
        <UploadIconSVG />
      </button>
      <input ref={fileRef} type="file" hidden accept="image/*" />
      <p className="mt-1 text-primary-700">{text}</p>
    </div>
  );
};

export default UploadBox;
