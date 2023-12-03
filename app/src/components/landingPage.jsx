import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import image from '../assets/landingpage.png';

const LandingPage = () => {
  const containerStyle = {
    display: 'flex',
    maxWidth: '1000px',
    margin: '0 auto',
    padding: '20px',
    backgroundColor: '#fff',
    borderRadius: '10px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  };

  const leftContentStyle = {
    flex: 1,
    padding: '20px',
    textAlign: 'left',
  };

  const rightContentStyle = {
    flex: 1,
    textAlign: 'center',
  };

  const h1Style = {
    fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
    color: '#333',
  };

  const pStyle = {
    color: '#666',
  };

  const btnStyle = {
    display: 'inline-block',
    padding: '10px 20px',
    textDecoration: 'none',
    backgroundColor: '#3498db',
    color: '#fff',
    borderRadius: '5px',
    fontWeight: 'bold',
    marginTop: '20px',
    display: 'block',
  };

  const btnGithubStyle = {
    backgroundColor: '#2c3e50',
  };

  const imgStyle = {
    maxWidth: '100%',
    height: 'auto',
    borderRadius: '10px',
  };

  return (
    <Container className="mt-5" style={containerStyle}>
      <Row>
        <Col md={5} className="text-left" style={leftContentStyle}>
          <h1 style={h1Style}>Reel Delights</h1>
          <p style={pStyle}>Feeling social? Create a Movie Mingle Night with just a few clicks. Send calendar invites to your friends, allowing them to mark their calendars for a cinematic rendezvous. Each friend invited gets to vote on the movie of the night and share their own recommendations.</p>
          <Button href="#login-signup" className="btn btn-primary mt-3" style={btnStyle}>Login/Signup</Button>
          <Button href="https://github.com/yourusername/reeldelights" target="_blank" className="btn btn-dark mt-2" style={{ ...btnStyle, ...btnGithubStyle }}>Check us out on GitHub</Button>
        </Col>
        <Col md={5} className="text-center" style={rightContentStyle}>
          <img src={image} alt="Reel Delights Image" style={imgStyle} />
        </Col>
      </Row>
    </Container>
  );
}

export default LandingPage;