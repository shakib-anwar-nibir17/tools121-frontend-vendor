import { RxDotsHorizontal } from "react-icons/rx";
import RatingsChart from "../AnalyticCharts/RatingsChart";

const RatingAnalytics = () => {
  return (
    <div className="w-full h-full rounded-2xl shadow-lg p-6">
      <p className="flex justify-between my-3 text-2xl text-black px-6">
        <span className="flex gap-3 items-center">Rating and Reviews</span>
        <span className="flex items-center gap-5">
          <RxDotsHorizontal />
        </span>
      </p>
      <RatingsChart />
    </div>
  );
};

export default RatingAnalytics;
