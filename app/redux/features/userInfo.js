import { api } from "../api/api";

const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    userData: builder.query({
        query: (credentials) =>({
          url: '/supplier/profile/info',
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${credentials}`,
            'Content-Type': 'application/json',
            "Accept-Language": "en",
          },
        }),
        providesTags: ['userinfo'],
      }),

  }),
});

export const {
  useUserDataQuery,
} = authApi;
