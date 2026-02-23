const { DataTypes } = require("sequelize");
const sequelize = require("../config/db"); //sequelize instance

const Category = sequelize.define("Category", {
  cd_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  cd_name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  cd_description: {
    type: DataTypes.TEXT
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
  tableName: "categories",
  freezeTableName: true
});
// Category.hasMany(Product, { foreignKey: "cd_id",as: "products" });
// Category.hasMany(require("./Product"), {
//   foreignKey: "cd_id",
//   as: "products"
// });


module.exports = Category;
