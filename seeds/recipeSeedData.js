const { Recipe } = require("../models");

const recipeData = [
  {
    recipe_name: "AB&J",
    category: "Lunch",
    ingredients: {
      "1": "2 slices of bread", 
      "2": "2 TB almond butter",
      "3": "1 TB grape jelly"
    },
    instructions:
      "Spread the almond butter on one slice, spread the jelly on the other slice, and then combine the slices into sandwich format",
    user_id: 1,
    recipe_image: "recipeplaceholder.png",
  },
  {
    recipe_name: "Scrambled Eggs",
    category: "Breakfast",
    ingredients: {
      "1": "2 eggs", 
      "2": "salt, to taste",
      "3": "pepper, to taste"
    },
    instructions:
      "Mix eggs in bowl with salt and pepper, pour into pan, mix around until satisified with the consistency, et voilà!",
    user_id: 2,
    recipe_image: "recipeplaceholder.png",
  },
  {
    recipe_name: "Peanut Butter Apple",
    category: "Snack",
    ingredients: {
      "1": "1 apple", 
      "2": "2 TB peanut butter"
    },
    instructions:
      "Slice the apple to prefered slice sizes, spread peanut butter on each slice, eat peanut butter covered apple slices",
    user_id: 3,
    recipe_image: "recipeplaceholder.png",
  },
  {
    recipe_name: "Homemade BBQ Sauce",
    category: "Condiment",
    ingredients: {
      "1": "tbd"
    },
    instructions:
      "Mix all ingredients in a medium saucepan over medium heat. Bring to a light boil and simmer for ~10 minutes. Serve immediately or store, sealed in the fridge.",
    user_id: 2,
    recipe_image: "recipeplaceholder.png",
  },
];

const seedRecipe = () => Recipe.bulkCreate(recipeData);

module.exports = seedRecipe;
