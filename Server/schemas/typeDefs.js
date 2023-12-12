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
    _Id: ID!
    username: String
  }

   type Query{
    me: User
    getUsers: [User]
    getMingleById(mingleId: ID!): Mingle
    getUserMinglesById(userId: ID!): [Mingle]
    user(userId: ID!): User
  }

   type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveMingle(input: MingleInput!, userId: ID!): User
    removeMingle(mingleId: ID!, userId: ID!): User
   }

   type User {
    _id: ID
    username: String
    email: String
    mingleCount: Int
    movieMingles: [Mingle]
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