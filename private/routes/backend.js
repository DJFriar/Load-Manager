const db = require("../../models");
const passport = require("../../config/passport");
// const isAuthenticated = require("../../config/isAuthenticated");

module.exports = function (app) { 
  // Route for logging user out
  app.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
  });
}