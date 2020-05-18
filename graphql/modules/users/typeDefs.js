module.exports = `
  "input required to create a new User"
  input userInput {
    name: String
    email: String
    password: String
    location: String
    avatar: String
    role: String
    "this has to be a list of category-IDs from the Category model"
    categories: [String]
  }
  input loginInput {
    email: String
    password: String
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
    categories: [Category]
    ratings: [Rating]
    createdAt: String!
    updatedAt: String!
  }
  type AuthData {
    id: ID
    user: User
    token: String
  }
  extend type Query {
    users: [User]
    usersLike(name: String): [User]
    userByEmail(email: String): User
    userByToken(token: String): User
    usersByFindString(findString: String): [User]
    login(user: loginInput): AuthData
  }
  extend type Mutation {
    """
    mutation {
      createUser(
        user: {
          name: "test Tutor"
          email: "tutor@hotmail.com"
          password: "super secret password"
          location: "testLocation"
          avatar: "prettyPicture"
          role: "5ebf44978284563cf064ad88"
          categories: ["5ec28e24df65822b544343e0", "5ec28f49a8c4cf47cc645685"]
        }
      ) {
        id
        name
        profile {
          categories {
            name
          }
        }
      }
    }
    """
    createUser(
      user: userInput
    ): AuthData
  }
`;
