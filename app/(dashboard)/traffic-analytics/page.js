import Analytics from "@/components/Dashboard/TrafficAnalytics/Analytics";
import AnalyticsHeader from "@/components/Dashboard/TrafficAnalytics/AnalyticsHeader";
import StatsTab from "@/components/Dashboard/TrafficAnalytics/StatsTab";
import HeaderLinks from "@/components/common/HeaderLinks";
import SearchInput from "@/components/common/SearchInput";

const TrafficAnalyticsPage = () => {
  const paths = ["Traffic-Analytics", "Traffic-Analytics"];
  return (
    <div>
      <HeaderLinks paths={paths} />
      <AnalyticsHeader />
      <Analytics />
      <div className="max-w-[540px] mt-10">
        <SearchInput />
      </div>
      <div className="mt-8">
        <h1 className="text-2xl font-medium text-black">Most Visited Page</h1>
        <StatsTab />
      </div>
    </div>
  );
};

export default TrafficAnalyticsPage;
