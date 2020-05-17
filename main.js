const dotenv = require("dotenv");
dotenv.config();

const { setupDB, getDB } = require("./db/connect");
const express = require("express");
const { ApolloServer, gql } = require("apollo-server-express");
setupDB();
const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers')

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const app = express();
server.applyMiddleware({ app });

app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);
// 5ec157163c46a830b8aadef3
app.get("/test", async (req, res) => {
  res.json({
    profiles: await UserProfile.findOne({ user: "5ec157163c46a830b8aadef3" }),
  });
});
