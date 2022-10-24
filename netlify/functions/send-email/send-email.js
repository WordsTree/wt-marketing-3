const process = require('process');
var SibApiV3Sdk = require('sib-api-v3-sdk');

const mailgun = require("mailgun-js");

const { validateEmail, validateLength } = require('./validations.js');

const EMAIL_FROM = 'Contact Form <hello@mypuzl.com>';
const EMAIL_FROM_OBJ = {
  'name': 'Contact Form',
  'email': 'hello@mypuzl.com',
};
const EMAIL_TO = process.env.CONTACT_EMAIL;
const EMAIL_SUBJECT = 'Contact Form';

const NAME_MIN_LENGTH = 3
const NAME_MAX_LENGTH = 50
const MESSAGE_MIN_LENGTH = 10
const MESSAGE_MAX_LENGTH = 1e3

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
    text: "Name:" + eventData.name + "\n\nEmail: " + eventData.email + "\n\nMessage: " + eventData.message,
  }, function (error, body) {
    console.log('body', body);
    console.log('error', error);
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
  sendSmtpEmail.htmlContent = "<p>Name:" + eventData.name + "</p>"
      + "<p>Email: " + eventData.email + "</p>"
      + "<p>Message: " + eventData.message + "</p>";
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
      body: JSON.stringify({
        message: 'Email not valid!',
        field: 'email',
      }),
    }
  }

  try {
    validateLength('eventData.name', eventData.name, NAME_MIN_LENGTH, NAME_MAX_LENGTH);
  } catch (error) {
    console.log('Error validating name!', error);
    return {
      statusCode: 403,
      body: JSON.stringify({
        message: error.message.replace('eventData.name', 'Name'),
        field: 'name',
      }),
    }
  }

  try {
    validateLength('eventData.message', eventData.message, MESSAGE_MIN_LENGTH, MESSAGE_MAX_LENGTH);
  } catch (error) {
    console.log('Error validating message!', error);
    return {
      statusCode: 403,
      body: JSON.stringify({
        message: 'Message not valid! ' + error.message.replace('eventData.message', 'Message'),
        field: 'message',
      }),
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
