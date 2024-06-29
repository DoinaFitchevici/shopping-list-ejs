const adminAccessMiddleware = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    req.flash("error", "Unauthorized access. Must be admin.");
    res.redirect("/");
  }
};

module.exports = adminAccessMiddleware;
