
import React from 'react'

const Navbar = ({ onGetStarted }) => {
  return (
    <nav className="navbar">
      <a href="#home" className="logo">SmartBuy.</a>

      <ul className="u">
        <li><a href="#home">Home</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#how-it-works">How It Works</a></li>
      </ul>

      <button className="btn" onClick={onGetStarted}>
        Get Started
      </button>
    </nav>
  )
}

export default Navbar
