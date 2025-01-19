import { GetVendorToken } from "@/utils/GetToken";
import { api } from "../api/api";

const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    userData: builder.query({
      query: () => ({
        url: "/supplier/profile/v1/info",
        method: "GET",
        headers: {
          Authorization: `Bearer ${GetVendorToken()}`,
          "Content-Type": "application/json",
          "Accept-Language": "en",
        },
      }),
      providesTags: ["userinfo"],
    }),

    updateProfileInfo: builder.mutation({
      query: (data) => ({
        url: "/supplier/profile/v1/info-update",
        method: "PUT",
        headers: {
          Authorization: `Bearer ${GetVendorToken()}`,
          "Content-Type": "application/json",
          "Accept-Language": "en",
        },
        body: data?.requst_body,
      }),
      invalidatesTags: ["userinfo"],
    }),

    userDocList: builder.query({
      query: () => ({
        url: "/supplier/doc/v1/list",
        method: "GET",
        headers: {
          Authorization: `Bearer ${GetVendorToken()}`,
          "Content-Type": "application/json",
          "Accept-Language": "en",
        },
      }),
      providesTags: ["userdocs"],
    }),

    uploadDoc: builder.mutation({
      query: (data) => ({
        url: "/supplier/doc/v1/upload",
        method: "POST",
        headers: {
          Authorization: `Bearer ${GetVendorToken()}`,
          "Accept-Language": "en",
        },
        body: data?.forms,
      }),
      invalidatesTags: ["userdocs"],
    }),

    uploadImg: builder.mutation({
      query: (data) => ({
        url: "/supplier/img/v1/upload",
        method: "POST",
        headers: {
          Authorization: `Bearer ${GetVendorToken()}`,
          "Accept-Language": "en",
        },
        body: data?.formdata,
      }),
      invalidatesTags: ["userinfo"],
    }),

    requestDocVerification: builder.mutation({
      query: () => ({
        url: "/supplier/doc/v1/verify-request",
        method: "POST",
        headers: {
          Authorization: `Bearer ${GetVendorToken()}`,
          "Accept-Language": "en",
        },
      }),
      invalidatesTags: ["userdocs"],
    }),

    deleteUserDocs: builder.mutation({
      query: (data) => ({
        url: `/supplier/doc/v1/delete/${data?.document_id}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${GetVendorToken()}`,
          "Content-Type": "application/json",
          "Accept-Language": "en",
        },
      }),
      invalidatesTags: ["userdocs"],
    }),
    resetUserDocs: builder.mutation({
      query: () => ({
        url: `/supplier/doc/v1/reset`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${GetVendorToken()}`,
          "Content-Type": "application/json",
          "Accept-Language": "en",
        },
      }),
      invalidatesTags: ["userdocs"],
    }),
  }),
});

export const {
  useUserDataQuery,
  useUpdateProfileInfoMutation,
  useUserDocListQuery,
  useUploadDocMutation,
  useUploadImgMutation,
  useRequestDocVerificationMutation,
  useDeleteUserDocsMutation,
  useResetUserDocsMutation,
} = authApi;
