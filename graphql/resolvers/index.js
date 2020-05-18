const usersResolvers = require("../modules/users/resolvers");
const rolesResolvers = require("../modules/roles/resolvers");
const categoriesResolvers = require("../modules/categories/resolvers");
const ratingResolvers = require("../modules/ratings/resolvers");

module.exports = {
  Query: {
    ...usersResolvers.Query,
    ...rolesResolvers.Query,
    ...categoriesResolvers.Query,
    ...ratingResolvers.Query,
  },
  Mutation: {
    ...usersResolvers.Mutation,
    ...rolesResolvers.Mutation,
    ...categoriesResolvers.Mutation,
    ...ratingResolvers.Mutation,
  },
  User: { ...usersResolvers.User },
  UserProfile: { ...usersResolvers.UserProfile },
  Rating: { ...ratingResolvers.Rating },
};
