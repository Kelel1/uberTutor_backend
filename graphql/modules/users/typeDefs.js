module.exports = `

  type User {
    id: ID!
    role: Role
    profile: UserProfile
    email: String!
    name: String!
  }
   type UserProfile {
    id: ID!
    user: String
    location: String
    avatar: String
    ratings: [Rating]
    createdAt: String!
    updatedAt: String!
  }
   extend type Query {
    users: [User]
    roles: [Role]
  }
   extend type Mutation {
    createUser(
      name: String
      email: String
      password: String
      location: String
      avatar: String
      role: String
    ): User
  }
`;
