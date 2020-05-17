const usersResolvers = require("./users");
module.exports = {
  Query: {
    ...usersResolvers.Query,
  },
  Mutation: {
    ...usersResolvers.Mutation,
  },
  User: { ...usersResolvers.User },
};
