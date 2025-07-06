import React from 'react';
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const name = e.target.elements.name.value;
    localStorage.setItem('patientName', name);
    navigate('/dashboard');
  };

  return (
    <div className="form-container">
      <h2>Login With Your Email</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-wrapper">
          <FaUser className="input-icon" />
          <input name="name" type="text" placeholder="Name" required />
        </div>
        <div className="input-wrapper">
          <FaEnvelope className="input-icon" />
          <input name="email" type="email" placeholder="Email" required />
        </div>
        <div className="input-wrapper">
          <FaLock className="input-icon" />
          <input name="password" type="password" placeholder="Password" required />
        </div>
        <button type="submit">Login</button>
      </form>
      <p>Don't have an account? <Link to="/">Sign up</Link></p>
    </div>
  );
}

export default Login;


