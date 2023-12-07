import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import image from '../assets/MovieNight.png';
import "../styles/landingPage.css";

const LandingPage = () => {
  return (
    <div class="container">
        <div class="left-content">
            <h1>Reel Delights</h1>
            <p>Feeling social? Create a Movie Mingle Night with just a few clicks. Send calendar invites to your friends, allowing them to mark their calendars for a cinematic rendezvous. Each friend invited gets to vote on the movie of the night and share their own recommendations.</p>
            <Link to="/login" className="btn">Login/Signup</Link>
            <a href="https://github.com/MalkaGreenberg/reel-delights" class="btn btn-github" target="_blank">Check us out on GitHub</a>
        </div>
        <div class="right-content">
            <img class="movieNight" src={image} alt="Reel Delights Image"/>
        </div>
    </div>
  );
}

export default LandingPage;