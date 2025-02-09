import React from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';

const NavBar = () => {
  const navigate = useNavigate()

  const handleLogout = () => {
    authService.signOut((success) => {
      if (success) {
        navigate('/login'); // Redirect after logout
      } else {
        // Handle failure to logout
        console.error('Logout failed');
      }
    });
  };
  
  return (
    <nav className="flex w-full justify-between items-center p-4 bg-[#160224] border-b-2 border-[#401f64] mb-10 mt-5">
      <div className="flex items-center">
        <span className="text-white text-lg">Welcome {authService.getSignedInUser()}</span>
      </div>
      <div className="flex items-center">
        <button
          className="px-4 py-2 bg-[#007bff] text-white rounded-md hover:bg-[#025ec1] transition-colors"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default NavBar;
