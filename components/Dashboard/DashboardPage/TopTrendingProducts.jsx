import TrendingItemCard from "@/components/common/TrendingItemCard";
import { TopTrendingSVG } from "@/components/icons/Icons";

const TopTrendingProducts = ({ items, totalData, loadMoreHandler }) => {
  return (
    <div className="border border-slate-300 box-border rounded-2xl shadow-custom-shadow w-full xl:w-1/2 relative">
      <div className="px-4 xl:px-8 py-6 border-b-2 border-slate-200">
        <h1 className="text-lg font-bold text-black flex items-center gap-2">
          <span>
            <TopTrendingSVG />
          </span>
          Top Trending Items
        </h1>
      </div>

      <div className="px-4 mt-8 mb-11 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
        {items?.map((product) => (
          <TrendingItemCard key={product?.id} product={product} />
        ))}
      </div>

      {totalData > 10 && (
        <div className="absolute bottom-7 w-full  text-primary-900 text-lg underline flex justify-center">
          <button onClick={loadMoreHandler}>Load More</button>
        </div>
      )}
    </div>
  );
};

export default TopTrendingProducts;
