import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import User from '../domain/User.js';

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

const sendOtp = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });

        if (!user) return res.status(400).json({ error: 'User not found' });

        const otp = Math.floor(100000 + Math.random() * 900000).toString(); // Generate OTP

        req.session.otp = otp;
        req.session.userId = user._id;

        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Your OTP Code',
            text: `Your OTP code is ${otp}`,
        });

        res.status(200).json({ message: 'OTP sent successfully' });
    } catch (error) {
        console.error('Error sending OTP:', error);
        res.status(500).json({ error: 'Server Error' });
    }
};

const verifyOtp = async (req, res) => {
    try {
        const { otp } = req.body;

        if (req.session.otp === otp) {
            req.session.otp = null; // Clear OTP from session

            const user = await User.findById(req.session.userId);
            if (!user) return res.status(400).json({ error: 'User not found' });

            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

            res.status(200).json({ token });
        } else {
            res.status(400).json({ error: 'Invalid OTP' });
        }
    } catch (error) {
        console.error('Error verifying OTP:', error);
        res.status(500).json({ error: 'Server Error' });
    }
};

export { sendOtp, verifyOtp };
