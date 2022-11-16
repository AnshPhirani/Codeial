const passport = require("passport");

const LocalStrategy = require("passport-local").Strategy;

const User = require("../models/user");

//Authentication using passport
passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
    },
    function (email, password, done) {
      // find a user and establish identity
      User.findOne({ email: email }, function (err, user) {
        if (err) {
          return done(err);
        }
        if (!user) {
          return done(null, false);
        }
        if (user.password != password) {
          return done(null, false);
        }
        return done(null, user);
      });
    }
  )
);

// seriallize the user by creating a key to kept in the cookies
passport.serializeUser(function (user, done) {
  done(null, user.id);
});

// deseriallize the user from the key in the cookies
passport.deserializeUser(function (user, done) {
  console.log("ansh");
  User.findById(user.id, function (err, user) {
    if (err) {
      return done(err);
    }
    return done(null, user);
  });
});

// check if user is authenticated
passport.checkAuthentication = function (req, res, next) {
  // it the user is signed in then pass on the req to next function i.e controller function
  console.log(req.user);
  if (req.isAuthenticated()) {
    return next();
  }
  console.log(req.isAuthenticated());
  // if the user is not signed in
  return res.redirect("/users/sign-in");
};

passport.setAuthenticatedUser = function (req, res, next) {
  if (req.isAuthenticated()) {
    // req.user contains the current signedin user from session cookie and we are just sending this to the locals for the views
    res.locals.user = req.user;
  }
  next();
};

module.exports = passport;
