import React from 'react';
import LandingPage from './components/landingPage';
// import LoginPage from './components/login';
import LoginPage from'./components/login';
import Dashboard from "./components/dashboard";
import MovieMingle from './components/movieMingle';
import Signup from './components/signup';
import NewEvent from './components/newEvent';
import MingleDetails from './components/mingleDetails';
import PageNotFound from './components/pageNotFound';
// import LoginPage from './components/newEvent';
// import LoginPage from './components/movieMingle';
// import FacebookLoginButton from './components/FacebookLogin';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css' // CSS File


import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache(),
});

const App = () => {
  const handleFacebookLogin = (response) => {
   
    console.log(response);
  };
  return (
    <ApolloProvider client={client}>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          {/* <Route path="/login" element={<LoginPage />} /> */}
          <Route path="/movieMingles" element={<MovieMingle />} />
          <Route path="/dashboard" element={<MovieMingle />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/createMingle" element={<NewEvent />} />
          <Route path="/mingle/:mingleId" element={<MingleDetails />} />
          <Route path="/*" element={<PageNotFound />} />
        </Routes>
      </Router>
    </ApolloProvider>

  );
  
}



export default App;