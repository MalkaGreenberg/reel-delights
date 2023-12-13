// MovieMingleDetails.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { GET_MINGLE_BY_ID } from '../utils/queries';
import { useQuery } from "@apollo/client";
import Countdown from 'react-countdown';
import Sidebar from './Sidebar';
import clock from "../assets/countdown-clock.png";

const MingleDetails = () => {
  const [additionalDetails, setAdditionalDetails] = useState(null);
  const { mingleId } = useParams();
  console.log(mingleId);

  const { loading, error, data } = useQuery(GET_MINGLE_BY_ID, {
    variables: { mingleId },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const mingle = data.getMingleById;
  console.log(mingle);

  if (!mingle) {
    return <p>Mingle not found</p>;
  }

  // Calculate the time difference between now and the event time
  const eventTime = new Date(mingle.time).toISOString();
  const currentTime = new Date().toISOString();
  const timeDiff = eventTime - currentTime;

  // Render countdown component
  const CountdownRenderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      // If the event has passed, display a message
      return <div className="custom-countdown">
        <div>
          <img className='countdown-clock-img' src={clock} alt="High Resolution Clock Png Clipart" />
        </div>
        <div>
          <h3>Event has already occurred</h3>
        </div>
      </div>;
    } else {
      return (
        <div className="custom-countdown">
          <div>
            <img className='countdown-clock-img' src={clock} alt="High Resolution Clock Png Clipart" />
          </div>
          <div className="countdown-section">
            <div className="countdown-item">
              <span>{days}</span>
              <p>Days</p>
            </div>
            <div className="countdown-item">
              <span>{hours}</span>
              <p>Hours</p>
            </div>
          </div>
          <div className="divider"><h1></h1></div>
          <div className="countdown-section">
            <div className="countdown-item">
              <span>{minutes}</span>
              <p>Minutes</p>
            </div>
            <div className="countdown-item">
              <span>{seconds}</span>
              <p>Seconds</p>
            </div>
          </div>
        </div>
      );
    }
  };

  const fetchAdditionalDetails = async () => {
    try {
      const response = await fetch(`https://www.omdbapi.com/?t=${mingle.movie.title}&apikey=b5dd3f40`);
      const data = await response.json();

      // Update state only if the component is still mounted

      setAdditionalDetails({
        genre: data.Genre,
        plot: data.Plot,
        rated: data.Rated,
      });

    } catch (error) {
      console.error('Error fetching additional details:', error);
    }
  };

  fetchAdditionalDetails();


  return (
    <div className="mingle-details-container">
      <div className="sidebar-container">
        <Sidebar />
      </div>
      <div className='details-container2'>
        <h1 className="page-title">{mingle.movie.title}</h1>
        <div className="content-container">
          <div className='movie-container'>
            <img src={mingle.movie.image} alt={mingle.movie.title} />
            <div className='movie-details'>
              <div className='detail'><h2>Genre: </h2><h3>{additionalDetails?.genre}</h3></div>
              <div className='detail' ><h2>Rated: </h2><h3>{additionalDetails?.rated}</h3></div>
              <div className='detail'><h2>Plot: </h2><h3>{additionalDetails?.plot}</h3></div>
            </div>
          </div>
          <Countdown className='countdown'
            date={eventTime}
            renderer={CountdownRenderer}
          />
        </div>
      </div>
    </div>
  );
};

export default MingleDetails;
