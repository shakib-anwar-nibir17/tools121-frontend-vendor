/* eslint-disable no-unused-vars */
"use client";
import { useDeleteRequstProductMutation, useLazyGetProducRequesttListQuery, useLazyGetReqProductCounterQuery } from "@/app/redux/features/inventoryProduct";
import ListTabs from "@/components/Dashboard/ProductRequestList/ListTabs";
import { CalendarDateRangePicker } from "@/components/common/CalenderDateRangePicker";
import Loader from "@/components/common/Loader";
import SearchInput from "@/components/common/SearchInput";
import { useStateContext } from "@/utils/contexProvider";
import moment from "moment";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const ProductRequestListPage = () => {
  const token = localStorage.getItem("vendorToken");
  const router = useRouter();
  const { pageData, setCurrentPage , setPerpageCount, perpageCount, currentPage} = useStateContext();
  const [allRequestProducts, setAllRequestProducts] = useState([]);
  const [storeRequestProducts, setStoreRequestProducts] = useState([]);

  const [searchText, setSearchText] = useState("");
  const [options, setOptions] = useState([]);

  const [date, setDate] = useState({});

  const [triggerProductRequestList, { data: productRequestList, error, isLoading , isFetching}] = useLazyGetProducRequesttListQuery();
  const [triggerReqProductCounter, { data: counterList}] = useLazyGetReqProductCounterQuery();
  
  const [tabVal, setTabVal] = useState("");
  const [actionVal, setActionVal] = useState(null)
  const [totalPage, setTotalPage] = useState(0)
  
  const [deleteReqProduct, {}] = useDeleteRequstProductMutation();
  const [deleteId, setDeleteId] = useState("");

  useEffect(() => {
    triggerProductRequestList({querys: `limit=${10}&&offset=${0}`});
    triggerReqProductCounter()
  }, [token]);

  /// --- page data setup from pagination--- ///
  useEffect(() => {
    setCurrentPage(0);
    setPerpageCount(10)
    setTabVal("all-products")
  }, []);

  const dateFilterHandler = () => {
    const startDateFormate = moment(date?.from).format("YYYY-MM-DD");
    const endDateFormate = moment(date?.to).format("YYYY-MM-DD");

    triggerProductRequestList({querys: `limit=${10}&&offset=${0}&&start_date=${startDateFormate}&&end_date=${endDateFormate}`})
    triggerReqProductCounter()
    setPerpageCount(10)
    setCurrentPage(0)

  };

  const tabHandler = (val) => {
    setTabVal(val);
    const findTabData = options?.find((item) => item?.value == val)

    if (val == "pending") {
        triggerProductRequestList({querys: `limit=${10}&&offset=${0}&&action_type=${0}`})
        setActionVal(0)
        setCurrentPage(0)
        setPerpageCount(10)
    } 
    else if (val == "approved") {
        triggerProductRequestList({querys: `limit=${10}&&offset=${0}&&action_type=${100}`})
        setActionVal(100)
        setCurrentPage(0)
        setPerpageCount(10)
    } 
    else if (val == "rejected") {
        triggerProductRequestList({querys: `limit=${10}&&offset=${0}&&action_type=${200}`})
        setActionVal(200)
        setCurrentPage(0)
        setPerpageCount(10)
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
   
    setOptions([
      {
        key: "All Products",
        value: "all-products",
        amount: productRequestList?.data?.paginate?.total,
      },
      {
        key: "Approved",
        value: "approved",
        amount: counterList?.data[100] ? counterList?.data[100] : 0
      },
      {
        key: "Pending",
        value: "pending",
        amount: counterList?.data[0] ? counterList?.data[0] : 0,
      },
      {
        key: "Rejected",
        value: "rejected",
        amount: counterList?.data[200] ? counterList?.data[200] : 0,
      },
    ]);
  },[counterList?.data, productRequestList?.data?.page?.length])

  // console.log('base prod===>', allRequestProducts?.length)
  console.log('counter list ==>', counterList?.data)

  const onFocusHandler = () => {
    setCurrentPage(0);
    setPerpageCount(10)
  }

  const reqProductDeleteHandler = async (prod_id) => {
    setDeleteId(prod_id);
    const delete_res = await deleteReqProduct({ prod_id, token });

    if (delete_res?.data?.message == "Request success") {
      setDeleteId("");
      triggerProductRequestList({querys: `limit=${perpageCount}&&offset=${currentPage}&&action_type=${actionVal}`})

      toast.success("Product Deleted Successfully", {
        position: "top-right",
        duration: 2000,
      });
    } else {
      setDeleteId("");
      toast.error("Product Deleted Failed", {
        position: "top-right",
        duration: 2000,
      });
    }

    console.log("delete response ===>", delete_res);
  };
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
            deleteId={deleteId}
            reqProductDeleteHandler={reqProductDeleteHandler}
          />
      
    </div>
  );
};

export default ProductRequestListPage;
