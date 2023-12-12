// MovieMingleDetails.js
import React from 'react';
import { useParams } from 'react-router-dom';
import { GET_MINGLE_BY_ID } from '../utils/queries';
import { useQuery } from "@apollo/client";

const MingleDetails = () => {
    const { mingleId } = useParams();
    console.log( mingleId);
    const { loading, error, data } = useQuery(GET_MINGLE_BY_ID, {
      variables: { mingleId },
    });
  
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;
  
    const mingle = data.getMingleById;
  
    if (!mingle) {
      return <p>Mingle not found</p>;
    }
  
    return (
      <div>
        <h2>{mingle.movie.time}</h2>
        {/* Display other Mingle details as needed */}
      </div>
    );
  };
  
  export default MingleDetails;