const dotenv = require("dotenv");
dotenv.config();

const { setupDB, getDB } = require("./db/connect");
const express = require("express");
const { ApolloServer, gql } = require("apollo-server-express");
const User = require("./models/User");
const Rating = require("./models/Rating");
const Roles = require("./models/Roles");
const UserProfile = require("./models/UserProfile");
const Category = require("./models/Category");

const typeDefs = gql`
  type UserProfile {
    id: ID!
    user: String
    location: String
    avatar: String
    ratings: [Rating]
    createdAt: String!
    updatedAt: String!
  }
  type User {
    id: ID!
    role: Role
    profile: UserProfile
    email: String!
    name: String!
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
    id: ID!
    name: String!
    description: String!
    createdAt: String!
    updatedAt: String!
  }
  type Query {
    users: [User]
    roles: [Role]
  }
  type Mutation {
    createUser(
      name: String
      email: String
      password: String
      location: String
      avatar: String
      role: String
    ): User
    createRole(name: String, description: String): Role
  }
`;

setupDB();

const resolvers = {
  Query: {
    users: async () => {
      return await User.find({});
    },
    roles: () => Roles.find({}),
  },
  Mutation: {
    createUser: async (
      parent,
      { name, email, password, location, avatar, categories, role }
    ) => {
      const user = await new User({
        name,
        email,
        password,
        role,
      });
      const selectedRole = Roles.findOne({ _id: role }, { name: 1, _id: 0 });
      let profile = await new UserProfile({
        user: user._id,
        location,
        avatar,
      });
      // if (selectedRole.name === "student") {
      //   await profile.save();
      // }
      // if (selectedRole.name === "tutor") {
      //   profile = await new UserProfile({
      //     user: user._id,
      //     location,
      //     avatar,
      //     categories,
      //   });
      //   await profile.save();
      // }
      await profile.save();
      return user.save();
    },
    createRole: async (parent, { name, description }) => {
      const role = await new Roles({
        name,
        description,
      });
      return role.save();
    },
  },
  User: {
    profile: async (parent) => {
      return await UserProfile.findOne({ user: parent.id });
    },
    role: async (parent) => {
      return await Roles.findById(parent.role)
    }
  },
};

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
