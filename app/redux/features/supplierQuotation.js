import { GetVendorToken } from "@/utils/GetToken";
import { api } from "../api/api";

const supplierQuotation = api.injectEndpoints({
  endpoints: (builder) => ({
    supplierQuotationList: builder.query({
      query: (data) => ({
        url: `/supplier/quotation/v1/list?${data?.querys ? data?.querys : 'limit=10&&offset=0'}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${GetVendorToken()}`,
          "Content-Type": "application/json",
          "Accept-Language": "en",
        },
      }),
      providesTags: ["quotationlist"],
    }),

    singleQuotationList: builder.query({
      query: (data) => ({
        url: `/supplier/quotation/v1/details?quotation_id=${data?.id}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${GetVendorToken()}`,
          "Content-Type": "application/json",
          "Accept-Language": "en",
        },
      }),
    }),

    singleQuotationReply: builder.mutation({
      query: (data) => ({
        url: "/supplier/quotation/v1/reply",
        method: "POST",
        headers: {
          Authorization: `Bearer ${GetVendorToken()}`,
          "Content-Type": "application/json",
          "Accept-Language": "en",
        },
        body: data,
      }),
    }),

    quotationAction: builder.mutation({
      query: (data) => ({
        url: "/supplier/quotation/v1/action",
        method: "POST",
        headers: {
          Authorization: `Bearer ${GetVendorToken()}`,
          "Content-Type": "application/json",
          "Accept-Language": "en",
        },
        body: data,
      }),
      invalidatesTags: ['quotationlist'],
    }),

    getQuotationCounter: builder.query({
      query: (data) => ({
        url: '/supplier/quotation/v1/action-counter',
        method: "GET",
        headers: {
          Authorization: `Bearer ${GetVendorToken()}`,
          "Content-Type": "application/json",
          "Accept-Language": "en",
        },
      }),
    }),

  }),
});

export const {
  useLazySupplierQuotationListQuery,
  useLazySingleQuotationListQuery,
  useSingleQuotationListQuery,
  useSingleQuotationReplyMutation,
  useQuotationActionMutation,

  // ----------Counter------------
  useLazyGetQuotationCounterQuery,
} = supplierQuotation;
