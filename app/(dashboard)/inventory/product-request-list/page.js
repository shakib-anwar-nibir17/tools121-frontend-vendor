import ListTabs from "@/components/Dashboard/ProductRequestList/ListTabs";
import { CalendarDateRangePicker } from "@/components/common/CalenderDateRangePicker";
import SearchInput from "@/components/common/SearchInput";

const ProductRequestListPage = () => {
  return (
    <div className="mb-20">
      <div className="absolute top-0 right-0">
        <CalendarDateRangePicker />
      </div>
      <div className="max-w-[540px]">
        <SearchInput />
      </div>
      <div>
        <ListTabs />
      </div>
    </div>
  );
};

export default ProductRequestListPage;
