import { api } from "../api/api";

const supplierReview = api.injectEndpoints({
  endpoints: (builder) => ({
    supplierReviewList: builder.query({
      query: (token) => ({
        url: "/supplier/review/v1/list",
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          "Accept-Language": "en",
        },
      }),
      providesTags: ["supplierReview"],
    }),
  }),
});

export const { useSupplierReviewListQuery } = supplierReview;
