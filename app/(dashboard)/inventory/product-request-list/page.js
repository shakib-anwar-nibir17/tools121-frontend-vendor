"use client";
import { useGetProducRequesttListQuery } from "@/app/redux/features/inventoryProduct";
import ListTabs from "@/components/Dashboard/ProductRequestList/ListTabs";
import { CalendarDateRangePicker } from "@/components/common/CalenderDateRangePicker";
import SearchInput from "@/components/common/SearchInput";
import { useStateContext } from "@/utils/contexProvider";
import { addDays } from "date-fns";
import { useEffect, useState } from "react";
import moment from 'moment';

const ProductRequestListPage = () => {
  const token = localStorage.getItem("vendorToken");
  const { pageData, setCurrentPage } = useStateContext();
  const [allRequestProducts, setAllRequestProducts] = useState([])
  const [pendingData, setPendingData] = useState([])
  const [rejectData, setRejectData] = useState([])
  const [approvedData, setApprovedData] = useState([])
  const [options, setOptions] = useState([])

  const [date, setDate] = useState({
    from: new Date(2023, 0, 20),
    to: addDays(new Date(2023, 0, 20), 20),
  });
  
  // const [triggerProductRequestList, { data: productRequestList, error, isLoading }] = useLazyGetProducRequesttListQuery();
  const { data: productRequestList, refetch: refetchReqProduct } = useGetProducRequesttListQuery(token, {
    refetchOnMountOrArgChange: true,
  });
  const [tabVal, setTabVal] = useState('')
  
  useEffect(() => {
    refetchReqProduct()
  },[token])


  /// --- page data setup from pagination--- ///
  useEffect(() => {
    setCurrentPage(0);
  },[setCurrentPage])

  useEffect(() => {
    setAllRequestProducts(pageData);
  }, [pageData, allRequestProducts]);


  const dateFilterHandler = () => {
    const fromD = moment(date?.from).format('DD-MM-YYYY')
    const toD = moment(date?.to).format('DD-MM-YYYY')
    
    triggerProductRequestList({action_type: null, start_date: fromD, end_date: toD})
  }

  const tabHandler = (val) => {
    setTabVal(val)
    if(val == 'pending'){
      const pendingProd = productRequestList?.data?.requested_products?.filter((item) => item?.action_type == 0)
      setAllRequestProducts(pendingProd)
    }
    else if(val == 'approved'){
      const approvedProd = productRequestList?.data?.requested_products?.filter((item) => item?.action_type == 100)
      setAllRequestProducts(approvedProd)
    }
    else if(val == 'rejected'){
      const rejectProd = productRequestList?.data?.requested_products?.filter((item) => item?.action_type == 200)
      setAllRequestProducts(rejectProd)
    }
    else{
      setAllRequestProducts(productRequestList)
    }
  }

  useEffect(() => {
    setTabVal('all-products')
    if(productRequestList?.data?.requested_products?.length > 0){
    
      const pendingProd = productRequestList?.data?.requested_products?.filter((item) => item?.action_type == 0)
      const rejectProd = productRequestList?.data?.requested_products?.filter((item) => item?.action_type == 200)
      const approvedProd = productRequestList?.data?.requested_products?.filter((item) => item?.action_type == 100)
      setOptions([
        {
          key: "All Products",
          value: "all-products",
          amount: productRequestList?.data?.requested_products?.length,
        },
        {
          key: "Approved",
          value: "approved",
          amount: approvedProd?.length,
        },
        {
          key: "Pending",
          value: "pending",
          amount: pendingProd?.length,
        },
        {
          key: "Rejected",
          value: "rejected",
          amount: rejectProd?.length,
        },
      ])
    }
  },[productRequestList?.data?.requested_products?.length])

  console.log('isLoading===>', isLoading)
  console.log("ProdReqestList", productRequestList?.data?.requested_products);

  return (
    <div className="mb-20">
      <div className="absolute top-0 right-0">
        <CalendarDateRangePicker dateFilterHandler={dateFilterHandler} date={date} setDate={setDate} />
      </div>
      <div className="max-w-[540px]">
        <SearchInput />
      </div>
      <div>
        <ListTabs options={options} tabVal={tabVal} tabHandler={tabHandler} requestData={allRequestProducts} totalData={productRequestList?.data?.requested_products} />
      </div>
    </div>
  );
};

export default ProductRequestListPage;
