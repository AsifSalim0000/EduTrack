import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import UserManagement from '../usecases/UserManagement.js';
import generateToken from '../utils/generateToken.js';
import { verifyGoogleToken } from '../usecases/VerifyGoogleToken.js';
import { findByEmail, createUser, resetPassword } from '../repositories/UserRepository.js';

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await UserManagement.loginUser(email, password);
  if (user) {
    generateToken(res, user._id);
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(401).json({ message: 'Invalid email or password' });
  }
});

const googleAuthHandler = async (req, res) => {
  const { token } = req.body;
  const googleUser = await verifyGoogleToken(token);
  let user = await findByEmail(googleUser.email);
  if (!user) {
    user = await createUser({
      email: googleUser.email,
      username: googleUser.name,
      password: '123456',
    });
  }
  generateToken(res, user._id);
  
  res.json({
    user: {
      email: user.email,
      _id: user._id,
      username: user.username,
      role: user.role,
      isAdmin: user.isAdmin,
    },
  });
};

const logoutUser = asyncHandler(async (req, res) => {
  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: 'Logged out successfully' });
});

const resetPasswordHandler = asyncHandler(async (req, res) => {
  const { newPassword } = req.body;
  const email = req.session.email;
  const user = await resetPassword(email, newPassword);
  if (user) {
    res.status(200).json({ message: 'Password reset successfully' });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

export { logoutUser, loginUser, googleAuthHandler, resetPasswordHandler };
