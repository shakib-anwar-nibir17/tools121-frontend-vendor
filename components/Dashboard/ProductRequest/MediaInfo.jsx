"use client";
import { NewUploadSVGIcon } from "@/components/icons/Icons";
import { useRef } from "react";
const MediaInfo = ({setProdImg, imgErr, prodImg, preview, fileDrop}) => {
  const fileRef = useRef();

  
  // dragging image
  const dragOver = (e) => {
    e.preventDefault();
  };

  const dragEnter = (e) => {
    e.preventDefault();
  };

  const dragLeave = (e) => {
    e.preventDefault();
  };

  return (
    <div className="p-6 border border-slate-300 rounded-lg mt-6">
      <h1 className="text-lg text-black">Media</h1>
      <div className="mt-[14px]">
        <label>Photo</label>
        <div  
        draggable={true}
        onDragOver={dragOver}
        onDragEnter={dragEnter}
        onDragLeave={dragLeave}
        onDrop={fileDrop}
        // onClick={() => setErrMsg(null)}
         className="box-border border border-slate-300 border-dashed flex flex-col justify-center items-center rounded-lg p-6 mt-3">
          <input onChange={(e) => setProdImg(e.target.files[0])} ref={fileRef} type="file" hidden accept="image/*" />
          {
            preview ? <img className="w-[150px] h-[150px]" src={preview} alt="" /> : <NewUploadSVGIcon />
          }
          <p className="mt-4">Drag and drop image here, or click add image</p>
          <p
            className="mt-4 bg-primary-200 text-black px-3.5 py-2.5 rounded-lg cursor-pointer"
            onClick={() => fileRef.current.click()}
          >
            Add Image
          </p>
        </div>
      </div>
      {(imgErr && !prodImg) && (
            <div className="text-red-500">{imgErr}</div>
          )}
    </div>
  );
};

export default MediaInfo;
