// MovieMingleDetails.js
import React from 'react';
import { useParams } from 'react-router-dom';
import { GET_MINGLE_BY_ID } from '../utils/queries';
import { useQuery } from "@apollo/client";
import Countdown from 'react-countdown';
import Sidebar from './Sidebar';

const MingleDetails = () => {
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
      return <p>Event has already occurred</p>;
    } else {
      return (
        <div>
          <p>{days} days, {hours} hours, {minutes} minutes, {seconds} seconds</p>
        </div>
      );
    }
  };

  return (
    <div className="mingle-details-container">
      <div className="sidebar-container">
        <Sidebar />
      </div>
      <div className="content-container">
        <h2>{mingle.movie.title}</h2>
        <Countdown
          date={eventTime}
          renderer={CountdownRenderer}
        />
        {/* Display other Mingle details as needed */}
      </div>
    </div>
  );
};

export default MingleDetails;
