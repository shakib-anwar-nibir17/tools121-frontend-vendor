import { BASE_URL } from "@/constant/urls";
import Image from "next/image";

const TrendingItemCard = ({ product }) => {
  return (
    <div className="">
      <div className="relative w-[180px] h-[120px] rounded-lg  border-2 border-gray-200">
        <Image
          layout="fill"
          objectFit="contain"
          src={`${BASE_URL}/generate-file/?file_path=${product?.img_url}`}
          // src={generateFile(product?.img_url)}
          alt="top_trending_item"
        />
      </div>
      <h1 className="text-black mt-4 text-sm mb-8">{product?.name}</h1>
      <p className="text-black text-lg text-center font-medium">
        {product?.quote_cnt} pieces
      </p>
    </div>
  );
};

export default TrendingItemCard;
