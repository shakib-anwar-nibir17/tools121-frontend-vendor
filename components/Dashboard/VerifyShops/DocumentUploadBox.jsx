import UploadBox from "@/components/common/UploadBox";
import { DocumentSVGIcon } from "@/components/icons/Icons";
import { RiVerifiedBadgeLine } from "react-icons/ri";
import { RxCrossCircled } from "react-icons/rx";

const DocumentUploadBox = ({item, docUploadHandler}) => {
  return (
    <div className="pt-8 px-6 pb-4 border-b border-slate-200">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-black font-bold">
            Document Name: {item?.document_name} {`${item?.is_mandatory ? '(Mandatory)' : '(Optional)'}`}
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
        <UploadBox docUploadHandler={docUploadHandler} item={item} text={"Click here to upload"} />
      </div>
      {/* file option */}
      {
       item?.document_url &&  <div className="mt-6 w-full flex items-center justify-between">
        <div className="flex items-center gap-3">
          <DocumentSVGIcon />
          <div>
            <h1 className="text-black font-semibold">Name: {item?.document_name}</h1>
            <p className="mt-1 text-sm">
              File:{" "}
              <span className="underline">{item?.document_url ? item?.document_url : ''}</span>
            </p>
          </div>
        </div>
        
        <RxCrossCircled size={22} color="#01060D" />
      </div>
      }
    </div>
  );
};

export default DocumentUploadBox;
