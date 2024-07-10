import { api } from "../api/api";

const supplierQuotation = api.injectEndpoints({
  endpoints: (builder) => ({
    supplierQuotationList: builder.query({
      query: (token) => ({
        url: "/supplier/quotation/v1/list",
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

export const { useSupplierQuotationListQuery } = supplierQuotation;
