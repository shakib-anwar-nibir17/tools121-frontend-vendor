import UploadBox from "@/components/common/UploadBox";
import { DocumentSVGIcon } from "@/components/icons/Icons";
import { RiVerifiedBadgeLine } from "react-icons/ri";
import { RxCrossCircled } from "react-icons/rx";
const DocumentUploadBox = () => {
  return (
    <div className="pt-8 px-6 pb-4 border-b border-slate-200">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-black font-bold">
            Document Name: Trade License (Mandatory)
          </h1>

          <p className="mt-2 text-sm">
            Note: Please upload the pdf or jpeg version of your trade license.
            Max. file size 2mb/file
          </p>
        </div>
        <RiVerifiedBadgeLine size={22} color="#0D6EFD" />
      </div>
      {/* upload Box */}
      <div className="mt-4">
        <UploadBox text={"Click here to upload"} />
      </div>
      {/* file option */}
      <div className="mt-6 w-[292px] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <DocumentSVGIcon />
          <div>
            <h1 className="text-black font-semibold">Name: Trade License</h1>
            <p className="mt-1 text-sm">
              File:{" "}
              <span className="underline">xyz store_trade license.pdf</span>
            </p>
          </div>
        </div>
        <RxCrossCircled size={22} color="#01060D" />
      </div>
    </div>
  );
};

export default DocumentUploadBox;
