/* eslint-disable no-empty-pattern */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
"use client";
import {
 
  useLazyGetUniversalQuotationListQuery,
} from "@/app/redux/features/supplierQuotation";
import AllRequest from "@/components/Dashboard/QuotationRequest/AllRequest";
import { CalendarDateRangePicker } from "@/components/common/CalenderDateRangePicker";
import HeaderLinkWrapper from "@/components/common/HeaderLinkWrapper";
import Loader from "@/components/common/Loader";
import SearchInput from "@/components/common/SearchInput";
import { useStateContext } from "@/utils/contexProvider";
import moment from "moment";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const UniversalQuotation = () => {
  const token = localStorage.getItem("vendorToken");
  const [triggerUniversalQuotation, { data: universalQuotationList, error, isLoading , isFetching}] = useLazyGetUniversalQuotationListQuery();

  const [alluniversalQuotation, setAlluniversalQuotation] = useState([]);
  const [tabVal, setTabVal] = useState("");
  const { pageData, setCurrentPage, setPerpageCount } = useStateContext();
  const [options, setOptions] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [date, setDate] = useState({});
  const [totalPage, setTotalPage] = useState(0)

  useEffect(() => {
    triggerUniversalQuotation({querys: `limit=${10}&&offset=${0}`});
  }, [token]);

  /// --- page data setup from pagination--- ///
  useEffect(() => {
    setCurrentPage(0);
    setPerpageCount(10)
    setTabVal("all-request");
  }, []);

  useEffect(() => {
    
    if (universalQuotationList?.data?.page?.length > 0) {
      setAlluniversalQuotation(universalQuotationList?.data?.page);
      setTotalPage(universalQuotationList?.data?.paginate?.total)
    }
    else{
      setAlluniversalQuotation([])
      setTotalPage(0)
    }
  }, [
    universalQuotationList?.data?.page?.length,
    universalQuotationList?.data?.page,
  ]);

  const onSearchHandler = (text) => {
    if (text?.length > 2) {

      setSearchText(text);
      setTimeout(() => {
        triggerUniversalQuotation({querys: `limit=${10}&&offset=${0}&&search_key=${text}`})
      },500)
    } else {
        triggerUniversalQuotation({querys: `limit=${10}&&offset=${0}&&action_type=${actionVal}`});
    }
  };
  
  const dateFilterHandler = () => {
    const startDateFormate = moment(date?.from).format("YYYY-MM-DD");
      const endDateFormate = moment(date?.to).format("YYYY-MM-DD");
      triggerUniversalQuotation({querys: `limit=${10}&&offset=${0}&&start_date=${startDateFormate}&&end_date=${endDateFormate}`})
      setPerpageCount(10)
  };

  const pagiNateHandler = (pageNo, perpageCount) => {
    if(date?.from && date?.to){
      const startDateFormate = moment(date?.from).format("YYYY-MM-DD");
      const endDateFormate = moment(date?.to).format("YYYY-MM-DD");
      triggerUniversalQuotation({querys: `limit=${perpageCount}&&offset=${pageNo}&&action_type=${actionVal}start_date=${startDateFormate}&&end_date=${endDateFormate}`})
    }else{
      triggerUniversalQuotation({querys: `limit=${perpageCount}&&offset=${pageNo}&&action_type=${actionVal}`})
    }
  }

  useEffect(() => {
    const OpData = [
        {
          key: "All Request",
          value: "all-request",
          amount:0,
        },
      ];
      setOptions(OpData);
  },[])
  
  console.log('universalQuotationList ====>', universalQuotationList)

  return (
    <div className="mb-20">
      <div className="flex justify-between items-center">
        <HeaderLinkWrapper />
        <CalendarDateRangePicker
          dateFilterHandler={dateFilterHandler}
          date={date}
          setDate={setDate}
        />
      </div>

      <div className="max-w-[540px] mt-12">
        <SearchInput onSearchHandler={onSearchHandler} />
      </div>
      <AllRequest
        tableData={ [
          {
              "id": "06b120be-b620-4db0-b8ae-3d9f67d4c09c",
              "supplier_action_type": 100,
              "customer_name": "arnab",
              "product_quantity": 1,
              "request_note": "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of \"de Finibus Bonorum et Malorum\" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, \"Lorem ipsum dolor sit amet..\", comes from a line in section 1.10.32.",
              "product_name": "demo product name",
              "is_replied": true,
              "created": "2024-07-13T16:56:15.482786Z"
          },
          {
              "id": "c61a4ca0-643a-4f3e-9699-4e543b9052c4",
              "supplier_action_type": 200,
              "customer_name": "arnab",
              "product_quantity": 3,
              "request_note": "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of \"de Finibus Bonorum et Malorum\" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, \"Lorem ipsum dolor sit amet..\", comes from a line in section 1.10.32.",
              "product_name": "demo product name 2",
              "is_replied": true,
              "created": "2024-07-13T16:56:47.269570Z"
          }
      ]}
        tabVal={tabVal}
        options={options}
        isFetching={isFetching}
        pagiNateHandler={pagiNateHandler}
        totalPage={30}
        from="universal"
      />
    </div>
  );
};

export default UniversalQuotation;
