import React, { useState, useEffect } from 'react';
import MovieSearch from './MovieSearch'; // Import MovieSearch component
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../styles/new-event.css';
import { GET_ALL_USERS } from '../utils/queries';
import { ADD_MINGLE } from '../utils/mutations';
import { useQuery, useMutation } from '@apollo/client';
import Select from "react-dropdown-select";
import Auth from '../utils/auth';

const NewEvent = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedFriends, setSelectedFriends] = useState([]);
  const [friendsList, setFriendsList] = useState([]);
  const [addMingle, error] = useMutation(ADD_MINGLE);
  const [selectedMovies, setSelectedMovies] = useState(''); // New state for selected movies

  const { loading, data } = useQuery(GET_ALL_USERS);


  const usersList = data?.getUsers || [];
  console.log(usersList);

  useEffect(() => {

  }, []);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleTimeChange = (e) => {
    setSelectedTime(e.target.value);
  };

  const handleFriendsChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions, (option) =>
      parseInt(option.value)
    );
    setSelectedFriends(selectedOptions);
  };

  const handleMovieSelect = (selectedMovie) => {
    setSelectedMovies(selectedMovie);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const invitesArray = selectedFriends.map(friendId => ({ _Id: friendId }));

    const user = Auth.getProfile();
    const userId = user.data._id;

    const movieMingle = {
      input: {
        movie: {
          title: selectedMovies.Title,
          image: selectedMovies.Poster,
          genre: selectedMovies.Type
        },
        time: selectedDate,
        invites: invitesArray
      },
      userId: user.data._id
    };

    const { data: addMingleData } = await addMingle({
      variables: movieMingle,
    });

    console.log('Mingle added:', addMingleData.addMingle);

    console.log('Form submitted:', {
      selectedDate,
      selectedTime,
      selectedFriends,
      selectedMovies,
      userId,
    });



    // Clear the form fields after submission
    setSelectedDate(null);
    setSelectedTime('');
    setSelectedFriends([]); 
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

        <div >
          <label>Invite Friends:</label>
          <div >
            <Select
              multi="true"
              color="#187a8e"
              options={usersList}
              labelField="username"
              valueField="_id"
              onChange={(values) => setSelectedFriends(values.map((value) => value._id))}
            />
          </div>
        </div>

        {/* Include MovieSearch component */}
        <div>
          <label>Search Movies:</label>
          <MovieSearch onMovieSelect={handleMovieSelect} />
        </div>

        {/* Display selected movies */}
        <div>
          <label>Selected Movie:</label>
          <ul>
            {selectedMovies.Title}
          </ul>
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default NewEvent;