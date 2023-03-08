const router = require("express").Router();
const { Recipe } = require("../../models");

router.get("/", async (req, res) => {
  try {
    res.status(200).json(newProject);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post("/", async (req, res) => {
  try {
  

    res.status(200).json(newProject);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put("/", async (req, res) => {
  try {
    res.status(200).json(newProject);
  } catch (err) {
    res.status(400).json(err);
  }
});



