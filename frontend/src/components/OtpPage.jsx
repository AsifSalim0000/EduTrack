import React, { useState,useEffect } from 'react';
import { useVerifyOtpMutation } from '../store/userApiSlice';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setCredentials } from '../store/authSlice';

const otpPage = () => {
    const [verifyOtp] = useVerifyOtpMutation();
    const [otp, setOtp] = useState('');
    const [error, setError] = useState(null);
    const navigate= useNavigate();
    const dispatch=useDispatch();

    const { userInfo } = useSelector((state) => state.auth);

    useEffect(() => {
      if (userInfo) {
        navigate('/');
      }
    }, [navigate, userInfo]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res =await verifyOtp({ otp }).unwrap();
            dispatch(setCredentials({ ...res }));
            navigate('/'); 
        } catch (err) {
            setError(err.data?.error || 'Invalid OTP');
        }
    };

    return (
        <div className="container">
            <h2>Verify OTP</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="otp">OTP</label>
                    <input
                        type="text"
                        id="otp"
                        name="otp"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        className="form-control"
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">Verify</button>
            </form>
        </div>
    );
};

export default otpPage;
