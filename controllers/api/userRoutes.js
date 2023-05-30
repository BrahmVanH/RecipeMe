const router = require('express').Router();
const checkEmailIsValid = require('../../utils/verifyEmail');

const { User } = require('../../models');

router.post('/', async (req, res) => {
	try {
		const validateEmail = await checkEmailIsValid(req.body.userEmail);
		// Validate email address for SMTP capability before creating user
		if (
			req.body.userEmail &&
			req.body.userEmail != null &&
			validateEmail === true
		) {
			const userData = await User.create({
				name: req.body.username,
				email: req.body.userEmail,
				password: req.body.userPassword,
			});
			res.status(200).json(userData);
		} else if (
			req.body.userEmail &&
			req.body.userEmail != null &&
			validateEmail === false
		) {
			console.log('email address is not valid...');
			res
				.status(400)
				.json({
					message:
						'The email address you have provided is not valid, please enter another email address or try again.',
				});
		} else {
			console.log(
				'Something haas gone wrong in userRoute while validating user email...'
			);
			return;
		}

		// User will be logged-in in client-side script after User.create fetch is called
	} catch (err) {
		if (
			err.name === 'SequelizeUniqueConstraintError' ||
			err.name === 'SequelizeValidationError'
		) {
			console.error('Duplicate entry error:', err.errors);
			res.status(409).json({ error: 'Duplicate entry error' });
		} else {
			// Handle other types of errors
			console.error('An error occurred:', err);
			res.status(500).json({ error: 'Internal server error' });
		}
	}
});

router.post('/login', async (req, res) => {
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
			req.session.user_id = userData.id;
			req.session.username = userData.name;
			req.session.logged_in = true;

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
