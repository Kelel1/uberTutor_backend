const User = require('../../../models/User')
const UserProfile = require('../../../models/UserProfile')
const Roles = require('../../../models/Role')

exports.register = async ({ name, email, password, location, avatar, categories, role }) => {
  console.log(categories)
 const user = await new User({
        name,
        email,
        password,
        role,
      });
      const selectedRole = await Roles.findOne({ _id: role }, { name: 1, _id: 0 });
      let profile = await new UserProfile({
        user: user._id,
        location,
        avatar,
      });
      if (selectedRole.name === "tutor") {
        profile = await new UserProfile({
          user: user._id,
          location,
          avatar,
          categories,
        });
      }
      await profile.save();
      return user.save();
}