import jwt from 'jsonwebtoken';
import UserManagement from '../usecases/UserManagement.js';
import generateToken from '../utils/generateToken.js';
import { verifyGoogleToken } from '../usecases/VerifyGoogleToken.js';
import { findByEmail, createUser } from '../repositories/UserRepository.js';

const loginUser = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const user = await UserManagement.loginUser(email, password);
  
      if (user) {
        generateToken(res, user._id);
  
        res.status(200).json({
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
        });
      } else {
        res.status(401).json({ message: 'Invalid email or password' });
      }
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  
  const googleAuthHandler = async (req, res) => {
    const { token } = req.body;

    try {

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
                isAdmin: user.isAdmin, 
            },
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const logoutUser = (req, res) => {
    res.cookie('jwt', '', {
      httpOnly: true,
      expires: new Date(0),
    });
    res.status(200).json({ message: 'Logged out successfully' });
  };

export { logoutUser ,loginUser,googleAuthHandler};
