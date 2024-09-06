import express from 'express';
import { logoutUser,loginUser,googleAuthHandler, resetPasswordHandler, getUserStatus } from '../../controllers/UserController.js';
import { forgotOtp, resendOtp, sendOtp, verifyForgotOtpHandler, verifyOtpHandler } from '../../controllers/OtpController.js';
import { protect } from '../../middlewares/authMiddleware.js';
import { handleCreateInstructor } from '../../controllers/InstructorController.js';

const router = express.Router();

router.post('/send-otp', sendOtp);
router.post('/verify-otp', verifyOtpHandler);
router.post('/login', loginUser);
router.post('/google-auth', googleAuthHandler);
router.post('/forgot-otp', forgotOtp);
router.post('/verify-forgototp', verifyForgotOtpHandler);
router.post('/logout', logoutUser);
router.post('/reset-password', resetPasswordHandler);
router.post('/create-instructor',protect,  handleCreateInstructor);
router.post('/resend-otp',  resendOtp);
router.get('/status', protect,getUserStatus);

export default router;
