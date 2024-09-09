import { apiSlice } from './apiSlice';

const USERS_URL = '/user';

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    sendOtp: builder.mutation({
      query: (formData) => ({
        url: `${USERS_URL}/send-otp`,
        method: 'POST',
        body: formData,
      }),
    }),
    verifyOtp: builder.mutation({
      query: (otp) => ({
        url: `${USERS_URL}/verify-otp`,
        method: 'POST',
        body: { otp },
      }),
    }),
    loginUser: builder.mutation({
      query: (userData) => ({
        url: `${USERS_URL}/login`,
        method: 'POST',
        body: userData,
      }),
    }),
    logoutUser: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: 'POST',
      }),
    }),
    googleAuth: builder.mutation({
      query: (token) => ({
        url: `${USERS_URL}/google-auth`,
        method: 'POST',
        body: { token },
      }),
    }),
    forgotOtp: builder.mutation({
      query: (email) => ({
        url: `${USERS_URL}/forgot-otp`,
        method: 'POST',
        body: email,
      }),
    }),
    resendOtp: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/resend-otp`,
        method: 'POST',
      }),
    }),
    resetPassword: builder.mutation({
      query: (newPassword) => ({
        url: `${USERS_URL}/reset-password`,
        method: 'POST',
        body: { newPassword },
      }),
    }),
    verifyForgotOtp: builder.mutation({
      query: (otp) => ({
        url: `${USERS_URL}/verify-forgototp`,
        method: 'POST',
        body: { otp },
      }),
    }),
    getUserStatus: builder.query({
      query: () => '/user/status',
    }),
  }),
});

export const {
  useSendOtpMutation,
  useVerifyOtpMutation,
  useLoginUserMutation,
  useLogoutUserMutation,
  useGoogleAuthMutation,
  useForgotOtpMutation,
  useResendOtpMutation,
  useResetPasswordMutation,
  useVerifyForgotOtpMutation,
  useGetUserStatusQuery
} = userApiSlice;

