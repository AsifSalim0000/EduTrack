import { configureStore } from '@reduxjs/toolkit';
import userApiSlice from './userApiSlice';
import otpApiSlice from './otpApiSlice';

const store = configureStore({
    reducer: {
        [userApiSlice.reducerPath]: userApiSlice.reducer,
        [otpApiSlice.reducerPath]: otpApiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(userApiSlice.middleware, otpApiSlice.middleware),
});

export default store;