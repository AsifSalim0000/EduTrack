import { createUser } from '../repositories/UserRepository.js';

export const registerUser = async (userData) => {
    return await createUser(userData);
};


