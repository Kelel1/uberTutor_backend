module.exports = `
  input userInput {
    name: String
    email: String
    password: String
    location: String
    avatar: String
    role: String
  }
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
    categories: Category
    ratings: [Rating]
    createdAt: String!
    updatedAt: String!
  }
  extend type Query {
    users: [User]
    usersLike(name: String): [User]
    userByEmail(email: String): User
    usersByFindString(findString: String): [User]
  }
  extend type Mutation {
    createUser(
      user: userInput
    ): User
  }
`;
