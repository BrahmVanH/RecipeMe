const router = require("express").Router();
const withAuth = require("../../utils/auth");
const { Ingredient, Recipe } = require("../../models");

router.get("/", async (req, res) => {
  try {
    // Find a single ingredient by name
    // Wire to search bar for individual ingredient
    // Include in recipe search?
    const ingredientData = await Ingredient.findAll({
      include: {
        model: Recipe,
        attributes: [ 'recipe_name']
      }
    });

    res.status(200).json(ingredientData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Create a new ingredient in database
// Records name and amount
router.post("/", async (req, res) => {
  try {
    const ingredientData = await Recipe.create(req.body);

    /* post body: {
        "ingredient_name": "",
        "ingredient_amount": "",

    } */

    res.status(200).json(ingredientData);
  } catch (err) {
    res.status(400).json(err);
  }
});
// ^^^ update

// Maybe add a button to each card that creates a fetch using the id listed in the card information href='/api/recipe/${recipe_id}' can you add template literals in handlebars?

router.delete("/:id", withAuth, async (req, res) => {
  try {
    const recipeData = await Recipe.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });
    res.status(200).json(recipeData);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
