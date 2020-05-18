module.exports = `
type Role {
    id: ID!
    name: String!
    description: String!
    createdAt: String!
    updatedAt: String!
  }
  extend type Query {
    """
    queries all roles\n
    **Example:**\n
    query {
      roles {
        name
      }
    }
    """
    roles: [Role]
  }
  extend type Mutation {
    """
    creates a new role\n
    **Example:**\n
    mutation {
      createRole(name: "administrator", description: "just a role for testing") {
        name
        description
      }
    }
    """
    createRole(name: String, description: String): Role
  }
`;