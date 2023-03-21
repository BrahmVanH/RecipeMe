const User = require("./User");
const Recipe = require("./recipe");

// User can have many recipes; if user is deleted, their recipes are deleted
User.hasMany(Recipe, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

// Creating association between recipes and users
Recipe.belongsTo(User, {
  foreignKey: "user_id",
});

module.exports = { User, Recipe };
