const router = require("express").Router();
const withAuth = require('../../utils/auth');
const { Recipe } = require("../../models");

router.get("/", async (req, res) => {
  try {
    
    const recipeData = await Recipe.findAll({
      include: [
        {
          model: Recipe,
          attributes: ['recipe_name', 'category'],
        },
      ],
    });
  

    res.status(200).json(newProject);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post("/", async (req, res) => {
  try {
  
    const recipeData = await Recipe.create({
      recipe_name: req.body.recipe_name,
      category: req.body.category,
      description: req.body.description,
      instructions: req.body.instructions,
      user_id: req.session.user_id,
    })

    res.status(200).json(newProject);
  } catch (err) {
    res.status(400).json(err);
  }
});

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

router.delete("/:id", withAuth, async (req, res) => {
  try {
    const recipeData = await Recipe.destroy({ where: {
      id: req.params.id,
      user_id: req.session.user_id,
    },
  });
    res.status(200).json(newProject);
  } catch (err) {
    res.status(400).json(err);
  }
});



