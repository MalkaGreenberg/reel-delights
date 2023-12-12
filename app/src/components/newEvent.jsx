import React, { useState, useEffect } from 'react';
import MovieSearch from './MovieSearch';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../styles/new-event.css';
import { GET_ALL_USERS, GET_MINGLES_FOR_USER } from '../utils/queries';
import { ADD_MINGLE } from '../utils/mutations';
import { useQuery, useMutation } from '@apollo/client';
import Select from 'react-dropdown-select';
import Auth from '../utils/auth';

const NewEvent = ({ onClose, onReloadData }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedFriends, setSelectedFriends] = useState([]);
  const [addMingle, error] = useMutation(ADD_MINGLE, {
    refetchQueries: [
      GET_MINGLES_FOR_USER,
      'getMingleById'
    ]
  });

  const [selectedMovies, setSelectedMovies] = useState('');

  const { loading, data } = useQuery(GET_ALL_USERS);
  const usersList = data?.getUsers || [];
  console.log(usersList);

  useEffect(() => {}, []);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleTimeChange = (e) => {
    const time = e.target.value;
    // Update the time component of selectedDate
    setSelectedDate((prevDate) => {
      const newDate = prevDate ? new Date(prevDate) : new Date();
      newDate.setHours(parseInt(time.split(':')[0], 10));
      newDate.setMinutes(parseInt(time.split(':')[1], 10));
      return newDate;
    });
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

    const invitesArray = selectedFriends.map((friendId) => ({ _Id: friendId }));

    const user = Auth.getProfile();
    const userId = user.data._id;

    const movieMingle = {
      input: {
        movie: {
          title: selectedMovies.Title,
          image: selectedMovies.Poster,
          genre: selectedMovies.Type,
        },
        time: selectedDate, // selectedDate now includes both date and time
        invites: invitesArray,
      },
      userId: user.data._id,
    };

    const { data: addMingleData } = await addMingle({
      variables: movieMingle,
    });

    console.log('Mingle added:', addMingleData.addMingle);

    console.log('Form submitted:', {
      selectedDate,
      selectedFriends,
      selectedMovies,
      userId,
    });

    onReloadData();
  };

  return (
    <div className="event-form-container">
      <h2>Event Details</h2>
      <form className="event-form" onSubmit={handleSubmit}>
        <div>
          <label>Select Date:</label>
          <DatePicker selected={selectedDate} onChange={handleDateChange} showTimeSelect />
        </div>

        <div>
          <label>Invite Friends:</label>
          <div>
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

        <div>
          <label>Search Movies:</label>
          <MovieSearch onMovieSelect={handleMovieSelect} />
        </div>

        <div>
          <label>Selected Movie:</label>
          <ul>{selectedMovies.Title}</ul>
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default NewEvent;
