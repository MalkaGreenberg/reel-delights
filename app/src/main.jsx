import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import LandingPage from './components/landingPage.jsx';
import Dashboard from './components/dashboard.jsx';
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* this is temporary, until we set up App.jsx */}
    <Dashboard />  
  </React.StrictMode>,
)
