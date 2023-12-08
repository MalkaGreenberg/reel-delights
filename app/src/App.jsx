import React from 'react';
import LandingPage from './components/landingPage';
import LoginPage from './components/login';
// import FacebookLoginButton from './components/FacebookLogin';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css' 


const App = () => {
  const handleFacebookLogin = (response) => {
   
    console.log(response);
  };
  return (
    <Router>
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      {/* <Route path="/facebook-login" element={<FacebookLoginButton onFacebookLogin={handleFacebookLogin} />} /> */}
    </Routes>
    </Router>

    
  );
  
}



export default App;