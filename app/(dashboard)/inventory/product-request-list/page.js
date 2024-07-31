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

  const [pendingData, setPendingData] = useState([]);
  const [rejectData, setRejectData] = useState([]);
  const [approvedData, setApprovedData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [options, setOptions] = useState([]);

  const [date, setDate] = useState({});

  const [triggerProductRequestList, { data: productRequestList, error, isLoading , isFetching}] = useLazyGetProducRequesttListQuery();
 
  const [tabVal, setTabVal] = useState("");
  const [actionVal, setActionVal] = useState(null)

  useEffect(() => {
    triggerProductRequestList();
  }, [token]);

  /// --- page data setup from pagination--- ///
  useEffect(() => {
    setCurrentPage(0);
    setPerpageCount(10)
  }, []);

  const dateFilterHandler = () => {
    const startDateFormate = moment(date?.from).format("YYYY-MM-DD");
    const endDateFormate = moment(date?.to).format("YYYY-MM-DD");

    const startDate = moment(startDateFormate).startOf("day");
    const endDate = moment(endDateFormate).endOf("day");

    console.log('start date', startDateFormate)
    console.log('end date', endDateFormate)

  };

  const tabHandler = (val) => {
    setTabVal(val);
    if (val == "pending") {
      triggerProductRequestList({limit: 10, offset: 1, action_type: 0})
      setActionVal(0)
      setCurrentPage(0)
      setPerpageCount(10)
    } 
    else if (val == "approved") {
      triggerProductRequestList({limit: 10, offset: 1, action_type: 100})
      setActionVal(100)
      setCurrentPage(0)
      setPerpageCount(10)
    } 
    else if (val == "rejected") {
      triggerProductRequestList({limit: 10, offset: 1, action_type: 200})
      setActionVal(200)
      setCurrentPage(0)
      setPerpageCount(10)
    } 
    else {
      triggerProductRequestList();
      setActionVal(null)
      setCurrentPage(0)
      setPerpageCount(10)
    }
  };

  useEffect(() => {
    if (productRequestList?.data?.page?.length > 0) {
      setStoreRequestProducts(productRequestList?.data?.page);
      setAllRequestProducts(productRequestList?.data?.page);
    
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
     setTimeout(() =>  setTabVal("all-products"), 500)
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
      const searchData = productRequestList?.data?.requested_products?.filter(
        (item) => {
          const searchItem = text.toLocaleLowerCase();
          return (
            item?.product_name?.toLocaleLowerCase()?.indexOf(searchItem) > -1
          );
        }
      );
      setAllRequestProducts(searchData);
    } else {
      const doSlice = (filterVal) => {
        if (filterVal == "none") {
          const sliceData = productRequestList?.data?.requested_products?.slice(
            0,
            10
          );
          setStoreRequestProducts(productRequestList?.data?.requested_products);
          return sliceData;
        } else {
          const filterData =
            productRequestList?.data?.requested_products?.filter(
              (item) => item?.action_type == filterVal
            );

          const sliceData = filterData?.slice(0, 10);
          setStoreRequestProducts(filterData);
          return sliceData;
        }
      };
      const filterVal =
        tabVal == "pending"
          ? 0
          : tabVal == "approved"
          ? 100
          : tabVal == "approved"
          ? 200
          : "none";
      const sliceData = doSlice(filterVal);
      setAllRequestProducts(sliceData);
    }
  };
  
  const pagiNateHandler = (pageNo, perpageCount) => {
    triggerProductRequestList({limit: perpageCount, offset: pageNo + 1, action_type: actionVal })
  }
  
  // console.log('base prod===>', allRequestProducts?.length)
  console.log('api call ==>', productRequestList)

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
        <SearchInput onSearchHandler={onSearchHandler} />
      </div>
      
         <ListTabs
            buttonHandler={buttonHandler}
            options={options}
            tabVal={tabVal}
            tabHandler={tabHandler}
            requestData={allRequestProducts}
            totalPage={productRequestList?.data?.paginate?.total}
            pagiNateHandler={pagiNateHandler}
            isFetching={isFetching}
          />
      
    </div>
  );
};

export default ProductRequestListPage;
