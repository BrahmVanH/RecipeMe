const router = require("express").Router();
const withAuth = require("../../utils/auth");
const { Recipe } = require("../../models");

router.get("/", async (req, res) => {
  try {

    // Give us all recipes in db
    // Should we add user_id's to recipe cards to say who created?
    const recipeData = await Recipe.findAll({
      include: [
        {
          model: Recipe,
          attributes: ["recipe_name", "category"],
        },
      ],
    });

    res.status(200).json(newProject);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Create a new recipe in database
// We''l need to create a form that takes in all of this info from user and makes a fetch to this route
router.post("/", async (req, res) => {
  try {
    const recipeData = await Recipe.create({
      recipe_name: req.body.recipe_name,
      category: req.body.category,
      description: req.body.description,
      instructions: req.body.instructions,
      user_id: req.session.user_id,
    });

    res.status(200).json(newProject);
  } catch (err) {
    res.status(400).json(err);
  }
});
// ^^^ update
router.put("/", async (req, res) => {
  try {
    const recipeData = await Recipe.update({
      recipe_name: req.body.recipe_name,
      category: req.body.category,
      description: req.body.description,
      instructions: req.body.instructions,
      user_id: req.session.user_id,
    });
    res.status(200).json(newProject);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Maybe add a button to each card that creates a fetch using the id listed in the card information href='/api/recipe/${recipe_id}' can you add template literals in handlebars?

router.delete("/:id", withAuth, async (req, res) => {
  try {
    const recipeData = await Recipe.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });
    res.status(200).json(newProject);
  } catch (err) {
    res.status(400).json(err);
  }
});
