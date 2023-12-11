// MingleApp.js

import React, { useState } from 'react';
import Auth from '../utils/auth';
import { GET_MINGLES_FOR_USER } from '../utils/queries';
import { useQuery } from '@apollo/client';
import Modal from 'react-modal';
import Sidebar from './Sidebar';
import { useNavigate } from 'react-router-dom';
import NewEvent from './newEvent';
// import { Button, Spin } from 'antd'; // Make sure the import is correct

import '../styles/movieMingle.css'; // Import your CSS file

const MingleCard = ({ mingle }) => {
  const { _id, movie, time } = mingle;

  return (
    <div className='mingle-card'>
      <h3 className="cardTitle">{movie.title}</h3>
      <img src={movie.image} alt={movie.title} className="card-image" />
      <p>{new Date(time).toLocaleString()}</p>
    </div>
  );
};

const MingleList = ({ mingles }) => {
  return (
    <div className="mingle-list">
      {mingles.map((mingle) => (
        <MingleCard key={mingle._id} mingle={mingle} />
      ))}
    </div>
  );
};

const MingleApp = () => {
  const navigate = useNavigate();

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [reloadData, setReloadData] = useState(false); 

  const handleReloadData = () => {
    setReloadData(!reloadData); // Toggle the state to trigger a reload
    setModalIsOpen(false); // Close the modal

    window.location.reload();
  };

  const user = Auth.getProfile();
  const userId = user.data._id;

  const { loading, data } = useQuery(GET_MINGLES_FOR_USER, {
    variables: { userId },
  });

  const userData = data ? data.getUserMinglesById : [];

  return (
    <div className="mingleContainer" >
      <div className="sidebar">
      <Sidebar />
    </div>
      <div  className="page-content">
        <header className="header">
          <h1 className="page-title">Movie Mingles</h1>
          <button className="create-mingle-btn" onClick={() => setModalIsOpen(true)}>
            Create Mingle
          </button>
        </header>

        {loading ? <p>Loading...</p> : <MingleList mingles={userData} />}
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={() => setModalIsOpen(false)}
          style={{
            content: {
              width: '375px',
              height: '500px',
              margin: 'auto',
              overflow: 'auto',
            },
          }}
        >
          {/* Render the NewEvent component in the modal */}
          <NewEvent onClose={() => setModalIsOpen(false)} onReloadData={handleReloadData} />
        </Modal>
      </div>
    </div>
  );
};

export default MingleApp;
