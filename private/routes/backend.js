const db = require("../../models");
const passport = require("../../config/passport");
const { text } = require("express");
// const isAuthenticated = require("../../config/isAuthenticated");
const sendNotification = require("../../config/twilioNotifications");
const twilioClient = require('../../private/twilioClient');

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const sendingNumber = process.env.TWILIO_SENDING_NUMBER;
const messagingServiceSid = process.env.TWILIO_MESSAGING_SERVICE_SID;
const client = require('twilio')(accountSid, authToken);

var sendTo = '';
var smsMessage = '';

module.exports = function (app) { 
  // Route for logging user out
  app.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
  });

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/v1/user", (req, res) => {
    db.User.create({
      FirstName: req.body.FirstName,
      LastName: req.body.LastName,
      Username: req.body.Username,
      Email: req.body.Email.toLowerCase(),
      Password: req.body.Password
    })
      .then(() => {
        console.log("User Created Successfully");
        res.status(202).send();
      })
      .catch(err => {
        console.log("Signup API Error Encountered");
        res.status(401).json(err);
      });
  });

  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the profile page.
  // Otherwise the user will be sent an error
  app.post("/api/v1/login", passport.authenticate("local"), (req, res) => {
    res.json({
      user: req.user.Username,
      id: req.user.id,
      isAdmin: req.user.isAdmin
    });
  });

  app.post("/api/v1/dispatch", (req, res) => {
    db.Dispatch.create({
      TruckID: req.body.TruckID,
      Pickup: req.body.Pickup,
      Destination: req.body.Destination,
      LoadType: req.body.LoadType,
      LoadCount: req.body.LoadCount,
      DispatchNumber: req.body.DispatchNumber,
      PaymentPerTon: req.body.PaymentPerTon,
      Notes: req.body.Notes
    })
      .then(() => {
        console.log("Dispatch Created Successfully");
        res.redirect("/dispatcher");
      })
      .catch(err => {
        console.log("Dispatch API Error Encountered");
        res.status(401).json(err);
      });
  })

  app.post("/api/v1/sendSms/:id", (req, res) => {
    const id = req.params.id;
    console.log("==== sendSms Body Content ====");
    console.log(req.body);
    db.Dispatch.findByPk(id)
    .then((data) => {
      console.log(data);
      sendTo = req.body.to;
      smsMessage = "Pickup: " + data.LoadType + " | Destination =" + data.Destination + " | Load Type = " + data.LoadType;
      sendSmsDispatch();
    })
  });
}

function sendSmsDispatch() {
  console.log("==== sendSmsDispatch =====");
  console.log(sendTo);
  console.log(smsMessage);
  client.messages
  .create({
    to: sendTo,
    body: smsMessage,
    messagingServiceSid: messagingServiceSid
  }).then(function(data) {
    console.log('SMS Sent Successfully');
  }).catch(function(err) {
    console.error('Could not deliver SMS.');
    console.error(err);
  })
}