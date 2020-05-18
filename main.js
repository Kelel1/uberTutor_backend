const dotenv = require("dotenv");
dotenv.config();

const { setupDB, getDB } = require("./db/connect");
const express = require("express");
const { ApolloServer, gql } = require("apollo-server-express");
setupDB();
const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');

const server = new ApolloServer({
  typeDefs,
  resolvers,
  playground: true, // maybe disable on full deployment
  introspection: true
});

const app = express();
server.applyMiddleware({ app });

const port = process.env.PORT || 4000;

app.listen({  port }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);
// for debugging I guess
app.get("/test", async (req, res) => {
  const ratingCreate = await new require('./models/Rating')({
    user:'test',
    author:'test student',
    rating: 4,
    description: 'description from /test',
  });
  res.json({ created: await ratingCreate.save() });
});
