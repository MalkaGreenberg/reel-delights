const { gql } = require('@apollo/server');

const typeDefs = `
   scalar Date

   input MingleInput {
    movie: MovieInput
    time: Date!
    invites: [InviteInput]
  }

  input MovieInput {
    title: String
    image: String
    genre: String
  }

  input InviteInput {
    userId: ID!
  }

   type Query{
    me: User
   }

   type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveMingle(input: MingleInput!): User
    removeMingle(mingleId: ID!): User
   }

   type User {
    _id: ID
    username: String
    email: String
    mingleCount: Int
    savedMingles: [Mingle]
  }

  type Mingle {
    _id: ID
    movie: Movie
    time: Date
    invites: [User]
  }

  type Movie {
    title: String
    image: String
    genre: String
  }

  type Auth {
    token: ID!
    user: User
  }

`;

module.exports = typeDefs;