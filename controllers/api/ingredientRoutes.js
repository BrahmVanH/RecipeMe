const router = require("express").Router();
const withAuth = require("../../utils/auth");
const { Ingredient, Recipe } = require("../../models");

router.get("/:ingredient", async (req, res) => {
  try {
    // Find a single ingredient by name
    // Wire to search bar for individual ingredient
    // Include in recipe search?
    const ingredient = await Ingredient.findOne({
      where: { ingredientInfo: req.body.ingredient }
    });

    res.status(200).json(ingredient);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/:ingredient', async (req, res) => {
  try {
    const ingredientData = await Ingredient.create(req.body);

    res.status(200).json(ingredientData);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
