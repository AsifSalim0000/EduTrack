import { configureStore } from '@reduxjs/toolkit';
import userApiSlice from './userApiSlice';
import authReducer from './authSlice';

const store = configureStore({
  reducer: {
    [userApiSlice.reducerPath]: userApiSlice.reducer,
    auth: authReducer,  
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userApiSlice.middleware),
});

export default store;