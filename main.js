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

const port = process.env.PORT;

app.listen({  port }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);
// for debugging I guess
app.get("/test", async (req, res) => {
  res.send('test')
});
