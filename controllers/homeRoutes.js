const router = require('express').Router();
const { Recipe, User } = require('../models');
const withAuth = require('../utils/auth');

router.get("/", async (req, res) => {
  try {

    
    res.status(200).json(newProject);
  } catch (err) {
    res.status(400).json(err);
  }
});