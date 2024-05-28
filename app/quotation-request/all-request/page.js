import AllRequest from "@/components/Dashboard/QuotationRequest/AllRequest";
import { CalendarDateRangePicker } from "@/components/common/CalenderDateRangePicker";
import HeaderLinkWrapper from "@/components/common/HeaderLinkWrapper";
import SearchInput from "@/components/common/SearchInput";

const AllRequestPage = () => {
  return (
    <div className="mb-20">
      <div className="flex justify-between items-center">
        <HeaderLinkWrapper />
        <CalendarDateRangePicker />
      </div>
      <div className="max-w-[540px] mt-12">
        <SearchInput />
      </div>
      <AllRequest />
    </div>
  );
};

export default AllRequestPage;
