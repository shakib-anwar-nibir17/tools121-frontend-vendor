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
        body: data,
      }),
        invalidatesTags: ['userinfo'],
    }),

  }),
});

export const {
  useUserDataQuery,
  useUpdateProfileInfoMutation
} = authApi;
