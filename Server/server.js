const express = require('express');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const path = require('path');
const db = require('./config/connection');
const { typeDefs, resolvers } = require('./schemas'); // Import your GraphQL schema and resolvers
const { authMiddleware } = require("./utils/auth");
const { sendEmail } = require('./emailModule');

const PORT = process.env.PORT || 3001;

// Create an Apollo Server instance with your type definitions and resolvers
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
//   persistedQueries: false, 
});
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Email sending endpoint
app.post('/api/email/send-email', async (req, res) => {
  try {
    const { to, subject, text } = req.body;

    // Use your email sending logic here
    await sendEmail(to, subject, text);

    res.json({ success: true, message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../app/dist')));

    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '../app/dist/index.html'));
    });
  } 

const startApolloServer = async (typeDefs, resolvers) => {
  await server.start();
 
  app.use('/graphql', expressMiddleware(server, {
    context: authMiddleware
  }));

  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
    }); 
  });
};

startApolloServer(typeDefs, resolvers);