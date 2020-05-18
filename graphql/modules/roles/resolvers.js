const User = require("../../../models/User");
const Rating = require("../../../models/Rating");
const Role = require("../../../models/Role");
const UserProfile = require("../../../models/UserProfile");

module.exports = {
  Query: {
    roles: () => Roles.find({}),
  },
  Mutation: {
    createRole: async (parent, { name, description }) => {
      const role = await new Role({
        name,
        description,
      });
      return role.save();
    },
  },
};
