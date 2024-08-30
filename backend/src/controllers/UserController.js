import jwt from 'jsonwebtoken';
import UserManagement from '../usecases/UserManagement.js';

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
  
const logoutUser = (req, res) => {
    res.cookie('jwt', '', {
      httpOnly: true,
      expires: new Date(0),
    });
    res.status(200).json({ message: 'Logged out successfully' });
  };

export { logoutUser ,loginUser};
