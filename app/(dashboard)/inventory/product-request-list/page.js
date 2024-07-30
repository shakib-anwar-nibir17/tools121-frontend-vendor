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
  const { pageData, setCurrentPage } = useStateContext();
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

  useEffect(() => {
    triggerProductRequestList();
  }, [token]);

  /// --- page data setup from pagination--- ///
  useEffect(() => {
    setCurrentPage(0);
  }, [setCurrentPage,productRequestList?.data?.page?.length]);

  useEffect(() => {
    setAllRequestProducts(productRequestList?.data?.page);
  }, [productRequestList?.data?.page?.length]);

  const dateFilterHandler = () => {
    const startDateFormate = moment(date?.from).format("YYYY-MM-DD");
    const endDateFormate = moment(date?.to).format("YYYY-MM-DD");

    const startDate = moment(startDateFormate).startOf("day");
    const endDate = moment(endDateFormate).endOf("day");

    // console.log('start date', startDate)
    // console.log('end date', endDate)
    // console.log('main date ===>', date)

    const filteredData = productRequestList?.data?.requested_products?.filter(
      (item) => {
        const itemDate = moment(item?.request_time);
        return itemDate.isBetween(startDate, endDate, null, "[]");
      }
    );
    console.log("filter data --->", filteredData);
    setAllRequestProducts(filteredData);
    setStoreRequestProducts(filteredData);
  };

  const tabHandler = (val) => {
    setTabVal(val);
    if (val == "pending") {
      const pendingProd = productRequestList?.data?.requested_products?.filter(
        (item) => item?.action_type == 0
      );
      setAllRequestProducts(pendingProd);
      setStoreRequestProducts(pendingProd);
    } 
    else if (val == "approved") {
      const approvedProd = productRequestList?.data?.requested_products?.filter(
        (item) => item?.action_type == 100
      );
      setAllRequestProducts(approvedProd);
      setStoreRequestProducts(approvedProd);
      console.log("approved data", approvedProd);
    } 
    else if (val == "rejected") {
      const rejectProd = productRequestList?.data?.requested_products?.filter(
        (item) => item?.action_type == 200
      );
      setStoreRequestProducts(rejectProd);
      setAllRequestProducts(rejectProd);
    } 
    else {
      setAllRequestProducts(productRequestList?.data?.requested_products);
      setStoreRequestProducts(productRequestList?.data?.requested_products);
    }
  };

  useEffect(() => {
    setTabVal("all-products");
    if (productRequestList?.data?.page?.length > 0) {
      setStoreRequestProducts(productRequestList?.data?.page);
      // const pendingProd = productRequestList?.data?.requested_products?.filter(
      //   (item) => item?.action_type == 0
      // );
      // const rejectProd = productRequestList?.data?.requested_products?.filter(
      //   (item) => item?.action_type == 200
      // );
      // const approvedProd = productRequestList?.data?.requested_products?.filter(
      //   (item) => item?.action_type == 100
      // );
      // setOptions([
      //   {
      //     key: "All Products",
      //     value: "all-products",
      //     amount: productRequestList?.data?.requested_products?.length,
      //   },
      //   {
      //     key: "Approved",
      //     value: "approved",
      //     amount: approvedProd?.length,
      //   },
      //   {
      //     key: "Pending",
      //     value: "pending",
      //     amount: pendingProd?.length,
      //   },
      //   {
      //     key: "Rejected",
      //     value: "rejected",
      //     amount: rejectProd?.length,
      //   },
      // ]);
    }
  }, [
    productRequestList?.data?.page?.length,
    productRequestList?.data?.page,
  ]);

  console.log('base prod===>', productRequestList)
  // console.log("ProdReqestList", allRequestProducts?.length);
  // console.log("storeRequestProducts", storeRequestProducts?.length);
  // console.log("pageData", pageData?.length);

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
      <div>
        {isFetching ? (
          <Loader />
        ) : (
          <ListTabs
            buttonHandler={buttonHandler}
            options={options}
            tabVal={tabVal}
            tabHandler={tabHandler}
            requestData={allRequestProducts}
            totalData={storeRequestProducts}
          />
        )}
      </div>
    </div>
  );
};

export default ProductRequestListPage;
