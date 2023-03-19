const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Recipe extends Model {}

Recipe.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    recipe_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    category: {
      type: DataTypes.ENUM(
        "Breakfast",
        "Lunch",
        "Dinner",
        "Snack",
        "Dessert",
        "Condiment"
      ),
    },
    ingredients: {
      type: DataTypes.JSON,
    },
    instructions: {
      type: DataTypes.TEXT,
    },
    recipe_image: {
      type: DataTypes.STRING,
      defaultValue: "recipeplaceholder.png",
    },
    /*user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "user",
        key: "id",
      },
    },*/
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "recipe",
  }
);

module.exports = Recipe;
