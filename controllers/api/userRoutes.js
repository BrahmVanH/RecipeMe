const router = require('express').Router();
const verifyEmailAddress = require('../../utils/verify');
const { User } = require('../../models');

router.post('/', async (req, res) => {
	try {
		const { emailValidationResponse } = await verifyEmailAddress(
			req.body.userEmail
		);

		switch (emailValidationResponse) {
			case emailValidationResponse === 'OK':
				// async await function to create a new user in our database
				const userData = await User.create({
					name: req.body.username,
					email: req.body.userEmail,
					password: req.body.userPassword,
				});
				// User will be logged-in in client-side script after User.create fetch is called
				res.status(200).json(userData);
				break;
			case emailValidationResponse === 'INVALID':
				alert('Please enter a valid email address!');
				console.log('email verification returned invalid');
				break;
			case emailValidationResponse === 'ERROR':
				console.log('Email-verifier returned an error');
				alert(
					'There was an error in validating your email address. Please try again!'
				);
		}
	} catch (err) {
		res.status(400).json(err);
	}
});

router.post('/login', async (req, res) => {
	console.log('logging in...');
	try {
		// Async await function to find existing user matching email input
		const userData = await User.findOne({ where: { name: req.body.username } });

		// If user doesn't exist return
		if (!userData) {
			res.status(400).json({
				message:
					'No user found with that password/email combination, please try again or create an account',
			});
			return;
		}

		// Use model.prototype to compare user-entered password to password in db
		const validatePassword = await userData.checkPassword(
			req.body.userPassword
		);

		if (!validatePassword) {
			res.status(400).json({
				message:
					'No user found with that password/email combination, please try again or create an account',
			});
			return;
		}

		// If above matches, mark user as logged in in db
		req.session.save(() => {
			console.log('saving session...');
			req.session.user_id = userData.id;
			req.session.username = userData.name;
			console.log(`username: ${userData.name}`);
			req.session.logged_in = true;
			console.log(`logged_in`);

			res.json({ user: userData, message: 'Welcome!' });
		});
	} catch (err) {
		res.status(400).json(err);
	}
});

router.post('/logout', (req, res) => {
	if (req.session.logged_in) {
		req.session.destroy(() => {
			res.status(204).end();
		});
	} else {
		res.status(404).end();
	}
});

module.exports = router;
