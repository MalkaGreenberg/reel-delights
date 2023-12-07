import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const MyEventForm = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState('');
  const [friends, setFriends] = useState('');
  const [movieSuggestions, setMovieSuggestions] = useState('');

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleTimeChange = (e) => {
    setSelectedTime(e.target.value);
  };

  const handleFriendsChange = (e) => {
    setFriends(e.target.value);
  };

  const handleMovieSuggestionsChange = (e) => {
    setMovieSuggestions(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Handle form submission logic here
    // You can access the form data: selectedDate, selectedTime, friends, movieSuggestions
    console.log('Form submitted:', {
      selectedDate,
      selectedTime,
      friends,
      movieSuggestions,
    });

    // Clear the form fields after submission
    setSelectedDate(null);
    setSelectedTime('');
    setFriends('');
    setMovieSuggestions('');
  };

  return (
    <div>
      <h2>Event Details</h2>
      <form onSubmit={handleSubmit}>
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
          <input type="text" value={friends} onChange={handleFriendsChange} />
        </div>

        <div>
          <label>Movie Suggestions:</label>
          <textarea
            value={movieSuggestions}
            onChange={handleMovieSuggestionsChange}
          />
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default MyEventForm;