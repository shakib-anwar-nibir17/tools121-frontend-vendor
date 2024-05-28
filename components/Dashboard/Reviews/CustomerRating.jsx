import FeatureRatedProducts from "@/components/Dashboard/Reviews/FeatureRatedProducts";
import StarProgress from "@/components/Dashboard/Reviews/StarProgress";
import RatingComponent from "@/components/common/RatingComponent";
import SearchInput from "@/components/common/SearchInput";
import { ReviewSVG } from "@/components/icons/Icons";
import { BsChevronDown } from "react-icons/bs";

const CustomerRating = () => {
  return (
    <div className="border border-slate-200 rounded-2xl max-w-[988px]">
      <div className="p-4 border-b">
        <p className="flex items-center gap-2 text-lg text-primary-950 font-bold">
          <ReviewSVG /> Customer Ratings
        </p>
      </div>
      {/* customer rating */}
      <div className="px-6 pt-6 pb-2 border-b">
        <div>
          <div className="text-primary-950 text-xl font-bold flex items-center gap-2">
            <RatingComponent size={24} rating={4} /> (4 out 5)
          </div>
          <p className="text-lg pt-3 pb-6">15,308 Total Ratings</p>
        </div>
        {/* progress bars */}
        <div>
          <StarProgress value={82} type={5} />
          <StarProgress value={76} type={4} />
          <StarProgress value={13} type={3} />
          <StarProgress value={7} type={2} />
          <StarProgress value={2} type={1} />
        </div>
      </div>
      {/* feature rating */}
      <div className="mt-6 mb-8 px-8">
        {/* search input */}
        <div className="flex justify-end">
          <div className="w-[348px]">
            <SearchInput />
          </div>
        </div>
        <p className="text-lg font-bold text-primary-950 mb-6 mt-2">
          By Feature
        </p>
        <div>
          <FeatureRatedProducts />
          <FeatureRatedProducts />
          <FeatureRatedProducts />
          <FeatureRatedProducts />
          <FeatureRatedProducts />
          <FeatureRatedProducts />
          <FeatureRatedProducts />
          <FeatureRatedProducts />
        </div>
        <div>
          <p className="flex items-center text-primary-900 cursor-pointer">
            see more <BsChevronDown />{" "}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CustomerRating;
