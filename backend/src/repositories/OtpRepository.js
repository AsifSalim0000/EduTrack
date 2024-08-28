import Otp from '../domain/Otp.js';

const getOtpFromDatabase = async (otp) => {
    return await Otp.findOne({ otp });
};

const verifyOtpInDatabase = async (otp) => {
    return await Otp.updateOne({ otp }, { $set: { isValid: false } });
};

export { getOtpFromDatabase, verifyOtpInDatabase };
