/* eslint-disable no-unused-vars */
"use client";
import {
  useQuotationActionMutation,
  useLazySupplierQuotationListQuery,
} from "@/app/redux/features/supplierQuotation";
import MainHeader from "@/components/Dashboard/DashboardPage/MainHeader";
import TopSellingItems from "@/components/Dashboard/DashboardPage/TopSellingItems";
import TopTrendingProducts from "@/components/Dashboard/DashboardPage/TopTrendingProducts";
import AllRequest from "@/components/Dashboard/QuotationRequest/AllRequest";
import { CalendarDateRangePicker } from "@/components/common/CalenderDateRangePicker";
import HeaderLinks from "@/components/common/HeaderLinks";
import SearchInput from "@/components/common/SearchInput";
import { useStateContext } from "@/utils/contexProvider";
import { filterQuotationsByDate } from "@/utils/utils";
import moment from "moment";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const DashboradPage = () => {
  const paths = ["Dashboard", "Dashboard"];
  const token = localStorage.getItem("vendorToken");
  const [triggerQuotationList, { data: supplierQuotationList, error, isLoading , isFetching}] = useLazySupplierQuotationListQuery();

  const [date, setDate] = useState({});
  const [allQuatationRq, setAllQuatationRq] = useState([]);
  const [allQuatationRqStore, setAllQuatationRqStore] = useState([]);
  const [todaysQuotation, setTodaysQuotation] = useState([]);
  const [tabVal, setTabVal] = useState("");
  const [searchText, setSearchText] = useState("");
  const { pageData, setCurrentPage } = useStateContext();
  const [options, setOptions] = useState([]);
  const [quotationActionHandler] = useQuotationActionMutation();

  useEffect(() => {
    triggerQuotationList({querys: `limit=${10}&&offset=${0}`});
  }, [token]);

  /// --- page data setup from pagination--- ///
  useEffect(() => {
    setCurrentPage(0);
  }, [setCurrentPage, supplierQuotationList?.data?.quotations?.length]);

  useEffect(() => {
    setAllQuatationRq(pageData);
  }, [pageData]);

  useEffect(() => {
    setTabVal("all-request");
    if (todaysQuotation?.data?.quotations?.length > 0) {
      setAllQuatationRqStore(todaysQuotation?.data?.quotations);

      const pinnedData = todaysQuotation?.data?.quotations?.filter(
        (item) => item?.supplier_action_type == 200
      );

      const OpData = [
        {
          key: "Todays Request",
          value: "todays-request",
          amount: todaysQuotation?.data?.quotations?.length,
        },

        {
          key: "Pinned",
          value: "pinned",
          amount: pinnedData?.length,
        },
      ];

      setOptions(OpData);
    }
  }, [todaysQuotation?.data?.quotations]);

  const todaysDate = new Date();
  console.log("Supplier Info ===>>>", supplierQuotationList);

  const result = filterQuotationsByDate(
    supplierQuotationList?.data,
    todaysDate
  );

  useEffect(() => {
    if (result.length > 0) {
      setTodaysQuotation(result);
    }
  }, [result]);
  const dateFilterHandler = () => {
    if (supplierQuotationList?.data?.quotations?.length > 0) {
      const startDateFormate = moment(date?.from).format("YYYY-MM-DD");
      const endDateFormate = moment(date?.to).format("YYYY-MM-DD");

      const startDate = moment(startDateFormate).startOf("day");
      const endDate = moment(endDateFormate).endOf("day");

      // console.log('start date', startDate)
      // console.log('end date', endDate)
      // console.log('main date ===>', date)

      const filteredData = supplierQuotationList?.data?.quotations?.filter(
        (item) => {
          const itemDate = moment(item?.created);
          return itemDate.isBetween(startDate, endDate, null, "[]");
        }
      );
      console.log("filter data --->", filteredData);
      setAllQuatationRq(filteredData);
      setAllQuatationRqStore(filteredData);
    }
  };

  const pinnedData = supplierQuotationList?.data?.quotations?.filter(
    (item) => item?.supplier_action_type == 200
  );

  const unreadData = supplierQuotationList?.data?.quotations?.filter(
    (item) => item?.supplier_action_type == 0
  );

  const onSearchHandler = (text) => {
    if (supplierQuotationList?.data?.quotations?.length > 0) {
      if (text?.length > 2) {
        console.log("calling --->", text);
        setSearchText(text);
        const searchData = supplierQuotationList?.data?.quotations?.filter(
          (item) => {
            const searchItem = text.toLocaleLowerCase();
            return (
              item?.product_name?.toLocaleLowerCase()?.indexOf(searchItem) > -1
            );
          }
        );
        setAllQuatationRq(searchData);
      } else {
        const doSlice = (filterVal) => {
          if (filterVal == "none") {
            const sliceData = supplierQuotationList?.data?.quotations?.slice(
              0,
              10
            );
            setAllQuatationRqStore(supplierQuotationList?.data?.quotations);
            return sliceData;
          } else {
            const filterData = supplierQuotationList?.data?.quotations?.filter(
              (item) => item?.action_type == filterVal
            );

            const sliceData = filterData?.slice(0, 10);
            setAllQuatationRqStore(filterData);
            return sliceData;
          }
        };
        const filterVal =
          tabVal == "unread"
            ? 0
            : tabVal == "responded"
            ? 100
            : tabVal == "pinned"
            ? 200
            : tabVal == "spam"
            ? 400
            : "none";
        const sliceData = doSlice(filterVal);
        setAllQuatationRq(sliceData);
      }
    }
  };

  const tabHandler = (val) => {
    setTabVal(val);
    if (todaysQuotation?.data?.quotations?.length > 0) {
      if (val == "pinned") {
        const pinnedData = todaysQuotation?.data?.quotations?.filter(
          (item) => item?.supplier_action_type == 200
        );
        setAllQuatationRq(pinnedData);
        setAllQuatationRqStore(pinnedData);
      } else {
        setAllQuatationRq(todaysQuotation?.data?.quotations);
        setAllQuatationRqStore(todaysQuotation?.data?.quotations);
      }
    }
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
    console.log("Action Response ===>", actionRes);

    if (actionRes?.data?.message == "Request success") {
      // setTimeout(() => refetchQuotationReq(), 1000)
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

  return (
    <div>
      <HeaderLinks paths={paths} />
      <MainHeader
        data={supplierQuotationList?.data?.quotations}
        todaysQuotation={todaysQuotation}
        pinnedData={pinnedData}
        unreadData={unreadData}
      />
      <div className="flex justify-end my-10">
        <CalendarDateRangePicker
          dateFilterHandler={dateFilterHandler}
          date={date}
          setDate={setDate}
        />
      </div>
      <div className="mt-10 flex gap-5">
        <TopSellingItems />
        <TopTrendingProducts />
      </div>
      <div className="max-w-[540px] mt-[60px]">
        <SearchInput onSearchHandler={onSearchHandler} />
      </div>
      <AllRequest
        tableData={allQuatationRq}
        tabVal={tabVal}
        options={options}
        totalData={allQuatationRqStore}
        tabHandler={tabHandler}
        quotationActionSubmit={quotationActionSubmit}
      />
    </div>
  );
};

export default DashboradPage;
