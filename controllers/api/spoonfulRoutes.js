const router = require('express').Router();
const { Recipe } = require('../../models');
const spoonacularBaseUrl = 'https://api.spoonacular.com/recipes/complexSearch';
require('dotenv').config();

const fetch = (...args) =>
	import('node-fetch').then(({ default: fetch }) => fetch(...args));

const searchOptions = {
	method: 'GET'
};

// User can search recipe by common name
// i.e. 'spaghetti', 'tacos'

router.get('/:recipeName', async (req, res) => {
  const searchUrl = `${spoonacularBaseUrl}?apiKey=${process.env.API_KEY}&query=${req.params.recipeName}`;
	console.log(searchUrl);
	try {
		const response = await fetch(searchUrl, searchOptions);
		const json = await response.json();
		console.log(json);
		const spoonRecipes = json.map((spoonRecipe) =>
			spoonRecipe.get({ plain: true })
		);

		res.render('all-recipes', {
			spoonRecipes,
			// do we want this feature to require logging in?
			// logged_in: req.session.logged_in
		});
	} catch (err) {
		res.status(500).json(err);
	}
});

// Stretch: There are endless ways we can modify this search
// i.e. 'excludeRecipe', 'intolerances', 'diet'
module.exports = router;
