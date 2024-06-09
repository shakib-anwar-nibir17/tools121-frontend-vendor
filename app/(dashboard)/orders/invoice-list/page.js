import { CalendarDateRangePicker } from "@/components/common/CalenderDateRangePicker";
import HeaderLinkWrapper from "@/components/common/HeaderLinkWrapper";
import { Button } from "@/components/ui/button";
const InvoiceListPage = () => {
  return (
    <>
      <div className="flex justify-between items-center">
        <HeaderLinkWrapper />
        <CalendarDateRangePicker />
      </div>
      <div>
        <Button></Button>
      </div>
    </>
  );
};

export default InvoiceListPage;
