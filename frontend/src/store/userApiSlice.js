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
    }),
});

export const {
    useSendOtpMutation,
    useVerifyOtpMutation,
    useLoginUserMutation,
    useLogoutUserMutation,
} = apiSlice;

export default apiSlice;
