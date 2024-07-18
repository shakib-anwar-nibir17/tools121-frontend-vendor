'use client'
import { useQuotationActionMutation, useSupplierQuotationListQuery } from "@/app/redux/features/supplierQuotation";
import AllRequest from "@/components/Dashboard/QuotationRequest/AllRequest";
import { CalendarDateRangePicker } from "@/components/common/CalenderDateRangePicker";
import HeaderLinkWrapper from "@/components/common/HeaderLinkWrapper";
import SearchInput from "@/components/common/SearchInput";
import { useStateContext } from "@/utils/contexProvider";
import { useEffect, useState } from "react";
import moment from 'moment';
import Loader from "@/components/common/Loader";
import toast from "react-hot-toast";

const AllRequestPage = () => {
  const token = localStorage.getItem("vendorToken");
  const { data: supplierQuotationList , refetch: refetchQuotationReq, isFetching} = useSupplierQuotationListQuery(token, {
    refetchOnMountOrArgChange: true,
  });
  const [allQuatationRq, setAllQuatationRq] = useState([])
  const [allQuatationRqStore, setAllQuatationRqStore] = useState([])
  const [tabVal, setTabVal] = useState('')
  const { pageData, setCurrentPage } = useStateContext();
  const [options, setOptions] = useState([])
  const [searchText, setSearchText] = useState('');
  const [date, setDate] = useState({});
  const [quotationActionHandler, {}] = useQuotationActionMutation();

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
      setAllQuatationRqStore(supplierQuotationList?.data?.quotations)
      const unreadData =supplierQuotationList?.data?.quotations?.filter((item) => item?.supplier_action_type == 0)
      const spamData =supplierQuotationList?.data?.quotations?.filter((item) => item?.supplier_action_type == 400)
      const respondedData =supplierQuotationList?.data?.quotations?.filter((item) => item?.is_replied)
      const pinnedData =supplierQuotationList?.data?.quotations?.filter((item) => item?.supplier_action_type == 200)

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
          amount: pinnedData?.length,
        },
        {
          key: "Spam",
          value: "spam",
          amount: spamData?.length,
        },
      ];

      setOptions(OpData)
    }
  },[supplierQuotationList?.data?.quotations?.length,supplierQuotationList?.data?.quotations])

   const tabHandler = (val) => {
    setTabVal(val)
   if(supplierQuotationList?.data?.quotations?.length > 0){
    if(val == 'responded'){
      const respondedData =supplierQuotationList?.data?.quotations?.filter((item) => item?.is_replied)
      setAllQuatationRq(respondedData)
      setAllQuatationRqStore(respondedData)
    }
    else if(val == 'unread'){
      const unreadData =supplierQuotationList?.data?.quotations?.filter((item) => item?.supplier_action_type == 0)
      setAllQuatationRq(unreadData)
      setAllQuatationRqStore(unreadData)
    }
    else if(val == 'spam'){
      const spamData = supplierQuotationList?.data?.quotations?.filter((item) => item?.supplier_action_type == 400)
      setAllQuatationRq(spamData)
      setAllQuatationRqStore(spamData)
    }
    else if(val == 'pinned'){
      const pinnedData = supplierQuotationList?.data?.quotations?.filter((item) => item?.supplier_action_type == 200)
      setAllQuatationRq(pinnedData)
      setAllQuatationRqStore(pinnedData)
    }
    else{
      setAllQuatationRq(supplierQuotationList?.data?.quotations)
      setAllQuatationRqStore(supplierQuotationList?.data?.quotations)
    }
   }
  }

  const onSearchHandler = (text) => {
    if(supplierQuotationList?.data?.quotations?.length > 0){
      if(text?.length > 2){
        console.log('calling --->', text)
        setSearchText(text);
          const searchData = supplierQuotationList?.data?.quotations?.filter((item) => {
            const searchItem = text.toLocaleLowerCase();
            return (
              item?.product_name?.toLocaleLowerCase()?.indexOf(searchItem) > -1
            );
          });
          setAllQuatationRq(searchData);
          
        } 
        else {
          const doSlice = (filterVal) => {
            if(filterVal == 'none'){
              const sliceData = supplierQuotationList?.data?.quotations?.slice(0, 10)
              setAllQuatationRqStore(supplierQuotationList?.data?.quotations)
              return sliceData
            }
            else{
              const filterData = supplierQuotationList?.data?.quotations?.filter((item) => item?.action_type == filterVal)
  
              const sliceData = filterData?.slice(0, 10)
              setAllQuatationRqStore(filterData)
              return sliceData
            }
          }
          const filterVal = tabVal == 'unread' ? 0 : tabVal == 'responded'  ? 100 :  tabVal == 'pinned' ? 200 : tabVal == 'spam' ? 400 : 'none'
          const sliceData = doSlice(filterVal)
          setAllQuatationRq(sliceData);
        }
    }
  }

  const dateFilterHandler = () => {
    if(supplierQuotationList?.data?.quotations?.length > 0){
      const startDateFormate = moment(date?.from).format('YYYY-MM-DD')
    const endDateFormate = moment(date?.to).format('YYYY-MM-DD')

    const startDate = moment(startDateFormate).startOf('day')
    const endDate = moment(endDateFormate).endOf('day')

    // console.log('start date', startDate)
    // console.log('end date', endDate)
    // console.log('main date ===>', date)

    const filteredData = supplierQuotationList?.data?.quotations?.filter(item => {
      const itemDate = moment(item?.created);
      return itemDate.isBetween(startDate, endDate, null, '[]');
    });
    console.log('filter data --->', filteredData)
    setAllQuatationRq(filteredData)
    setAllQuatationRqStore(filteredData)
    }
  }

  const quotationActionSubmit = async(action, id) => {
    const request_obj ={
      actions: [
        {
          "action_type": action,
          "quotation_id": id
        }
      ]
    }
    
    const actionRes = await quotationActionHandler(request_obj)
    console.log('Action Response ===>', actionRes)

    if(actionRes?.data?.message == "Request success"){
      // setTimeout(() => refetchQuotationReq(), 1000)
      if(action == 200){
        toast.success("Quotation pinned Successfully", {
          position: "top-right",
          duration: 2000,
        });
      }
      if(action == 300){
        toast.success("Quotation delete Successfully", {
          position: "top-right",
          duration: 2000,
        });
      }
      if(action == 400){
        toast.success("Quotation spam Successfully", {
          position: "top-right",
          duration: 2000,
        });
      }
    }
    else{
      toast.error("Quotation Action Failed", {
        position: "top-right",
        duration: 2000,
      });
    }
  }
  console.log("Supplier Quotation =====>", supplierQuotationList?.data?.quotations);
  // console.log('allQuatationRq --->', allQuatationRq);
  // console.log('allQuatationRqStore --->', allQuatationRqStore);

  return (
    <div className="mb-20">
      <div className="flex justify-between items-center">
        <HeaderLinkWrapper />
        <CalendarDateRangePicker dateFilterHandler={dateFilterHandler} date={date} setDate={setDate}/>
      </div>
      {
          isFetching ? <Loader/> : <> 
          <div className="max-w-[540px] mt-12">
              <SearchInput onSearchHandler={onSearchHandler}/>
            </div>
            <AllRequest 
            tableData={allQuatationRq}
            tabVal={tabVal}
            options={options}
            totalData={allQuatationRqStore}
            tabHandler={tabHandler}
            quotationActionSubmit={quotationActionSubmit}
            />
          </>
      }
    </div>
  );
};

export default AllRequestPage;
