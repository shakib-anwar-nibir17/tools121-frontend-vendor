import { VISITOR_URL } from "@/constant/urls";
import Image from "next/image";

const TrendingItemCard = ({product}) => {
  return (
    <div>
      <div className="relative w-[204px] h-[128px] rounded-lg">
        <img
          layout="fill"
          objectFit="cover"
          height={100}
          width={100}
          src={`${VISITOR_URL}/${product?.img_url}`}
          alt="top_trending_item"
        />
      </div>
      <h1 className="text-black mt-4 text-sm mb-8">
       {product?.name}
      </h1>
      <p className="text-black text-lg text-center font-medium">{product?.quote_cnt} pieces</p>
    </div>
  );
};

export default TrendingItemCard;
