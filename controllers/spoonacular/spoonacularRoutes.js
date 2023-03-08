const router = require("express").Router();
const { Recipe } = require("../../models_ignored");
const spoonacularBaseUrl = "https://api.spoonacular.com/recipes/complexSearch";

router.get("/", async (req, res) => {
  try {
    const spoonacularData = await fetch(
      `${spoonacularBaseUrl}&query=${userInput}`
    );
    // Go back and look at foreign fetch handling routes
    // Probably going to define a handful of functions within this route to handle API response. Maybe add touch spoonacular/index.js and add to that

    res.status(200).json(newProject);
  } catch (err) {
    res.status(400).json(err);
  }
});
