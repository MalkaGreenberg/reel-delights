import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import image from '../assets/MovieNight.png';
import Login from './login';
import "../styles/landingPage.css";
import Auth from '../utils/auth';
import Modal from 'react-modal';

const LandingPage = () => {

  const isLoggedIn = Auth.loggedIn();

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [reloadData, setReloadData] = useState(false);
  const [loginModalIsOpen, setLoginModalIsOpen] = useState(false);

  const openLoginModal = () => {
    setLoginModalIsOpen(true);
  };

  const closeLoginModal = () => {
    setLoginModalIsOpen(false);
  };

  return (
    <div className="container">
      <div className="left-content">
        <h1>Reel Delights</h1>
        <p>
          Feeling social? Create a Movie Mingle Night with just a few clicks.
          Send calendar invites to your friends, allowing them to mark their
          calendars for a cinematic rendezvous. Each friend invited gets to vote
          on the movie of the night and share their own recommendations.
        </p>
        {isLoggedIn ? (
          <>
            <button onClick={() => Auth.logout()} className="btn">
              Logout
            </button>
            <Link to="/dashboard" className="btn">
              Dashboard
            </Link>
          </>

        ) : (
          // <Link to="/login" className="btn">
          //   Login/Signup
          // </Link>
          <>
            <button onClick={openLoginModal} className="btn">
              Login/Signup
            </button>
            <Modal
              isOpen={loginModalIsOpen}
              onRequestClose={closeLoginModal}
              style={{
                content: {
                  width: '375px',
                  height: '500px',
                  margin: 'auto',
                  overflow: 'auto',
                },
              }}
            >
              <Login onClose={closeLoginModal} />
            </Modal>
          </>
        )}
        <a
          href="https://github.com/MalkaGreenberg/reel-delights"
          className="btn btn-github"
          target="_blank"
        >
          Check us out on GitHub
        </a>
      </div>
      <div className="right-content">
        <img className="movieNight" src={image} alt="Reel Delights Image" />
      </div>
    </div>
  );
}

export default LandingPage;