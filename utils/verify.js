const Verifier = require('email-verifier');
require('dotenv').config();

const verifyEmailAddress = async (useEmail) => {

  try {

    let verifier = await new Verifier(
      process.env.WHOIS_API_USERNAME,
      process.env.WHOIS_API_PASSWORD
      );
      verifier.verify(useEmailAddress, (err, data) => {
        let emailValidationResponse = '';
        if (data.validFormat === 'OK' && data.disposable != true) {
          emailValidationResponse = 'OK'
          console.log(emailValidationResponse)
          return emailValidationResponse;
        } else if (data.disposable === true) {
          emailValidationResponse = 'INVALID'
          console.log(emailValidationResponse);
          alert('Please use a non-disposable email address to create an account. ');
          return emailValidationResponse;
        } else if (err) {
          emailValidationResponse = 'ERROR';
          console.log(emailValidationResponse);

          alert('You must enter a valid email address to create an account!');
          console.log('Verifier return email address as invalid ');
          return emailValidationResponse;
        } 
        return emailValidationResponse;
      });
    } catch (err) {
      console.log("Something went wrong in creating Verifier object...");
      console.log(err);
    }
};

module.exports = verifyEmailAddress;
