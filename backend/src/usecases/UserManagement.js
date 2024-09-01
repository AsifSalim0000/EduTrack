import { findByEmail } from '../repositories/UserRepository.js';
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

export default {
  loginUser,
};
