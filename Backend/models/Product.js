const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Category = require("./Category");

const Product = sequelize.define("Product", {
  pd_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  pd_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  pd_description: {
    type: DataTypes.TEXT
  },
  pd_price: {
    type: DataTypes.DECIMAL(10,2),
    defaultValue: 0.00
  },
  cd_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {//foreign key-> relation
      model: Category,
      key: "cd_id"
    }
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: "products",
  freezeTableName: true
});

// RELATIONSHIP
// Category.hasMany(Product, { foreignKey: "cd_id" });
// Product.belongsTo(Category, {
//   foreignKey: "cd_id",
//   as: "category"
// });
module.exports = Product;
