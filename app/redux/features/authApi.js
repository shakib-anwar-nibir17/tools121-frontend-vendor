import { api } from "../api/api";

const authApi = api.injectEndpoints({ 
  endpoints: (builder) => ({
    signUp: builder.mutation({
      query: (data ) => ({
        url: 'merchant/signup',
        method: 'POST',
        body: data,
      }),
    //   invalidatesTags: [''],
    }),
    logIn: builder.mutation({
      query: (data ) => ({
        url: 'merchant/login',
        method: 'POST',
        body: data,
      }),
    //   invalidatesTags: [''],
    }),

    userData: builder.query({
      query: () =>({
        url: '/users',
        method: 'GET',
      }),
      providesTags: ['userinfo'],
    }),

  }),
});

export const {
  useSignUpMutation,
  useLogInMutation,
  useUserDataQuery
} = authApi;