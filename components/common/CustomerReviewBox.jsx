"use client";
import { Checkbox } from "@/components/ui/checkbox";
import { CgProfile } from "react-icons/cg";
import { LiaEdit } from "react-icons/lia";
import { PiImageSquareLight } from "react-icons/pi";

const CustomerReviewBox = ({
  review,
  readMoreHandler,
  readTrack,
  replyTrackHandler,
  replyTrack,
  setReplyText,
  replyHandler,
  setReplyErr,
  replyErr,
  reviewActionSubmit,
  selectHandler,
  selectedReviewArr,
}) => {
  return (
    <div key={review?.id} className="mb-6">
      <div className="grid grid-cols-12 w-full gap-14">
        <div className="col-span-12 xl:col-span-4 flex flex-col xl:flex-row gap-3">
          <Checkbox
            checked={selectedReviewArr?.includes(review?.id)}
            onClick={() => selectHandler("single", review?.id)}
            className="w-4 h-4 border border-black rounded-md"
          />
          <div className="w-12 h-12">
            <PiImageSquareLight size={28} />
          </div>
          <p
            className={`w-[200px] xl:w-full ${
              review?.review_action_type == 0
                ? "text-lg font-bold"
                : "text-base font-normal"
            }`}
          >
            {review?.product_name}
          </p>
        </div>
        {/* user review and reply options */}
        <div className="col-span-12 xl:col-span-4 xl:pl-6">
          <p className="text-justify ">
            {readTrack == review?.id
              ? review?.review
              : review.review?.slice(0, 150)}
          </p>
          {readTrack == review?.id ? (
            <p
              onClick={() => readMoreHandler("")}
              className="text-blue-600 cursor-pointer font-bold"
            >
              Less
            </p>
          ) : (
            <>
              {review.review?.length > 150 && (
                <p
                  onClick={() => readMoreHandler(review?.id)}
                  className="text-blue-600 cursor-pointer font-bold"
                >
                  Read More
                </p>
              )}
            </>
          )}
          <div className="flex gap-2 mt-4 w-[250px] xl:w-full flex-wrap xl:flex-nowrap">
            <button
              className={`${
                review?.review_action_type == 100
                  ? "text-green-600"
                  : "text-gray-700"
              }`}
              onClick={() => {
                if (review?.review_action_type !== 100) {
                  reviewActionSubmit(100, review?.id);
                }
              }}
            >
              {review?.review_action_type == 100 ? "Approved" : "Approve"}
            </button>
            <span>|</span>
            {review?.is_replied ? (
              <button className="text-green-700">Replied</button>
            ) : (
              <button
                onClick={() => replyTrackHandler(review?.id)}
                className={`${
                  review?.id == replyTrack
                    ? "text-slate-200"
                    : "text-primary-900"
                }`}
              >
                Reply
              </button>
            )}
            <span>|</span>
            {review?.review_action_type == 400 ? (
              <button className="text-red-600">Spamed</button>
            ) : (
              <button
                onClick={() => reviewActionSubmit(400, review?.id)}
                className="text-[#FF1E7C]"
              >
                Spam
              </button>
            )}
            <span>|</span>
            {review?.review_action_type == 300 ? (
              <button
                onClick={() => reviewActionSubmit(300, review?.id)}
                className="text-red-600"
              >
                Trashed
              </button>
            ) : (
              <button
                onClick={() => reviewActionSubmit(300, review?.id)}
                className="text-[#FF1E7C]"
              >
                Trash
              </button>
            )}
          </div>
          {/* reply box */}
          {review?.id == replyTrack && (
            <div className="mt-6">
              <div className="h-14 border border-slate-200 rounded-lg flex justify-between px-4 py-1">
                <textarea
                  type="text"
                  className="w-full h-full border-none focus:outline-none text-sm"
                  placeholder="write reply"
                  onChange={(e) => {
                    setReplyText(e.target.value);
                    setReplyErr("");
                  }}
                />
                <LiaEdit />
              </div>
              <p className="text-[13px] font-medium text-red-600">{replyErr}</p>
              <div className="flex justify-end gap-6 mt-3">
                <div className="flex items-center gap-2">
                  {/* <GrEmoji className="mt-1" />
                  <span>|</span> */}
                </div>
                <button onClick={() => replyTrackHandler("")}>Cancel</button>
                <button
                  onClick={() => replyHandler()}
                  className="bg-gray-200 rounded-2xl px-3 py-0.5"
                >
                  Reply
                </button>
              </div>
            </div>
          )}
        </div>
        {/* user name & email */}
        <div className="col-span-12 xl:col-span-4">
          <div className="flex gap-2">
            <div className="w-10 h-10 rounded-full">
              {/* <Image
                width={40}
                height={40}
                className="rounded-full"
                alt="user_avatar"
                src={"/avatar.png"}
              /> */}
              <CgProfile size={35} />
            </div>
            <div>
              <p className="text-black">
                {review?.reviewer_details?.full_name}
              </p>
              <p className="text-[14px] text-primary-900">
                {review?.reviewer_details?.email}
              </p>
            </div>
          </div>
        </div>
      </div>
      <hr className="border-[2px] border-slate-200 px-6 mt-8" />
    </div>
  );
};

export default CustomerReviewBox;
