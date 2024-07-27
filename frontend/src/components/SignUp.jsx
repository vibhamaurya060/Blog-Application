

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../style/signup.css'; 
const SignUp = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('reader');

  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    console.log('Submitting:', { username, email, password, role });

    try {
      const response = await axios.post('https://blog-application-4179.onrender.com/api/auth/register', {
        username,
        email,
        password,
        role,
      });

      console.log('Signup successful:', response.data);
      alert('User registered successfully!');
      navigate('/login');
    } catch (error) {
      console.error('Error during signup:', error.response?.data || error.message);
      alert(`Signup failed: ${error.response?.data?.message || 'Please try again.'}`);
    }
  };

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSignUp} className="signup-form">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <select value={role} onChange={(e) => setRole(e.target.value)} required>
          <option value="admin">Admin</option>
          <option value="author">Author</option>
          <option value="reader">Reader</option>
        </select>
        <button type="submit" className="btn btn-signup">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUp;
