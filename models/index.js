const User = require("./User");
const Recipe = require("./Recipe");
const Ingredient = require("./Ingredient");

// User can have many recipes; if user is deleted, their recipes are deleted
User.hasMany(Recipe, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

// Recipes can have many ingredients; if recipe is deleted, its ingredients are deleted
Recipe.hasMany(Ingredient, {
  foreignKey: "recipe_id",
  onDelete: "CASCADE",
});

// Creating association between recipes and users
Recipe.belongsTo(User, {
  foreignKey: "user_id",
});

// Association between ingredients and recipes
Ingredient.belongsTo(Recipe, {
  foreignKey: "recipe_id",
});

module.exports = { User, Recipe, Ingredient };
