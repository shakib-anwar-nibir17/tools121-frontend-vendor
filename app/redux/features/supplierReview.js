import { GetVendorToken } from "@/utils/GetToken";
import { api } from "../api/api";

const supplierReview = api.injectEndpoints({
  endpoints: (builder) => ({
    supplierReviewList: builder.query({
      query: (data) => ({
        url: `/supplier/review/v1/list?${data?.querys ? data?.querys : 'limit=10&&offset=0'}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${GetVendorToken()}`,
          "Content-Type": "application/json",
          "Accept-Language": "en",
        },
      }),
      providesTags: ["supplierreviewlist"],
    }),

    singleReviewReply: builder.mutation({
      query: (data) => ({
        url: "/supplier/review/v1/reply",
        method: "POST",
        headers: {
          Authorization: `Bearer ${GetVendorToken()}`,
          "Content-Type": "application/json",
          "Accept-Language": "en",
        },
        body: data,
      }),
      invalidatesTags: ['supplierreviewlist'],
    }),

    reviewAction: builder.mutation({
      query: (data) => ({
        url: "/supplier/review/v1/action",
        method: "POST",
        headers: {
          Authorization: `Bearer ${GetVendorToken()}`,
          "Content-Type": "application/json",
          "Accept-Language": "en",
        },
        body: data,
      }),
      // invalidatesTags: ['supplierreviewlist'],
    }),

  }),
});

export const {
  //  useSupplierReviewListQuery,
  useLazySupplierReviewListQuery,
   useSingleReviewReplyMutation,
   useReviewActionMutation,
  } = supplierReview;
