// backend/src/controllers/PageController.js

export const home = (req, res) => {
    res.status(200).json({ message: 'Welcome to the Home Page!' });
};

export const otpPage = (req, res) => {
    res.status(200).json({ message: 'This is the OTP Verification Page' });
};

export const registerForm = (req, res) => {
    res.status(200).json({ message: 'This is the User Registration Form Page' });
};
