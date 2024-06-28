const auth = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(403).send("Unauthorized access. Must be admin.");
  }
};

module.exports = auth;
