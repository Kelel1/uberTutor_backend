const User = require("../../../models/User");
const Category = require("../../../models/Category");
const Rating = require("../../../models/Rating");
const Roles = require("../../../models/Role");
const UserProfile = require("../../../models/UserProfile");
const { register } = require('./helpers')

module.exports = {
  Query: {
    users: async () => {
      return await User.find({});
    },
    usersLike: async (parent, { name }) => {
      return await User.find({ name: new RegExp(name, "i") });
    },
    userByEmail: async (parent, { email }) => {
      return await User.findOne( { 'email': email } );
    },
    userByToken: async (parent, { token }) => {
      //return await User.findOne( { 'email': email } );
    },
    usersByFindString: async (parent, { findString }) => {
      return await User.find( eval("f="+findString) );
    },
    login: async (_, { user }) => {
      //return register(user)
    },
    usersByFilter: async (parent, { categories, agemin, agemax, page, entriesPerPage}) => {
      let findObj = {};
      if(categories)findObj.categories={$in:categories};
      if(agemin)findObj.age={$gte:agemin}
      if(agemax)findObj.age={...findObj.age, $lte:agemax}

      let allProfiles = await UserProfile.find(findObj);
      let allUserIDs = [];

      allProfiles.forEach(profile => {
        allUserIDs = [...allUserIDs, profile.user]
      });

      if(!page)page=1;
      if(!entriesPerPage)entriesPerPage=10;
      return await User.find({_id:{$in: allUserIDs}}).skip((page-1)*entriesPerPage).limit(entriesPerPage);
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
  UserProfile: {
    categories: async (parent) => {
      console.log(parent.categories);
      return await Category.find({_id: {$in:parent.categories} });
    },
    ratings: async (parent) => {
      return await Rating.find({user:parent.user});
    }
  }
};
