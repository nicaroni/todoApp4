// src/components/SignUp.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './loginSignUp.scss'

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle sign-up logic here (e.g., API call)
  };

  return (
    <div className='container'>
    <div header>
      <div className='text'>Sign Up</div>
      <div className='underline'></div>
    </div>
    <div className="inputs">
      <div className="input">
      <i class="bi bi-person-circle"></i>
        <input type="text" />
      </div>
    </div>
    <div className="input">
      <div className="input">
      <i class="bi bi-envelope"></i>
        <input type="email" />
      </div>
    </div>
    <div className="input">
      <div className="input">
      <i class="bi bi-eye"></i>
        <input type="password" />
      </div>
    </div>
    <div className="submit-container">
      
    </div>
    </div>
  );
};

export default SignUp;
