const router = require("express").Router();
const withAuth = require("../../utils/auth");
const { Recipe, User } = require("../../models");

router.get("/", async (req, res) => {
  try {
    // Give us all recipes in db
    // Should we add user_id's to recipe cards to say who created?
    const recipeData = await Recipe.findAll({
      include: [
        {
          model: User,
          attributes: ["user_name"],
        },
      ],
    });

    res.status(200).json(recipeData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get("/:name", async (req, res) => {
  try {
    // Find a single recipe by name
    // Wire to search bar
    const recipeData = await Recipe.findOne({ where: { name: req.body.name } });

    res.status(200).json(recipeData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Create a new recipe in database
// We'll need to create a form that takes in all of this info from user and makes a fetch to this route
router.post("/", async (req, res) => {
  try {
    const recipeData = await Recipe.create(req.body);

    /* post body: {
      "recipe_name": "",
      "recipe_category": "",
      "recipe_category": "",
      "recipe_description": "",
      "recipe_instructions": "",
    } */

    res.status(200).json(recipeData);
  } catch (err) {
    res.status(400).json(err);
  }
});
// ^^^ update
router.put("/:id", async (req, res) => {
  try {
    const recipeData = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(recipeData);
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
    res.status(200).json(recipeData);
  } catch (err) {
    res.status(400).json(err);
  }
});
