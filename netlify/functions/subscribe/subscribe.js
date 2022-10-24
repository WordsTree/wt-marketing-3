const process = require('process')

const mailgun = require("mailgun-js");

const { validateEmail, validateLength } = require('./validations.js')
const SibApiV3Sdk = require("sib-api-v3-sdk");

const EMAIL_SUBJECT = 'Email Subscription';
const EMAIL_TO = process.env.CONTACT_EMAIL;
const EMAIL_FROM = 'Subscription Form <hello@mypuzl.com>';
const EMAIL_FROM_OBJ = {
  'name': 'Contact Form',
  'email': 'hello@mypuzl.com',
};

const NAME_MIN_LENGTH = 3
const NAME_MAX_LENGTH = 50
const DETAILS_MIN_LENGTH = 10
const DETAILS_MAX_LENGTH = 1e3

/**
 * Send via mailgun.
 *
 * @param {Object} eventData
 * @returns {Promise<void>}
 */
async function sendMailgun(eventData) {
  const mg = mailgun({
    apiKey: process.env.MAILGUN_API_KEY,
    domain: process.env.MAILGUN_DOMAIN,
  });

  await mg.messages().send({
    from: EMAIL_FROM,
    to: EMAIL_TO,
    subject: EMAIL_SUBJECT,
    text: 'Email to be subscribed: ' + eventData.email,
  }, function (error, body) {
    console.log('Email sent successfully: ' + eventData.email);
    console.log('Body', body);
    console.log('Error', error);
  });
}

/**
 * Send via sendinblue.
 *
 * @param {Object} eventData
 */
async function sendSendinblue(eventData) {
  let defaultClient = SibApiV3Sdk.ApiClient.instance;
  let apiKey = defaultClient.authentications['api-key'];
  apiKey.apiKey = process.env.SENDINBLUE_API_KEY;
  let apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
  let sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
  sendSmtpEmail.subject = EMAIL_SUBJECT;
  sendSmtpEmail.sender = EMAIL_FROM_OBJ;
  sendSmtpEmail.to = [{
    'name': 'PuzlPod Team',
    'email': EMAIL_TO,
  }];
  sendSmtpEmail.htmlContent = '<p>Email to be subscribed: ' + eventData.email + '</p>';
  try {
    let response = await apiInstance.sendTransacEmail(sendSmtpEmail);
    console.log('API called successfully. Returned data:', response);
  } catch (error) {
    console.error(error);
  }
}

const handler = async (event) => {
  if (!process.env.CONTACT_EMAIL) {
    return {
      statusCode: 500,
      body: 'process.env.CONTACT_EMAIL must be defined',
    }
  }

  const eventData = JSON.parse(event.body);

  try {
    validateEmail('eventData.email', eventData.email);
  } catch (error) {
    console.log('Error validating email!', error);
    return {
      statusCode: 403,
      body: JSON.stringify({message: 'Email not valid!'}),
    }
  }

  try {
    // sendMailgun(eventData);
    await sendSendinblue(eventData);

    return { statusCode: 200, body: JSON.stringify({message: ''}) }
  } catch (error) {
    return { statusCode: 500, body: error.message }
  }
}

module.exports = { handler }
