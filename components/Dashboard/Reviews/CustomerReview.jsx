"use client";
import { useSupplierReviewListQuery } from "@/app/redux/features/supplierReview";
import CustomerReviewBox from "@/components/common/CustomerReviewBox";
import Select from "@/components/common/Select";
import { CustomerReviewSVG } from "@/components/icons/Icons";
import { BsChevronDown } from "react-icons/bs";

const CustomerReview = () => {
  const token = localStorage.getItem("vendorToken");
  const { data: supplierReviewList } = useSupplierReviewListQuery(token, {
    refetchOnMountOrArgChange: true,
  });

  console.log("Supplier Review =====>", supplierReviewList);
  return (
    <div className="border border-slate-200 rounded-2xl max-w-[1387px] mt-6 pb-8 mb-20">
      <div className="p-4 border-b">
        <p className="flex items-center gap-2 text-lg text-primary-950 font-bold">
          <CustomerReviewSVG /> Customer Review
        </p>
      </div>
      <div className="flex items-center gap-4 px-6 py-6">
        <div>
          <p className="text-sm font-bold text-black mb-1">All Action</p>
          <Select
            options={[]}
            defaultValue="Most Recent"
            placeholder="All Mark"
          />
        </div>
        <div>
          <p className="text-sm font-bold text-black mb-1">Sort By</p>
          <Select
            options={[]}
            defaultValue="All reviewers"
            placeholder="Most Recent"
          />
        </div>
        <div>
          <p className="text-sm font-bold text-black mb-1">Filter By</p>
          <Select
            options={[]}
            defaultValue="All reviewers"
            placeholder="Approved"
          />
        </div>
      </div>
      <div className="px-6">
        {/* reviews */}
        {supplierReviewList?.data?.reviews?.length > 0 &&
          supplierReviewList.data.reviews.map((review) => (
            <CustomerReviewBox key={review.id} review={review} />
          ))}
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
