const User = require("../../../models/User");
const UserProfile = require("../../../models/UserProfile");
const Roles = require("../../../models/Role");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
exports.register = async ({
  name,
  email,
  password,
  location,
  avatar,
  categories,
  role,
  age
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
    age
  });
  if (selectedRole.name === "tutor") {
    profile = await new UserProfile({
      user: user._id,
      location,
      avatar,
      age,
      categories,
    });
  }
  await profile.save();
  await user.save();
  const token = generateAccessToken(user, "1hr");
  return {
    id: user.id,
    token,
    ...user._doc,
  };
};
exports.login = async ({ email, password }) => {
  const user = await User.findOne({ email });
  console.log("useret", user);
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

exports.getUserByToken = (token) => {
  const user = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
  return user;
};

exports.userCompareName = (a, b, name) =>{
  let Rexp = new RegExp(name, "i");
  
  if (a.name.match(Rexp).index < b.name.match(Rexp).index) {
    return -1;
  } else {
    return 1;
  }
}

exports.userProfileCompareCategoryMatches = (a, b, queryCategories) =>{
  
  if (a.categories.filter(value => queryCategories.includes(value)).length < b.categories.filter(value => queryCategories.includes(value)).length) {
    return -1;
  } else {
    return 1;
  }
}

const generateAccessToken = (user, expiresIn) => {
  expiresIn = expiresIn || "1hr";
  const token = jwt.sign(
    {
      id: user.id,
      name: user.name,
      email: user.email,
    },
    process.env.JWT_ACCESS_SECRET,
    { expiresIn }
  );
  return token;
};
