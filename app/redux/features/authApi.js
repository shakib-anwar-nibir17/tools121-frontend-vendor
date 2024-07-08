import { api } from "../api/api";

const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    signUp: builder.mutation({
      query: (data) => ({
        url: "/supplier/auth/v1/registration",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept-Language": "en",
        },
        body: data,
      }),
      //   invalidatesTags: [''],
    }),

    logIn: builder.mutation({
      query: (data) => ({
        url: "/supplier/auth/v1/login",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept-Language": "en",
        },
        body: data,
      }),
      //   invalidatesTags: [''],
    }),

    verifyOtp: builder.mutation({
      query: (data) => ({
        url: "/supplier/auth/v1/verify-otp",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept-Language": "en",
        },
        body: data,
      }),
      //   invalidatesTags: [''],
    }),

    userNameOtpSend: builder.mutation({
      query: (data) => ({
        url: "/supplier/auth/v1/verify/username",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept-Language": "en",
        },
        body: data,
      }),
      //   invalidatesTags: [''],
    }),

    userNames: builder.query({
      query: (data) => ({
        url: "/supplier/auth/v1/usernames",
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Accept-Language": "en",
        },
        params: data,
      }),
      //   invalidatesTags: [''],
    }),

    resetPassword: builder.mutation({
      query: (data) => ({
        url: "/supplier/auth/v1/reset/password",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept-Language": "en",
        },
        body: data,
      }),
      //   invalidatesTags: [''],
    }),

    changePassword: builder.mutation({
      query: (data) => ({
        url: "/supplier/auth/v2/reset/password",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept-Language": "en",
        },
        body: data,
      }),
      //   invalidatesTags: [''],
    }),

    resendOtp: builder.mutation({
      query: (data) => ({
        url: "/supplier/auth/v1/resend-otp",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept-Language": "en",
        },
        body: data,
      }),
      //   invalidatesTags: [''],
    }),

    getUsernameListByPhone: builder.query({
      query: (data) => ({
        url: `/supplier/auth/v1/usernames?phone=${data?.phone}&&recaptcha_token=${data?.token}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Accept-Language": "en",
        },
      }),
      // providesTags: ['userinfo'],
    }),
  }),
});

export const {
  useSignUpMutation,
  useLogInMutation,
  useVerifyOtpMutation,
  useResendOtpMutation,
  useUserNameOtpSendMutation,
  useResetPasswordMutation,
  useUserNamesQuery,
  useChangePasswordMutation,
  useGetUsernameListByPhoneQuery,
  useLazyGetUsernameListByPhoneQuery,
} = authApi;
