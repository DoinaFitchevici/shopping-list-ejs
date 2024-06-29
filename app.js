const express = require("express");
require("express-async-errors");
require("dotenv").config();
const session = require("express-session");
const flash = require("connect-flash");
const MongoDBStore = require("connect-mongodb-session")(session);
const passport = require("passport");
const passportInit = require("./passport/passportInit");
const auth = require("./middleware/auth");
const adminAccessMiddleware = require("./middleware/adminAccess");
const cookieParser = require("cookie-parser");
const csrf = require("host-csrf");
const helmet = require("helmet");
const xss = require("xss-clean");
const rateLimiter = require("express-rate-limit");
const path = require("path");

const app = express();

// Security middlewares
app.use(helmet());
app.use(xss());
// Rate limiting
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000,
    limit: 200,
  })
);

app.use(express.static(path.join(__dirname, "public")));

// View engine setup
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middleware for parsing form data
app.use(require("body-parser").urlencoded({ extended: true }));

const url = process.env.MONGO_URI;

const store = new MongoDBStore({
  uri: url,
  collection: "mySessions",
});

store.on("error", function (error) {
  console.error(error);
});

const sessionParms = {
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true,
  store: store,
  cookie: { secure: false, sameSite: "strict" },
};

if (app.get("env") === "production") {
  app.set("trust proxy", 1);
  sessionParms.cookie.secure = true;
}

app.use(session(sessionParms));
app.use(flash());

passportInit();
app.use(passport.initialize());
app.use(passport.session());

app.use(require("./middleware/storeLocals"));

app.use(cookieParser(process.env.SESSION_SECRET));
app.use(express.urlencoded({ extended: false }));

let csrf_development_mode = true;

if (app.get("env") === "production") {
  csrf_development_mode = false;
  app.set("trust proxy", 1);
}

const csrf_options = {
  protected_operations: ["PATCH", "PUT", "POST", "DELETE"],
  protected_content_types: [
    "application/json",
    "application/x-www-form-urlencoded",
  ],
  development_mode: csrf_development_mode,
};

const csrf_middleware = csrf(csrf_options);
app.use(csrf_middleware);
app.use((req, res, next) => {
  let token = csrf.token(req, res);
  res.locals._csrf = token;
  res.locals.successMessages = req.flash("success");
  res.locals.errorMessages = req.flash("error");
  next();
});

app.get("/", (req, res) => {
  res.render("index");
});

app.use("/sessions", require("./routes/sessionRoutes"));
app.use(
  "/products",
  auth,
  adminAccessMiddleware,
  require("./routes/productRoutes")
);
app.use("/cart", auth, require("./routes/cartRoutes"));
app.use("/shoppingList", auth, require("./routes/shoppingListRoutes"));

app.use((err, req, res, next) => {
  if (err.code === "EBADCSRFTOKEN") {
    console.error("CSRF error:", err);
    req.flash("error", "Invalid CSRF token.");

    if (res.headersSent) {
      return next(err);
    } else {
      return res.redirect("back");
    }
  } else {
    next(err);
  }
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  if (res.headersSent) {
    return next(err);
  }
  res.status(500).send("Something broke!");
});

// Start server
const port = process.env.PORT || 3001;

const start = async () => {
  try {
    await require("./db/connect")(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.error(error);
  }
};
module.exports = app;

start();
