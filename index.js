const express = require("express");
const app = express();
const port = 8000;
const db = require("./config/mongoose");
const cookieParser = require("cookie-parser");

// used for session cookie
const session = require("express-session");
const passport = require("passport");
const passportLocal = require("./config/passport_local_strategy");

const MongoStore = require("connect-mongo");

// for reading through post request (i.e form data)
app.use(express.urlencoded());
app.use(cookieParser());
app.use(express.static("./assets"));

// setup for the View engine
app.set("view engine", "ejs");
app.set("views", "./views");

// mongoStore is use to store the session cookie in the db
app.use(
  session({
    name: "codeial",
    // TODO change the secret before deployement in production mode
    secret: "blah-something",
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 100,
    },
    store: MongoStore.create(
      {
        client: db.getClient(),
        autoRemove: "disabled",
      },
      (err) => console.log(err || "connect-mongo's setup working")
    ),
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

// use express router
app.use("/", require("./routes/index.js"));

app.listen(port, (err) => {
  if (err) {
    console.log("Error in running the server: ", error);
    return;
  }
  console.log("Server is running on port: ", port);
});
