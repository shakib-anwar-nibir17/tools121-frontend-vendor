/* eslint-disable no-empty-pattern */
"use client";
import {
  useLazySupplierReviewListQuery,
  useReviewActionMutation,
  useSingleReviewReplyMutation,
} from "@/app/redux/features/supplierReview";
import CustomerReviewBox from "@/components/common/CustomerReviewBox";
import PaginationServerside from "@/components/common/PaginationServerside";
import Select from "@/components/common/Select";
import { CustomerReviewSVG } from "@/components/icons/Icons";
import { useStateContext } from "@/utils/contexProvider";
import moment from "moment";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const filterOption = [
  { value: "all", label: "All Review" },
  { value: 100, label: "Approved" },
  { value: 200, label: "Replies" },
  { value: 400, label: "Spam" },
  { value: 300, label: "Trash" },
];

const bulkOptions = [
  { value: "action", label: "Select Action" },
  { value: "all", label: "Select All" },
  { value: 100, label: "Approve All" },
  { value: 400, label: "Move To Spam" },
  { value: 300, label: "Move To Trash" },
];

const sortOptions = [
  { value: "op", label: "Select option" },
  { value: "recent", label: "Most Recent" },
  { value: "week", label: "Last Week" },
  { value: "month", label: "Last Month" },
];

