import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../index.css';
import authService from '../services/authService';

const NavBar = () => {
  const navigate = useNavigate()

  const handleLogout = () => {
    authService.signOut((success) => {
      if (success) {
        navigate('/login'); // Redirect after logout
      } else {
        // Handle failure to logout if needed
        console.error('Logout failed');
      }
    });
  };
  
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <span className="welcome-text">Welcome {authService.getSignedInUser()}</span>
      </div>
      <div className="navbar-right">
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
};

export default NavBar;
