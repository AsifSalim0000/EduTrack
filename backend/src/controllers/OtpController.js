import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import User from '../domain/User.js';
import generateToken from '../utils/generateToken.js';
import { verifyOtp } from '../usecases/VerifyOtp.js';

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'asifsalim0000@gmail.com',
        pass:'gugg uwsw dsnv wzjk',
    },
});

const sendOtp = async (req, res) => {
    try {
        const { email, username, password } = req.body;
        const user = await User.findOne({ email });
        
        if (user){
            res.status(400).json({ error: 'User Already Exists' });
        }   

        const otp = Math.floor(100000 + Math.random() * 900000).toString(); 

        req.session.otp = otp;
        req.session.userData = { email, username, password };

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

const verifyOtpHandler = async (req, res) => {
    try {
        const result = await verifyOtp(req);

        if (result.success) {
            generateToken(res, result.user.id);
            res.status(201).json({
                _id: result.user.id, username: result.user.username, email: result.user.email
            });
        } else {
            res.status(400).json({ error: result.error });
        }
    } catch (error) {
        console.error('Error verifying OTP:', error);
        res.status(500).json({ error: 'Server Error' });
    }
};

export { sendOtp, verifyOtpHandler };
