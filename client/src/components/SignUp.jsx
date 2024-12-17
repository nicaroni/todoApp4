import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate instead of useHistory
import axios from 'axios'; // Import axios for making requests
import './loginSignUp.scss';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch('http://localhost:5000/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, username }),
      });
  
      const data = await response.json();
      if (response.ok) {
        // Store the JWT token in localStorage after sign-up
        localStorage.setItem('authToken', data.token);  // Store token after successful sign-up
  
        console.log('Sign-up successful');
        navigate('/todos');  // Navigate to the Todo page after sign-up
      } else {
        console.error('Error:', data.error);  // Show error message if sign-up fails
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  

  // Remove handleSignup that is not used and just use handleSubmit

  return (
    <div className='container'>
      <div className="header">
        <div className='text'>Sign Up</div>
        <div className='underline'></div>
      </div>
      <form onSubmit={handleSubmit} className="inputs">
        <div className="input">
          <span className="icon">
            <i className="bi bi-person-circle"></i>
          </span>
          <input 
            type="text" 
            placeholder="Username" 
            value={username}
            onChange={(e) => setUsername(e.target.value)} 
            required 
          />
        </div>
        <div className="input">
          <span className="icon">
            <i className="bi bi-envelope"></i>
          </span>
          <input 
            type="email" 
            placeholder="Email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
        </div>
        <div className="input">
          <span className="icon">
            <i className="bi bi-eye"></i>
          </span>
          <input 
            type="password" 
            placeholder="Password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
        </div>
        <div className="submit-container">
          <button type="submit" className="submit">Sign Up</button>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
