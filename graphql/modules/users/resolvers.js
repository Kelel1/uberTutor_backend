const User = require("../../../models/User");
const Category = require("../../../models/Category");
const Rating = require("../../../models/Rating");
const Roles = require("../../../models/Role");
const UserProfile = require("../../../models/UserProfile");
const { register, login, getUserByToken, userCompareName, userProfileCompareCategoryMatches } = require("./helpers");

module.exports = {
  Query: {
    users: async (parent, _, { req }) => {
      return await User.find({});
    },
    usersLike: async (parent, { name }) => {
      let user_array = await User.find({ name: new RegExp(name, "i") });      
      user_array.sort((a,b) => userCompareName(a,b,name));
      return user_array;
    },
    userByEmail: async (parent, { email }) => {
      return await User.findOne({ email: email });
    },
    userByToken: async (_, { token }) => {
      return getUserByToken(token)
    },
    usersByFindString: async (parent, { findString }) => {
      return await User.find(eval("f=" + findString));
    },
    login: async (_, { user }) => {
      return login(user);
    },
    usersByFilter: async (parent, { categories, agemin, agemax, page, entriesPerPage}) => {
      //setting default values:
      if(!page)page=1;
      if(!entriesPerPage)entriesPerPage=10;

      //compiling the findObj for the profile
      let findObj = {};
      if(categories)findObj.categories={$in:categories};
      if(agemin)findObj.age={$gte:agemin}
      if(agemax)findObj.age={...findObj.age, $lte:agemax}

      //applying findObj to mongodb
      console.log(findObj);
      let allProfiles = await UserProfile.find(findObj);

      console.log(allProfiles);

      //sorting
      if(categories){
        allProfiles.sort((a,b)=>userProfileCompareCategoryMatches(a,b,categories))
      }


      //getting usersIDs from profile
      let allUsers = [];
      console.log(allProfiles.length);
      for (const profile of allProfiles) {
        let curUser = await User.findOne({_id:profile.user});
        console.log(curUser);
        if(curUser)allUsers = [...allUsers, curUser];
      }
      console.log(allUsers);
      
      
      return allUsers//.slice((page-1)*entriesPerPage,(page-1)*entriesPerPage+entriesPerPage);
    },
  },
  Mutation: {
    createUser: async (_, { user }, context) => {
      return register(user);
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
  UserProfile: {
    categories: async (parent) => {
      return await Category.find({ _id: { $in: parent.categories } });
    },
    ratings: async (parent) => {
      return await Rating.find({ user: parent.user });
    },
  },
  AuthData: {
    user: (parent) => {
      return parent;
    },
  },
};
