const typeDef = `

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
`;

module.exports = typeDef