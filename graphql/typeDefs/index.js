const { gql } = require('apollo-server-express')
module.exports = gql`
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
