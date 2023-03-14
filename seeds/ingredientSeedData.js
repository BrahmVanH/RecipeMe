const { Ingredient } = require("../models");

const ingredientData = [
  {
    ingredient_name: 'almond butter',
    recipe_id: 1,
  },
  {
    ingredient_info: '1 tablespoon jelly (any flavor)',
    recipe_id: 1,
  },
  {
    ingredient_name: '2 slices bread (any kind of sliced bread)',
    recipe_id: 1,
  },
  {
    ingredient_name: '2 whole eggs',
    recipe_id: 2,
  },
  {
    ingredient_name: '1/8 teaspoon, or to taste salt',
    recipe_id: 2,
  },
  {
    ingredient_name: '1/2 teaspoon, or to taste pepper',
    recipe_id: 2,
  },
  {
    ingredient_name: '1 sliced apple',
    recipe_id: 3,
  },
  {
    ingredient_name: '2 tablespoons peanut butter',
    recipe_id: 3,
  },
];

const seedIngredient = () => Ingredient.bulkCreate(ingredientData);

module.exports = seedIngredient;
