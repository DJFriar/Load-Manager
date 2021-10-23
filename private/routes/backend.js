const db = require("../../models");
const passport = require("../../config/passport");
// const isAuthenticated = require("../../config/isAuthenticated");

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
}