const express = require('express');
const { ApolloServer } = require('apollo-server-express');
// const { expressMiddleware } = require('@apollo/server/express4');
const path = require('path');
const db = require('./config/connection');
const { typeDefs, resolvers } = require('./schemas'); // Import your GraphQL schema and resolvers
const { authMiddleware } = require("./utils/auth");

const PORT = process.env.PORT || 3001;

// Create an Apollo Server instance with your type definitions and resolvers
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
  persistedQueries: false, 
});
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));

}

const startApolloServer = async (typeDefs, resolvers) => {
  await server.start();
 
  server.applyMiddleware({app});

  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
    }); 
  });
};

startApolloServer(typeDefs, resolvers);