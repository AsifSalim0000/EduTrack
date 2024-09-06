import asyncHandler from 'express-async-handler';
import nodemailer from 'nodemailer';
import User from '../domain/User.js';
import generateToken from '../utils/generateToken.js';
import { verifyForgotOtp, verifyOtp } from '../usecases/VerifyOtp.js';

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: "asifsalim0000@gmail.com",
    pass: 'gugg uwsw dsnv wzjk',
  },
});

const sendOtp = asyncHandler(async (req, res) => {
  const { email, username, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    return res.status(400).json({ error: 'User Already Exists' });
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
});

const forgotOtp = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ error: `User Doesn't Exist` });
  }
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  req.session.forgototp = otp;
  req.session.email = email;
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Your OTP Code For Resetting Password',
    text: `Your OTP code is ${otp}`,
  });
  res.status(200).json({ message: 'OTP sent successfully' });
});

const verifyOtpHandler = asyncHandler(async (req, res) => {
  const result = await verifyOtp(req);
  if (result.success) {
    generateToken(res, result.user.id);
    res.status(201).json({
      _id: result.user.id,
      username: result.user.username,
      email: result.user.email,
      role: result.user.role,
    });
  } else {
    res.status(400).json({ error: result.error });
  }
});

const verifyForgotOtpHandler = asyncHandler(async (req, res) => {
  const result = await verifyForgotOtp(req);
  if (result.success) {
    res.status(201).json({
      message: "Password Reset Successfully",
    });
  } else {
    res.status(400).json({ error: result.error });
  }
});

const resendOtp = asyncHandler(async (req, res) => {
  let otp;
  let email;
  if (req.session.forgototp) {
    
    otp = req.session.forgototp;
    email = req.session.email;
  } else if (req.session.otp) {
    
    otp = req.session.otp;
    email = req.session.userData.email;
  } else {
    return res.status(400).json({ error: 'No OTP session found' });
  }

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Your OTP Code',
    text: `Your OTP code is ${otp}`,
  });

  res.status(200).json({ message: 'OTP resent successfully' });
});

export { sendOtp, verifyOtpHandler, forgotOtp, verifyForgotOtpHandler,resendOtp };
