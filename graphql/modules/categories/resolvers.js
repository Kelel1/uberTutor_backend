const Category = require("../../../models/Category");


module.exports = {
  Query: {
    categories: () => Category.find({}),
    publicCategories: () => Category.find({custom: false}),
    categoriesLike: async (parent, { name }) => {
      return await Category.find({ name: new RegExp(name, "i") });
    }
  },
  Mutation: {
    createCategory: async (parent, { name, description }) => {
      const category = await new Category({
        name,
        description,
      });
      return category.save();
    },
    makeCategoryPublic: async (parent, { name }) => {
      category = await Category.findOne({ name });
      category.custom = false;
      return category.save();
    }
  },
};