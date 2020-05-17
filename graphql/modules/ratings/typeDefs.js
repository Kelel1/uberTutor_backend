module.exports = `
  type Rating {
    id: ID!
    user: User!
    author: User!
    rating: Int!
    description: String
    createdAt: String!
    updatedAt: String!
  }
`;