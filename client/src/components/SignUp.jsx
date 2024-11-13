import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate instead of useHistory
import './loginSignUp.scss';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [action, setAction] = useState("Login");
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle sign-up logic here (e.g., API call)
    try {
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, username }),
      });
      const data = await response.json();
      if (response.ok) {
        console.log('Sign up successful');
        navigate('/todos'); // Navigate to the Todo page after successful sign-up
      } else {
        console.error('Error:', data.error);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className='container'>
      <div header>
        <div className='text'>{action}</div>
        <div className='underline'></div>
      </div>
      <div className="inputs">
        {action === "Login" ? <div></div> : <div className="input">
          <span className="icon">
            <i className="bi bi-person-circle"></i>
          </span>
          <input type="text" placeholder='Username' onChange={(e) => setUsername(e.target.value)} />
        </div>}

        <div className="input">
          <span className="icon">
            <i className="bi bi-envelope"></i>
          </span>
          <input type="email" placeholder='Email' onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="input">
          <span className="icon">
            <i className="bi bi-eye"></i>
          </span>
          <input type="password" placeholder='Password' onChange={(e) => setPassword(e.target.value)} />
        </div>
      </div>
      {action === "Sign Up" ? <div></div> : <div className="forgot-password">Forgot password? <span>Click Here!</span></div>}
      <div className="submit-container">
        <div className={action === "Login" ? "submit gray" : "submit"} onClick={() => { setAction("Sign Up") }}>Sign Up</div>
        <div className={action === "Sign Up" ? "submit gray" : "submit"} onClick={() => { setAction("Login") }}>Login</div>
      </div>
    </div>
  );
};

export default SignUp;
