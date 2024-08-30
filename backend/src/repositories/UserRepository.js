import User from '../domain/User.js';

const createUser = async ({ email, username, password }) => {
    const newUser = new User({ email, username, password });
    await newUser.save();
    return newUser;
};

const findByEmail = async (email) => {
    return await User.findOne({ email });
  };

export { findByEmail,createUser };


