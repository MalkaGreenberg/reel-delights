const { User } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');
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
          throw AuthenticationError
        },
        getUserMinglesById: async (parent, { userId }, context) => {
          // if (userId) {
            // Assuming the user ID is available in context.user._id
            const userMingles = await User.findById(userId)
              .select("movieMingles")
              .populate("movieMingles");
    
            return userMingles ? userMingles.movieMingles : [];
          // }

          // throw new Error("can not find Mingles for this user");
        },
      },
    Mutation: {
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });
      
            if (!user) {
              throw AuthenticationError
            }
      
            const correctPassword = await user.isCorrectPassword(password);
      
            if (!correctPassword) {
              throw AuthenticationError
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
      
            throw AuthenticationError
          },

          removeMingle: async (parent, { mingleId }, context) => {
            if (context.user) {
              const updatedUser = await User.findByIdAndUpdate(
                context.user._id,
                { $pull: { movieMingles: { mingleId } } },
                { new: true }
              ).populate('movieMingles');
      
              return updatedUser;
            }
      
            throw AuthenticationError
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