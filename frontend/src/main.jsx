import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './store/store';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import App from './App';
import HomePage from './pages/HomePage';
import RegisterForm from './pages/RegisterForm';
import OtpPage from './pages/OtpPage';
import LoginForm from './pages/LoginForm';
import { GoogleOAuthProvider } from '@react-oauth/google';
import ForgotPasswordEmailForm from './pages/ForgotPasswordEmailForm';
import ForgotPasswordOtp from './pages/ForgotPasswordOtp';
import ResetPassword from './pages/ResetPassword';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<HomePage />} />
      <Route path="register" element={<RegisterForm />} />
      <Route path="login" element={<LoginForm />} />
      <Route path="verify-otp" element={<OtpPage />} />
      <Route path="forgot-password" element={<ForgotPasswordEmailForm />} />
      <Route path="forgotpassword-otp" element={<ForgotPasswordOtp />} />
      <Route path="reset-password" element={<ResetPassword />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <GoogleOAuthProvider clientId="665572429672-6qkq3k127fei6lg22d65k5dgd8cjduh1.apps.googleusercontent.com">
     <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
    </GoogleOAuthProvider>

  </Provider>
);
