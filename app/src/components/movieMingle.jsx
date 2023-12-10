import React from 'react';
import Auth from '../utils/auth';
import { GET_MINGLES_FOR_USER } from '../utils/queries';
import { useQuery } from '@apollo/client';

const MingleCard = ({ mingle }) => {
  const { _id, movie, time } = mingle;

  return (
    <div style={{ border: '1px solid purple', padding: '16px', margin: '16px', borderRadius: '8px' }}>
      <h3 className="cardTitle">{movie.title}</h3>
      <p>{movie.image}</p>
      <p>{movie.genre}</p>
      <p>{new Date(time).toLocaleString()}</p>
    </div>
  );
};

const MingleList = ({ mingles }) => {
  return (
    <div>
      {mingles.map((mingle) => (
        <MingleCard key={mingle._id} mingle={mingle} />
      ))}
    </div>
  );
};

const MingleApp = () => {
  const user = Auth.getProfile();
  const userId = user.data._id;

  const { loading, data } = useQuery(GET_MINGLES_FOR_USER, {
    variables: { userId },
  });

  const userData = data ? data.getUserMinglesById : [];

  return (
    <div>
      <h1>Movie Mingles</h1>
      {loading ? <p>Loading...</p> : <MingleList mingles={userData} />}
    </div>
  );
};

export default MingleApp;
