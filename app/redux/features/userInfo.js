import { api } from "../api/api";

const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    userData: builder.query({
      query: (credentials) => ({
        url: "/supplier/profile/v1/info",
        method: "GET",
        headers: {
          Authorization: `Bearer ${credentials}`,
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
          Authorization: `Bearer ${data?.token}`,
          "Content-Type": "application/json",
          "Accept-Language": "en",
        },
        body: data?.requst_body,
      }),
      invalidatesTags: ["userinfo"],
    }),

    userDocList: builder.query({
      query: (credentials) => ({
        url: "/supplier/doc/v1/list",
        method: "GET",
        headers: {
          Authorization: `Bearer ${credentials}`,
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
          Authorization: `Bearer ${data?.token}`,
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
          Authorization: `Bearer ${data?.token}`,
          "Accept-Language": "en",
        },
        body: data?.formdata,
      }),
      invalidatesTags: ["userinfo"],
    }),

    requestDocVerification: builder.mutation({
      query: (token) => ({
        url: "/supplier/doc/v1/verify-request",
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
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
          Authorization: `Bearer ${data?.token}`,
          "Content-Type": "application/json",
          "Accept-Language": "en",
        },
      }),
      invalidatesTags: ["userdocs"],
    }),
    resetUserDocs: builder.mutation({
      query: (data) => ({
        url: `/supplier/doc/v1/reset`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${data?.token}`,
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
