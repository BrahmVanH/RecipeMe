const router = require("express").Router();
const { Recipe } = require("../../models_ignored");
const spoonacularBaseUrl = "https://api.spoonacular.com/recipes/complexSearch";
require('dotenv').config();

// User can search recipe by common name
// i.e. 'spaghetti', 'tacos'

router.get("/:mealName", async (req, res) => {
  try {
    const spoonRecipeData = await fetch(`${spoonacularBaseUrl}?apiKey=${process.env.API_KEY}&query=${mealName}`);

    const spoonRecipes = spoonRecipeData.map((spoonRecipe) => spoonRecipe.get({ plain: true}));
    
    res.render('recipe-search', {
      spoonRecipes,
      // do we want this feature to require logging in?
      // logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Stretch: There are endless ways we can modify this search
// i.e. 'excludeRecipe', 'intolerances', 'diet'

