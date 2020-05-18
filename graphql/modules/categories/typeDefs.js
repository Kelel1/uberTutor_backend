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
    """
    queries all categories\n
    **Example:**\n
    query {
      categories{name}
     }
    """
    categories: [Category]
    """
    queries all categories, where custom == false\n
    **Example:**\n
    query {
      publicCategories{name}
     }
    """
    publicCategories: [Category]
    """
    search for category by name\n
    **Example:**\n
    query {
      categoriesLike(name:"mat"){name}
    }
    """
    categoriesLike(name: String): [Category]
  }
  extend type Mutation {
    """
    create new category\n
    **Example:**\n
    mutation {
      createCategory(name:"german", description:"everyone needs to learn german"){
        name
      }
    }
    """
    createCategory(name: String, description: String): Category
    """
    making a Category public means, that the custom tag will be set to false.\n
    **Example:**\n
    mutation {
      makeCategoryPublic(name: "german") {
        name
        custom
      }
    }    
    """
    makeCategoryPublic(name: String): Category
  }
`;