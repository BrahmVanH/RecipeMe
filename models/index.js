const User = require("./User");
const Recipe = require("./Recipe");
const Ingredient = require("./Ingredient");
const RecipeIngredient = require("./RecipeIngredient")

// User can have many recipes; if user is deleted, their recipes are deleted
User.hasMany(Recipe, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

// Recipes can have many ingredients; if recipe is deleted, its ingredients are deleted
/*Recipe.hasMany(Ingredient, {
  foreignKey: "recipe_id",
  onDelete: "CASCADE",
}); */

// We'll have to talk about this one, I'm not 100% how it works "belongstomany" doesnt make sense, but the method seemed
// to work in the ecommerce project

Recipe.belongsToMany(Ingredient, {
  //Creating association between Product and Tag classes, linking
  // them through the ProductTag class and tag_id property
  through: {
    model: RecipeIngredient,
    unique: false,
  },
  foreignKey: 'recipe_id',
});

// Creating association between recipes and users
Recipe.belongsTo(User, {
  foreignKey: "user_id",
});

// Association between ingredients and recipes
Ingredient.belongsTo(Recipe, {
  through: {
    model: RecipeIngredient,
    unique: false
  },
  foreignKey: "ingredient_id",
});

module.exports = { User, Recipe, Ingredient };
