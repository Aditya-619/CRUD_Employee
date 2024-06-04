import axios from 'axios';
import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../context/userContext';

const Login = () => {

  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleInput = (e) => {
    setFormData(prevState => {
      return { ...prevState, [e.target.name]: e.target.value }
    });
  }

  const { setCurrentUser } = useContext(UserContext);
  const navigate = useNavigate();

  const loginUser = async (e) => {
    e.preventDefault();
    setError('');
    try {

      const response = await axios.post('http://localhost:3000/api/users/login', formData);
      const user = await response.data;
      setCurrentUser(user);
      navigate('/dashboard');

    } catch (err) {
      setError(err.message || 'An error occured.')
    }
  }

  return (
  
    <div className="register-container">
      <h2>Sign In</h2>
      <form onSubmit={loginUser}>
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
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.passwowrd}
            onChange={(e) => handleInput(e)}
            />
        </div>
        <button type="submit">Sign In</button>
      </form>
      <div className='already-registered'>Don't have an account? <Link to="/register" className='b-link'>Sign Up</Link> </div>
            {error && <p className="form_error-message">{error}</p>}
    </div>
  )
}

export default Login