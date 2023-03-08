const sequelize = require('../config/connection');

const seedUser = require('./userSeedData');
const seedRecipe = require('./recipeSeedData');
const seedIngredient = require('./ingredientSeedData');


const seedDatabase = async () => {

    await sequelize.sync({ force: true });

    await seedUser();

    await seedRecipe();

    await seedIngredient();

  process.exit(0);
};

seedDatabase();