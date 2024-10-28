import React from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="homepage-container">
      <h1 className="homepage-title">Welcome to Appointment Scheduler</h1>
      <div className="button-container">
        <button className="login-button" onClick={() => navigate('/login')}>
          Login
        </button>
        <button className="register-button" onClick={() => navigate('/register')}>
          Register
        </button>
      </div>
    </div>
  );
};

export default HomePage;
