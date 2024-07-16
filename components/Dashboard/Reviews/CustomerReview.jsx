"use client";
import { useReviewActionMutation, useSingleReviewReplyMutation, useSupplierReviewListQuery } from "@/app/redux/features/supplierReview";
import CustomerReviewBox from "@/components/common/CustomerReviewBox";
import PaginationCom from "@/components/common/PaginationCom";
import Select from "@/components/common/Select";
import { CustomerReviewSVG } from "@/components/icons/Icons";
import { useStateContext } from "@/utils/contexProvider";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { BsChevronDown } from "react-icons/bs";
import moment from 'moment'

const filterOption = [
  
  {value: 'all', label: 'All Review'},
  {value: 100, label: 'Approved'},
  {value: 200, label: 'Replies'},
  {value: 400, label: 'Spam'},
  {value: 300, label: 'Trash'},
]

const bulkOptions = [
  {value: 'action', label: 'Select Action'},
  {value: 'all', label: 'Select All'},
  {value: 100, label: 'Approve All'},
  {value: 400, label: 'Move To Spam'},
  {value: 300, label: 'Move To Trash'},
]

const sortOptions = [
  {value: 'op', label: 'Select option'},
  {value: 'recent', label: 'Most Recent'},
  {value: 'week', label: 'Last Week'},
  {value: 'month', label: 'Last Month'},
]

