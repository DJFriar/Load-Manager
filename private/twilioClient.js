// const { config } = require('dotenv');

// const accountSid = process.env.TWILIO_ACCOUNT_SID;
// const authToken = process.env.TWILIO_AUTH_TOKEN;
// const sendingNumber = process.env.TWILIO_SENDING_NUMBER;
// const messagingServiceSid = process.env.TWILIO_MESSAGING_SERVICE_SID;
// const client = require('twilio')(accountSid, authToken);

// var sendTo = '';
// var smsMessage = '';

// function sendSmsDispatch() {
//   console.log("==== sendSmsDispatch =====");
//   console.log(sendTo);
//   console.log(smsMessage);
//   client.messages
//   .create({
//     to: sendTo,
//     body: smsMessage,
//     messagingServiceSid: messagingServiceSid
//   }).then(function(data) {
//     console.log('SMS Sent Successfully');
//   }).catch(function(err) {
//     console.error('Could not deliver SMS.');
//     console.error(err);
//   })
// }


// module.exports.sendSms = function(to, message) {
//   console.log("==== twilioClient.sendSms =====");
//   console.log(to);
//   console.log(message);
//   return client.messages
//     .create({
//       body: 'This is a test',
//       to: '+14699829009',
//       // from: sendingNumber,
//       messagingServiceSid: messagingServiceSid
//     }).then(function(data) {
//       console.log('SMS Sent');
//     }).catch(function(err) {
//       console.error('Could not deliver SMS.');
//       console.error(err);
//     })
// }