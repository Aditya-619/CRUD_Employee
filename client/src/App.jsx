import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import './App.css'
import Layout from './components/Layout'
import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login'
import Logout from './pages/Logout'
import Dashboard from './pages/Dashboard'
import UserProvider from './context/userContext'

function App() {

  const router = createBrowserRouter([
    {
      path: '/',
      element: <UserProvider><Layout /></UserProvider>,
      children: [
        {
          index: true,
          element: <Home />
        },
        {
          path: 'register',
          element: <Register />
        },
        {
          path: 'login',
          element: <Login />
        },
        {
          path: 'logout',
          element: <Logout />
        },
        {
          path: 'dashboard',
          element: <Dashboard />
        },
      ]
    }
  ])

  return (
    <RouterProvider router={router}/>
  )
}

export default App
