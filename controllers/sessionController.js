const User = require("../models/User");
const parseValidationErrors = require("../utils/parseValidationErrs");

const registerShow = (req, res) => {
  res.render("register");
};

const registerDo = async (req, res, next) => {
  if (req.body.password != req.body.password1) {
    req.flash("error", "The passwords entered do not match.");
    return res.render("register", { errors: req.flash("error") });
  }
  try {
    const isAdmin = req.body.email === "domna16@gmail.com";
    await User.create({ ...req.body, isAdmin });
    req.flash("success", "Registration successful!");
    res.redirect("/");
  } catch (e) {
    if (e.constructor.name === "ValidationError") {
      parseValidationErrors(e, req);
    } else if (e.name === "MongoServerError" && e.code === 11000) {
      req.flash("error", "That email address is already registered.");
    } else {
      return next(e);
    }
    return res.render("register", { errors: req.flash("error") });
  }
};

const logoff = (req, res) => {
  req.session.destroy(function (err) {
    if (err) {
      console.log(err);
    }
    res.redirect("/");
  });
};

const logonShow = (req, res) => {
  if (req.user) {
    return res.redirect("/");
  }
  res.render("logon");
};

module.exports = {
  registerShow,
  registerDo,
  logoff,
  logonShow,
};
