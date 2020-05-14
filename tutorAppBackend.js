const express               = require('express');
const { ApolloServer, gql } = require('apollo-server-express');


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
  resolvers,
});

const app = express();
server.applyMiddleware({ app });

app.listen({port: 4000}, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);