import { findByEmail,findUserById } from '../repositories/UserRepository.js';
import bcrypt from 'bcryptjs';
import asyncHandler from 'express-async-handler';

const loginUser = async (email, password) => {
  const user = await findByEmail(email);

  if (user && (await bcrypt.compare(password, user.password))) {
    return user;
  } else {
    throw new Error('Invalid email or password');
  }
};
const getUserStatus = async (userId) => {
  try {
    const user = await findUserById(userId);
    
    if (!user) {
      return { status: 'not_found' };
    }
    
    return { status: user.status};
  } catch (error) {
    throw new Error('Error getting user status');
  }
};
export default{
  loginUser,getUserStatus
};
