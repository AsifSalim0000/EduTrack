import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
    endpoints: (builder) => ({
        sendOtp: builder.mutation({
            query: (formData) => ({
                url: '/send-otp',
                method: 'POST',
                body: formData,
            }),
        }),
        verifyOtp: builder.mutation({
            query: (otp) => ({
                url: '/verify-otp',
                method: 'POST',
                body: { otp },
            }),
        }),
        loginUser: builder.mutation({
            query: (userData) => ({
                url: '/login',
                method: 'POST',
                body: userData,
            }),
        }),
        logoutUser: builder.mutation({
            query: () => ({
                url: '/logout',
                method: 'POST',
            }),
        }),
        googleAuth: builder.mutation({
            query: (token) => ({
                url: '/google-auth',
                method: 'POST',
                body: { token },
            }),
        }),
        forgotOtp: builder.mutation({
            query: (email) => ({
                url: '/forgot-otp',
                method: 'POST',
                body: email,
            }),
        }),
        resendOtp: builder.mutation({
            query: () => ({
                url: '/logout',
                method: 'POST',
            }),
        }),
        resetPassword: builder.mutation({
            query: (newPassword) => ({
                url: '/reset-password',
                method: 'POST',
                body: { newPassword },
            }),
        }),
        verifyForgotOtp: builder.mutation({
            query: (otp) => ({
                url: '/verify-forgototp',
                method: 'POST',
                body: { otp },
            }),
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
} = apiSlice;

export default apiSlice;
