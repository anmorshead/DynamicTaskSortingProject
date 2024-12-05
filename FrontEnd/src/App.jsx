import React, { useState } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Main from './components/Main.jsx';
import SignupForm from './components/SignupForm.jsx';
import LoginForm from './components/LoginForm.jsx';

const App = () => {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   const handleLogin = ({ email, password }) => {
//     console.log('Login attempt:', email, password);
//     setIsLoggedIn(true); // Update this logic with actual authentication
//   };

//   const handleSignup = ({ email, password }) => {
//     console.log('Signup attempt:', email, password);
//     setIsLoggedIn(true); // Update this logic with actual signup
//   };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginForm  />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/" element={<Main />}/>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
