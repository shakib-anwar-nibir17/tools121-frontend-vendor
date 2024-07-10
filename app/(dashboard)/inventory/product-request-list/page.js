"use client";
import { useGetProducRequesttListQuery } from "@/app/redux/features/inventoryProduct";
import ListTabs from "@/components/Dashboard/ProductRequestList/ListTabs";
import { CalendarDateRangePicker } from "@/components/common/CalenderDateRangePicker";
import SearchInput from "@/components/common/SearchInput";
import { addDays } from "date-fns";
import { useState } from "react";

const ProductRequestListPage = () => {
  const token = localStorage.getItem("vendorToken");

  const [date, setDate] = useState({
    from: new Date(2023, 0, 20),
    to: addDays(new Date(2023, 0, 20), 20),
  });

  console.log(date);

  const { data: productRequestList, refetchProduct } =
    useGetProducRequesttListQuery(token, {
      refetchOnMountOrArgChange: true,
    });

  console.log("ProdReqestList", productRequestList?.data?.requested_products);

  return (
    <div className="mb-20">
      <div className="absolute top-0 right-0">
        <CalendarDateRangePicker date={date} setDate={setDate} />
      </div>
      <div className="max-w-[540px]">
        <SearchInput />
      </div>
      <div>
        <ListTabs requestData={productRequestList?.data?.requested_products} />
      </div>
    </div>
  );
};

export default ProductRequestListPage;
