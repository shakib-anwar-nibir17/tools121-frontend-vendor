'use client'
import { useSupplierQuotationListQuery } from "@/app/redux/features/supplierQuotation";
import AllRequest from "@/components/Dashboard/QuotationRequest/AllRequest";
import { CalendarDateRangePicker } from "@/components/common/CalenderDateRangePicker";
import HeaderLinkWrapper from "@/components/common/HeaderLinkWrapper";
import SearchInput from "@/components/common/SearchInput";
import { useStateContext } from "@/utils/contexProvider";
import { useEffect, useState } from "react";

const AllRequestPage = () => {
  const token = localStorage.getItem("vendorToken");
  const { data: supplierQuotationList , refetch: refetchQuotationReq,} = useSupplierQuotationListQuery(token, {
    refetchOnMountOrArgChange: true,
  });
  const [allQuatationRq, setAllQuatationRq] = useState([])
  const [allQuatationRqStore, setAllQuatationRqStore] = useState([])
  const [tabVal, setTabVal] = useState('')
  const { pageData, setCurrentPage } = useStateContext();
  const [options, setOptions] = useState([])

  useEffect(() => {
    refetchQuotationReq()
  },[token])

  /// --- page data setup from pagination--- ///
  useEffect(() => {
    setCurrentPage(0);
  },[setCurrentPage, supplierQuotationList?.data?.quotations?.length])

  useEffect(() => {
    setAllQuatationRq(pageData);
  }, [pageData]);
  
  useEffect(() => {
    setTabVal('all-request')
    if( supplierQuotationList?.data?.quotations?.length > 0){
      setAllQuatationRqStore( supplierQuotationList?.data?.quotations)
      const unreadData =supplierQuotationList?.data?.quotations?.filter((item) => item?.supplier_action_type == 0)
      const spamData =supplierQuotationList?.data?.quotations?.filter((item) => item?.supplier_action_type == 200)
      const respondedData =supplierQuotationList?.data?.quotations?.filter((item) => item?.supplier_action_type == 100)
      const OpData = [
        {
          key: "All Request",
          value: "all-request",
          amount: supplierQuotationList?.data?.quotations?.length,
        },
        {
          key: "Responded",
          value: "responded",
          amount: respondedData?.length,
        },
        {
          key: "Unread",
          value: "unread",
          amount: unreadData?.length,
        },
        {
          key: "Pinned",
          value: "pinned",
          amount: spamData?.length,
        },
        {
          key: "Spam",
          value: "spam",
          amount: spamData?.length,
        },
      ];

      setOptions(OpData)
    }
  },[supplierQuotationList?.data?.quotations?.length])

  console.log("Supplier Quotation =====>", supplierQuotationList?.data?.quotations);
  // console.log(tableData);
  

  return (
    <div className="mb-20">
      <div className="flex justify-between items-center">
        <HeaderLinkWrapper />
        <CalendarDateRangePicker />
      </div>
      <div className="max-w-[540px] mt-12">
        <SearchInput />
      </div>
      <AllRequest 
      tableData={allQuatationRq}
      tabVal={tabVal}
      options={options}
      totalData={allQuatationRqStore}
      />
    </div>
  );
};

export default AllRequestPage;
