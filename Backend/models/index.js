const sequelize = require("../config/db");
const Product = require("./Product");
const Category = require("./Category");

// Associations defined here ONLY
Category.hasMany(Product, {
  foreignKey: "cd_id",
  as: "products"
});

Product.belongsTo(Category, {
  foreignKey: "cd_id",
  as: "category"
});

module.exports = {
  sequelize,
  Product,
  Category
};