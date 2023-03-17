const router = require("express").Router();
const { Recipe, User } = require("../models");
const withAuth = require("../utils/auth");

router.get("/", async (req, res) => {
  try {
    // Decide what data we'd like to include from our API/other APIs
    // Render those items to homepage

    const recipeData = await Recipe.findAll({
      offset: 1,
      limit: 3,
      include: [
        {
          model: User,
          attributes: ["name"],
        },
      ],
    });

    const recipes = recipeData.map((recipe) => recipe.get({ plain: true }));

    res.render("homepage", {
      recipes,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
