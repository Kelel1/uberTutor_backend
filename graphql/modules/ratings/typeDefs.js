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
    """
    Lists all ratings\n
    **Example:**\n
    query{ratings{description}}
    """
    ratings: [Rating]
  }
  extend type Mutation {
    """
    creates a new rating\n
    **Example:**\n
    mutation {
      createRating(
        user: "5ec1ab4ab2fe005a04260e67"
        author: "5ec1ab4ab2fe005a04260e67"
        rating: 3
        description: "this is an average tutor"
      ) {
        rating
        description
      }
    }
    """
    createRating(
      "user to which profile the rating counts"
      user: ID,
      "user that wrote the rating"
      author: ID,
      "Int between 0-5, representing the stars of the rating"
      rating: Int,
      "Review in text form"
      description: String
    ): Rating
  }
`;