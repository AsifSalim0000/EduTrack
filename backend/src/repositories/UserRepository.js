import User from '../domain/User.js';

const createUser = async (userData) => {
    const user = new User(userData);
    return await user.save();
};

const getUserByUsername = async (username) => {
    return await User.findOne({ username });
};

export { createUser, getUserByUsername };
