import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../context/userContext'

const Header = () => {

  const { currentUser } = useContext(UserContext);
  console.log(currentUser?.user?._id);

  return (
    <>
      <nav className='nav-container'>

        {currentUser?.user?._id ? (
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>
            <li>
              <Link to="/logout">Logout</Link>
            </li>
          </ul>
        ) : (
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
          </ul>
        )}
      </nav>
    </>
  )
}

export default Header