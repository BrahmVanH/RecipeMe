const router = require("express").Router();
const withAuth = require("../../utils/auth");
const { Recipe, User, Ingredient } = require("../../models");


// THIS ONE WORKS -- get all recipes 
router.get("/", async (req, res) => {
  try {
    const recipeData = await Recipe.findAll({
      include: [
        {
          model: User,
          attributes: ["name"],
        },
        {
          model: Ingredient,
          attributes: ["ingredient_amount", "ingredient_name"],
        },
      ],
    });

    res.status(200).json(recipeData);
  } catch (err) {
    res.status(400).json(err);
  }
});



// THIS ONE WORKS -- Get recipe by ID 
router.get('/:id', async (req, res) => {
  try {
    const recipeData = await Recipe.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ["name"],
        },
        {
          model: Ingredient,
          attributes: ["ingredient_amount", "ingredient_name"],
        },
      ]
    });

    if (!recipeData) {
      res.status(404).json({ message: 'No recipe found with that id!' });
      return;
    }

    res.status(200).json(recipeData);
  } catch (err) {
    res.status(500).json(err);
  }
});


// THIS ONE WORKS WITHOUT THE USER_ID PART FOR NOW (I think bc when testing, there isn't a session user id?)
router.post('/', async (req, res) => {
  try { 
    const recipeData = await Recipe.create({
      recipe_name: req.body.recipe_name,
      category: req.body.category,
      description: req.body.description,
      instructions: req.body.instructions
      // user_id: req.session.user_id
  });
  res.status(200).json(recipeData)
} catch (err) {
  res.status(400).json(err);
}
});


// THIS ONE WORKS
router.put("/:id", async (req, res) => {
  try {
    const recipeData = await Recipe.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
  if (!recipeData) {
    res.status(404).json({ message: 'No recipe found with that id!' });
    return;
  }
  res.status(200).json(recipeData);
} catch (err) {
  res.status(500).json(err);
}
});


// this first line here is the original, tested without the withAuth and that WORKED 
// router.delete("/:id", withAuth, async (req, res) => {
  router.delete("/:id", async (req, res) => {
    try {
      const recipeData = await Recipe.destroy({
        where: {
          id: req.params.id
          // temp commenting user_id out
          // user_id: req.session.user_id,
        },
      });
      res.status(200).json(recipeData);
    } catch (err) {
      res.status(400).json(err);
    }
  });


// NEEDS WORK
// router.get("/:recipeName", async (req, res) => {
//   try {
//     // Find a single recipe by name
//     // Wire to search bar
//     const recipeData = await Recipe.findOne({ where: { recipe_name: req.body.recipeName } });

//     res.status(200).json(recipeData);
//   } catch (err) {
//     res.status(400).json(err);
//   }
// });



// Create a new recipe in database
// We'll need to create a form that takes in all of this info from user and makes a fetch to this route
// router.post("/", async (req, res) => {
//   try {
//     const recipeData = await Recipe.create(req.body);

//     /* post body: {
//       "recipe_name": "",
//       "recipe_category": "",
//       "recipe_ingredients": "",
//       "recipe_instructions": "",
//       "recipe_image": "",
//     } */
    

//     res.status(200).json(recipeData);
//   } catch (err) {
//     res.status(400).json(err);
//   }
// });






// Maybe add a button to each card that creates a fetch using the id listed in the card information href='/api/recipe/${recipe_id}' can you add template literals in handlebars?



module.exports = router;
