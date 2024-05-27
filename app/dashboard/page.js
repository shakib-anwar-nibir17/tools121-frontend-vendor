import MainHeader from "@/components/Dashboard/DashboardPage/MainHeader";
import TopSellingItems from "@/components/Dashboard/DashboardPage/TopSellingItems";
import TopTrendingProducts from "@/components/Dashboard/DashboardPage/TopTrendingProducts";
import HeaderLinks from "@/components/common/HeaderLinks";
const DashboradPage = () => {
  const paths = ["Dashboard", "Dashboard"];
  return (
    <div>
      <HeaderLinks paths={paths} />
      <MainHeader />
      <div className="mt-10 flex gap-5">
        <TopSellingItems />
        <TopTrendingProducts />
      </div>
    </div>
  );
};

export default DashboradPage;
