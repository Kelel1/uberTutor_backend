const User = require("../../models/User");
const Rating = require("../../models/Rating");
const Roles = require("../../models/Roles");
const UserProfile = require("../../models/UserProfile");


module.exports = {
  Query: {
    users: async () => {
      return await User.find({});
    },
    roles: () => Roles.find({}),
  },
  Mutation: {
    createUser: async (
      parent,
      { name, email, password, location, avatar, categories, role }
    ) => {
      const user = await new User({
        name,
        email,
        password,
        role,
      });
      const selectedRole = Roles.findOne({ _id: role }, { name: 1, _id: 0 });
      let profile = await new UserProfile({
        user: user._id,
        location,
        avatar,
      });
      // if (selectedRole.name === "student") {
      //   await profile.save();
      // }
      // if (selectedRole.name === "tutor") {
      //   profile = await new UserProfile({
      //     user: user._id,
      //     location,
      //     avatar,
      //     categories,
      //   });
      //   await profile.save();
      // }
      await profile.save();
      return user.save();
    },
    createRole: async (parent, { name, description }) => {
      const role = await new Role({
        name,
        description,
      });
      return role.save();
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