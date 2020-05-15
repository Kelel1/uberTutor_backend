const dotenv                = require('dotenv');
dotenv.config();

const { setupDB, getDB }    = require('./db/connect');
const express               = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const User                  = require('./models/User');

const typeDefs = gql`
  type User {
    id: ID!
    email: String!
    name: String!
    location: String
    avatar: String
    createdAt: String!
    updatedAt: String!
  }
  type StudentProfile {
    id: ID!
    user: User!
    ratings: [Rating]
    createdAt: String!
    updatedAt: String!
  }
  type TutorProfile {
    id: ID!
    user: User!
    ratings: [Rating]
    categories: [Category]
    createdAt: String!
    updatedAt: String!
  }
  type Rating {
    id: ID!
    user: User!
    author: User!
    rating: Int!
    description: String
    createdAt: String!
    updatedAt: String!
  }
  type Category {
    id: ID!
    name: String!
    description: String!
    custom: Boolean!
    createdAt: String!
    updatedAt: String!
  }
  type Query {
    users: User
  }
  type Mutation {
    createUser(name: String, email: String, password: String, location: String, avatar: String): User
  }
`;


setupDB();

const resolvers = {
  Query: {
    users: async() => await User.find({})
  },
  Mutation: {
    createUser: async(parent, {name, email, password, location, avatar}) => {
      const user = await new User({
        name,
        email,
        password,
        location,
        avatar
      });
      return user.save();
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const app = express();
server.applyMiddleware({ app });

app.listen({port: 4000}, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);

app.get("/test", async(req, res)=>{
  res.json(await User.find({}));
});