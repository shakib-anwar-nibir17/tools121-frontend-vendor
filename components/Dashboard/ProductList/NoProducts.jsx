import { NoProductSVG } from "@/components/icons/Icons";
import { Button } from "@/components/ui/button";
import { FiPlus } from "react-icons/fi";

const NoProducts = ({ buttonHandler, title, suggestion, buttonShow = true }) => {
  return (
    <div className="flex justify-center bg-primary-50 items-center min-h-[80vh] max-w-[1311px]">
      <div className="flex flex-col items-center gap-4 w-[242px]">
        <NoProductSVG />
        <h4 className="text-lg text-black">{title}</h4>
        <p className="text-center">
          {suggestion}
        </p>
        <Button onClick={() => buttonHandler()} className="gap-4">
          <FiPlus size={20} />
          Add Products
        </Button>
      </div>
    </div>
  );
};

export default NoProducts;
