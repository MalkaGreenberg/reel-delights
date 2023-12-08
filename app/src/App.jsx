import React from 'react';
import LandingPage from './components/landingPage';
import LoginPage from './components/login';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css' // CSS File


import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache(),
});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </Router>
    </ApolloProvider>

  );
}

export default App;