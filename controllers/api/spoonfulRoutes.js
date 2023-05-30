const router = require('express').Router();
const { Recipe } = require('../../models');
const spoonacularBaseUrl = 'https://api.spoonacular.com/recipes/complexSearch';
require('dotenv').config();

const fetch = (...args) =>
	import('node-fetch').then(({ default: fetch }) => fetch(...args));

const searchOptions = {
	method: 'GET',
};

// User can search recipe by common name
// i.e. 'spaghetti', 'tacos'

router.get('/:searchRecipeName', async (req, res) => {
	const searchUrl = `${spoonacularBaseUrl}?apiKey=${process.env.API_KEY}&query=${req.params.searchRecipeName}&addRecipeInformation=true&addRecipeNutrition=true&addRecipeInformation=true`;
	let recipes = '';

	try {
		const response = await fetch(searchUrl, searchOptions);
		const data = await response.json();
		const { results } = data;

		if (results) {
			res.render('spoon-recipes', {
				results,
				logged_in: req.session.logged_in,
				username: req.session.username,
			});
		} else {
			console.log('no results to render');
			res.render('spoon-recipes', {
				results: [], // Empty array if there are no results
				logged_in: req.session.logged_in,
				username: req.session.username,
			});
		}
	} catch (err) {
		console.error(err);
		res.status(400).json(err);
	}
});

// Stretch: There are endless ways we can modify this search
// i.e. 'excludeRecipe', 'intolerances', 'diet'
module.exports = router;
