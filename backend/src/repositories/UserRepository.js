import bcrypt from 'bcryptjs';
import User from '../domain/User.js';

const createUser = async ({ email, username, password }) => {
  
  const salt = await bcrypt.genSalt(10);  
  const hashedPassword = await bcrypt.hash(password, salt); 
  const newUser = new User({ email, username, password: hashedPassword });

  await newUser.save();

  return newUser;
};

const findByEmail = async (email) => {
    return await User.findOne({ email });
  };

export { findByEmail,createUser };


