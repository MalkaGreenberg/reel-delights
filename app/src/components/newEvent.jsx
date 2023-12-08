import React, { useState, useEffect } from 'react';
import MovieSearch from './MovieSearch'; // Import MovieSearch component
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../styles/new-event.css';

const NewEvent = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedFriends, setSelectedFriends] = useState([]);
  const [movieSuggestions, setMovieSuggestions] = useState('');
  const [friendsList, setFriendsList] = useState([]);
  const [selectedMovies, setSelectedMovies] = useState([]); // New state for selected movies

  useEffect(() => {
    const fetchFriendsFromDatabase = async () => {
      try {
        const response = await fetch('/api/friends');
        const data = await response.json();
        setFriendsList(data);
      } catch (error) {
        console.error('Error fetching friends:', error);
      }
    };

    fetchFriendsFromDatabase();
  }, []);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleTimeChange = (e) => {
    setSelectedTime(e.target.value);
  };

  const handleFriendsChange = (e) => {
    const friendId = parseInt(e.target.value);
    const isChecked = e.target.checked;

    if (isChecked) {
      setSelectedFriends([...selectedFriends, friendId]);
    } else {
      setSelectedFriends(selectedFriends.filter((id) => id !== friendId));
    }
  };

  const handleMovieSuggestionsChange = (e) => {
    setMovieSuggestions(e.target.value);
  };

  const handleMovieSelect = (selectedMovie) => {
    setSelectedMovies(prevMovies => [...prevMovies, selectedMovie]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    // (Form submission logic)
  
    console.log('Form submitted:', {
      selectedDate,
      selectedTime,
      selectedFriends,
      movieSuggestions,
      selectedMovies,
    });
  
    // Clear the form fields after submission
    setSelectedDate(null);
    setSelectedTime('');
    setSelectedFriends([]); // Clear selectedFriends
    setMovieSuggestions('');
    setSelectedMovies([]); // Clear selectedMovies
  };  

  return (
    <div className="event-form-container">
      <h2>Event Details</h2>
      <form className="event-form" onSubmit={handleSubmit}>
        <div>
          <label>Select Date:</label>
          <DatePicker selected={selectedDate} onChange={handleDateChange} />
        </div>

        <div>
          <label>Select Time:</label>
          <input type="time" value={selectedTime} onChange={handleTimeChange} />
        </div>

        <div>
          <label>Friends:</label>
          {friendsList.map((friend) => (
            <div key={friend.id}>
              <input
                type="checkbox"
                value={friend.id}
                checked={selectedFriends.includes(friend.id)}
                onChange={handleFriendsChange}
              />
              <span>{friend.name}</span>
            </div>
          ))}
        </div>

        {/* Include MovieSearch component */}
        <div>
          <label>Select Movies:</label>
          <MovieSearch onMovieSelect={handleMovieSelect} />
        </div>

        {/* Display selected movies */}
        <div>
          <label>Selected Movies:</label>
          <ul>
            {selectedMovies.map((movie) => (
              <li key={movie.imdbID}>{movie.Title}</li>
            ))}
          </ul>
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default NewEvent;