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

    registerOtpVerify: builder.mutation({
      query: (data) => ({
        url: "/supplier/auth/v1/verify-otp/phone",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept-Language": "en",
        },
        body: data,
      }),
      //   invalidatesTags: [''],
    }),
    userNameVerifyOtp: builder.mutation({
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

    resendOtp: builder.mutation({
      query: (data) => ({
        url: "/resend/otp",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept-Language": "en",
        },
        body: data,
      }),
      //   invalidatesTags: [''],
    }),
    //  resend otp based on user name data
    resendOtpUserName: builder.mutation({
      query: (data) => ({
        url: "/supplier/auth/v1/resend-otp/username",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept-Language": "en",
        },
        body: data,
      }),
    }),

    forgotPassUserNameOtpSend: builder.mutation({
      query: (data) => ({
        url: "",
        method: "POST",
        body: data,
      }),
      //   invalidatesTags: [''],
    }),

    healthcheck: builder.query({
      query: () => ({
        url: "/health",
        method: "GET",
      }),
      // providesTags: ['userinfo'],
    }),
  }),
});

export const {
  useSignUpMutation,
  useLogInMutation,
  useUserDataQuery,
  useRegisterOtpVerifyMutation,
  useResendOtpMutation,
  useForgotPassUserNameOtpSendMutation,
  useHealthcheckQuery,
  useUserNameVerifyOtpMutation,
  useResendOtpUserNameMutation,
} = authApi;
