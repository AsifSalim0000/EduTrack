import React, { useState } from 'react';
import { useRegisterUserMutation } from '../store/userApiSlice';
import { useNavigate } from 'react-router-dom';

const RegisterForm = () => {
    const [registerUser] = useRegisterUserMutation();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ username: '', email: '', password: '', token: '' });
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await registerUser(formData).unwrap();
            navigate('/login');
        } catch (err) {
            setError(err.data?.error || 'An error occurred');
        }
    };

    return (
        <div className="container">
            <h2>Register</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>
                <div className="form-group">
                    <input
                        type="hidden"
                        id="token"
                        name="token"
                        value={formData.token}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit" className="btn btn-primary">Register</button>
            </form>
        </div>
    );
};

export default RegisterForm;
