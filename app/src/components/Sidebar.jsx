// Sidebar.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "../styles/sidebar.css";

const Sidebar = () => {

  const navigate = useNavigate();

  const handleHomeClick = () => {
    navigate("/", { replace: true });
  };

  return (
    <div className="sidebar">
      <ul className='sidebarList'>
        <li>
          <Link to="/dashboard" className="link">
          🔎 Search Movies
          </Link>
        </li>
        <li>
          <Link to="/movieMingles" className="link">
          📺 Your Movie Mingles
          </Link>
        </li>
        <li>
          <Link to="/dashboard" className="link">
          👍 Liked Movies
          </Link>
        </li>
        <li>
          <Link to="/" className="link">
          🏠 Home
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
