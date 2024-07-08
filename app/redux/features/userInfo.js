import { GetVendorToken } from "@/utils/GetToken";
import { api } from "../api/api";

const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    userData: builder.query({
        query: (credentials) =>({
          url: '/supplier/profile/v1/info',
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${credentials}`,
            'Content-Type': 'application/json',
            "Accept-Language": "en",
          },
        }),
        providesTags: ['userinfo'],
      }),

    updateProfileInfo: builder.mutation({
      query: (data) => ({
        url: "/supplier/profile/v1/info-update",
        method: "PUT",
        headers: {
          'Authorization': `Bearer ${data?.token}`,
          "Content-Type": "application/json",
          "Accept-Language": "en",
        },
        body: data?.requst_body,
      }),
        invalidatesTags: ['userinfo'],
    }),

    userDocList: builder.query({
      query: (credentials) =>({
        url: '/supplier/doc/v1/list',
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${credentials}`,
          'Content-Type': 'application/json',
          "Accept-Language": "en",
        },
      }),
      providesTags: ['userdocs'],
    }),

    uploadDoc: builder.mutation({
      query: (data) => ({
        url: "/supplier/doc/v1/upload",
        method: "POST",
        headers: {
          'Authorization': `Bearer ${GetVendorToken()}`,
          "Accept-Language": "en",
        },
        body: data?.forms,
      }),
        // invalidatesTags: ['userinfo'],
    }),
    
    uploadImg: builder.mutation({
      query: (data) => ({
        url: "/supplier/img/v1/upload",
        method: "POST",
        headers: {
          'Authorization': `Bearer ${data?.token}`,
          "Accept-Language": "en",
        },
        body: data?.formdata,
      }),
        invalidatesTags: ['userinfo'],
    }),

  }),
});

export const {
  useUserDataQuery,
  useUpdateProfileInfoMutation,
  useUserDocListQuery,
  useUploadDocMutation,
  useUploadImgMutation,
} = authApi;
