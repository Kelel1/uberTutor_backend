const User = require("../../../models/User");
const UserProfile = require("../../../models/UserProfile");
const Roles = require("../../../models/Role");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt')
exports.register = async ({
  name,
  email,
  password,
  location,
  avatar,
  categories,
  role,
}) => {
  const exists = await User.findOne({ email });
  if (exists) { 
      throw new Error("User already exists");
  }
  password = await bcrypt.hash(password, 12);
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
  const token = generateAccessToken(user, "1hr");
  return {
    id: user.id,
    token,
    ...user._doc,
  };
};

exports.login = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error("Invalid Credentials");
  const match = await bcrypt.compare(password, user.password);
  if (!match) throw new Error("Invalid Credentials");
  const token = generateAccessToken(user, "1hr");
  return {
    id: user.id,
    ...user._doc,
    token,
  };
};

const generateAccessToken = (user, expiresIn) => {
  expiresIn = expiresIn || "1hr";
  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
    },
    process.env.JWT_ACCESS_SECRET,
    { expiresIn }
  );
  return token;
};
