import React, {useState} from 'react';
import Sidebar from '../components/sidebar';
import '../styles/dashboard.css';
import '../styles/card.css';
import clock from "../assets/countdown-clock.png";

const Dashboard = () => {

  const [searchTerm, setSearchTerm] = useState('');

  const [searchResults, setSearchResults] = useState([]);

  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchClick = () => {
   
      fetch(`http://www.omdbapi.com/?s=${searchTerm}&apikey=b5dd3f40`)
      .then((response) => response.json())
      .then((data) => {
        if (data.Search && data.Search.length > 0) {
          setSearchResults(data.Search);
          console.log(data);
          setError(null);
        } else {
          setSearchResults([]);
          setError(data.Error);
        }
      }).catch((error) => {
        console.error('Error fetching data:', error);
        setSearchResults([]);
        setError('An error occurred while fetching data.');
      });

  };


  return (
    <div className="dashboard">
      <Sidebar />
      <main className="content">
        <header>
          <h1>Movie Mingles Dashboard</h1>
        </header>

    {/* Search Bar */}

    <div className="searchBar top-right">
      <input
        type="text"
        placeholder="Search For New Movie"
        value={searchTerm}
        onChange={handleInputChange}
      />
      <button type="button" onClick={handleSearchClick}>
        Search
      </button>

      <ul>
        {searchResults.map((result) => (
          <li key={result.imdbID}>{result.Title}</li>
        ))}
      </ul>
    </div>

      Friends Bar
      <div className="friendsBar top-right">
      Friends
      </div>
        {/* Add your content here */}
      <div className="card-container">
        <div className="card" id="card1">
    <h2>Recommended Movie 1</h2>
    <p>Votes</p>
  </div>

  <div className="card" id="card2">
    <h2>Recommended Movie 2</h2>
    <p>Votes</p>
  </div>

  <div className="card" id="card3">
    <h2>Recommended Movie 3</h2>
    <p>Votes</p>
  </div>
  </div>
  <div className="countdown">
    <div className="image-container"></div>
    <br></br><br></br>
      <h2>Countdown Until The Mingle (Time Goes Here)</h2>
      <img className="clock" src={clock} alt="High Resolution Clock Png Clipart" />    </div>
      
      {/* Text Box*/}
      <div className="textBox">
        <p>Time Left Until Movie Night... 00:00</p>
      </div>
      </main>
    </div>
  );
};

export default Dashboard;
