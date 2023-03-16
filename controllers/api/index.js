const router = require("express").Router();
const userRoutes = require("./userRoutes");
const recipeRoutes = require("./recipeRoutes");

router.use("/user", userRoutes);
router.use("/recipes", recipeRoutes);

module.exports = router;
