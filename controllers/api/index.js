const router = require("express").Router();
const userRoutes = require("./userRoutes");
const recipeRoutes = require("./recipeRoutes");
// const ingredientRoutes = require("./ingredientRoutes");

router.use("/users", userRoutes);
router.use("/recipes", recipeRoutes);
// router.use("/ingredients", ingredientRoutes);

module.exports = router;
