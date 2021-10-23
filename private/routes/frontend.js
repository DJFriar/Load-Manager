var path = require("path");
const db = require("../../models");
const q = require("../../private/queries");
const { DateTime } = require("luxon");
const passport = require("../../config/passport");
// Requiring our custom middleware for checking if a user is logged in
const isAuthenticated = require("../../config/isAuthenticated");
// const isAdmin = require("../../config/isAdmin");

module.exports = function (app) {
  app.get("/", async (req,res) => {
    res.render("pages/index", { });
  });

  app.get("/login", async (req,res) => {
    res.render("pages/login", { });
  });

  app.post('/login',
    passport.authenticate('local', { 
      successRedirect: '/dispatcher',
      failureRedirect: '/login',
      failureFlash: true 
    })
  );

  app.get("/enroll", async (req,res) => {
    res.render("pages/enroll", { });
  });

  app.get("/dispatcher", isAuthenticated, async (req,res) => {
    var Dispatches = await q.queryAllDispatches();
    res.render("pages/dispatcher", { 
      Dispatches
    });
  });
}