import React from 'react';
import LandingPage from './components/landingPage';
import LoginPage from './components/login';
// import LoginPage from './components/new-event';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css' // CSS File


const App = () => {
  return (
    <Router>
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
    </Routes>
    </Router>
  );
}

export default App;