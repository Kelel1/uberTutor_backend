const dotenv                = require('dotenv');
dotenv.config();

const { setupDB, getDB }    = require('./db/connect');
const express               = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const User                  = require('./models/User');
const Rating                = require('./models/Rating');
const Roles                 = require('./models/Roles');
const UserProfile           = require('./models/UserProfile');
const Category              = require('./models/Category');


const typeDefs = gql`
  type User {
    id: ID!
    role: Role!
    userProfile: UserProfile!
    email: String!
    name: String!
  }
  type UserProfile {
    location: String
    avatar: String
    ratings: [Rating]
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
  type Role {
    name: String!
    description: String!
    createdAt: String!
    updatedAt: String!
  }
  type Query {
    users: [User]
  }
  type Mutation {
    createUser(name: String, email: String, password: String, location: String, avatar: String): User
  }
`;


setupDB();

const resolvers = {
  Query: {
    users: () => { 
     return User.find({})
    }
  },
  Mutation: {
    createUser: async(parent, {name, email, password, location, avatar}) => {
      role = "4jfoejfer98ge8g"
      const user = await new User({
        name,
        email,
        password,
        role
      });
      const selectedRole = Roles.find({ _id: user.role })
      if (selectedRole === 'User') {
        
      }
      const profile = new Profile({
        user: user.id,
        location,
        avatar
      })
      profile.save();
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

});