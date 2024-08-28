import User from '../domain/User.js';
import jwt from 'jsonwebtoken';

const register = async (req, res) => {
    try {
        const { username, email, password, token } = req.body;

        // Verify JWT token from OTP verification
        jwt.verify(token, process.env.JWT_SECRET, async (err, user) => {
            if (err) return res.status(403).json({ error: 'Invalid or expired token' });

            const newUser = new User({ username, email, password });
            await newUser.save();

            res.status(201).json(newUser);
        });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ error: 'Server Error' });
    }
};

export { register };
