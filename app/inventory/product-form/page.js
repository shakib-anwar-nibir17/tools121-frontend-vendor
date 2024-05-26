import GeneralInfo from "@/components/Dashboard/ProductRequest/GeneralInfo";
import MediaInfo from "@/components/Dashboard/ProductRequest/MediaInfo";
import MoreInfo from "@/components/Dashboard/ProductRequest/MoreInfo";

const ProductRequestForm = () => {
  return (
    <div className="max-w-[676px] mb-[102px]">
      <form>
        {/* General Information */}
        <GeneralInfo />
        {/* Media Information */}
        <MediaInfo />
        {/* More Information */}
        <MoreInfo />
      </form>
    </div>
  );
};

export default ProductRequestForm;
