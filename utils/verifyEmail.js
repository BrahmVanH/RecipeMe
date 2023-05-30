const Verifier = require('email-verifier');
require('dotenv').config();
const axios = require('axios');

async function checkEmailIsValid(userEmailAddress) {
	let emailIsValid = false;
	try {
		const verifierEndpoint = `https://emailverification.whoisxmlapi.com/api/v2?apiKey=${process.env.WHOIS_API_KEY}&outputFormat=json&emailAddress=${userEmailAddress}`;

		const response = await axios.get(verifierEndpoint);
		if (
			response &&
			response.data &&
			response.data.smtpCheck === 'true' &&
			response.data.smtpCheck != 'false'
		) {
			emailIsValid = true;
		} else if (
			response &&
			response.data &&
			response.data.smtpCheck === 'false'
		) {
			emailIsValid = false;
		} else {
			console.log(
				'there was no data returned with the successful axios request... something is wrong in verify.js'
			);
		}
    // Return boolean indicating user's email passes SMTP check... some valid emails will fail this, but not many. 
    // Should replace with different method if SMTP turns away too many emails
		return emailIsValid;
	} catch (error) {
		console.error('Error validating email:', error);
		throw new Error('An error occurred while validating the email.');
	}
}

module.exports = checkEmailIsValid;
