import React from 'react';
import Sidebar from '../components/sidebar';
import '../styles/dashboard.css';
import '../styles/card.css';

const Dashboard = () => {
  return (
    <div className="dashboard">
      <Sidebar />
      <main className="content">
        <header>
          <h1>Movie Mingles Dashboard</h1>
        </header>

    {/* Search Bar */}

    <div className="searchBar top-right">
      <input type="text" placeholder="Search For New Movie" />
      <button type="button">Search</button>
      </div>

      {/* Friends Bar */}
      <div className="friendsBar top-right">
      Friends
      </div>
        {/* Add your content here */}
      <div className="card-container">
        <div class="card" id="card1">
    <h2>Recommended Movie 1</h2>
    <p>Votes</p>
  </div>

  <div class="card" id="card2">
    <h2>Recommended Movie 2</h2>
    <p>Votes</p>
  </div>

  <div class="card" id="card3">
    <h2>Recommended Movie 3</h2>
    <p>Votes</p>
  </div>
  </div>
  <div className="countdown">
    <div className="image-container"></div>
    <br></br><br></br>
      <h2>Countdown Until The Mingle (Time Goes Here)</h2>
      <img src="https://www.freeiconspng.com/uploads/clock-png-13.png" alt="High Resolution Clock Png Clipart" />    </div>
      
      {/* Text Box*/}
      <div className="textBox">
        <p>Time Left Until Movie Night... 00:00</p>
      </div>
      </main>
    </div>
  );
};

export default Dashboard;
