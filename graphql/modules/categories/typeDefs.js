module.exports = `
 type Category {
    id: ID!
    name: String!
    description: String!
    custom: Boolean!
    createdAt: String!
    updatedAt: String!
  }
  extend type Query {
    categories: [Category]
    publicCategories: [Category]
    categoriesLike(name: String): [Category]
  }
  extend type Mutation {
    createCategory(name: String, description: String): Category
    makeCategoryPublic(name: String): Category
  }
`;