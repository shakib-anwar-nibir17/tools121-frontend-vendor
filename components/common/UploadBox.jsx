// "use client";

// import { useRef } from "react";
// import { UploadIconSVG } from "../icons/Icons";

// const UploadBox = ({ text, docUploadHandler , item}) => {
//   const fileRef = useRef();

//   return (
//     <div className="w-[232px] h-[112px] box-border border border-[#CCE4F0] flex flex-col justify-center items-center rounded-lg">
//       <button onClick={(e) => {
//         e.preventDefault()
//         fileRef.current.click()
//       }}>
//         <UploadIconSVG />
//       </button>
//       <input onChange={(e) =>{
//         e.preventDefault()
//          docUploadHandler(e.target.files[0], item)
//       }} ref={fileRef} type="file" hidden  />
//       <p className="mt-1 text-primary-700">{text}</p>
//     </div>
//   );
// };

// export default UploadBox;

"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { UploadIconSVG } from "../icons/Icons";

// Validation schema
const schema = yup.object().shape({
  file: yup
    .mixed()
    .required("File is required")
    .test(
      "fileType",
      "Unsupported File Format",
      (value) =>
        value &&
        (value.type === "application/pdf" || value.type === "image/jpeg")
    )
    .test(
      "fileSize",
      "File size is too large",
      (value) => value && value.size <= 2000000 // 2MB
    ),
});

const UploadBox = ({ text, docUploadHandler, item }) => {
  const fileRef = useRef();
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    docUploadHandler(data.file, item);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="w-[232px] h-[112px] box-border border border-[#CCE4F0] flex flex-col justify-center items-center rounded-lg">
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            fileRef.current.click();
          }}
        >
          <UploadIconSVG />
        </button>
        <Controller
          name="file"
          control={control}
          render={({ field: { onChange, ref } }) => (
            <input
              ref={(e) => {
                ref(e);
                fileRef.current = e;
              }}
              type="file"
              hidden
              onChange={(e) => {
                onChange(e.target.files[0]);
                setValue("file", e.target.files[0]); // Use setValue to update the file
                handleSubmit(onSubmit)();
              }}
            />
          )}
        />
        <p className="mt-1 text-primary-700">{text}</p>
      </div>
      {errors.file && <p className="text-red-500">{errors.file.message}</p>}
    </form>
  );
};

export default UploadBox;
