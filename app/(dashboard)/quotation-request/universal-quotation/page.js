/* eslint-disable no-empty-pattern */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
"use client";
import {
  useSingleQuotationReplyMutation,
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
  const [replyId, setReplyId] = useState('')
  const [replyText, setReplyText] = useState('')

  const [singleQuotationReply, {}] = useSingleQuotationReplyMutation();

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
        triggerUniversalQuotation({querys: `limit=${10}&&offset=${0}`});
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
      triggerUniversalQuotation({querys: `limit=${perpageCount}&&offset=${pageNo}&&start_date=${startDateFormate}&&end_date=${endDateFormate}`})
    }
    else if(searchText){
      triggerUniversalQuotation({querys: `limit=${perpageCount}&&offset=${pageNo}&&search_key=${searchText}`})
    }
    else{
      triggerUniversalQuotation({querys: `limit=${perpageCount}&&offset=${pageNo}`})
    }
  }

  useEffect(() => {
    const OpData = [
        {
          key: "All Request",
          value: "all-request",
          amount: universalQuotationList?.data?.paginate?.total,
        },
      ];
      setOptions(OpData);
  },[universalQuotationList?.data?.paginate?.total, universalQuotationList?.data?.page?.length])
  
  const repleyHandler = () => {
    console.log('Reply Clicked', replyText)
    const request_Obj = {
      quotation_id: replyId,
      reply_txt: replyText,
    };

    const response = await singleQuotationReply(request_Obj);

    console.log("quotation reply response =====>", response);

    if (response?.data?.message == "Request success") {
      setReplyId('')
      toast.success("Reply sent Successfully", {
        position: "top-right",
        duration: 3000,
      });
    } else {
     
      toast.error("Reply sent failed", {
        position: "top-right",
        duration: 3000,
      });
    }
  }
  // console.log('universalQuotationList ====>', universalQuotationList)

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
        tableData={alluniversalQuotation}
        tabVal={tabVal}
        options={options}
        isFetching={isFetching}
        pagiNateHandler={pagiNateHandler}
        totalPage={totalPage}
        from="universal"
        setReplyId={setReplyId}
        replyId={replyId}
        repleyHandler={repleyHandler}
        setReplyText={setReplyText}
      />
    </div>
  );
};

export default UniversalQuotation;
