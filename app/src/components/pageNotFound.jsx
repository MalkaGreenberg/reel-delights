import React from 'react';

const NotFoundPage = () => {
  return (
    <div>
       <link rel="icon" type="image/svg+xml" href="./movie.svg" />
       <img className='svg' src="./movie.svg" alt="movie" />
      <h1>404 - Page Not Found</h1>
      <p>Sorry, the page you are looking for does not exist.</p>
    </div>
  );
};

export default NotFoundPage;