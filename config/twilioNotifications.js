var twilioClient = require('../private/twilioClient');
var fs = require('fs');

function formatMessage(dispatchData) {
  return '[This is a test]' + dispatchData;
};

exports.sendNotification = function(appError, request, response, next) {
  var messageToSend = formatMessage(appError.message);
  twilioClient.sendSms(messageToSend);
  next(appError);
};