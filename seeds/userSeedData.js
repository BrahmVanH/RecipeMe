const { User } = require('../models');

const userData = [
    {
      name: "Camry",
      email: "Cam@hotmail.com",
      password: "password123",
      user_image: "profileplaceholder.png"
    },
    {
      name: "Kimberly",
      email: "kim123@gmail.com",
      password: "password123",
      user_image: "profileplaceholder.png"
    },
    {
      name: "Morgan",
      email: "morgan@email.com",
      password: "password123",
      user_image: "profileplaceholder.png"
    },
    {
      name: "Maggie",
      email: "mags@email.com",
      password: "password123",
      user_image: "profileplaceholder.png"
    },
    {
      name: "Jacob",
      email: "jacobm@hoo.com",
      password: "password123",
      user_image: "profileplaceholder.png"
    }
  ]
  

const seedUser = () => User.bulkCreate(userData, {
  individualHooks: true,
  returning: true,
});

module.exports = seedUser;