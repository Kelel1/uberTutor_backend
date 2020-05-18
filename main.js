const dotenv = require("dotenv");
dotenv.config();

const { setupDB, getDB } = require("./db/connect");
const express = require("express");
const { ApolloServer, gql } = require("apollo-server-express");
setupDB();
const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');
const isAuthed = require('./middleware/isAuthed')

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req, res }) => ({ req, res }), // now we can access express objects from apollo context arg
  playground: true, // maybe disable on full deployment
  introspection: true,
});

const app = express();
app.use(isAuthed)
server.applyMiddleware({ app });

const port = process.env.PORT || 4000;

app.listen({  port }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);
// for debugging I guess
app.get("/test", async (req, res) => {
  // const ratingCreate = await new require('./models/Rating')({
  //   user:'test',
  //   author:'test student',
  //   rating: 4,
  //   description: 'description from /test',
  // });
  
  res.json({
    created: await require("./models/User").find({
      email: "tutor@hotmail.com",
    }),
  });
});
