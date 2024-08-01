import ClickAnalytics from "./Analytics/ClickAnalytics";
import RatingAnalytics from "./Analytics/RatingAnalytics";
import UserAnalytics from "./Analytics/UserAnalytics";
import VisitorAnalytics from "./Analytics/VisitorAnalytics";

const Analytics = () => {
  return (
    <div className="mt-7">
      <div className="flex gap-5">
        <UserAnalytics />
        <VisitorAnalytics />
      </div>
      <div className="flex gap-10 w-full">
        <ClickAnalytics />
        <RatingAnalytics />
      </div>
    </div>
  );
};

export default Analytics;
