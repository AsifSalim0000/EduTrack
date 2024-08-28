import express from 'express';
import { register } from '../../controllers/UserController.js';
import { sendOtp, verifyOtp } from '../../controllers/OtpController.js';
import { home, otpPage, registerForm } from '../../controllers/PageController.js';
import { protect } from '../../middlewares/authMiddleware.js'; 

const router = express.Router();

router.get('/home', protect, home);
router.get('/register-form', protect, registerForm);
router.get('/otp-page', protect, otpPage);
router.post('/send-otp', sendOtp);
router.post('/verify-otp', verifyOtp);
router.post('/register', register);

export default router;
