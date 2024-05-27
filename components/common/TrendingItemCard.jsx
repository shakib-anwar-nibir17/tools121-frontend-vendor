import Image from "next/image";

const TrendingItemCard = () => {
  return (
    <div>
      <div className="relative w-[204px] h-[128px] rounded-lg">
        <Image
          layout="fill"
          objectFit="cover"
          src="/item-pic.png"
          alt="top_trending_item"
        />
      </div>
      <h1 className="text-black mt-4 text-sm mb-8">
        RIG-BS-6025RF Research Upright
      </h1>
      <p className="text-black text-lg text-center font-medium">1000 pieces</p>
    </div>
  );
};

export default TrendingItemCard;
