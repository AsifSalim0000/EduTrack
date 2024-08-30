import express from 'express';
import { logoutUser,loginUser } from '../../controllers/UserController.js';
import { sendOtp, verifyOtpHandler } from '../../controllers/OtpController.js';

const router = express.Router();

router.post('/send-otp', sendOtp);
router.post('/verify-otp', verifyOtpHandler);
router.post('/login', loginUser);
router.post('/logout', logoutUser);

export default router;
