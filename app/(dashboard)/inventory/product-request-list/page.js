/* eslint-disable no-unused-vars */
"use client";
import { useLazyGetProducRequesttListQuery } from "@/app/redux/features/inventoryProduct";
import ListTabs from "@/components/Dashboard/ProductRequestList/ListTabs";
import { CalendarDateRangePicker } from "@/components/common/CalenderDateRangePicker";
import Loader from "@/components/common/Loader";
import SearchInput from "@/components/common/SearchInput";
import { useStateContext } from "@/utils/contexProvider";
import moment from "moment";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const ProductRequestListPage = () => {
  const token = localStorage.getItem("vendorToken");
  const router = useRouter();
  const { pageData, setCurrentPage , setPerpageCount} = useStateContext();
  const [allRequestProducts, setAllRequestProducts] = useState([]);
  const [storeRequestProducts, setStoreRequestProducts] = useState([]);

  const [searchText, setSearchText] = useState("");
  const [options, setOptions] = useState([]);

  const [date, setDate] = useState({});

  const [triggerProductRequestList, { data: productRequestList, error, isLoading , isFetching}] = useLazyGetProducRequesttListQuery();
  
  const [tabVal, setTabVal] = useState("");
  const [actionVal, setActionVal] = useState(null)
  const [totalPage, setTotalPage] = useState(0)
  
  useEffect(() => {
    triggerProductRequestList({querys: `limit=${10}&&offset=${0}`});
  }, [token]);

  /// --- page data setup from pagination--- ///
  useEffect(() => {
    setCurrentPage(0);
    setPerpageCount(10)
  }, []);

  const dateFilterHandler = () => {
    if(totalPage > 0){
      const startDateFormate = moment(date?.from).format("YYYY-MM-DD");
    const endDateFormate = moment(date?.to).format("YYYY-MM-DD");

    triggerProductRequestList({querys: `limit=${10}&&offset=${0}&&start_date=${startDateFormate}&&end_date=${endDateFormate}`})
    setPerpageCount(10)
    }

  };

  const tabHandler = (val) => {
    setTabVal(val);
    const findTabData = options?.find((item) => item?.value == val)

    if (val == "pending") {
      if(findTabData?.amount > 0){
        // triggerProductRequestList({limit: 10, offset: 1, action_type: 0})
        triggerProductRequestList({querys: `limit=${10}&&offset=${0}&&action_type=${0}`})
        setActionVal(0)
        setCurrentPage(0)
        setPerpageCount(10)
      }
      else{
        setStoreRequestProducts([]);
        setAllRequestProducts([]);
        setTotalPage(0)
      }
    } 
    else if (val == "approved") {
      if(findTabData?.amount > 0){
        // triggerProductRequestList({limit: 10, offset: 1, action_type: 100})
        triggerProductRequestList({querys: `limit=${10}&&offset=${0}&&action_type=${100}`})
        setActionVal(100)
        setCurrentPage(0)
        setPerpageCount(10)
      }
      else{
        setStoreRequestProducts([]);
        setAllRequestProducts([]);
        setTotalPage(0)
      }
    } 
    else if (val == "rejected") {
      if(findTabData?.amount > 0){
        // triggerProductRequestList({limit: 10, offset: 1, action_type: 200})
        triggerProductRequestList({querys: `limit=${10}&&offset=${0}&&action_type=${200}`})
        setActionVal(200)
        setCurrentPage(0)
        setPerpageCount(10)
      }
      else{
        setStoreRequestProducts([]);
        setAllRequestProducts([]);
        setTotalPage(0)
      }
    } 
    else if (val == "all-products") {
      triggerProductRequestList();
      setActionVal(null)
      setCurrentPage(0)
      setPerpageCount(10)
      console.log('cllad')
    }
  };

  useEffect(() => {
    if (productRequestList?.data?.page?.length > 0) {
      setStoreRequestProducts(productRequestList?.data?.page);
      setAllRequestProducts(productRequestList?.data?.page);
      setTotalPage(productRequestList?.data?.paginate?.total)

      setOptions([
        {
          key: "All Products",
          value: "all-products",
          amount: productRequestList?.data?.paginate?.total,
        },
        {
          key: "Approved",
          value: "approved",
          amount: productRequestList?.data?.action_types[100] ? productRequestList?.data?.action_types[100] : 0
        },
        {
          key: "Pending",
          value: "pending",
          amount: productRequestList?.data?.action_types[0] ? productRequestList?.data?.action_types[0] : 0,
        },
        {
          key: "Rejected",
          value: "rejected",
          amount: 0,
        },
      ]);
    }
    else{
      setStoreRequestProducts([]);
      setAllRequestProducts([]);
      setTotalPage(0)
    }
  }, [
    productRequestList?.data?.page?.length,
    productRequestList?.data?.page,
   
  ]);

  const buttonHandler = () => {
    router.push("/inventory/product-request-form");
  };

  const onSearchHandler = (text) => {
    if (text?.length > 2) {

      console.log("calling --->", text);
      
      setSearchText(text);
      setTimeout(() => {
        // triggerProductRequestList({limit: 10, offset: 1 , querys: `&&search_key=${text}`})
        triggerProductRequestList({querys: `limit=${10}&&offset=${0}&&search_key=${text}`})
      },500)
    } else {
      console.log('called')
      tabHandler(tabVal)
    }
  };
  
   const pagiNateHandler = (pageNo, perpageCount) => {
    if(date?.from && date?.to){
      const startDateFormate = moment(date?.from).format("YYYY-MM-DD");
      const endDateFormate = moment(date?.to).format("YYYY-MM-DD");
      triggerProductRequestList({querys: `limit=${perpageCount}&&offset=${pageNo}&&action_type=${actionVal}start_date=${startDateFormate}&&end_date=${endDateFormate}`})
    }else{
      triggerProductRequestList({querys: `limit=${perpageCount}&&offset=${pageNo}&&action_type=${actionVal}`})
    }
  }
  
  useEffect(() => {
    setTabVal("all-products")
  },[])

  // console.log('base prod===>', allRequestProducts?.length)
  console.log('api call ==>', productRequestList)

  const onFocusHandler = () => {
    setCurrentPage(0);
    setPerpageCount(10)
  }
  return (
    <div className="mb-20">
      <div className="absolute top-0 right-0">
        <CalendarDateRangePicker
          dateFilterHandler={dateFilterHandler}
          date={date}
          setDate={setDate}
        />
      </div>
      <div className="max-w-[540px]">
        <SearchInput onFocusHandler={onFocusHandler} onSearchHandler={onSearchHandler} />
      </div>
      
         <ListTabs
            buttonHandler={buttonHandler}
            options={options}
            tabVal={tabVal}
            tabHandler={tabHandler}
            requestData={allRequestProducts}
            totalPage={totalPage}
            pagiNateHandler={pagiNateHandler}
            isFetching={isFetching}
          />
      
    </div>
  );
};

export default ProductRequestListPage;
