import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const Register = () => {

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleInput = (e) => {
    e.preventDefault();
    setFormData(prevState => {
      return { ...prevState, [e.target.name]: e.target.value };
    })
  }

  const registerUser = async (e) => {
    e.preventDefault();
    setError('');
    try {

      const response = await axios.post('http://localhost:3000/api/users/register', formData);
      const newUser = await response.data;
      if (!newUser) {
        setError('Could not register, please try after sometime.');
      }
      navigate('/login');

    } catch (err) {
      setError(err.response?.data?.message || 'An error occured');
    }
  }

  return (
    <div className="register-container">
      <h2>Sign Up</h2>
      <form onSubmit={registerUser}>
        {error && <p className="form_error-message">{error}</p>}
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={(e) => handleInput(e)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={(e) => handleInput(e)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={(e) => handleInput(e)}
          />
        </div>
        <button type="submit">Sign Up</button>
      </form>
      <div className='already-registered'>Already registered? <Link to="/login" className='b-link'>Sign In</Link> </div>
    </div>
  )
}

export default Register