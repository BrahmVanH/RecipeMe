const User = require("./User");
const Recipe = require("./Recipe");
const Ingredient = require("./Ingredient");
const RecipeIngredient = require("./RecipeIngredient");

// User can have many recipes; if user is deleted, their recipes are deleted
User.hasMany(Recipe, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

// Creating association between recipes and users
Recipe.belongsTo(User, {
  foreignKey: "user_id",
});

module.exports = { User, Recipe };
