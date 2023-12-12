// MingleApp.js

import React, { useState } from 'react';
import Auth from '../utils/auth';
import { GET_MINGLES_FOR_USER } from '../utils/queries';
import { REMOVE_MINGLE } from '../utils/mutations';
import { useQuery, useMutation } from '@apollo/client';
import Modal from 'react-modal';
import Sidebar from './Sidebar';
import { Link, useNavigate } from 'react-router-dom';
import NewEvent from './newEvent';
// import { Button, Spin } from 'antd'; // Make sure the import is correct

import '../styles/movieMingle.css'; // Import your CSS file

const MingleCard = ({ mingle }) => {
  const { _id, movie, time } = mingle;

  const [removeMingleMutation] = useMutation(REMOVE_MINGLE);

  const handleDeleteClick = async () => {
    try {
      const user = Auth.getProfile();
      const userId = user.data._id;

      const { data: removeMingle } = await removeMingleMutation({
        variables: { mingleId: _id, userId: userId },
      });

      console.log(_id);
      console.log('Mingle removed:', removeMingle.removeMingle);

      window.location.reload();
    } catch (error) {
      console.error('Error deleting mingle:', error);
    }
  };

  return (
    <div className='mingle-card'>
      <h3 className="cardTitle">{movie.title}</h3>
      <Link to={`/mingle/${_id}`}>
        <img src={movie.image} alt={movie.title} className="card-image" />
      </Link>
      <p>{new Date(time).toLocaleString()}</p>
      <button className='trashCan' onClick={handleDeleteClick} >🗑️DELETE </button>
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
    setModalIsOpen(false); 

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
      <div className="page-content">
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
