const { User } = require('../models');

const isUniqueUser = async (newUser) => {
	let isUnique = null;
	let changeEmail = null;
	const { email } = newUser;
  console.log(newUser);
  console.log(email);

	try {
		const userWithEmail = await User.findAll({ where: { email: email } });
    console.log(userWithEmail)
		if (!userWithEmail ) {
      console.log('setting isUnique to true');
			isUnique = true;
		} else if (userWithEmail) {
      console.log("setting isUnique to false");
			isUnique = false;
			changeEmail = true;
		} else {
			isUnique = false;
			changeEmail = true;
		}
	} catch (err) {
		console.error(err);
		console.log('there was a problem in verifying unique account...');
	}

	return { isUnique, changeEmail };
};

module.exports = isUniqueUser;