const CustomerReview = () => {
  const token = localStorage.getItem("vendorToken");
  const [triggerSuplierReview, { data: supplierReviewList }] =
    useLazySupplierReviewListQuery();

  const { perpageCount, setCurrentPage, setPerpageCount, currentPage } =
    useStateContext();
  const [allReview, setAllReview] = useState([]);
  const [readTrack, setReadTrack] = useState("");
  const [replyTrack, setReplyTrack] = useState("");
  const [replyText, setReplyText] = useState("");
  const [replyErr, setReplyErr] = useState("");
  const [reviewReply, {}] = useSingleReviewReplyMutation();
  const [reviewAction, {}] = useReviewActionMutation();

  const [selectedReviewArr, setSelectedReviewArr] = useState([]);
  const [actionVal, setActionVal] = useState(null);
  const [totalPage, setTotalPage] = useState(0);
  const [filterDate, setFilterDate] = useState({
    startDate: null,
    endDate: null,
  });
  /// --- page data setup from pagination--- ///
  useEffect(() => {
    setCurrentPage(0);
    setPerpageCount(10);
  }, []);

  useEffect(() => {
    triggerSuplierReview({ querys: `limit=${10}&&offset=${0}` });
  }, [token]);

  useEffect(() => {
    if (supplierReviewList?.data?.page?.length > 0) {
      setAllReview(supplierReviewList?.data?.page);
      setTotalPage(supplierReviewList?.data?.paginate?.total);
    } else {
      setAllReview([]);
      setTotalPage(0);
    }
  }, [supplierReviewList?.data?.page?.length, supplierReviewList?.data?.page]);

  const readMoreHandler = (id) => {
    setReadTrack(id);
  };

  const replyTrackHandler = (id) => {
    setReplyTrack(id);
  };

  const actionApiResonseMessageHandler = (res, action) => {
    if (res == "Request success") {
      triggerSuplierReview({
        querys: `limit=${perpageCount}&&offset=${currentPage}&&action_type=${actionVal}&&start_date=${filterDate?.startDate}&&end_date=${filterDate?.endDate}`,
      });
      if (action == 100) {
        toast.success("Review approved Successfully", {
          position: "top-right",
          duration: 2000,
        });
      }
      if (action == 300) {
        toast.success("Review delete Successfully", {
          position: "top-right",
          duration: 2000,
        });
      }
      if (action == 400) {
        toast.success("Review spam Successfully", {
          position: "top-right",
          duration: 2000,
        });
      }
    } else {
      toast.error("Review Action Failed", {
        position: "top-right",
        duration: 2000,
      });
    }
  };

  const reviewActionSubmit = async (action, id) => {
    const request_obj = {
      actions: [
        {
          action_type: action,
          review_id: id,
        },
      ],
    };

    const actionRes = await reviewAction(request_obj);

    // console.log("Action Response ===>", actionRes);

    actionApiResonseMessageHandler(actionRes?.data?.message, action);
  };

  const replyHandler = async () => {
    if (replyText?.length > 3) {
      const replyObj = {
        review_id: replyTrack,
        reply_txt: replyText,
      };
      const reviewReplyRes = await reviewReply(replyObj);

      if (reviewReplyRes?.data?.message == "Request success") {
        reviewActionSubmit(200, replyTrack);
        setReadTrack("");
        setReplyText("");
        setReplyTrack("");
        toast.success("Replied Successfully", {
          position: "top-right",
          duration: 2000,
        });
      } else {
        toast.error("Replied request failed", {
          position: "top-right",
          duration: 2000,
        });
      }
      console.log("reviewReplyRes ===>", reviewReplyRes);
    } else {
      setReplyErr("Write reply properly");
    }
  };

  const filterHandler = (item) => {
    if (item == 100) {
      triggerSuplierReview({
        querys: `limit=${10}&&offset=${0}&&action_type=${100}`,
      });
      setActionVal(100);
      setCurrentPage(0);
      setPerpageCount(10);
    } else if (item == 200) {
      triggerSuplierReview({
        querys: `limit=${10}&&offset=${0}&&action_type=${200}`,
      });
      setActionVal(500);
      setCurrentPage(0);
      setPerpageCount(10);
    } else if (item == 300) {
      triggerSuplierReview({
        querys: `limit=${10}&&offset=${0}&&action_type=${300}`,
      });
      setActionVal(300);
      setCurrentPage(0);
      setPerpageCount(10);
    } else if (item == 400) {
      triggerSuplierReview({
        querys: `limit=${10}&&offset=${0}&&action_type=${400}`,
      });
      setActionVal(400);
      setCurrentPage(0);
      setPerpageCount(10);
    } else if (item == "all") {
      triggerSuplierReview({ querys: `limit=${10}&&offset=${0}` });
      setActionVal(null);
      setCurrentPage(0);
      setPerpageCount(10);
    }
  };

  const selectHandler = (select_action, id) => {
    if (select_action == "single") {
      const isExists = selectedReviewArr?.find((item) => item == id);

      if (isExists) {
        console.log("exists");
        const filterArr = selectedReviewArr?.filter((item) => item !== id);
        setSelectedReviewArr(filterArr);
      } else {
        setSelectedReviewArr((prev) => [...prev, id]);
      }
    } else {
      const allSelectedId = allReview?.map((item) => {
        return item?.id;
      });

      setSelectedReviewArr(allSelectedId);
    }
  };

  const bulkActionHandler = async (action_type) => {
    if (action_type == "all") {
      selectHandler("all");
    } else if (
      action_type !== "action" &&
      action_type !== "all" &&
      selectedReviewArr?.length > 0
    ) {
      const reqArray = selectedReviewArr?.map((item) => {
        const reqObj = {
          action_type: action_type,
          review_id: item,
        };
        return reqObj;
      });

      const req_body = {
        actions: reqArray,
      };
      const actionRes = await reviewAction(req_body);
      actionApiResonseMessageHandler(actionRes?.data?.message, action_type);
      setSelectedReviewArr([]);
    }
  };

  const sortHandler = (sort_type) => {
    if (sort_type == "recent") {
      // Get the current date and the date 6 days ago
      const endDate = moment().format("YYYY-MM-DD");
      const startDate = moment().subtract(7, "days").format("YYYY-MM-DD");

      triggerSuplierReview({
        querys: `limit=${10}&&offset=${0}&&start_date=${startDate}&&end_date=${endDate}`,
      });
      setPerpageCount(10);

      setFilterDate({ startDate: startDate, endDate: endDate });
      // console.log("recentData data ===> ", endDate, startDate);
    } else if (sort_type == "week") {
      // Get the start and end dates for the last week
      const endDate = moment()
        .subtract(7, "days")
        .endOf("day")
        .format("YYYY-MM-DD"); // End of yesterday
      const startDate = moment()
        .subtract(14, "days")
        .startOf("day")
        .format("YYYY-MM-DD"); // Start of the day 7 days ago
      triggerSuplierReview({
        querys: `limit=${10}&&offset=${0}&&start_date=${startDate}&&end_date=${endDate}`,
      });
      setPerpageCount(10);

      setFilterDate({ startDate: startDate, endDate: endDate });

      // console.log("recentData data ===> ", endDate, startDate);
    } else if (sort_type == "month") {
      // Get the start and end of the previous month
      const startDate = moment()
        .subtract(1, "months")
        .startOf("month")
        .format("YYYY-MM-DD");
      const endDate = moment()
        .subtract(1, "months")
        .endOf("month")
        .format("YYYY-MM-DD");

      triggerSuplierReview({
        querys: `limit=${10}&&offset=${0}&&start_date=${startDate}&&end_date=${endDate}`,
      });
      setPerpageCount(10);

      setFilterDate({ startDate: startDate, endDate: endDate });

      // console.log("recentData data ===> ", endDate, startDate);
    }
  };

  const pagiNateHandler = (pageNo, perpageCount) => {
    if (filterDate?.startDate && filterDate?.endDate) {
      triggerSuplierReview({
        querys: `limit=${perpageCount}&&offset=${pageNo}&&action_type=${actionVal}&&start_date=${filterDate?.startDate}&&end_date=${filterDate?.endDate}`,
      });
    } else {
      triggerSuplierReview({
        querys: `limit=${perpageCount}&&offset=${pageNo}&&action_type=${actionVal}`,
      });
    }
  };

  // console.log("Supplier Review =====>", supplierReviewList);
  // console.log("Selected data =====>", selectedReviewArr);

  return (
    <div className="border border-slate-200 rounded-2xl max-w-[1387px] mt-6 pb-8 mb-20">
      <div className="p-4 border-b">
        <p className="flex items-center gap-2 text-lg text-primary-950 font-bold">
          <CustomerReviewSVG /> Customer Review
        </p>
      </div>
      <div className="flex flex-col md:flex-row items-start xl:items-center gap-4 px-6 py-6">
        <div>
          <p className="text-sm font-bold text-black mb-1">All Action</p>
          <Select
            options={bulkOptions}
            defaultValue="action"
            placeholder="All Mark"
            onChangHandler={bulkActionHandler}
          />
        </div>
        <div>
          <p className="text-sm font-bold text-black mb-1">Filter By</p>
          <Select
            options={filterOption}
            defaultValue="all"
            placeholder="Select Filter"
            onChangHandler={filterHandler}
          />
        </div>
        <div>
          <p className="text-sm font-bold text-black mb-1">Sort By</p>
          <Select
            options={sortOptions}
            defaultValue="op"
            placeholder="Most Recent"
            onChangHandler={sortHandler}
          />
        </div>
      </div>
      <div className="px-6">
        {supplierReviewList?.data?.page?.length > 0 &&
          allReview?.map((review) => (
            <CustomerReviewBox
              readTrack={readTrack}
              readMoreHandler={readMoreHandler}
              key={review.id}
              review={review}
              replyTrackHandler={replyTrackHandler}
              replyTrack={replyTrack}
              setReplyText={setReplyText}
              replyHandler={replyHandler}
              replyErr={replyErr}
              setReplyErr={setReplyErr}
              reviewActionSubmit={reviewActionSubmit}
              selectHandler={selectHandler}
              selectedReviewArr={selectedReviewArr}
            />
          ))}
        <div>
          <p className="flex items-end text-primary-900 cursor-pointer">
            {totalPage > 0 && (
              <PaginationServerside
                pagiNateHandler={pagiNateHandler}
                totalPage={totalPage}
              />
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CustomerReview;
