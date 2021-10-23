// This is middleware for restricting routes a user is not allowed to visit if not logged in
module.exports = function(req, res, next) {
  // logged in
  if (req.user) {
      return next();
  }

  // not logged in
  return res.redirect("/");
};
