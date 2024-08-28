import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const otpApiSlice = createApi({
    reducerPath: 'otpApi',
    baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
    endpoints: (builder) => ({
        sendOtp: builder.mutation({
            query: (email) => ({
                url: '/send-otp',
                method: 'POST',
                body: { email },
            }),
        }),
        verifyOtp: builder.mutation({
            query: ({ otp }) => ({
                url: '/verify-otp',
                method: 'POST',
                body: { otp },
            }),
        }),
    }),
});

export const { useSendOtpMutation, useVerifyOtpMutation } = otpApiSlice;
export default otpApiSlice;
