module.exports = `
  "input required to create a new User"
  input userInput {
    name: String
    email: String
    password: String
    location: String
    avatar: String
    age: Int
    role: String
    "this has to be a list of category-IDs from the Category model"
    categories: [String]
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
    age: Int
    categories: [Category]
    ratings: [Rating]
    createdAt: String!
    updatedAt: String!
  }
  type AuthData {
    user: User
    token: String
  }
  extend type Query {
    """
    query for all users\n
    **Example:**\n
    query {
      users {
        name
      }
    }
    """
    users: [User]
    """
    searching for users by their name\n
    **Example:**\n
    query {
      usersLike(name:"te"){name}
    }    
    """
    usersLike(name: String): [User]
    """
    get one user by its email\n
    **Example:**\n
    query {
      userByEmail(email:"astudent@gmail.test"){name}
    }    
    """
    userByEmail(email: String): User
    """
    TODO!
    not finished yet
    """
    userByToken(token: String): User
    """
    brings the mongoDB interface to GraphQL. You can just write in there like it was JS.\n
    **Example:**\n
    query {
      usersByFindString(findString:"{name:'test'}"){name}
    }    
    """
    usersByFindString(findString: String): [User]
    """
    TODO!
    not finished yet
    """
    login(email: String, password: String): AuthData
  }
  extend type Mutation {
    """
    Creating new users with the userInput.\n
    **Example:**\n
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
    ): User
  }
`;
