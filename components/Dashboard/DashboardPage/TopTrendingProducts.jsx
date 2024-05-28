import TrendingItemCard from "@/components/common/TrendingItemCard";
import { TopTrendingSVG } from "@/components/icons/Icons";

const TopTrendingProducts = () => {
  return (
    <div className="border border-slate-300 box-border rounded-2xl shadow-custom-shadow w-1/2 relative">
      <div className="px-8 py-6 border-b-2 border-slate-200">
        <h1 className="text-lg font-bold text-black flex items-center gap-2">
          <span>
            <TopTrendingSVG />
          </span>
          Top Trending Items
        </h1>
      </div>

      <div className="px-8 flex gap-9 mt-8 mb-11">
        <TrendingItemCard />
        <TrendingItemCard />
        <TrendingItemCard />
      </div>
      <hr className="border border-slate-200" />
      <div className="px-8 flex gap-9 mt-8 mb-11">
        <TrendingItemCard />
        <TrendingItemCard />
        <TrendingItemCard />
      </div>

      <div className="absolute bottom-7 w-full  text-primary-900 text-lg underline flex justify-center">
        <button>Load More</button>
      </div>
    </div>
  );
};

export default TopTrendingProducts;
