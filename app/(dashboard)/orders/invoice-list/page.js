import InvoiceListTable from "@/components/Dashboard/InvoiceList/InvoiceListTable";
import { CalendarDateRangePicker } from "@/components/common/CalenderDateRangePicker";
import HeaderLinkWrapper from "@/components/common/HeaderLinkWrapper";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FaPlus } from "react-icons/fa";
const InvoiceListPage = () => {
  return (
    <div className="max-w-[1254px]">
      <div className="flex justify-between items-center">
        <HeaderLinkWrapper />
        <CalendarDateRangePicker />
      </div>
      <div className="flex justify-end mt-10">
        <Link href={"/orders/create-new-orders"}>
          <Button className="flex gap-3">
            <FaPlus size={20} /> Create a new Orders
          </Button>
        </Link>
      </div>
      {/* table */}
      <InvoiceListTable />
    </div>
  );
};

export default InvoiceListPage;
