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
    getUsers: async (parent, args, context) => {
      // if (userId) {
      // Assuming the user ID is available in context.user._id
      const users = await User.find()
        .select("username")
        .populate("username")
        .populate("email");

      return users ? users : [];
      // }

      // throw new Error("can not find Mingles for this user");
    },
    user: async (parent, { userId }) => {
      return User.findOne(userId);
    },
    getMingleById: async (parent, { mingleId }, context) => {

      const mingle = await User.findOne({ "movieMingles._id": mingleId })
        .select("movieMingles")
        .populate("movieMingles");

      if (!mingle) {
        throw new Error("Mingle not found");
      }

      return mingle.movieMingles.find((m) => m._id.toString() === mingleId);

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

    saveMingle: async (parent, { input, userId }, context) => {
      console.log('Context user:', userId);
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { $push: { movieMingles: input } },
        { new: true }
      ).populate('movieMingles');

      return updatedUser;

    },

    removeMingle: async (parent, { mingleId, userId }, context) => {

      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { $pull: { movieMingles: { _id: mingleId } } },
        { new: true }
      ).populate('movieMingles');

      return updatedUser;

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