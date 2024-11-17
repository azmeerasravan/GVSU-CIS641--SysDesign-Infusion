import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Auth.css';
import axios from 'axios';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/login`, {
        username: username,
        password: password,
      });
      
      // Assuming response contains the JWT token
      // const { token } = response.data;
      // localStorage.setItem('token', token);
      
      console.log('Login successful:', response.data);
      navigate('/dashboard'); 
      localStorage.setItem('username', username)
    } catch (err) {
      setError('Invalid username or password');
      console.error('Login error:', err);
    }
  };

  return (
    <div className="auth-container">
      <div className="form-wrapper">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              placeholder="Enter your username"
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
            />
          </div>
          <button type="submit" className="submit-button">Login</button>
          <p style={{ display: 'flex', justifyContent: 'center'}}> Not a user? <a href='/register'> Register </a></p>
        </form>
      </div>
    </div>
  );
};

export default Login;
