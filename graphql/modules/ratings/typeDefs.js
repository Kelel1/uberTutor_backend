module.exports = `
  type Rating {
    id: ID!
    user: User
    author: User
    rating: Int!
    description: String
    createdAt: String!
    updatedAt: String!
  }
  extend type Query {
    ratings: [Rating]
  }
  extend type Mutation {
    createRating(user: ID, author: ID, rating: Int, description: String): Rating
  }
`;