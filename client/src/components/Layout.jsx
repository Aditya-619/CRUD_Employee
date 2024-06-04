import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'


const Layout = () => {
  return (
    <div className='app'>
      <Header />
      <main style={{flex: 1}}><Outlet /></main>
      <Footer />
    </div>
  )
}

export default Layout