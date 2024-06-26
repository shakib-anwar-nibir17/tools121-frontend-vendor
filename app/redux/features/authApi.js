import { api } from "../api/api";

const authApi = api.injectEndpoints({ 
  endpoints: (builder) => ({
    signUp: builder.mutation({
      query: (data ) => ({
        url: '/supplier/auth/registration',
        method: 'POST',
        body: data,
      }),
    //   invalidatesTags: [''],
    }),

    logIn: builder.mutation({
      query: (data ) => ({
        url: '/supplier/auth/login',
        method: 'POST',
        body: data,
      }),
    //   invalidatesTags: [''],
    }),

    registerOtpVerify: builder.mutation({
      query: (data ) => ({
        url: '/supplier/auth/verify-otp',
        method: 'POST',
        body: data,
      }),
    //   invalidatesTags: [''],
    }), 

    resendOtp: builder.mutation({
      query: (data ) => ({
        url: '/resend/otp',
        method: 'POST',
        body: data,
      }),
    //   invalidatesTags: [''],
    }),

    forgotPassUserNameOtpSend: builder.mutation({
      query: (data ) => ({
        url: '',
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
  useUserDataQuery,
  useRegisterOtpVerifyMutation,
  useResendOtpMutation,
  useForgotPassUserNameOtpSendMutation
} = authApi;