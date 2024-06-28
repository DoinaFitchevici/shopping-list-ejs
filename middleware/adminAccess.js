const auth = (req, res, next) => {
  if (!req.user.isAdmin) {
    return res.status(403).send("Unauthorized access. Must be admin.");
  }
  next();
};

module.exports = auth;
