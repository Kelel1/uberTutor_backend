const { ApolloServer, gql } = require('apollo-server');

const typeDefs = gql`
  type Tutor {
    name: String!
    rating: Int!

  }

  type Query {
    tutorRating: Int!    

  }

`;

const resolvers = {
  Query: {

  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});