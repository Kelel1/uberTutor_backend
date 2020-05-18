const usersResolvers = require("../modules/users/resolvers");
const rolesResolvers = require("../modules/roles/resolvers");
const categoriesResolvers = require("../modules/categories/resolvers");

module.exports = {
  Query: {
    ...usersResolvers.Query,
    ...rolesResolvers.Query,
    ...categoriesResolvers.Query,
  },
  Mutation: {
    ...usersResolvers.Mutation,
    ...rolesResolvers.Mutation,
    ...categoriesResolvers.Mutation,
  },
  User: { ...usersResolvers.User },
};
