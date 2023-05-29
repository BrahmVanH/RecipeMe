const router = require("express").Router();
const userRoutes = require("./userRoutes");
const recipeRoutes = require("./recipeRoutes");
const spoonfulRoutes = require("./spoonfulRoutes")

router.use("/user", userRoutes);
router.use("/recipes", recipeRoutes);
router.use("/search", spoonfulRoutes);

module.exports = router;
