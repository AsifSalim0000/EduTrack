import React, { useEffect, useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import { useSendOtpMutation } from '../store/userApiSlice';
import { toast } from 'react-toastify';
import FormContainer from '../components/FormContainer';
import Loader from '../components/Loader';
import { useSelector } from 'react-redux';

const RegisterForm = () => {
  const [formData, setFormData] = useState({ email: '', username: '', password: '' });
  const [error, setError] = useState(null);
  const [sendOtp, { isLoading }] = useSendOtpMutation();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate('/');
    }
  }, [navigate, userInfo]);
  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = formData.email.trim();
    const username = formData.username.trim();
    const password = formData.password.trim();

    if (!email || !username || !password) {
      toast.error('Please fill in all fields correctly.');
      return;
    }
    try {
      await sendOtp(formData).unwrap();
      toast.success('OTP sent successfully');
      navigate('/verify-otp');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
      setError(err.data?.error || 'An error occurred');
    }
  };

  return (
    <FormContainer>
      <h1 className="mb-4">Create Account</h1>
      {error && <div className="alert alert-danger">{error}</div>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="my-3" controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="form-control"
            required
          />
        </Form.Group>

        <Form.Group className="my-3" controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="form-control"
            required
          />
        </Form.Group>

        <Form.Group className="my-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="form-control"
            required
          />
        </Form.Group>

        <Button type="submit" variant="primary" className="mt-4 w-100">
          Sign Up / Register
        </Button>

        {isLoading && <Loader />}
      </Form>

      <Row className="py-3">
        <Col className="text-center">
          Already have an account?{' '}
          <Link to="/login" className="text-decoration-none">
            Login Here
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default RegisterForm;
