const router = require("express").Router();
const withAuth = require("../../utils/auth");
const { Recipe, User } = require("../../models");


router.get("/", async (req, res) => {
  try {
    const recipeData = await Recipe.findAll({
      include: [
        {
          model: User,
          attributes: ["name"],
        },
      ],
    });

    const recipes = recipeData.map((recipe) => recipe.get({ plain: true }));
    console.log(recipes);
    res.render("all-recipes", {
      recipes,
      username: req.session.username,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(400).json(err);
  }
});


router.get("/:selectedCategory", async (req, res) => {
  console.log("fetch received...");
  try {
    const recipeData = await Recipe.findAll({
      where: {
        category: req.params.selectedCategory,
      },
    });

    if (!recipeData) {
      res.status(404).json({ message: "No recipe found with that category!" });
      return;
    }

    const recipes = recipeData.map((recipe) => recipe.get({ plain: true }));

    res.render("all-recipes", {
      recipes,
      logged_in: req.session.logged_in,
    });
    console.log(recipeData);
  } catch (err) {
    res.status(500).json(err);
  }
});


router.delete("/:recipeName", async (req, res) => {
  console.log("delete fetch received...");
  try {
    const recipeData = await Recipe.destroy({
      where: {
        recipe_name: req.params.recipeName,
      },
    });

    if (!recipeData) {
      res.status(404).json({ message: "No recipe found with that name!" });
      return;
    }

    res.status(200).json(recipeData);

    console.log(recipeData);
  } catch (err) {
    res.status(500).json(err);
  }
});


router.post("/", async (req, res) => {
  try {
    const recipeData = await Recipe.create({
      recipe_name: req.body.recipeName,
      category: req.body.recipeCategory,
      ingredients: req.body.ingredients,
      instructions: req.body.instructions,
      // temp commenting out recipe_image to avoid broken image icon while upload isn't working
      // recipe_image: req.body.imageInput,
      user_id: req.session.user_id,
    });
    res.status(200).json(recipeData);
  } catch (err) {
    res.status(400).json(err);
  }
});


router.put("/:id", async (req, res) => {
  try {
    const recipeData = await Recipe.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!recipeData) {
      res.status(404).json({ message: "No recipe found with that id!" });
      return;
    }

    // **REPLACE LINE 123 WITH .RENDER(RECIPEDATA TO RECIPE CARD);
    res.status(200).json(recipeData);
  } catch (err) {
    res.status(500).json(err);
  }
});


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
