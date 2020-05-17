const usersResolvers = require("../modules/users/resolvers");
module.exports = {
  Query: {
    ...usersResolvers.Query,
  },
  Mutation: {
    ...usersResolvers.Mutation,
  },
  User: { ...usersResolvers.User },
};
