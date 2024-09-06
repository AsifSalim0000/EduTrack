import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import UserManagement from '../usecases/UserManagement.js';
import generateToken from '../utils/generateToken.js';
import { verifyGoogleToken } from '../usecases/VerifyGoogleToken.js';
import { findByEmail, createUser, resetPassword,findUserById } from '../repositories/UserRepository.js';

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

const googleAuthHandler = asyncHandler(async (req, res) => {
  const { token } = req.body;
  const googleUser = await verifyGoogleToken(token);
  let user = findByEmail(googleUser.email);
  if (!user) {
    user = await createUser({
      email: googleUser.email,
      username: googleUser.name,
      password: '123456',
    });
  }

  generateToken(res, user._id);
  const User= await findByEmail(googleUser.email);
  console.log(User)
  
  res.json({
  
      email: User.email,
      _id: User._id,
      username: User.username,
      role: User.role,
      isAdmin: User.isAdmin,

  });
});

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
const getUserStatus = async (req, res) => {
  try{
  const token = req.cookies.jwt;
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const user = await findUserById(decoded.userId);
 
  if (user) {
    if (user.status === 'blocked') {
      
      res.clearCookie('jwt', { httpOnly: true, secure: process.env.NODE_ENV !== 'development', sameSite: 'strict' });
    }
    
    return res.json({ status: user.status });
  } else {
    return res.status(404).json({ message: 'User not found' });
  }
} catch (error) {
  console.error(error);
  return res.status(500).json({ message: 'Server error' });
}
};

export { logoutUser, loginUser, googleAuthHandler, resetPasswordHandler,getUserStatus };
