import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../index.css';
import authService from '../services/authService';

const NavBar = () => {
//   const user = auth.getCurrentUser(); // Replace with actual user-fetching logic
  const navigate = useNavigate()

  const handleLogout = () => {
    authService.signOut(); // Replace with actual logout logic
    navigate('/login') // Redirect after logout
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
