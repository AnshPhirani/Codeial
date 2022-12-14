const User = require("../models/user");

// render the profile page
module.exports.profile = function (req, res) {
  return res.render("user_profile", { title: "Codeial : Home" });
};

// render the signUp page
module.exports.signUp = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect("/users/profile");
  }
  return res.render("user_sign_up", {
    title: "Codeial | SignUp",
  });
};

// render the signIn page
module.exports.signIn = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect("/users/profile");
  }
  return res.render("user_sign_in", {
    title: "Codeial | SignIn",
  });
};

// get the singUp data and create the user
module.exports.create = function (req, res) {
  if (req.body.password != req.body.confirm_password) {
    return res.redirect("back");
  }

  User.findOne({ email: req.body.email }, function (err, user) {
    if (err) {
      console.log("Error in finding user is signing up");
      return;
    }

    if (!user) {
      User.create(req.body, function (err, user) {
        if (err) {
          console.log("Error in creating user while signing up");
          return;
        }
        return res.redirect("/users/sign-in");
      });
    } else {
      return res.redirect("back");
    }
  });
};

// SignIn and create a session for the user
module.exports.createSession = function (req, res) {
  return res.redirect("/");
};

// signOut the current user
module.exports.destroySession = function (req, res) {
  req.logout((err) => console.log(err));
  return res.redirect("/");
};
