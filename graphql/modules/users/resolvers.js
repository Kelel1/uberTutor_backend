const User = require("../../../models/User");
const Rating = require("../../../models/Rating");
const Roles = require("../../../models/Roles");
const UserProfile = require("../../../models/UserProfile");
const { register } = require('./helpers')

module.exports = {
  Query: {
    users: async () => {
      return await User.find({});
    },
  },
  Mutation: {
    createUser: async (_, { user }) => {
      return register(user)
    },
  },
  User: {
    profile: async (parent) => {
      return await UserProfile.findOne({ user: parent.id });
    },
    role: async (parent) => {
      return await Roles.findById(parent.role);
    },
  },
};
