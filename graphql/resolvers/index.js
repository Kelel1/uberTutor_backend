const usersResolvers = require("../modules/users/resolvers");
const rolesResolvers = require("../modules/roles/resolvers");
module.exports = {
  Query: {
    ...usersResolvers.Query,
    ...rolesResolvers.Query
  },
  Mutation: {
    ...usersResolvers.Mutation,
    ...rolesResolvers.Mutation
  },
  User: { ...usersResolvers.User },
};
