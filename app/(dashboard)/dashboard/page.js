"use client"
import MainHeader from "@/components/Dashboard/DashboardPage/MainHeader";
import TodaysQuotation from "@/components/Dashboard/DashboardPage/TodaysQuotation";
import TopSellingItems from "@/components/Dashboard/DashboardPage/TopSellingItems";
import TopTrendingProducts from "@/components/Dashboard/DashboardPage/TopTrendingProducts";
import { CalendarDateRangePicker } from "@/components/common/CalenderDateRangePicker";
import HeaderLinks from "@/components/common/HeaderLinks";
import SearchInput from "@/components/common/SearchInput";
import { useUserDataQuery } from "@/app/redux/features/authApi";

const DashboradPage = () => {
  const paths = ["Dashboard", "Dashboard"];
	const {data: userProfile, refetch} = useUserDataQuery( {
		refetchOnMountOrArgChange: true,
	  });
console.log("Users ======>>", userProfile)
  return (
    <div>
      <HeaderLinks paths={paths} />
      <MainHeader />
      <div className="flex justify-end my-10">
        <CalendarDateRangePicker />
      </div>
      <div className="mt-10 flex gap-5">
        <TopSellingItems />
        <TopTrendingProducts />
      </div>
      <div className="max-w-[540px] mt-[60px]">
        <SearchInput />
      </div>
      <TodaysQuotation />
    </div>
  );
};

export default DashboradPage;
