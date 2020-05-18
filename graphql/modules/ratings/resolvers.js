const User = require("../../../models/User");
const Rating = require("../../../models/Rating");
const Roles = require("../../../models/Role");
const UserProfile = require("../../../models/UserProfile");
const { validateID } = require('../../helpers')

module.exports = {
  Query: {
    ratings: () => Rating.find({  }),
  },
  Mutation: {
    createRating: async (parent, { user, author, rating, description }) => {
      console.log({user,author,rating,description});
      validateID(user);
      validateID(author);
      const ratingCreate = await new Rating({
        user,
        author,
        rating,
        description,
      });
      return ratingCreate.save();
    },
  },
  Rating: {
    user: async (parent) => {
      return User.findById(parent.user);
    },
    author: async (parent) => {
      return User.findById(parent.author);
    },
  },
};
