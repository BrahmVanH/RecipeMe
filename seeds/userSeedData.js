const { User } = require('../models');

const userData = [
    {
      name: "Camry",
      email: "Cam@hotmail.com",
      password: "password123",
    },
    {
      name: "Kimberly",
      email: "kim123@gmail.com",
      password: "password123",
    },
    {
      name: "Morgan",
      email: "morgan@email.com",
      password: "password123",
    },
    {
      name: "Maggie",
      email: "mags@email.com",
      password: "password123",
    },
    {
      name: "Jacob",
      email: "jacobm@hoo.com",
      password: "password123",
    }
  ]
  

const seedUser = () => User.bulkCreate(userData, {
  individualHooks: true,
  returning: true,
});

module.exports = seedUser;