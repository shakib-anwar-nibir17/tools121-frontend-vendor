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

const filterOption = [
  {value: 'all', label: 'All Review'},
  {value: 100, label: 'Approved'},
  {value: 200, label: 'Replies'},
  {value: 400, label: 'Spam'},
  {value: 300, label: 'Trash'},
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

  const reviewActionSubmit = async(action, id) => {
    const request_obj ={
      actions: [
        {
          "action_type": action,
          "review_id": id
        }
      ]
    }
    
    const actionRes = await reviewAction(request_obj)
    console.log('Action Response ===>', actionRes)

      if(actionRes?.data?.message == "Request success"){
        
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
  console.log("Supplier Review =====>", supplierReviewList?.data?.reviews);

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
            options={[]}
            defaultValue="Most Recent"
            placeholder="All Mark"
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
            options={[]}
            defaultValue="All reviewers"
            placeholder="Most Recent"
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
