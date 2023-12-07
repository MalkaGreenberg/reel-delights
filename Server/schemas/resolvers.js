const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
const { signToken } = require('../utils/auth');
const { GraphQLScalarType } = require('graphql');
const { Kind } = require('graphql/language');

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
          console.log('Context:', context);
          if (context.user) {
            const userData = await User
                        .findOne({ _id: context.user._id })
                        .select("-__v -password")
                        .populate("movieMingles");
                    
                    return userData;
          }
          throw new AuthenticationError('You need to be logged in!');
        },
      },
    Mutation: {
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });
      
            if (!user) {
              throw new AuthenticationError('Incorrect email or password!');
            }
      
            const correctPassword = await user.isCorrectPassword(password);
      
            if (!correctPassword) {
              throw new AuthenticationError('Incorrect email or password!');
            }
      
            const token = signToken(user);
      
            return { token, user };
          },
      
          addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);
      
            return { token, user };
          },

          saveMingle: async (parent, { input }, context) => {
            console.log('Context user:', context.user);
            if (context.user) {
              const updatedUser = await User.findByIdAndUpdate(
                context.user._id,
                { $push: { movieMingles: input } },
                { new: true }
              ).populate('movieMingles');
      
              return updatedUser;
            }
      
            throw new AuthenticationError('You need to be logged in to save mingles!');
          },

          removeMingle: async (parent, { bookId }, context) => {
            if (context.user) {
              const updatedUser = await User.findByIdAndUpdate(
                context.user._id,
                { $pull: { movieMingles: { bookId } } },
                { new: true }
              ).populate('movieMingles');
      
              return updatedUser;
            }
      
            throw new AuthenticationError('You need to be logged in to remove mingles!');
          },
          
        },
        
        Date: new GraphQLScalarType({
            name: 'Date',
            description: 'Date custom scalar type',
            parseValue(value) {
              return new Date(value); // value from the client
            },
            serialize(value) {
              return value.toISOString(); // value sent to the client
            },
            parseLiteral(ast) {
              if (ast.kind === Kind.STRING) {
                return new Date(ast.value); // ast value is always a string
              }
              return null;
            },
          }),

    };

module.exports = resolvers;