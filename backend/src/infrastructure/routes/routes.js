import express from 'express';
import { logoutUser,loginUser,googleAuthHandler } from '../../controllers/UserController.js';
import { forgotOtp, sendOtp, verifyOtpHandler } from '../../controllers/OtpController.js';

const router = express.Router();

router.post('/send-otp', sendOtp);
router.post('/verify-otp', verifyOtpHandler);
router.post('/login', loginUser);
router.post('/google-auth', googleAuthHandler);
router.post('/forgot-otp', forgotOtp);
router.post('/logout', logoutUser);


export default router;
