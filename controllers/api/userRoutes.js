const router = require("express").Router();
const { User } = require("../../models");

router.post("/", async (req, res) => {
  try {
    // async await function to create a new user in our database
    const userData = await User.create(req.body);

    // saving the input user data to session, marking user as logged in
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post("/login", async (req, res) => {
  try {

    // Async await function to find existing user matching email input
    const userData = await User.findOne({ where: { email: req.body.email } });

    // If user doesn't exist return 
    if (!userData) {
      res.status(400).json({
        message:
          "No user found with that password/email combination, please try again or create an account",
      });
      return;
    }

    // Use model.prototype to compare user-entered password to password in db
    const validatePassword = await userData.checkPassword(req.body.password);

    if (!validatePassword) {
      res.status(400).json({
        message:
          "No user found with that password/email combination, please try again",
      });
      return;
    }

    // If above matches, mark user as logged in in db
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.json({ user: userData, message: "Welcome!" });
    });
  } catch (err) {
    res.status(400).json(err);
  }
});


router.post("/logout", (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});
