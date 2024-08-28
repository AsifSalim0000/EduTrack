import Otp from '../domain/Otp.js';
import User from '../domain/User.js';

export const createOtp = async (userId) => {
    const otp = Math.floor(100000 + Math.random() * 900000).toString(); // Generate a 6-digit OTP
    const otpRecord = new Otp({ userId, otp });
    await otpRecord.save();
    return otp; // Return the OTP to send to the user
};

export const getOtpFromDatabase = async (userId, otp) => {
    return await Otp.findOne({ userId, otp, isValid: true });
};

export const verifyOtpInDatabase = async (userId, otp) => {
    const otpRecord = await getOtpFromDatabase(userId, otp);
    if (otpRecord) {
        otpRecord.isValid = false; // Mark OTP as used
        await otpRecord.save();
        return { success: true };
    } else {
        throw new Error('Invalid OTP');
    }
};
