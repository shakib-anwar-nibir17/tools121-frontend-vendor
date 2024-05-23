import CustomerReviewBox from "@/components/common/CustomerReviewBox";
import Select from "@/components/common/Select";
import { CustomerReviewSVG } from "@/components/icons/icons";
import { BsChevronDown } from "react-icons/bs";

const CustomerReview = () => {
  return (
    <div className="border border-slate-200 rounded-2xl max-w-[1387px] mt-6 pb-8 mb-20">
      <div className="p-4 border-b">
        <p className="flex items-center gap-2 text-lg text-primary-950 font-bold">
          <CustomerReviewSVG /> Customer Review
        </p>
      </div>
      <div className="flex items-center gap-4 px-6 py-6">
        <div>
          <p className="text-sm font-bold text-black mb-1">Sort By</p>
          <Select options={[]} defaultValue="Most Recent" />
        </div>
        <div>
          <p className="text-sm font-bold text-black mb-1">Filter By</p>
          <Select options={[]} defaultValue="All reviewers" />
        </div>
        <div className="mt-6">
          <Select options={[]} defaultValue="All stars" />
        </div>
        <div className="mt-6">
          <Select options={[]} defaultValue="All Text, Image, Video" />
        </div>
      </div>
      <div className="px-6">
        {/* reviews */}
        <CustomerReviewBox />
        <CustomerReviewBox />
        <CustomerReviewBox />
        <CustomerReviewBox />
        <CustomerReviewBox />
        <CustomerReviewBox />
        <CustomerReviewBox />
        <CustomerReviewBox />
        <CustomerReviewBox />
        <CustomerReviewBox />
        <div>
          <p className="flex items-center text-primary-900 cursor-pointer">
            see more <BsChevronDown />
          </p>
        </div>
      </div>
    </div>
  );
};

export default CustomerReview;
