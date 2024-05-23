import RatingComponent from "@/components/common/RatingComponent";

const FeatureRatedProducts = () => {
  return (
    <div className="flex items-center gap-14 mb-4">
      <div className="flex items-center gap-2">
        <RatingComponent size={16} rating={4} /> <span>4.5</span>{" "}
      </div>
      <div>
        <p className="font-bold text-lg text-black">
          RIG-BS-6025RF Research Upright Metallurgical Microscope
        </p>
      </div>
    </div>
  );
};

export default FeatureRatedProducts;
