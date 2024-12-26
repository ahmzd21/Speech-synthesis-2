import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faUser } from '@fortawesome/free-solid-svg-icons';
import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="icon-container">
        <FontAwesomeIcon icon={faBars} size="1x" color="white" />
      </div>
      <div className="nav-links">
        <a href="#home">Home</a>
        <a href="#products">Products</a>
        <a href="#pricing">Pricing</a>
        <a href="#about">About Us</a>
        <a href="#contact">Contact</a>
      </div>
      <div className="icon-container">
        <FontAwesomeIcon icon={faUser} size="1x" color="white" />
      </div>
    </nav>
  );
}

export default Navbar;
