import InvoiceInformation from "@/components/Dashboard/CreateNewOrder/InvoiceInformation";
import NewOrder from "@/components/Dashboard/CreateNewOrder/NewOrder";
import HeaderLinkWrapper from "@/components/common/HeaderLinkWrapper";
import SearchInput from "@/components/common/SearchInput";
import { Button } from "@/components/ui/button";
import { FaPlus } from "react-icons/fa6";
import { TbFilter } from "react-icons/tb";

const NewInvoicePage = () => {
  return (
    <div>
      <HeaderLinkWrapper />
      <div className="flex items-center justify-between max-w-[1187px] mt-[72px]">
        <div className="w-[613px] flex items-center gap-4">
          <SearchInput />
          <TbFilter size={20} />
        </div>
        <Button className="flex gap-3">
          <FaPlus size={20} /> Create a new Orders
        </Button>
      </div>
      <NewOrder />
      <InvoiceInformation />
    </div>
  );
};

export default NewInvoicePage;