const CustomerReview = () => {
  const token = localStorage.getItem("vendorToken");
  const { data: supplierReviewList } = useSupplierReviewListQuery(token, {
    refetchOnMountOrArgChange: true,
  });
  const { pageData, setCurrentPage } = useStateContext();
  const [allReview, setAllReview] = useState([])
  const [allReviewStore, setAllReviewStore] = useState([])
  const [readTrack, setReadTrack] = useState('')
  const [replyTrack, setReplyTrack] = useState('')
  const [replyText,setReplyText] = useState('')
  const [replyErr, setReplyErr] = useState('')
  const [reviewReply, {}] = useSingleReviewReplyMutation();
  const [reviewAction, {}] = useReviewActionMutation();
  
  const [selectedReviewArr, setSelectedReviewArr] = useState([])
  
    /// --- page data setup from pagination--- ///
    useEffect(() => {
      setCurrentPage(0);
    },[setCurrentPage, supplierReviewList?.data?.reviews?.length])
  
    useEffect(() => {
      setAllReview(pageData);
    }, [pageData,]);
  
    useEffect(() => {
      if(supplierReviewList?.data?.reviews?.length > 0){
        setAllReviewStore(supplierReviewList?.data?.reviews)
      }
    },[supplierReviewList?.data?.reviews?.length, supplierReviewList?.data?.reviews])

  const readMoreHandler = (id) => {
    setReadTrack(id)
  }

  const replyTrackHandler =  (id) => {
    setReplyTrack(id)
  }

  const actionApiResonseMessageHandler = (res, action) => {
      if(res == "Request success"){
        
        if(action == 100){
          toast.success("Review approved Successfully", {
            position: "top-right",
            duration: 2000,
          });
        }
        if(action == 300){
          toast.success("Review delete Successfully", {
            position: "top-right",
            duration: 2000,
          });
        }
        if(action == 400){
          toast.success("Review spam Successfully", {
            position: "top-right",
            duration: 2000,
          });
        }
      }
      else{
        toast.error("Review Action Failed", {
          position: "top-right",
          duration: 2000,
        });
      }
  }

  const reviewActionSubmit = async(action, id) => {
    const request_obj = {
      actions: [
        {
          "action_type": action,
          "review_id": id
        }
      ]
    }
    
    const actionRes = await reviewAction(request_obj)
    console.log('Action Response ===>', actionRes)
    actionApiResonseMessageHandler(actionRes?.data?.message, action)

  }

  const replyHandler = async () => {

    if(replyText?.length > 3){
      const replyObj = {
        review_id: replyTrack,
        reply_txt: replyText
      }
      const reviewReplyRes = await reviewReply(replyObj)
      
      if(reviewReplyRes?.data?.message == "Request success"){
        reviewActionSubmit(200, replyTrack)
        setReadTrack('')
        setReplyText('')
        toast.success("Replied Successfully", {
          position: "top-right",
          duration: 2000,
        });
      }
      else{
        toast.error("Replied request failed", {
          position: "top-right",
          duration: 2000,
        });
      }
      console.log("reviewReplyRes ===>", reviewReplyRes)
    }
    else{
      setReplyErr('Write reply properly')
    }
  }

  const filterHandler = (item) => {
    
    if(item == 100){
      const filterData =  supplierReviewList?.data?.reviews?.filter((item) => item?.review_action_type == 100)
      setAllReview(filterData)
      setAllReviewStore(filterData)
    }
    else if(item == 200){
      const filterData =  supplierReviewList?.data?.reviews?.filter((item) => item?.review_action_type == 200)
      setAllReview(filterData)
      setAllReviewStore(filterData)
    }
    else if(item == 300){
      const filterData =  supplierReviewList?.data?.reviews?.filter((item) => item?.review_action_type == 300)
      setAllReview(filterData)
      setAllReviewStore(filterData)
    }
    else if(item == 400){
      const filterData =  supplierReviewList?.data?.reviews?.filter((item) => item?.review_action_type == 400)
      setAllReview(filterData)
      setAllReviewStore(filterData)
    }
    else if(item == 'all'){
      const sliceData = supplierReviewList?.data?.reviews?.slice(0, 9)
      setAllReview(sliceData)
      setAllReviewStore(supplierReviewList?.data?.reviews)
    }
    console.log(item)
  }

  const selectHandler = (select_action, id) => {
    if(select_action == 'single'){
      const isExists = selectedReviewArr?.find((item) => item == id)
      
      if(isExists){
        console.log('exists')
        const filterArr = selectedReviewArr?.filter((item) => item !== id)
        setSelectedReviewArr(filterArr)
      }
      else{
        setSelectedReviewArr((prev) => [...prev, id])
      }
    }
    else{
      const allSelectedId = allReviewStore?.map((item) => {
        return item?.id
      })
      
      setSelectedReviewArr(allSelectedId)
    }
  }

  const bulkActionHandler = async (action_type) => {
    if(action_type == 'all'){
      selectHandler('all')
    }
    else if (action_type !== 'action' && action_type !== 'all' && selectedReviewArr?.length > 0){
      
      const reqArray = selectedReviewArr?.map((item) => {
        const reqObj =  {
          "action_type": action_type,
          "review_id": item
        }
        return reqObj
      })

      const req_body = {
        actions: reqArray
      }
      const actionRes = await reviewAction(req_body)
      actionApiResonseMessageHandler(actionRes?.data?.message, action_type)
      setSelectedReviewArr([])
    }
  }

  const sortHandler = (sort_type) => {
    console.log('sort type ===>', sort_type)

    if(sort_type == 'recent'){
      const data = [
        { id: 1, created: "2024-07-13T16:59:35.709882Z" },
        { id: 2, created: "2024-07-07T10:45:12.123456Z" },
        { id: 3, created: "2024-07-08T12:30:45.789123Z" },
        { id: 4, created: "2024-07-01T09:00:00.000000Z" },
        { id: 5, created: "2024-07-10T14:15:22.654321Z" },
        { id: 12, created: "2024-07-14T16:59:35.709882Z" },
        { id: 22, created: "2024-07-09T10:45:12.123456Z" },
        { id: 23, created: "2024-07-05T12:30:45.789123Z" },
        { id: 24, created: "2024-07-15T09:00:00.000000Z" },
        { id: 53, created: "2024-07-16T14:15:22.654321Z" },
      ];
        // Get the current date and the date 6 days ago
        const endDate = moment();
        const startDate = moment().subtract(7, 'days');

        // Filter the data supplierReviewList?.data?.reviews?
        const recentData =  supplierReviewList?.data?.reviews?.filter(item => {
          const createdDate = moment(item?.created);
          return createdDate.isBetween(startDate, endDate, null, '[]');
        });

        console.log('recentData data ===> ', recentData)

        setAllReview(recentData)
        setAllReviewStore(recentData)
    }
    else if(sort_type == 'week'){
       // Get the start and end dates for the last week
        const endDate = moment().subtract(7, 'days').endOf('day'); // End of yesterday
        const startDate = moment().subtract(14, 'days').startOf('day'); // Start of the day 7 days ago

        // Filter the data
        const weekData = supplierReviewList?.data?.reviews?.filter(item => {
          const createdDate = moment(item.created);
          return createdDate.isBetween(startDate, endDate, null, '[]');
        });

        console.log('weekData data ===> ', weekData)

        setAllReview(weekData)
        setAllReviewStore(weekData)
    }
    else if(sort_type == 'month'){
       // Get the start and end of the previous month
       const startOfLastMonth = moment().subtract(1, 'months').startOf('month');
       const endOfLastMonth = moment().subtract(1, 'months').endOf('month');
     
       // Filter the data
       const filterMonthData = supplierReviewList?.data?.reviews?.filter(item => {
         const createdDate = moment(item?.created);
         return createdDate.isBetween(startOfLastMonth, endOfLastMonth, null, '[]');
       });

       console.log('Month data', filterMonthData)
          
       setAllReview(filterMonthData)
       setAllReviewStore(filterMonthData)
    }
  }

  console.log("Supplier Review =====>", supplierReviewList?.data?.reviews);
  // console.log("Selected data =====>", selectedReviewArr);

  return (
    <div className="border border-slate-200 rounded-2xl max-w-[1387px] mt-6 pb-8 mb-20">
      <div className="p-4 border-b">
        <p className="flex items-center gap-2 text-lg text-primary-950 font-bold">
          <CustomerReviewSVG /> Customer Review
        </p>
      </div>
      <div className="flex items-center gap-4 px-6 py-6">
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
        {/* reviews */}
        {supplierReviewList?.data?.reviews?.length > 0 &&
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
                replyErr= {replyErr}
                setReplyErr={setReplyErr}
                reviewActionSubmit={reviewActionSubmit}
                selectHandler={selectHandler}
                selectedReviewArr={selectedReviewArr}
            />
          ))}
        <div>
          <p className="flex items-end text-primary-900 cursor-pointer">
          <PaginationCom array={allReviewStore}/>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CustomerReview;
