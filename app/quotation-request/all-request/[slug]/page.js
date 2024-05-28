import ResponseField from "@/components/Dashboard/QuotationRequest/Slug/ResponseField";
import HeaderLinkWrapper from "@/components/common/HeaderLinkWrapper";
import Link from "next/link";

const QuotationResponsePage = () => {
  return (
    <main>
      <HeaderLinkWrapper />
      <div className="max-w-[877px]">
        <div className="flex justify-end mb-6 ">
          <Link
            href={"/quotation-request/all-request"}
            className="text-primary-900"
          >
            Back
          </Link>
        </div>
        <ResponseField />
      </div>
    </main>
  );
};

export default QuotationResponsePage;
