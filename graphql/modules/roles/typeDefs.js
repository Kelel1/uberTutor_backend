module.exports = `
type Role {
    id: ID!
    name: String!
    description: String!
    createdAt: String!
    updatedAt: String!
  }
  extend type Query {
    roles: [Role]
  }
  extend type Mutation {
    createRole(name: String, description: String): Role
  }
`;