const { RecipeIngredient } = require("../models");
const { RecipeIngredient } = require("../models");

const recipeIngredientData = [
  {
    ingredient_id: 2,
    recipe_id: 1,
  },
  {
    ingredient_id: 3,
    recipe_id: 1,
  },
  {
    ingredient_id: 4,
    recipe_id: 2,
  },
  {
    ingredient_id: 5,
    recipe_id: 2,
  },
  {
    ingredient_id: 6,
    recipe_id: 2,
  },
  {
    ingredient_id: 7,
    recipe_id: 2,
  },
  {
    ingredient_id: 8,
    recipe_id: 3,
  },
  {
    ingredient_id: 9,
    recipe_id: 3,
  },
];

const seedRecipeIngredient = () =>
  RecipeIngredient.bulkCreate(recipeIngredientData);

module.exports = seedRecipeIngredient;
