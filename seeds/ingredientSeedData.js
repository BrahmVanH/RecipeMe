const { Ingredient } = require("../models");

const ingredientData = [
  {
    ingredient_name: "almond butter",
    ingredient_amount: "2 tablespoons",
    recipe_id: 1,
  },
  {
    ingredient_name: "jelly (any flavor)",
    ingredient_amount: "1 tablespoon",
    recipe_id: 1,
  },
  {
    ingredient_name: "bread (any kind of sliced bread)",
    ingredient_amount: "2 slices",
    recipe_id: 1,
  },
  {
    ingredient_name: "eggs",
    ingredient_amount: "2 whole",
    recipe_id: 2,
  },
  {
    ingredient_name: "salt",
    ingredient_amount: "1/8 teaspoon, or to taste",
    recipe_id: 2,
  },
  {
    ingredient_name: "pepper",
    ingredient_amount: "1/2 teaspoon, or to taste",
    recipe_id: 2,
  },
  {
    ingredient_name: "sliced apple",
    ingredient_amount: "1",
    recipe_id: 3,
  },
  {
    ingredient_name: "peanut butter",
    ingredient_amount: "2 tablespoons",
    recipe_id: 3,
  },
];

const seedIngredient = () => Ingredient.bulkCreate(ingredientData);

module.exports = seedIngredient;
