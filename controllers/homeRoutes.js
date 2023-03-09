const router = require("express").Router();
const { Recipe, User } = require("../models");
const withAuth = require("../utils/auth");

router.get("/", async (req, res) => {
  try {
    // Decide what data we'd like to include from our API/other APIs
    // Render those items to homepage

    res.status(200).json(newProject);
  } catch (err) {
    res.status(400).json(err);
  }
});
