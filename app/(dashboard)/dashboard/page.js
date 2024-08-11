/* eslint-disable no-unused-vars */
"use client";
import {
  useQuotationActionMutation,
  useLazySupplierQuotationListQuery,
  useLazyGetDashboardQuotationCountQuery,
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
  const [triggerQuotationCount, { data: dashboardQuotationCount}] = useLazyGetDashboardQuotationCountQuery();

  const [date, setDate] = useState({});
  const [allQuatationRq, setAllQuatationRq] = useState([]);
  const [tabVal, setTabVal] = useState("");
  const [searchText, setSearchText] = useState("");
  const { pageData, setCurrentPage } = useStateContext();
  const [options, setOptions] = useState([]);
  const [quotationActionHandler] = useQuotationActionMutation();
  const todaysDate = new Date();
  const [totalPage, setTotalPage] = useState(0)
  const startDateFormate = moment(todaysDate).format("YYYY-MM-DD");
  const endDateFormate = moment(todaysDate).format("YYYY-MM-DD");
  
  useEffect(() => {
    triggerQuotationList({querys: `limit=${10}&&offset=${0}&&start_date=${startDateFormate}&&end_date=${endDateFormate}`})
    triggerQuotationCount()
  }, [token]);

  /// --- page data setup from pagination--- ///
  useEffect(() => {
    setCurrentPage(0);
    setTabVal("all-request");
  }, []);

  useEffect(() => {
    setAllQuatationRq(supplierQuotationList?.data?.page);
  }, [supplierQuotationList?.data?.page?.length,
    supplierQuotationList?.data?.page,]);

  useEffect(() => {

    if (supplierQuotationList?.data?.page?.length > 0) {
      setTotalPage(supplierQuotationList?.data?.paginate?.total)
      const OpData = [
        {
          key: "Todays Request",
          value: "todays-request",
          amount: supplierQuotationList?.data?.paginate?.total,
        },

        {
          key: "Pinned",
          value: "pinned",
          amount: 0,
        },
      ];

      setOptions(OpData);

    }
  }, [supplierQuotationList?.data?.page]);

  console.log("Supplier Info ===>>>", supplierQuotationList);
  console.log("dashboardQuotationCount ===>>>", dashboardQuotationCount);


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

  const tabHandler = (val) => {
    setTabVal(val);
    if (val == "pinned") {
      triggerQuotationList({querys: `limit=${10}&&offset=${0}&&action_type=${200}`})
    } else {
      triggerQuotationList({querys: `limit=${10}&&offset=${0}&&start_date=${startDateFormate}&&end_date=${endDateFormate}`})
    }
  };

  const onSearchHandler = (text) => {
    if (text?.length > 2) {

      setSearchText(text);
      setTimeout(() => {
        triggerQuotationList({querys: `limit=${10}&&offset=${0}&&start_date=${startDateFormate}&&end_date=${endDateFormate}&&search_key=${text}`})
      },500)
    } else {
      tabHandler(tabVal)
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

  return (
    <div>
      <HeaderLinks paths={paths} />
      <MainHeader
        data={dashboardQuotationCount?.data?.total_quotation_count}
        todaysQuotation={dashboardQuotationCount?.data?.today_quotation_count}
        pinnedData={dashboardQuotationCount?.data?.pinned_quotation_count}
        unreadData={dashboardQuotationCount?.data?.unread_quotation_count}
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
        totalData={totalPage}
        tabHandler={tabHandler}
        quotationActionSubmit={quotationActionSubmit}
      />
    </div>
  );
};

export default DashboradPage;
