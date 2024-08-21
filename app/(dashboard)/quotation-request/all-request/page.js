/* eslint-disable no-empty-pattern */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
"use client";
import {
  useQuotationActionMutation,
  useLazySupplierQuotationListQuery,
  useLazyGetQuotationCounterQuery,
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

const AllRequestPage = () => {
  const token = localStorage.getItem("vendorToken");
  const [triggerQuotationList, { data: supplierQuotationList, error, isLoading , isFetching}] = useLazySupplierQuotationListQuery();
  const [triggerQuotationCounter, { data: counterList, isFetching: counterFetching}] = useLazyGetQuotationCounterQuery();

  const [allQuatationRq, setAllQuatationRq] = useState([]);
  const [tabVal, setTabVal] = useState("");
  const { currentPage, setCurrentPage, setPerpageCount, perpageCount} = useStateContext();
  const [options, setOptions] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [date, setDate] = useState({});
  const [quotationActionHandler, {}] = useQuotationActionMutation();
  const [actionVal, setActionVal] = useState(null)
  const [totalPage, setTotalPage] = useState(0)
  
  useEffect(() => {
    triggerQuotationList({querys: `limit=${10}&&offset=${0}`});
    triggerQuotationCounter()
  }, [token]);

  /// --- page data setup from pagination--- ///
  useEffect(() => {
    setCurrentPage(0);
    setPerpageCount(10)
    setTabVal("all-request");
  }, []);

  useEffect(() => {
    
    if (supplierQuotationList?.data?.page?.length > 0) {
      setAllQuatationRq(supplierQuotationList?.data?.page);
      setTotalPage(supplierQuotationList?.data?.paginate?.total)
    }
    else{
      setAllQuatationRq([])
      setTotalPage(0)
    }
  }, [
    supplierQuotationList?.data?.page?.length,
    supplierQuotationList?.data?.page,
  ]);

  const tabHandler = (val) => {
    setTabVal(val);
    // if (val == "responded") {
    //   triggerQuotationList({querys: `limit=${10}&&offset=${0}&&action_type=${100}`})
    //   setActionVal(100)
    //   setCurrentPage(0)
    //   setPerpageCount(10)

    // } 
    if (val == "unread") {
      triggerQuotationList({querys: `limit=${10}&&offset=${0}&&action_type=${0}`})
      setActionVal(0)
      setCurrentPage(0)
      setPerpageCount(10)
    } else if (val == "spam") {
      triggerQuotationList({querys: `limit=${10}&&offset=${0}&&action_type=${400}`})
      setActionVal(400)
      setCurrentPage(0)
      setPerpageCount(10)
      // console.log('called---------->>>>>')
    } else if (val == "pinned") {
      triggerQuotationList({querys: `limit=${10}&&offset=${0}&&action_type=${200}`})
      setActionVal(200)
      setCurrentPage(0)
      setPerpageCount(10)
    } else if("all-request"){
      triggerQuotationList({querys: `limit=${10}&&offset=${0}`});
      setActionVal(null)
      setCurrentPage(0)
      setPerpageCount(10)
    }
  };

  const onSearchHandler = (text) => {
    if (text?.length > 2) {

      setSearchText(text);
      setTimeout(() => {
        triggerQuotationList({querys: `limit=${10}&&offset=${0}&&search_key=${text}`})
      },500)
    } else {
      tabHandler(tabVal)
    }
  };
  
  const dateFilterHandler = () => {
    const startDateFormate = moment(date?.from).format("YYYY-MM-DD");
      const endDateFormate = moment(date?.to).format("YYYY-MM-DD");
      triggerQuotationList({querys: `limit=${10}&&offset=${0}&&start_date=${startDateFormate}&&end_date=${endDateFormate}`})
      setPerpageCount(10)
  };

  const quotationActionSubmit = async (action, id) => {

    const request_obj = {
      actions: [
        {
          action_type: action,
          quotation_id: id,
        },
      ],
    };

  const actionRes = await quotationActionHandler(request_obj);
    // console.log("Action Response ===>", actionRes);

    if (actionRes?.data?.message == "Request success") {
      triggerQuotationCounter()
      tabHandler(tabVal)
      if (action == 200) {
        toast.success("Quotation pinned Successfully", {
          position: "top-right",
          duration: 2000,
        });
      }
      if (action == 300) {
        toast.success("Quotation delete Successfully", {
          position: "top-right",
          duration: 2000,
        });
      }
      if (action == 400) {
        toast.success("Quotation spam Successfully", {
          position: "top-right",
          duration: 2000,
        });
      }
    } else {
      toast.error("Quotation Action Failed", {
        position: "top-right",
        duration: 2000,
      });
    }
  };

  const pagiNateHandler = (pageNo, perpageCount) => {
    if(date?.from && date?.to){
      const startDateFormate = moment(date?.from).format("YYYY-MM-DD");
      const endDateFormate = moment(date?.to).format("YYYY-MM-DD");
      triggerQuotationList({querys: `limit=${perpageCount}&&offset=${pageNo}&&action_type=${actionVal}start_date=${startDateFormate}&&end_date=${endDateFormate}`})
    }else{
      triggerQuotationList({querys: `limit=${perpageCount}&&offset=${pageNo}&&action_type=${actionVal}`})
    }
  }

  useEffect(() => {
    if(counterList?.data){
      const OpData = [
        {
          key: "All Request",
          value: "all-request",
          amount: counterList?.data?.total ? counterList?.data?.total : 0 ,
        },
        // {
        //   key: "Responded",
        //   value: "responded",
        //   amount: counterList?.data[500] ? counterList?.data[500] : 0,
        // },
        {
          key: "Unread",
          value: "unread",
          amount: counterList?.data[0] ? counterList?.data[0] : 0,
        },
        {
          key: "Pinned",
          value: "pinned",
          amount: counterList?.data[200] ? counterList?.data[200] : 0,
        },
        {
          key: "Spam",
          value: "spam",
          amount: counterList?.data[400] ? counterList?.data[400] : 0,
        },
      ];
      setOptions(OpData);
    }
    
  },[counterList?.data, counterFetching])
  
  // console.log('allQuatationRq --->', allQuatationRq);
  
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
        tableData={allQuatationRq}
        tabVal={tabVal}
        options={options}
        tabHandler={tabHandler}
        quotationActionSubmit={quotationActionSubmit}
        isFetching={isFetching}
        pagiNateHandler={pagiNateHandler}
        totalPage={totalPage}
        from="quotation"
      />
    </div>
  );
};

export default AllRequestPage;
