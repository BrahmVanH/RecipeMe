const { Recipe } = require('../models');

const recipeData = [
  {
    "recipe_name": "AB&J",
    "category": "Lunch",
    "description": "The almond butter version of your favorite PB&J!",
    "instructions": "Spread the almond butter on one slice, spread the jelly on the other slice, and then combine the slices into sandwich format",
    "user_id": 1
  },
  {
    "recipe_name": "Scrambled Eggs",
    "category": "Breakfast",
    "description": "A simple, low carb and protein rich classic",
    "instructions": "Mix eggs in bowl with salt and pepper, pour into pan, mix around until satisified with the consistency, et voilà!",
    "user_id": 2
  },
  {
    "recipe_name": "Peanut Butter Apples",
    "category": "Snack",
    "description": "A quick and simple snack for any time of the day or night",
    "instructions": "Slice the apple to prefered slice sizes, spread peanut butter on each slice, eat peanut butter covers apple slices",
    "user_id": 3
  }
]

const seedRecipe = () => Recipe.bulkCreate(recipeData);

module.exports = seedRecipe;
