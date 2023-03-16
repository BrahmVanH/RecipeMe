const sequelize = require("../config/connection");

const seedUser = require("./userSeedData");
const seedRecipe = require("./recipeSeedData");

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await seedUser();

  await seedRecipe();

  process.exit(0);
};

seedDatabase();
