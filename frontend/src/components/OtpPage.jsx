import React, { useState } from 'react';
import { useSendOtpMutation, useVerifyOtpMutation } from '../store/otpApiSlice';
import { useNavigate } from 'react-router-dom';

const OtpPage = () => {
    const [sendOtp] = useSendOtpMutation();
    const [verifyOtp] = useVerifyOtpMutation();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [isOtpSent, setIsOtpSent] = useState(false);
    const [error, setError] = useState(null);

    const handleSendOtp = async () => {
        try {
            await sendOtp(email).unwrap();
            setIsOtpSent(true);
        } catch (err) {
            setError(err.data?.error || 'An error occurred');
        }
    };

    const handleVerifyOtp = async () => {
        try {
            const response = await verifyOtp({ otp }).unwrap();
            localStorage.setItem('token', response.token); // Store JWT token
            navigate('/register-form');
        } catch (err) {
            setError(err.data?.error || 'Invalid OTP');
        }
    };

    return (
        <div className="container">
            <h2>OTP Page</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            {!isOtpSent ? (
                <>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="form-control"
                            required
                        />
                    </div>
                    <button onClick={handleSendOtp} className="btn btn-primary">Send OTP</button>
                </>
            ) : (
                <>
                    <div className="form-group">
                        <label htmlFor="otp">OTP</label>
                        <input
                            type="text"
                            id="otp"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            className="form-control"
                            required
                        />
                    </div>
                    <button onClick={handleVerifyOtp} className="btn btn-primary">Verify OTP</button>
                </>
            )}
        </div>
    );
};

export default OtpPage;
