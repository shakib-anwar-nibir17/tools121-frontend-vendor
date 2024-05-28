import GeneralInfo from "@/components/Dashboard/ProductRequest/GeneralInfo";
import MediaInfo from "@/components/Dashboard/ProductRequest/MediaInfo";
import MoreInfo from "@/components/Dashboard/ProductRequest/MoreInfo";
import { Button } from "@/components/ui/button";

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
        <div className="mt-12 mb-[50px]">
          <div className="flex justify-end gap-4">
            <Button className="text-xl px-6 bg-white text-primary-900 border border-primary-900">
              Cancel
            </Button>
            <Button className="text-xl px-6">Save Products</Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ProductRequestForm;
